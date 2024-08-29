import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const HtmlContent = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const ReportTemplate = () => {
  const [htmlString, setHtmlString] = useState("");
  const containerRef = useRef(null);

  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const location = useLocation();
  const { state } = location;

  const styles = {
    reportBox: {
      maxWidth: "210mm", // A4 size width
      margin: "auto",
      padding: "20mm", // A4 size padding
      border: "1px solid #eee",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
      fontSize: "12px",
      lineHeight: "20px",
      fontFamily: "'Helvetica Neue', 'Helvetica'",
      color: "#555",
    },
    heading: {
      background: "#eee",
      borderBottom: "1px solid #ddd",
      fontWeight: "bold",
      textAlign: "center",
    },
    table: {
      width: "100%",
      lineHeight: "inherit",
      textAlign: "left",
      borderCollapse: "collapse",
    },
    item: {
      borderBottom: "1px solid #eee",
    },
    section: {
      marginBottom: "20mm", // A4 size spacing
    },
    pageBreak: {
      pageBreakAfter: "always",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px", 
    },

    button: {
      backgroundColor: "#007bff", 
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
    }
  };

  const { title = "", description = "", pm_id = "", items = [] } = state || {};

  useEffect(() => {
    if (containerRef.current) {
      setHtmlString(containerRef.current.innerHTML);
    }
  }, [containerRef.current]);

  useEffect(() => {
    console.log(htmlString);
  }, [htmlString]);

  const handleSubmit = async() => {
    console.log(htmlString);
    const data = {
      title: title,
      description: description,
      number_of_items: items.length,
      total_cost: items.reduce((sum, item) => sum + parseFloat(item.itemCost), 0),
      html_string: htmlString,
      pm_id: pm_id
    }
    try {
      await axios
        .post("http://localhost:3000/auth/add_report", data)
        .then((res) => {
          toast.success(res.data.message)
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div style={styles.reportBox} ref={containerRef}>
      <div style={styles.section}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td colSpan="2" style={styles.heading}>
                <h1>{title} Drive Report</h1>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <h4>Date: {formattedDate}</h4>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <h2 style={styles.heading}>Description</h2>
                <h4><HtmlContent html={description} /></h4>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <h2 style={styles.heading}>Project Manager Id</h2>
                <h4>{pm_id}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.pageBreak}></div>

      {/* Board of Directors */}
      <div style={styles.section}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td colSpan="2" style={styles.heading}>
                <h2>Items</h2>
              </td>
            </tr>
            <tr>
              <td className="heading"><h4>Item Name</h4></td>
              <td className="heading"><h4>Item Cost</h4></td>
            </tr>
            {items.map((item, index) => (
              <tr key={index} style={styles.item}>
                <td><h5>{item.itemName}</h5></td>
                <td><h5>{item.itemCost}</h5></td>
              </tr>
            ))}
            <br></br>
            <br></br>
            <tr>
              <td className="heading"><h4></h4></td>
              <td className="heading"><h4>Total</h4></td>
            </tr>
            <tr>
              <td><h5></h5></td>
              <td><h5>₹{items.reduce((sum, item) => sum + parseFloat(item.itemCost), 0)}</h5></td>
            </tr>
          </tbody>
        </table>

        <div style={styles.pageBreak}></div>
      </div>
      
    </div>
    <div style={styles.buttonContainer}>
      <button
        type="button"
        style={styles.button}
        onClick={handleSubmit}
      >
        Submit to Admin
      </button>
    </div>
    </>
  );
};

export default ReportTemplate;
