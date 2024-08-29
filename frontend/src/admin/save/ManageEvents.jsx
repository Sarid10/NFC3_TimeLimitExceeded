
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactQuill from 'react-quill';

const ManageEvents = () => {
    const [eventData, setEventData] = useState({
        id: '',
        title: "",
        schedule: "",
        content: "",

    });
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state && location.state.status === "edit") {
            const { id, title, schedule, content } = location.state.data;
            const formattedSchedule = schedule.replace('Z', '');
            setEventData(prevState => ({
                ...prevState,
                id,
                title,
                schedule: formattedSchedule,
                content
            }));
        }
    }, [location.state]);

    const handleChange = (content) => {
        setEventData(prevState => ({
            ...prevState,
            content
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(eventData);
        try {
            if (eventData.id != "") {
                await axios.put('http://localhost:3000/auth/events', eventData)
                    .then((res) => toast.success(res.data.message))
            } else {
                await axios.post('http://localhost:3000/auth/events', eventData)
                    .then((res) => toast.success(res.data.message))
            }
            setEventData({
                id: '',
                title: "",
                schedule: "",
                content: "",
            })
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    }


    const handleBack = () => {
        if (location.pathname.startsWith("/dashboard")) {
            navigate("/dashboard/events");
        }
    };


    return (
        <>
            <div className="container-fluid">
                <ToastContainer />
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form action="" id="manage-event">
                                <input type="hidden" name="id" value="id" />
                                <div className="form-group row">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="control-label">Event</label>
                                        <input type="text" className="form-control" name="title" value={eventData.title} required onChange={(e) => setEventData({ ...eventData, title: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="control-label">Schedule</label>
                                        <input type='datetime-local' className="form-control datetimepicker" name="schedule" value={eventData.schedule} required autoComplete="off" onChange={(e) => setEventData({ ...eventData, schedule: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-10">
                                        <label htmlFor="" className="control-label">Description</label>
                                        <ReactQuill
                                            value={eventData.content}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <button className="btn btn-primary mr-2" type='submit' onClick={handleSubmit}> Save</button>
                                    <button className="btn btn-danger " onClick={handleBack}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageEvents