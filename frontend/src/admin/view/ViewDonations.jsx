import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import axios from "axios";
import { AuthProvider, useAuth } from '../../AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const ViewDonations = ({ donation, closeModal }) => {
  const [amount, setAmount] = useState(0);
  const { isLoggedIn } = useAuth();

  const handlePay = async (e) => {
    if(!amount || amount < 1) {
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
      name: donation.name,
      description: donation.description,
      image:
        "https://vjti.ac.in/wp-content/uploads/oldupload/cropped-New-VJTI-Logo_1-1-60x87.jpg",
      order_id: order.id,
      handler: async function (res) {
        window.location.reload();
      },
    };
    var rzp1 = new Razorpay(option);
    rzp1.on("payment.failed", function (res) {
      alert(res.error.code);
    });
    rzp1.open();
    e.preventDefault();
    const formData = {
      id: donation.id,
      amount: amount / 100,
    };

    const formData2 = {
      amount_donated: amount / 100,
      user_id: localStorage.getItem("user_id"),
      donated_to_id: donation.id,
    };

    await axios
      .put("http://localhost:3000/auth/updatedonation", formData)
      .then(async (res) => {
        await axios
          .post("http://localhost:3000/auth/adddonor", formData2)
          .then((res) => toast.success(res.data.message));
      });
  };
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <ToastContainer position="top-center" />
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">View Donation Details</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="job-details">
              <p>
                <strong>Title: </strong>
                {donation.title}
              </p>
              <p>
                <strong>Amount Required: </strong>
                {donation.total_amount}
              </p>
              <hr className="divider" />
              <div
                className="description"
                style={{ maxHeight: "50vh", overflowY: "auto" }}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: donation.description }}
                ></p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginLeft: "50px", gap: "1rem", marginBottom: "35px" }}>
            <input
              onChange={(e) => setAmount(e.target.value * 100)}
              type="number"
              className="form-control"
              placeholder="Enter the amount you want to donate"
              style={{ width: "600px" }}
              
            />
            <button
              className="btn btn-secondary"
              style={{ width: "80px", backgroundColor: "green" }}
              type="button"
              onClick={handlePay}
              disabled={!isLoggedIn}
            >
              Pay
            </button>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={closeModal}
              style={{ marginRight: "40px", width: "80px" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDonations;
