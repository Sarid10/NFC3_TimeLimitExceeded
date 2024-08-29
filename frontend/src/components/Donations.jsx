import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaBuilding, FaMapMarker, FaPlus, FaSearch, FaRupeeSign } from 'react-icons/fa';
import ViewDonations from '../admin/view/ViewDonations';
import ManageJobs from '../admin/save/ManageJobs';
import { useAuth } from '../AuthContext';
import ManageDonations from '../admin/save/ManageDonations';


const Donations = () => {
    const { isLoggedIn, isAdmin } = useAuth();
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [donate, setDonate] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [handleAdd, setHandleAdd] = useState(false);

    const openModal = (job) => {
        setSelectedDonation(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDonation(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get("http://localhost:3000/auth/donations")
            .then((res) => {
                console.log(res.data);
                setDonate(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [handleAdd]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        const filteredDonations = donate.filter(don =>
            don.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            don.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDonations(filteredDonations);
    }, [searchQuery, donate]);


    return (
        <>
            <header className="masthead">
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white">Donations</h3>
                            <hr className="divider my-4" />
                            
                        </div>
                    </div>
                </div>
            </header>
            {handleAdd ?
                (<>
                    <div className="container mt-5  pt-2">
                        <div className="col-lg-12">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <ManageDonations setHandleAdd={setHandleAdd} />
                                    </div></div></div></div></div>
                </>) : (<>
                    <div className="container mt-3 pt-2">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="filter-field"><FaSearch /></span>
                                            </div>
                                            <input value={searchQuery} onChange={handleSearchInputChange} type="text" className="form-control" placeholder="Filter" id="filter" aria-label="Filter" aria-describedby="filter-field" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary btn-block btn-sm" id="search">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {filteredDonations.length > 0 ? <>
                            {filteredDonations.map((j, index) => (
                                <div className="card job-list" key={index}>
                                    <div className="card-body">
                                        <div className="row  align-items-center justify-content-center text-center h-100">
                                            <div className="">
                                                <div>
                                                    <span className="filter-txt h4 mr-5"><strong><b><FaBuilding /> {j.title}</b></strong></span>
                                                    <span className="filter-txt h4"><strong><b><FaRupeeSign />{j.amount_collected} / {j.total_amount}</b></strong></span>
                                                </div>
                                                <hr />
                                                <p dangerouslySetInnerHTML={{ __html: j.description }} style={{ paddingLeft: "15%", paddingRight: "15%" }} className="truncate filter-txt h5" ></p>
                                                <br />
                                                <hr className="divider" style={{ maxWidth: "calc(80%)" }} />
                                                <div className='jobbtn d-flex justify-content-between align-items-center '>
                                                    <span className="badge badge-info">
                                                        <b><i>Posted by: {j.name}</i></b>
                                                    </span>
                                                    <button className="btn btn-sm  btn-primary " onClick={() => openModal(j)}>Read More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>))}</> : <>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <p >{searchQuery}</p>
                                <h4 className='text-info-emphasis'>No Donations Available</h4>
                            </div>
                        </>}
                        <br />
                    </div>
                </>)}
            {isModalOpen && (
                selectedDonation && <ViewDonations donation={selectedDonation} closeModal={closeModal} />
            )}
        </>
    )
}

export default Donations