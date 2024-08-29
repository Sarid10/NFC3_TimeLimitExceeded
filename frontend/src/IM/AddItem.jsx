import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddItem = ({ setHandleAdd }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    cost: "",
    imgurl: "",
    im_id: localStorage.getItem("user_id"),
  });

  useEffect(() => {
    if (location.state && location.state.status === "edit") {
      setFormData(location.state.data);
    }
  }, [location.state]);

  const handleBack = () => {
    if (location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard/items");
    } else {
      setHandleAdd(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    try {
      await axios
        .post("http://localhost:3000/auth/additem", {
          ...formData,
        })
        .then((res) => toast.success(res.data.message));

      setFormData({
        im_id: "",
        item: "",
        quantity: "",
        cost: "",
        imgurl: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={formData.id}
          className="form-control"
        />

        <div className="row form-group">
          <div className="col-md-8">
            <label className="control-label">Item</label>
            <input
              type="text"
              name="item"
              className="form-control"
              value={formData.item}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-4">
            <label className="control-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="control-label">Cost</label>
            <input
              type="number"
              name="cost"
              className="form-control"
              value={formData.cost}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-8">
            <label className="control-label">Image URL</label>
            <input
              type="text"
              name="imgurl"
              className="form-control"
              value={formData.imgurl}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mr-2">
          Save
        </button>
        <button className="btn btn-danger" onClick={handleBack}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddItem;
