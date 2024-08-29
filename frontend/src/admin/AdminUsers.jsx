import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/users")
      .then((res) => {
        setUsers(res.data);
        console.log(users);
      })
      .catch((err) => console.log(err));
  }, []);

  const delUser = (id) => {
    axios.delete(`http://localhost:3000/auth/user/${id}`)
      .then((res) => {
        toast.info(res.data.message);
        setUsers(users.filter((e) => e.id !== id))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container-fluid mt-4">
      <ToastContainer position="top-center" />

      <div className="row mt-4">
        <div className="col-lg-12 padzero">
          <div className="card tablecard">
            <div className="card-body cardwidth">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Type</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.type}</td>
                        <td className="text-center">
                          <Link to="/dashboard/users/manage" state={{ status: "edit", data: user }} className="btn btn-primary btn-sm mr-2">
                            <FaEdit /> Edit
                          </Link>
                          <button onClick={() => delUser(user.id)} className="btn btn-danger btn-sm">
                            <FaTrash /> Delete
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
};

export default AdminUsers;
