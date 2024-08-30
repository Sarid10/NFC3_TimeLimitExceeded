import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Confetti from 'react-confetti'
import axios from "axios";

const benefits = [
  "Your contribution helps support meaningful causes.",
  "Receive tax benefits for your generous donation.",
  "Make a positive impact on the lives of those in need.",
  "Receive regular updates on how your donation is used.",
  "Be recognized as a valued supporter of our mission.",
];

const SmallDonatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [amount, setAmount] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false)
  const [randomBenefit, setRandomBenefit] = useState("");

  useEffect(() => {
    // Pick a random benefit when the component mounts
    const randomIndex = Math.floor(Math.random() * benefits.length);
    setRandomBenefit(benefits[randomIndex]);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    alert("Thank you for your donation!");
  };

  const handlePay = async (e) => {
    console.log(amount);
    if (!amount || amount < 1) {
      toast.error("Please enter amount greater than Rs. 1");
      return;
    }
    const currency = "INR";
    const response = await fetch("http://localhost:3000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency,
      }),
    });

    const order = await response.json();

    var option = {
      key: "",
      amount,
      currency,
      name: "Donation",
      description: "Help Needy People",
      image:
        "https://vjti.ac.in/wp-content/uploads/oldupload/cropped-New-VJTI-Logo_1-1-60x87.jpg",
      order_id: order.id,
      handler: async function (res) {
        triggerConfetti();
      },
    };
    var rzp1 = new Razorpay(option);
    rzp1.on("payment.failed", function (res) {
      alert(res.error.code);
    });
    rzp1.open();
    e.preventDefault();

    const mailData = {
      from: "timelimitexceeded4@gmail.com",
      to: formData.email,
      subject: "Thanks For Donation!",
      text: `Dear ${formData.name}, Thanks for your generous donation of ₹${amount}`
    }
    console.log(mailData);

    await axios
      .post("http://localhost:3000/auth/send_email", mailData)
      .then((res) => {
        console.log("Mail sent")
        toast.success(res.data.message);
      });

  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          flex: 2,
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
      <ToastContainer position="top-center" />
      {showConfetti && (
        <Confetti
          size={20}
          shape="circle"
          colors={['#f44336', '#9c27b0', '#3f51b5']}
          wind={0}
          gravity={0.3}
        />
      )}
        <h2 style={{ textAlign: "center", color: "#2C3E50" }}>Donate</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#2C3E50",
              }}
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#2C3E50",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#2C3E50",
              }}
            >
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#2C3E50",
              }}
            >
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <button
            type="button"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#3498DB",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handlePay}
          >
            Donate Now
          </button>
        </form>
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: "20px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ color: "#2C3E50" }}>Benefits of Donating:</h3>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ECF0F1",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#E74C3C",
          }}
        >
          {randomBenefit}
        </div>
        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "20px",
            color: "#34495E",
          }}
        >
          {benefits
            .filter((b) => b !== randomBenefit)
            .map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SmallDonatePage;
