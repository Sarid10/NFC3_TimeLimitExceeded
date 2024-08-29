import React, { useState } from "react";

const SmallDonatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [amount, setAmount] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        amount,
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
        closeModal();
        triggerConfetti();
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },
    };
    var rzp1 = new Razorpay(option);
    rzp1.on("payment.failed", function (res) {
      alert(res.error.code);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        paddingTop: "120px", // Increased padding-top to bring the content below the header
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2C3E50" }}>Donate</h2>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", color: "#2C3E50" }}
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
          style={{ display: "block", marginBottom: "5px", color: "#2C3E50" }}
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
          style={{ display: "block", marginBottom: "5px", color: "#2C3E50" }}
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
          style={{ display: "block", marginBottom: "5px", color: "#2C3E50" }}
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
    </div>
  );
};

export default SmallDonatePage;
