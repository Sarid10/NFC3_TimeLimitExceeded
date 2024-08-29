import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactQuill from "react-quill";

const ManageDonations = ({ setHandleAdd }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const uid = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    total_amount: "",
    user_id: uid,
  });

  useEffect(() => {
    if (location.state && location.state.action === "edit") {
      setFormData(location.state.data);
      console.log(location);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleBack = () => {
    if (location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard/donations");
    } else {
      console.log("back btn");
      setHandleAdd(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (location.state && location.state.action === "edit") {
        await axios
          .put("http://localhost:3000/auth/managedonations", formData)
          .then((res) => toast.success(res.data.message));
      } else {
        await axios
          .post("http://localhost:3000/auth/managedonations", formData)
          .then((res) => toast.success(res.data.message));
      }
      setFormData({
        id: "",
        title: "",
        description: "",
        total_amount: "",
        user_id: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleChangeDesc = (description) => {
    setFormData((prevState) => ({
      ...prevState,
      description,
    }));
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="id"
            value={formData.id}
            className="form-control"
          />
          <div className="row form-group">
            <div className="col-md-8">
              <label className="control-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-8">
              <label className="control-label">Required Amount</label>
              <input
                type="text"
                name="total_amount"
                className="form-control"
                value={formData.total_amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-8">
              <label className="control-label">Description</label>
              <ReactQuill
                value={formData.description}
                onChange={handleChangeDesc}
                required
              />
            </div>
          </div>
          <div className="col-md-8">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger float-end  "
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageDonations;
