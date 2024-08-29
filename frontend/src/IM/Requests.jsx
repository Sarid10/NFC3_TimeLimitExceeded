import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch all requests
    axios
      .get("http://localhost:3000/auth/getrequests")
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const approveRequest = (id) => {
    // Handle approval logic
    console.log(id);
    axios
      .put(`http://localhost:3000/auth/approverequest/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        // Optional: Update state to reflect approval or remove the approved request
        setRequests(requests.filter((request) => request.id !== id));
      })
      .catch((err) => {
        console.error("Error approving request:", err);
        toast.error("Failed to approve the request");
      });
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="row mb-4 mt-4">
            <div className="col-md-12">
              <h2>All Requests ({requests.length})</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <b>Request List</b>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-condensed table-hover">
                      <colgroup>
                        <col width="5%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="15%" />
                        <col width="15%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Project Manager ID</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.length > 0 ? (
                          requests.map((request, index) => (
                            <tr key={request.id}>
                              <td className="text-center">{index + 1}</td>
                              <td>{request.item}</td>
                              <td>{request.quantity}</td>
                              <td>{request.pmid}</td>

                              <td className="text-center">
                                <button
                                  onClick={() => approveRequest(request.id)}
                                  className="btn btn-sm btn-outline-success"
                                >
                                  Approve
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center">
                              No Requests Available
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

export default Requests;
