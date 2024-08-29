import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import { adminRouter } from "./Routes/AdminRoutes.js";
import dotenv from "dotenv";
dotenv.config();
dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", adminRouter);
app.use("/Public", express.static("Public"));

app.post("/pay", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_RCqZF0EIXUQt7G",
      key_secret: "oZbbnv5A0YNHmLuEvSbKtiqL",
    });

    if (!req.body) {
      return res.status(400).json({
        error: "No data provided",
      });
    }
    const options = req.body;
    const payment = await razorpay.orders.create(options);
    if (!payment) {
      return res.status(500).json({
        error: "An error occurred",
      });
    }
    return res.json(payment);
  } catch (e) {
    console.error("Error : ", e);
    res.status(500).send(e);
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, (req, res) => {
  console.log("server is running");
});
