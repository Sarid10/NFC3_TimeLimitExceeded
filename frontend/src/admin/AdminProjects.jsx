import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    description: "",
    amountRequired: "",
    collect: "",
    urlImage: "",
    numberOfVolunteers: "",
    projectManagerId: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/auth/projects/${id}`
      );
      toast.warning(response.data.message);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleInput = (projectDetails) => {
    setProject({ ...projectDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(project);
    try {
      if (project.id) {
        // Update existing project
        const res = await axios.put(
          `http://localhost:3000/auth/projects/${project.id}`,
          project
        );
        toast.success("Project updated successfully");
        setProjects((prevProjects) =>
          prevProjects.map((p) => (p.id === project.id ? { ...project } : p))
        );
      } else {
        // Add new project
        const res = await axios.post("http://localhost:3000/auth/projects", {
          ...project,
        });
        toast.success("Project saved successfully");
        const newProject = { id: res.data.insertId, ...project };
        setProjects([...projects, newProject]);
      }

      setProject({
        description: "",
        amountRequired: "",
        collect: "",
        urlImage: "",
        numberOfVolunteers: "",
        projectManagerId: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="col-lg-12">
        <div className="row">
          <div className="col-md-12">
            <form>
              <div className="card">
                <div className="card-header">Add or Edit Projects</div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="control-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={project.description}
                      onChange={(e) =>
                        setProject({ ...project, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Amount Required</label>
                    <input
                      type="number"
                      className="form-control"
                      name="amountRequired"
                      value={project.amountRequired}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          amountRequired: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Collect</label>
                    <input
                      type="text"
                      className="form-control"
                      name="collect"
                      value={project.collect}
                      onChange={(e) =>
                        setProject({ ...project, collect: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="urlImage"
                      value={project.urlImage}
                      onChange={(e) =>
                        setProject({ ...project, urlImage: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Number of Volunteers
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="numberOfVolunteers"
                      value={project.numberOfVolunteers}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          numberOfVolunteers: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Project Manager ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="projectManagerId"
                      value={project.projectManagerId}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          projectManagerId: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        className="btn btn-sm btn-primary btn-block"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-header">
                <b>Project List</b>
              </div>
              <div className="card-body">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Description</th>
                      <th className="text-center">Amount Required</th>
                      <th className="text-center">Collect</th>
                      <th className="text-center">Image URL</th>
                      <th className="text-center">Number of Volunteers</th>
                      <th className="text-center">Project Manager ID</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{p.description}</td>
                        <td>{p.amount_required}</td>
                        <td>{p.collect}</td>
                        <td
                          style={{ wordWrap: "break-word", maxWidth: "150px" }}
                        >
                          <img src={p.url_image} width="100" height={100} />
                        </td>
                        <td>{p.number_of_volunteers}</td>
                        <td>{p.project_manager_id}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-primary mr-2"
                            type="button"
                            onClick={() =>
                              handleInput({
                                description: p.description,
                                amountRequired: p.amountRequired,
                                collect: p.collect,
                                urlImage: p.urlImage,
                                numberOfVolunteers: p.numberOfVolunteers,
                                projectManagerId: p.projectManagerId,
                                id: p.id,
                              })
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            type="button"
                            onClick={() => handleDelete(p.id)}
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
};

export default AdminProjects;
