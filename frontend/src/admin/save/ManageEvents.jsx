import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactQuill from "react-quill";

const ManageEvents = ({ setHandleAdd }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const uid = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user_id: uid,
    items: [{ itemName: "", itemCost: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...formData.items];
    updatedItems[index][e.target.name] = e.target.value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemName: "", itemCost: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleBack = () => {
    if (location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard/reports");
    } else {
      setHandleAdd(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/auth/addDetails", formData)
        .then((res) => toast.success(res.data.message));

      setFormData({
        title: "",
        description: "",
        user_id: uid,
        items: [{ itemName: "", itemCost: "" }],
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
          <div className="row form-group">
            <div className="col-md-8">
              <label className="control-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="row form-group">
              <div className="col-md-4">
                <label className="control-label">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  className="form-control"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="col-md-4">
                <label className="control-label">Item Cost</label>
                <input
                  type="text"
                  name="itemCost"
                  className="form-control"
                  value={item.itemCost}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="row form-group">
            <div className="col-md-8">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddItem}
              >
                Add Item
              </button>
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
              className="btn btn-outline-danger float-end"
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

export default ManageEvents;
