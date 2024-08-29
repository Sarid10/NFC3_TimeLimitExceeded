import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ViewDonations from "./view/ViewDonations";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (donation) => {
    console.log(donation);
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDonation(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/donations")
      .then((res) => {
        console.log(res.data);
        setDonations(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/auth/donations/${id}`
      );
      toast.warning(response.data.message);
      setDonations(donations.filter((donation) => donation.id !== id));
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
                  <b>Donations List</b>
                  <span className="">
                    <Link
                      to="/dashboard/donations/manage"
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
                          <th className="">Title</th>
                          <th className="">Required Amount</th>
                          <th className="">Amount Collected</th>
                          <th className="">Posted By</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donations.length > 0 ? (
                          <>
                            {donations.map((donation, index) => (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td className="">
                                  <b>
                                    <Link
                                      to={`/dashboard/donations/${donation.id}`}
                                    >
                                      {donation.title}
                                    </Link>
                                  </b>
                                </td>
                                <td className="">
                                  <b>{donation.total_amount}</b>
                                </td>
                                <td className="">
                                  <b>{donation.amount_collected}</b>
                                </td>
                                <td className="">
                                  <b>{donation.name}</b>
                                </td>
                                <td className="text-center justify-content-center border-0 d-flex gap-1">
                                  <button
                                    className="btn btn-sm btn-outline-primary view_career"
                                    type="button"
                                    onClick={() => openModal(donation)}
                                  >
                                    View
                                  </button>
                                  <Link
                                    to="/dashboard/donations/manage"
                                    state={{ action: "edit", data: donation }}
                                    className="btn btn-sm btn-outline-primary edit_career"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-outline-danger delete_career"
                                    type="button"
                                    onClick={() => handleDelete(donation.id)}
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
                                No Donations Available
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
      {isModalOpen && selectedDonation && (
        <ViewDonations donation={selectedDonation} closeModal={closeModal} />
      )}
    </>
  );
};

export default AdminDonations;
