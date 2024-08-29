import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PMReport from "./PMReport";

const PMlist = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/jobs")
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/auth/jobs/${id}`
      );
      toast.warning(response.data.message);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <b>Jobs List</b>
                  <span className="">
                    <Link
                      to="/dashboard/reports/manage"
                      className="btn btn-primary btn-block btn-sm col-sm-2 float-right"
                    >
                      <FaPlus /> New
                    </Link>
                  </span>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-condensed table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th className="">Company</th>
                          <th className="">Job Title</th>
                          <th className="">Posted By</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.length > 0 ? (
                          <>
                            {jobs.map((job, index) => (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td className="">
                                  <b>{job.company}</b>
                                </td>
                                <td className="">
                                  <b>{job.job_title}</b>
                                </td>
                                <td className="">
                                  <b>{job.name}</b>
                                </td>
                                <td className="text-center justify-content-center border-0 d-flex gap-1">
                                  <button
                                    className="btn btn-sm btn-outline-primary view_career"
                                    type="button"
                                    onClick={() => openModal(job)}
                                  >
                                    View
                                  </button>
                                  <Link
                                    to="/dashboard/jobs/manage"
                                    state={{ action: "edit", data: job }}
                                    className="btn btn-sm btn-outline-primary edit_career"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-outline-danger delete_career"
                                    type="button"
                                    onClick={() => handleDelete(job.id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            <tr>
                              <td colSpan={6} className="text-center">
                                No Job Available
                              </td>
                            </tr>
                          </>
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
      {isModalOpen && selectedJob && (
        <PMReport job={selectedJob} closeModal={closeModal} />
      )}
    </>
  );
};

export default PMlist;
