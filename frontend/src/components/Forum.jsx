import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaComments, FaEllipsisV, FaPlus, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ManageForum from '../admin/save/ManageForum';



const Forum = () => {
    const { isLoggedIn, isAdmin } = useAuth();
    const [forum, setForum] = useState([]);
    const [filteredForum, setFilteredForum] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [handleAdd, setHandleAdd] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/forums")
            .then((res) => {
                console.log(res.data)
                setForum(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleView = (e) => {
        navigate("/forum/view", { state: { action: "view", data: e } });
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [handleAdd]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        const filteredTopics = forum.filter(topic =>
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredForum(filteredTopics);
    }, [searchQuery, forum]);


    return (
        <>
            <header className="masthead">
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white">Forum List</h3>
                            <hr className="divider my-4" />
                            <div className="row col-md-12 mb-2 justify-content-center">
                                {isLoggedIn ?
                                    <> {handleAdd ? <></> : (<button onClick={() => setHandleAdd(true)} className="btn btn-primary btn-block col-sm-4" type="button" id="new_career"><FaPlus /> Create New Topic</button>)}
                                    </> : <p className='text-white'>Please Login to create new topic.</p>}
                            </div>
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
                                        <ManageForum setHandleAdd={setHandleAdd} />
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
                                            <input value={searchQuery} onChange={handleSearchInputChange} type="text" className="form-control" id="filter" placeholder="Filter" aria-label="Filter" aria-describedby="filter-field" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary btn-block btn-sm" id="search">Search</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {filteredForum.length > 0 ? <>
                            {filteredForum.map((e, index) => (
                                <div className="card Forum-list" key={index}>
                                    <div className="card-body">
                                        <div className="row  align-items-center justify-content-center text-center h-100">
                                            <div className="">
                                                <h3><b className="filter-txt">{e.title}</b></h3>
                                                <hr />
                                                <p className="truncate filter-txt" dangerouslySetInnerHTML={{ __html: e.description }} ></p>

                                                <br />
                                                <hr className="divider" style={{ maxWidth: "calc(80%)" }} />
                                                <div className='forumbtn d-flex justify-content-between align-items-center'>
                                                    <div className=''>
                                                        <span className="badge badge-info me-1   px-3 ">
                                                            <b><i>Created by: <span className="filter-txt">{e.created_by}</span></i></b>
                                                        </span>
                                                        <span className="badge badge-secondary px-3">
                                                            <b><FaComments /> <i> {e.comments_count}</i></b>
                                                        </span>
                                                    </div>

                                                    <button className="btn btn-primary btn-sm " onClick={() => handleView(e)}>View Topic</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>))}</> : <>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <p >{searchQuery}</p>
                                <h4 className='text-info-emphasis'>No Topic Available</h4>
                            </div>
                        </>}
                        <br />
                    </div></>)}
        </>
    )
}

export default Forum
