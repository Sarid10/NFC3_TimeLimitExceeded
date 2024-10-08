import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
const router = express.Router();
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import puppeteer from 'puppeteer';          
import fs from 'fs';            

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Avatar");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const avatarUpload = multer({ storage: avatarStorage });

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const galleryUpload = multer({ storage: galleryStorage });

router.post('/generate_pdf', async (req, res) => {
  const { htmlContent } = req.body;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    const filePath = path.join(__dirname, '..', '..', 'reports', 'Donation_report.pdf');
    fs.writeFileSync(filePath, pdfBuffer);

    res.json({ message: 'PDF Generated', filePath });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});

router.post("/additem", (req, res) => {
  const { item, quantity, cost, imgurl, im_id } = req.body;
  console.log(req.body);

  const sql = `INSERT INTO inventory (item, quantity, cost, imgurl, im_id) VALUES (?, ?, ?, ?, ?)`;

  con.query(sql, [item, quantity, cost, imgurl, im_id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.status(201).json({ message: "Item added successfully" });
  });
});

router.post("/requestitem", (req, res) => {
  console.log(req.body);
  const { itemid, quantity, pmid, item } = req.body;

  if (!itemid || !quantity || !pmid || !item) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  console.log(req.body);

  // Insert the request into the requests table
  const sql =
    "INSERT INTO requests (itemid, quantity, pmid, item) VALUES (?, ?, ?, ?)";
  const values = [itemid, quantity, pmid, item];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.status(200).json({ message: "Item request successfully created" });
  });
});

router.get("/getrequests", (req, res) => {
  const sql = "SELECT * FROM requests";

  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.status(200).json(results);
  });
});

router.get("/getitems", (req, res) => {
  const sql = "SELECT * FROM inventory";

  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.status(200).json(results);
  });
});

router.post("/send_email_with_pdf", (req, res) => {
  const { to, subject, text, filename } = req.body;
  console.log(__dirname);
  console.log(path.join(__dirname, `../../reports/${filename}`));
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "Donation_report.pdf",
        path: path.join(__dirname, `../../reports/Donation_report.pdf`),
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/send_email", (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/login", (req, res) => {
  const sql = "SELECT * from users Where email=?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password,
        result[0].password,
        (bcryptErr, bcryptResult) => {
          if (bcryptErr)
            return res.json({ loginStatus: false, Error: "Bcrypt Error" });
          if (bcryptResult) {
            const email = result[0].email;
            const token = jwt.sign(
              { role: "admin", email: email },
              "jwt_csalumni_key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({
              loginStatus: true,
              userType: result[0].type,
              userId: result[0].id,
              userName: result[0].name,
              alumnus_id: result[0].alumnus_id,
            });
          } else {
            return res.json({
              loginStatus: false,
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
    }
  });
});

router.put("/approverequest/:id", (req, res) => {
  const requestId = req.params.id;
  console.log(requestId);
  // Step 1: Fetch the request details
  const getRequestQuery = "SELECT * FROM requests WHERE id = ?";
  con.query(getRequestQuery, [requestId], (err, requestResult) => {
    if (err) {
      console.error("Error fetching request:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    if (requestResult.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    const { itemid, quantity } = requestResult[0];
    console.log(itemid, quantity);

    // Step 2: Fetch the inventory item
    const getItemQuery = "SELECT * FROM inventory WHERE id = ?";
    con.query(getItemQuery, [itemid], (err, inventoryResult) => {
      if (err) {
        console.error("Error fetching inventory item:", err);
        return res.status(500).json({ message: "Database Error" });
      }

      if (inventoryResult.length === 0) {
        return res.status(404).json({ message: "Inventory item not found" });
      }

      const currentQuantity = inventoryResult[0].quantity;
      console.log(currentQuantity);

      //Step 3: Check if there's enough quantity in inventory
      if (currentQuantity < quantity) {
        return res
          .status(400)
          .json({ message: "Not enough quantity in inventory" });
      }

      // Step 4: Deduct the quantity from the inventory
      const newQuantity = currentQuantity - quantity;
      const updateInventoryQuery =
        "UPDATE inventory SET quantity = ? WHERE id = ?";
      con.query(updateInventoryQuery, [newQuantity, itemid], (err) => {
        if (err) {
          console.error("Error updating inventory:", err);
          return res.status(500).json({ message: "Database Error" });
        }

        // Step 5: Mark the request as approved and delete it

        const deleteRequestQuery = "DELETE FROM requests WHERE id = ?";
        con.query(deleteRequestQuery, [requestId], (err) => {
          if (err) {
            console.error("Error deleting request:", err);
            return res.status(500).json({ message: "Database Error" });
          }

          res.status(200).json({
            message: "Request approved, inventory updated, and request deleted",
          });
        });
      });
    });
  });
});

router.post("/donordetails", async (req, res) => {
  const { id } = req.body;
  try {
    const sql = `
   SELECT 
    u.*,
    SUM(d.amount_donated) AS total_donation_amount
    FROM 
        users u
    JOIN 
        donors d ON u.id = d.user_id
    WHERE 
        d.donated_to_id = ?
    GROUP BY 
        u.id
    ORDER BY 
        total_donation_amount DESC;

    `;

    con.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Query Error" });
      }
      res.json(result);
    });
  } catch (e) {}
});

router.post("/signup", async (req, res) => {
  const { name, email, password, userType, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "SELECT * from users Where email=?";
    con.query(sql, [email], async (err, result) => {
      if (err) return res.json({ Error: "Query Error" });
      if (result.length > 0) {
        return res.json({ email: result[0].email });
      } else {
        if (userType == "alumnus") {
          const alumnusSql =
            "INSERT INTO alumnus_bio(name, email, course_id) VALUES(?,?,?)";
          con.query(
            alumnusSql,
            [name, email, course_id],
            async (alumnusErr, alumnusResult) => {
              if (alumnusErr) {
                console.error(
                  "Error executing SQL query for alumnus_bio:",
                  alumnusErr
                );
                return res.status(500).json({
                  error: "Alumnus Bio Query Error",
                  signupStatus: false,
                });
              }

              const alumnusId = alumnusResult.insertId;
              const userSql =
                "INSERT INTO users(name, email, password, type, phone) VALUES(?,?,?,?,?)";
              con.query(
                userSql,
                [name, email, hashedPassword, userType, alumnusId],
                (userErr, userResult) => {
                  if (userErr) {
                    console.error(
                      "Error executing SQL query for users:",
                      userErr
                    );
                    return res
                      .status(500)
                      .json({ error: "User Query Error", signupStatus: false });
                  }
                  return res.json({
                    message: "Signup Successful",
                    userId: userResult.insertId,
                    signupStatus: true,
                  });
                }
              );
            }
          );
        } else {
          const sql =
            "INSERT INTO users(name, email, password, type,phone) VALUES(?,?,?,?,?)";
          con.query(
            sql,
            [name, email, hashedPassword, userType, phone],
            (err, result) => {
              if (err) {
                console.error("Error executing SQL query for users:", err);
                return res
                  .status(500)
                  .json({ error: "User Query Error", signupStatus: false });
              }
              return res.json({
                message: "Signup Successful",
                userId: result.insertId,
                signupStatus: true,
              });
            }
          );
        }
      }
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return res
      .status(500)
      .json({ error: "Password Hashing Error", signupStatus: false });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout Success" });
});

router.get("/counts", (req, res) => {
  const sql = `
        SELECT
            (SELECT COUNT(*) FROM forum_topics) AS forumCount,
            (SELECT COUNT(*) FROM careers) AS jobCount,
            (SELECT COUNT(*) FROM events) AS eventCount,
            (SELECT COUNT(*) FROM events WHERE schedule >= CURDATE()) AS upeventCount,
            (SELECT COUNT(*) FROM alumnus_bio) AS alumniCount,
            (SELECT COUNT(*) FROM courses) AS CourseCount,
            (SELECT SUM(amount_collected) FROM donations) AS TotalDonations,
            (SELECT COUNT(*) FROM users WHERE type = 'volunteer') AS volunteerCount,
            (SELECT COUNT(*) FROM users WHERE type = 'project_manager') AS projectManagers;
    `;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }

    const counts = {
      forums: result[0].forumCount,
      jobs: result[0].jobCount,
      events: result[0].eventCount,
      upevents: result[0].upeventCount,
      alumni: result[0].alumniCount,
      donate: result[0].TotalDonations,
      course: result[0].CourseCount,
      volunteer: result[0].volunteerCount,
      projectManager: result[0].projectManagers,
    };

    res.json(counts);
  });
});

router.get("/jobs", (req, res) => {
  const sql = `
    SELECT careers.*, users.name, users.email
    FROM careers
    INNER JOIN users ON careers.user_id = users.id
    ORDER BY careers.id DESC       
    `;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    res.json(result);
  });
});

router.get("/unique_donors_list", (req, res) => {
  const sql = `SELECT u.id, u.name, u.email, SUM(d.amount_donated) AS total_amount_donated
    FROM donors d
    JOIN users u ON d.user_id = u.id
    GROUP BY u.id, u.name;
  `;
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    res.json(result);
  });
});

router.get("/donations", (req, res) => {
  const sql = `
    SELECT donations.*, users.name
    FROM donations
    INNER JOIN users ON donations.user_id = users.id
    ORDER BY donations. id DESC       
    `;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    res.json(result);
  });
});

router.post("/managedonations", (req, res) => {
  const { title, description, total_amount, user_id } = req.body;

  const sql =
    "INSERT INTO donations (title, description, total_amount, amount_collected, user_id) VALUES (?, ?, ?, ?,?)";
  con.query(
    sql,
    [title, description, total_amount, 0, user_id],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({
        message: "New Donation added successfully",
        jobId: result.insertId,
      });
    }
  );
});

router.put("/managedonations", (req, res) => {
  const { id, title, description, total_amount, user_id } = req.body;

  if (id) {
    const sql =
      "UPDATE donations SET title=?, description=?, total_amount=?, amount_collected=? WHERE id=?";
    con.query(sql, [title, description, total_amount, 0, id], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({ message: "Donation updated successfully" });
    });
  } else {
    return res
      .status(400)
      .json({ error: "Invalid Request: No ID provided for update" });
  }
});

router.post("/adddonor", (req, res) => {
  const { amount_donated, user_id, donated_to_id } = req.body;
  const sql =
    "INSERT INTO donors (amount_donated, user_id, donated_to_id) VALUES (?, ?, ?)";
  con.query(sql, [amount_donated, user_id, donated_to_id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Database Error" });
    }
    return res.json({
      message: "Insert New Donor successfully",
      jobId: result.insertId,
    });
  });
});

router.post("/send-funds", (req, res) => {
  const { imid, amount } = req.body;
  console.log(req.body);
  // Simple validation to check if the amount is valid
  if (!amount || amount <= 0) {
    return res.status(400).json({
      message: "Invalid amount. Please enter a positive value.",
    });
  }

  // Mock logic for sending funds (this is where you'd integrate payment processing)
  const query = "INSERT INTO funds (amount, imid) VALUES (?, ?)";
  db.query(query, [amount, imid], (err, result) => {
    if (err) {
      console.error("Error inserting data into funds table:", err);
      return res.status(500).json({
        message: "Error processing the transaction. Please try again.",
      });
    }
    return res.json({
      message:
        "Funds sent successfully. Your transaction ID is" + result.insertId,
    });
  });
});

router.put("/updatedonation", (req, res) => {
  const { id, amount } = req.body;
  if (id) {
    const sql =
      "UPDATE donations set amount_collected = amount_collected + ? WHERE id = ?";
    con.query(sql, [amount, id], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({ message: "Donation updated successfully" });
    });
  } else {
    return res
      .status(400)
      .json({ error: "Invalid Request: No ID provided for update" });
  }
});

router.delete("/donations/:id", (req, res) => {
  const sql = "DELETE FROM donations WHERE id= ?";

  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Error: "Query Error" });
    }
    return res.json({ message: "Donation deleted successfully" });
  });
});

router.post("/managejob", (req, res) => {
  const { company, job_title, location, description, user_id } = req.body;

  const sql =
    "INSERT INTO careers (company, job_title, location, description,user_id) VALUES (?, ?, ?, ?,?)";
  con.query(
    sql,
    [company, job_title, location, description, user_id],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({
        message: "New job added successfully",
        jobId: result.insertId,
      });
    }
  );
});

router.put("/managejob", (req, res) => {
  const { id, company, job_title, location, description } = req.body;

  if (id) {
    const sql =
      "UPDATE careers SET company=?, job_title=?, location=?, description=? WHERE id=?";
    con.query(
      sql,
      [company, job_title, location, description, id],
      (err, result) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ error: "Database Error" });
        }
        return res.json({ message: "Job updated successfully" });
      }
    );
  } else {
    return res
      .status(400)
      .json({ error: "Invalid Request: No ID provided for update" });
  }
});

router.delete("/jobs/:id", (req, res) => {
  const jid = req.params.id;

  const sql = "DELETE FROM careers WHERE id= ?";

  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Error: "Query Error" });
    }
    return res.json({ message: "Job deleted successfully" });
  });
});
router.get("/courses", (req, res) => {
  const sql = "SELECT * FROM courses";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Error: "Query Error" });
    }
    return res.json(result);
  });
});

router.get("/notifications", (req, res) => {
  const sql = "SELECT * FROM notifications";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Error: "Query Error" });
    }
    return res.json(result);
  });
});

router.delete("/courses/:id", (req, res) => {
  const sql = "DELETE FROM courses WHERE id= ?";

  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Error: "Query Error" });
    }
    return res.json({ message: "Course deleted successfully" });
  });
});
router.post("/courses", (req, res) => {
  const sql = "INSERT INTO courses(course) VALUES(?)";
  con.query(sql, [req.body.course], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);

      return res.json({ Error: "Query Error" });
    }
    return res.json(result.insertId);
  });
});

router.post("/projects", (req, res) => {
  console.log(req.body);
  const {
    description,
    amountRequired,
    collect,
    urlImage,
    numberOfVolunteers,
    projectManagerId,
  } = req.body;

  const sql =
    "INSERT INTO projects(description, amount_required, collect, url_image, number_of_volunteers, project_manager_id) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(
    sql,
    [
      description,
      amountRequired,
      collect,
      urlImage,
      numberOfVolunteers,
      projectManagerId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.json({ Error: "Query Error" });
      }
      return res.json({ insertId: result.insertId });
    }
  );
});

router.get("/projects", (req, res) => {
  const sql = "SELECT * FROM projects";

  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);
      return res.json({ Error: "Query Error" });
    }
    return res.json(results);
  });
});

router.post("/add_report", (req, res) => {
  const {
    title,
    description,
    number_of_items,
    total_cost,
    html_string,
    pm_id,
  } = req.body;
  const sql =
    "INSERT INTO reports (title, description, number_of_items, total_cost, html_string, pm_id) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(
    sql,
    [title, description, number_of_items, total_cost, html_string, pm_id],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({
        message: "Insert New Report successfully",
        jobId: result.insertId,
      });
    }
  );
});

router.get("/projects/:projectManagerId", (req, res) => {
  const projectManagerId = req.params.projectManagerId;
  // console.log(projectManagerId);
  const sql = "SELECT * FROM projects WHERE project_manager_id = ?";
  con.query(sql, [projectManagerId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ Error: "Query Error" });
    }
    return res.json(results);
  });
});

router.delete("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);

  const sql = "DELETE FROM projects WHERE id = ?";
  con.query(sql, [projectId], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.json({ Error: "Query Error" });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "Project not found" });
    }
    return res.json({ message: "Project deleted successfully" });
  });
});

router.put("/courses", (req, res) => {
  const { id, course } = req.body;
  if (id != "") {
    const sql = "UPDATE courses SET course=? WHERE id=?";
    con.query(sql, [course, id], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({ message: "Course Updated Successfully" });
    });
  } else {
    return res
      .status(400)
      .json({ error: "Invalid Request: No ID provided for update" });
  }
});

router.get("/events", (req, res) => {
  const sql =
    "SELECT events.*, COUNT(event_commits.id) AS commits_count FROM events LEFT JOIN event_commits ON events.id = event_commits.event_id GROUP BY events.id ORDER BY events.schedule DESC";

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json(result);
  });
});

router.get("/reports", (req, res) => {
  const sql = "SELECT * from reports";

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json(result);
  });
});

router.post("/events", (req, res) => {
  const { title, content, schedule } = req.body;
  const sql = "INSERT INTO events (title, content, schedule) VALUES (?, ?, ?)";
  con.query(sql, [title, content, schedule], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json({ message: "Event Added Successfully" });
  });
});

router.put("/events", (req, res) => {
  const { id, title, content, schedule } = req.body;
  if (id) {
    const sql = "UPDATE events SET title=?, content=?, schedule=? WHERE id=?";
    con.query(sql, [title, content, schedule, id], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Query Error" });
      }
      return res.json({ message: "Event Updated Successfully" });
    });
  }
});

router.delete("/events/:id", (req, res) => {
  const eid = req.params.id;
  const sql = "DELETE FROM events WHERE id=?";
  con.query(sql, [eid], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json({ message: "Event Deleted Successfully" });
  });
});

router.post("/events/participate", (req, res) => {
  const { event_id, user_id } = req.body;
  const sql = "INSERT INTO event_commits (event_id,user_id) VALUES (?, ?)";
  con.query(sql, [event_id, user_id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json({ message: "Participated" });
  });
});
router.post("/eventcommits/check", (req, res) => {
  const { event_id, user_id } = req.body;
  const sql = "SELECT * FROM event_commits where event_id=? AND user_id=?";
  con.query(sql, [event_id, user_id], (err, result) => {
    if (err) return res.json({ eventCommit: false, Error: "Query Error" });
    if (result.length > 0) {
      return res.json({ eventCommit: true });
    } else {
      return res.json({ eventCommit: false });
    }
  });
});

router.get("/forums", (req, res) => {
  const sql =
    "SELECT forum_topics.*, COUNT(forum_comments.id) AS comments_count, users.name AS created_by FROM forum_topics LEFT JOIN forum_comments ON forum_topics.id = forum_comments.topic_id LEFT JOIN users ON forum_topics.user_id = users.id GROUP BY forum_topics.id ORDER BY forum_topics.id DESC";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json(result);
  });
});

router.delete("/forum/:id", (req, res) => {
  const eid = req.params.id;
  const sql = "DELETE FROM forum_topics WHERE id=?";
  con.query(sql, [eid], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json({ message: "Forum Deleted Successfully" });
  });
});

router.post("/topiccomments", (req, res) => {
  const { topic_id } = req.body;
  const sql =
    "SELECT forum_comments.*, users.name AS name FROM forum_comments LEFT JOIN users ON forum_comments.user_id = users.id WHERE topic_id = ?";
  con.query(sql, [topic_id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json(result);
  });
});

router.put("/view_forum/:id", (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  if (id) {
    const sql = "UPDATE forum_comments SET comment=? WHERE id=?";
    con.query(sql, [comment, id], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Query Error" });
      }
      return res.json({ message: "Comment Updated Successfully" });
    });
  } else {
    return res.status(400).json({ error: "Invalid request" });
  }
});

router.post("/view_forum", (req, res) => {
  const { c, user_id, topic_id } = req.body;
  const sql =
    "INSERT INTO forum_comments (topic_id, comment, user_id) VALUES (?, ?, ?)";
  con.query(sql, [topic_id, c, user_id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json(result);
  });
});

router.delete("/view_forum/:id", (req, res) => {
  const sql = "DELETE FROM forum_comments WHERE id= ?";
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Error: "Query Error" });
    }
    return res.json({ message: "Comment deleted successfully" });
  });
});

router.post("/manageforum", (req, res) => {
  const { title, userId, description } = req.body;

  const sql =
    "INSERT INTO forum_topics (title, user_id, description) VALUES (?, ?, ?)";
  con.query(sql, [title, userId, description], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Database Error" });
    }
    return res.json({
      message: "New Forum added successfully",
      jobId: result.insertId,
    });
  });
});

router.put("/manageforum", (req, res) => {
  const { title, description, id } = req.body;
  if (id) {
    const sql = "UPDATE forum_topics SET title=?, description=? WHERE id=?";
    con.query(sql, [title, description, id], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({ message: "Forum Topic Updated Successfully" });
    });
  } else {
    return res
      .status(400)
      .json({ error: "Invalid Request: No ID provided for update" });
  }
});

router.get("/users", (req, res) => {
  const sql = "SELECT * FROM users order by name asc";
  con.query(sql, (err, result) => {
    if (err) return res.json({ eventCommit: false, Error: "Query Error" });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ message: "No User Available" });
    }
  });
});

router.put("/manageuser", async (req, res) => {
  try {
    const { name, email, id, password, type } = req.body;
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (id) {
      const sql = "UPDATE users SET name=?, email=?,type=? WHERE id=?";
      con.query(sql, [name, email, type, id], (err, result) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ error: "Database Error" });
        }
        if (hashedPassword) {
          const psql = "UPDATE users SET password = ? WHERE id =?";
          const pvalues = [hashedPassword, id];
          con.query(psql, pvalues, (err, result) => {
            if (err) {
              console.error("Error updating password:", err);
              res.status(500).json({ error: "An error occurred" });
              return;
            }
            res.json({ message: "User updated successfully" });
          });
        } else {
          res.json({ message: "User updated successfully" });
        }
      });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid Request: No ID provided for update" });
    }
  } catch (error) {
    console.error("Error updating User:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.delete("/user/:id", (req, res) => {
  const searchsql = "Select alumnus_id from users where id=?";
  con.query(searchsql, [req.params.id], (serr, sresult) => {
    if (serr) {
      return res.json({ Error: "Query Error" });
    }
    if (sresult[0].alumnus_id !== 0) {
      const asql = "DELETE FROM alumnus_bio WHERE id=?";
      con.query(asql, [sresult[0].alumnus_id], (aerr, aresult) => {
        if (aerr) {
          console.error("Error executing SQL query:", aerr);
        }
      });
    }

    const usql = "DELETE FROM users WHERE id= ?";
    con.query(usql, [req.params.id], (uerr, uresult) => {
      if (uerr) {
        return res.json({ Error: "Query Error" });
      }
      return res.json({ message: "User deleted successfully" });
    });
  });
});

router.get("/gallery", (req, res) => {
  const sql = "SELECT * FROM gallery order by id desc";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Query Error" });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ message: "No Image Available" });
    }
  });
});

router.delete("/gallery/:id", (req, res) => {
  const id = req.params.id;

  con.query("DELETE FROM gallery WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error("Error deleting from gallery:", err);
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    res.json({ message: "Image deleted successfully" });
  });
});

router.post("/gallery", galleryUpload.single("image"), (req, res) => {
  try {
    const imagePath = req.file.path;
    const about = req.body.about;

    con.query(
      "INSERT INTO gallery (image_path, about) VALUES (?, ?)",
      [imagePath, about],
      (err, result) => {
        if (err) {
          console.error("Error inserting into gallery:", err);
          res.status(500).json({ error: "An error occurred" });
          return;
        }
        const insertedId = result.insertId;
        res.json({
          message: "Image uploaded successfully",
          id: insertedId,
          image_path: imagePath,
          about: about,
        });
      }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/alumni", (req, res) => {
  const sql =
    "SELECT a.*,c.course,a.name as name from alumnus_bio a inner join courses c on c.id = a.course_id order by a.name asc";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Query Error" });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ message: "No Data Available" });
    }
  });
});

router.post("/notifications", async (req, res) => {
  const { orgName, address, email, phone, category, description } = req.body;
  console.log(req.body);
  const sql =
    "INSERT INTO notifications (org_name, address, email,phone,category,description) VALUES (?,?,?,?,?,?)";
  con.query(
    sql,
    [orgName, address, email, phone, category, description],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Database Error" });
      }
      return res.json({
        message: "New notification added successfully",
        jobId: result.insertId,
      });
    }
  );
});

router.delete("/alumni/:id", (req, res) => {
  const eid = req.params.id;
  const sql = "DELETE FROM alumnus_bio WHERE id=?";
  con.query(sql, [eid], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Query Error" });
    }
    return res.json({ message: "Alumnus Deleted Successfully" });
  });
});

router.put("/viewalumni", (req, res) => {
  const { status, id } = req.body;
  const sql = "UPDATE alumnus_bio SET status=? WHERE id=?";
  con.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Database Error" });
    }
    return res.json({ message: "Status Updated Successfully" });
  });
});

router.get("/settings", (req, res) => {
  const sql = "SELECT * FROM system_settings";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Query Error" });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ message: "No Data Available" });
    }
  });
});

//frontend

router.get("/up_events", (req, res) => {
  const sql = `SELECT * FROM events WHERE schedule >= CURDATE() ORDER BY schedule ASC`;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Query Error" });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ message: "Still there are no upcoming Events" });
    }
  });
});

router.get("/alumni_list", (req, res) => {
  const sql =
    "SELECT a.*,c.course,a.name as name from alumnus_bio a inner join courses c on c.id = a.course_id order by a.name asc";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Query Error" });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ message: "No Alumni available" });
    }
  });
});

router.put("/upaccount", avatarUpload.single("image"), async (req, res) => {
  try {
    const {
      name,
      connected_to,
      course_id,
      email,
      gender,
      batch,
      password,
      alumnus_id,
      user_id,
    } = req.body;
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const asql =
      "UPDATE alumnus_bio SET name = ?, connected_to = ?, course_id = ?, email = ?, gender = ?, batch = ? WHERE id = ?";
    const avalues = [
      name,
      connected_to,
      course_id,
      email,
      gender,
      batch,
      alumnus_id,
    ];
    con.query(asql, avalues, (err, result) => {
      if (err) {
        console.error("Error updating alumnus_bio:", err);
        res.status(500).json({ error: "An error occurred" });
        return;
      }

      if (req.file) {
        const avsql = "UPDATE alumnus_bio SET avatar = ? WHERE id = ?";
        const avvalues = [req.file.path, alumnus_id];
        con.query(avsql, avvalues, (err, result) => {
          if (err) {
            console.error("Error updating pic:", err);
            return;
          }
        });
      }

      const usql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
      const uvalues = [name, email, user_id];
      con.query(usql, uvalues, (err, result) => {
        if (err) {
          console.error("Error updating users:", err);
          res.status(500).json({ error: "An error occurred" });
          return;
        }
        if (hashedPassword) {
          const psql = "UPDATE users SET password = ? WHERE id = ?";
          const pvalues = [hashedPassword, user_id];
          con.query(psql, pvalues, (err, result) => {
            if (err) {
              console.error("Error updating password:", err);
              res.status(500).json({ error: "An error occurred" });
              return;
            }
            res.json({ message: "Account updated successfully" });
          });
        } else {
          res.json({ message: "Account updated successfully" });
        }
      });
    });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/alumnusdetails", (req, res) => {
  const id = req.query.id;
  const sql = "SELECT * from alumnus_bio Where id=?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Query Error" });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json({ message: "No Data Available" });
    }
  });
});

export { router as adminRouter };
