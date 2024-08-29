import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiBook, FiUsers, FiClipboard, FiTool } from "react-icons/fi";
import { FaCalendar } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";
import carousel1 from "../assets/img/ngo_1.jpg";
import carousel2 from "../assets/img/ngo_2.jpg";
import carousel3 from "../assets/img/ngo_3.jpg";
import tata from "../assets/img/tata.jpeg";
import jpmc from "../assets/img/jpmc.jpg";
import hdfc from "../assets/img/hdfc_bank.jpg";
import reliance from "../assets/img/reliance.jpeg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./home.css";

const Home = () => {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const user_name = localStorage.getItem("user_name");
      if (location.state && location.state.action === "homelogin") {
        toast.success(`Welcome ${user_name}`);
      }
    }
    if (location.state && location.state.action === "homelogout") {
      toast.info("Logout Success");
    }
  }, [location.state, isLoggedIn]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/up_events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (timestamp) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div>
      <ToastContainer
        hideProgressBar
        position="top-center"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />

      {/* Carousel Section */}
      <section className="carousel-section">
        <Slider {...sliderSettings}>
          <div>
            <img src={carousel1} alt="Event 1" />
          </div>
          <div>
            <img src={carousel2} alt="Event 2" />
          </div>
          <div>
            <img src={carousel3} alt="Event 3" />
          </div>
        </Slider>
      </section>

      <section className={`page-section bg-${theme}`} id="donors">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">TOP Donors</h2>
            <h3 className="card-title text-muted">
              We are grateful to our esteemed donors for their generous support.
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card">
                <div className="card-body text-center">
                  <img src={tata} alt="Tata" className="img-fluid mb-3" />
                </div>
                <b>Amount Donated</b>
                <p
                  className="card-text"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginTop: "0px",
                    display: "block",
                  }}
                >
                  ₹63 Lakhs
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card">
                <div className="card-body text-center">
                  <img src={hdfc} alt="HDFC" className="img-fluid mb-3" />
                </div>
                <b>Amount Donated</b>
                <p
                  className="card-text"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginTop: "0px",
                    display: "block",
                  }}
                >
                  ₹51 Lakhs
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card">
                <div className="card-body text-center">
                  <img src={jpmc} alt="JP Morgan" className="img-fluid mb-3" />
                </div>
                <b>Amount Donated</b>
                <p
                  className="card-text"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginTop: "0px",
                    display: "block",
                  }}
                >
                  ₹42 Lakhs
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card">
                <div className="card-body text-center">
                  <img
                    src={reliance}
                    alt="Reliance"
                    className="img-fluid mb-3"
                  />
                </div>
                <b>Amount Donated</b>
                <p
                  className="card-text"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginTop: "0px",
                    display: "block",
                  }}
                >
                  ₹30 Lakhs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-4 bg-${theme}`} id="upcoming-events">
            <div className="container">
                <h2 className="section-heading text-center">Upcoming Drives</h2>
                <hr className="divider my-4" />

                {events.length > 0 ? (
                    events.map((e, index) => (
                        <div className="card mb-3 mx-auto" style={{ maxWidth: "720px" }} key={index}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src="https://th.bing.com/th/id/R.644b5c8d9ba326376fb49138018483b9?rik=NUZlrAmatX8Rkw&riu=http%3a%2f%2fswitchindia.org%2fimages%2fwork%2ffree-health-check-up-camp-at-airoli04.jpg&ehk=492SNHx4zpUYB5teNFH2SI6NRebl1dhmnLQ8ev%2bLp6s%3d&risl=&pid=ImgRaw&r=0"
                                        className="img-fluid rounded-start"
                                        alt={e.title}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{e.title}</h5>
                                        <p className="card-text truncate" dangerouslySetInnerHTML={{ __html: e.content }}></p>
                                        <div><small><p><b><FaCalendar className='me-1 ' />{formatDate(e.schedule)}</b></p></small></div>
                                        <button
                                            className="btn btn-primary float-right read_more"
                                            onClick={() => navigate("events/view", { state: { action: "view", data: e } })}
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h4 className='text-info-emphasis'>No Upcoming Drives Available</h4>
                    </div>
                )}
            </div>
        </section>

      

      {/* <section className={`py-4 bg-${theme}`} id="upcoming-events">
        <div className="container">
          <h2 className="section-heading text-center">Upcoming Drives</h2>
          <hr className="divider my-4" />

          <div className="card mb-3 mx-auto" style={{ maxWidth: "720px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://th.bing.com/th/id/R.644b5c8d9ba326376fb49138018483b9?rik=NUZlrAmatX8Rkw&riu=http%3a%2f%2fswitchindia.org%2fimages%2fwork%2ffree-health-check-up-camp-at-airoli04.jpg&ehk=492SNHx4zpUYB5teNFH2SI6NRebl1dhmnLQ8ev%2bLp6s%3d&risl=&pid=ImgRaw&r=0"
                  className="img-fluid rounded-start"
                  alt="Community Health Check-up"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-text">
                    Join us for a comprehensive health check-up camp aimed at
                    providing essential health services to underserved
                    communities. Your support can help provide medical supplies
                    and professional care to those in need.
                  </p>
                  <div><small><p><b><FaCalendar className='me-1 ' />{formatDate(e.schedule)}</b></p></small></div>
                  <p className="card-text">
                    <small className="text-muted">
                      Date: October 15, 2024 | Location: Airoli
                    </small>
                  </p>
                  <button
                     className="btn btn-primary float-right read_more" onClick={() => navigate("events/view", { state: { action: "view", data: e } })}>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3 mx-auto" style={{ maxWidth: "720px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://th.bing.com/th/id/OIP.BskWENM8jKpD-Qb8usfp4wHaE8?rs=1&pid=ImgDetMain"
                  className="img-fluid rounded-start"
                  alt="Beach Cleaning"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Beach Cleaning</h5>
                  <p className="card-text">
                    Participate in our beach cleaning drive to help maintain and
                    beautify our coastal areas. Volunteers will work together to
                    collect trash and debris from the beach, promoting
                    environmental sustainability and community involvement.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Date: October 25, 2024 | Location: Marine Drive
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  */}
    </div>
  );
};

export default Home;
