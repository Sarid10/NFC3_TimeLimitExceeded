import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PMAssigned = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    console.log(userId);
    if (!userId) {
      toast.error("User ID not found in local storage");
      return;
    }

    axios
      .get(`http://localhost:3000/auth/projects/${userId}`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch projects");
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/projects/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setProjects(projects.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete project");
      });
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="row mb-4 mt-4">
            <div className="col-md-12"></div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-8">
              <div className="card">
                <div className="card-header">
                  <b>Assigned Projects ({projects.length})</b>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-sm table-condensed table-bordered table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th className="">Description</th>
                          <th className="">Amount Required</th>
                          <th className="">Collect</th>
                          <th className="">Image URL</th>
                          <th className="">Number of Volunteers</th>
                          <th className="">Project Manager ID</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.length > 0 ? (
                          <>
                            {projects.map((p, index) => (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td>{p.description}</td>
                                <td>{p.amount_required}</td>
                                <td>{p.collect}</td>
                                <td style={{ wordBreak: "break-word" }}>
                                  <img
                                    src={p.url_image}
                                    width="200"
                                    height="100"
                                  />
                                </td>
                                <td>{p.number_of_volunteers}</td>
                                <td>{p.project_manager_id}</td>
                                <td className="text-center">
                                  <div className="d-flex justify-content-center">
                                    <button
                                      onClick={() =>
                                        navigate("/dashboard/projects/view", {
                                          state: { status: "view", data: p },
                                        })
                                      }
                                      className="btn btn-sm btn-outline-primary view_project"
                                      type="button"
                                    >
                                      View
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan={8} className="text-center">
                              No Projects Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PMAssigned;
