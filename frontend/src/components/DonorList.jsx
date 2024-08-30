import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import defaultavatar from "../assets/uploads/defaultavatar.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const DonorList = () => {
    const [donorList, setDonorList] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3000/auth/unique_donors_list")
            .then((res) => {
                setDonorList(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (donorList.length > 0) {
            const filteredList = donorList.filter(donor =>
                donor.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredDonors(filteredList);
        }
    }, [searchQuery, donorList]);

    return (
        <>
            <header className="masthead">
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white" style={{fontWeight:"bold", fontSize:"2.5rem"}}>Our Donors, Our Heroes</h3>
                            <p className="text-white" style={{fontWeight:"bold", fontSize:"1.2rem", fontStyle:"italic"}}>
                                "Together, we make a lasting impact. Thank you for your generosity and commitment to our community!"
                            </p>
                            <hr className="divider my-4" />
                        </div>
                    </div>
                </div>
            </header>
            {donorList.length > 0 && (
                <div className="container mt-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="filter-field">
                                                <FaSearch />
                                            </span>
                                        </div>
                                        <input
                                            value={searchQuery} onChange={handleSearchInputChange}
                                            type="text"
                                            className="form-control"
                                            id="filter"
                                            placeholder="Search by name"
                                            aria-label="Filter"
                                            aria-describedby="filter-field"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-primary btn-block" id="search">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="container mt-4">
                {filteredDonors.length > 0 ? (
                    <div className="table-responsive" style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <table className="table table-striped table-light">
                            <thead>
                                <tr>
                                    <th scope="col">Donor Name</th>
                                    <th scope="col">Amount Donated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDonors.map((donor, index) => (
                                    <tr key={index}>
                                        <td>{donor.name}</td>
                                        <td>₹{donor.total_amount_donated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h4 className="text-info-emphasis">No Donors Found</h4>
                        <p className="text-muted">Try adjusting your search to find donors.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default DonorList;
