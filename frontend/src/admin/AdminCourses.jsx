import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState({
    course: '',
    id: ''
  });

  useEffect(() => {
    axios.get("http://localhost:3000/auth/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/auth/courses/${id}`);
      toast.warning(response.data.message);
      setCourses(courses.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred");
    }
  }

  const handleInput = (cname, cid) => {
    setName({
      course: cname,
      id: cid
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    try {
      if (name.id) {
        const res =  await axios.put(`http://localhost:3000/auth/courses`, name);
        toast.success("Course updated successfully");
        setCourses(prevCourses => {
          const updatedCourses = prevCourses.map(course => {
            if (course.id === name.id) {
              return { id: name.id, course: name.course };
            }
            return course;
          });
          return updatedCourses;
        });
      } else {

        const res = await axios.post("http://localhost:3000/auth/courses", { course: name.course });
        toast.success("Course saved successfully");
        const newCourse = { id: res.data, course: name.course };
        setCourses([...courses, newCourse]);
      }
      setName({ ...name, course: '', id: '' }); 
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
  };
 

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="col-lg-12">
        <div className="row">
          <div className="col-md-4">
            <form >
              <div className="card">
                <div className="card-header">
                  Course Form
                </div>
                <div className="card-body">
                  <input type="hidden" name="id" />
                  <div className="form-group">
                    <label className="control-label">Course</label>
                    <input
                      type="text"
                      className="form-control"
                      name="course"
                      value={name.course}
                      onChange={(e) => setName({ ...name, course: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        className="btn btn-sm btn-primary btn-block"
                        onClick={(e) => handleSubmit(e, { course: name.course })}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <b>Course List</b>
              </div>
              <div className="card-body">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Course</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, index) => (
                      <tr  key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{c.course}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-primary mr-2 edit_gallery"
                            type="button"
                            onClick={() => handleInput(c.course, c.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger delete_gallery"
                            type="button"
                            onClick={() => handleDelete(c.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCourses;
