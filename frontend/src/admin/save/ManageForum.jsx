import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ReactQuill from 'react-quill';

const ManageForum = ({ setHandleAdd }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    if (location.state && location.state.status === 'edit') {
      setFormData(location.state.data);
    }
  }, [location.state]);

  const handleBack = () => {
    if (location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard/forum");
    } else {
      console.log("back btn")
      setHandleAdd(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    try {
      if (location.state && location.state.status === 'edit') {
        await axios.put('http://localhost:3000/auth/manageforum', formData)
          .then((res) => toast.success(res.data.message))
      } else {
        await axios.post('http://localhost:3000/auth/manageforum', {
          title: formData.title,
          description: formData.description,
          userId: userId
        })
          .then((res) => toast.success(res.data.message))
      }
      setFormData({
        id: '',
        title: '',
        description: '',
      })
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
  };

  const handleChange = (description) => {
    setFormData(prevState => ({
      ...prevState,
      description
    }));
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value="id'" className="form-control" />
        <div className="row form-group">
          <div className="col-md-8">
            <label className="control-label">Title</label>
            <input type="text" name="title" className="form-control" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-md-12">
            <label className="control-label">Description</label>
            <ReactQuill
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type='submit' className="btn btn-primary mr-2">Save</button>
        <button className="btn btn-danger " onClick={handleBack}>Cancel</button>
      </form>
    </div>
  )
}

export default ManageForum