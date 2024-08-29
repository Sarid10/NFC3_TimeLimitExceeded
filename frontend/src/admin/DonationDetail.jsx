import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const DonationDetail = () => {
  const [donors, setDonors] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .post("http://localhost:3000/auth/donordetails", { id })
      .then((res) => {
        setDonors(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <ToastContainer position="top-center" />

      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="row mb-4 mt-4">
            <div className="col-md-12"></div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-8  ">
              <div className="card">
                <div className="card-header">
                  <b>List of Donors ({donors.length})</b>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-sm table-condensed table-bordered table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">Id</th>
                          <th className="">Name</th>
                          <th className="">Email</th>
                          <th className="">Total Amount Donated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donors.length > 0 ? (
                          <>
                            {donors.map((a, index) => (
                              <tr key={index}>
                                <td className="">
                                  <p>
                                    {" "}
                                    <b>{a.alumnus_id}</b>
                                  </p>
                                </td>
                                <td className="">
                                  <p>
                                    {" "}
                                    <b>{a.name}</b>
                                  </p>
                                </td>
                                <td className="">
                                  <p>
                                    {" "}
                                    <b>{a.email}</b>
                                  </p>
                                </td>
                                <td className="">
                                  <p>
                                    {" "}
                                    <b>{a.total_donation_amount}</b>
                                  </p>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            <tr>
                              <td colSpan={6} className="text-center">
                                No Alumni Available
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
    </>
  );
};

export default DonationDetail;
