import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiBook, FiUsers, FiClipboard, FiTool } from "react-icons/fi";
import { FaCalendar } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";

// Slick imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// CSS import
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

  // Slick Slider settings
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
            <img
              src="https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/03/06/Pictures/september-ludhiana-phullanwal-october-government-students-ludhiana_48ec1af8-0254-11e7-a2a9-8cc6a4d5973b.jpg"
              alt="Event 1"
            />
          </div>
          <div>
            <img
              src="https://bloc-i.thgim.com/public/b-school-corner/article28189365.ece/alternates/LANDSCAPE_1200/SPJIMR-students-with-residents-of-a-village-in-Warangal"
              alt="Event 2"
            />
          </div>
          <div>
            <img
              src="https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/08/09/Pictures/women-village-budhpura-bundi-groups-district-meeting_128cd040-da39-11ea-a162-aa5ffaaa8aa4.jpg"
              alt="Event 3"
            />
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
                  <img
                    src="https://th.bing.com/th/id/R.249b81fe1da83fd6f5235e8b02037b66?rik=XCOG1zu4e5z6WA&riu=http%3a%2f%2fwww.indiantelevision.com%2fsites%2fdefault%2ffiles%2fstyles%2fsmartcrop_800x800%2fpublic%2fimages%2ftv-images%2f2019%2f08%2f14%2ftata.jpg%3fitok%3d9kh62vPd&ehk=5P9%2fk6HRz6LutFvmXUvi33KEYZmHq%2fVkVUYE2TDHc3o%3d&risl=&pid=ImgRaw&r=0"
                    alt="Tata"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card">
                <div className="card-body text-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/020/336/362/original/hdfc-logo-hdfc-icon-free-free-vector.jpg"
                    alt="HDFC"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card">
                <div className="card-body text-center">
                  <img
                    src="https://v6r2p5t5.rocketcdn.me/wp-content/uploads/2024/02/JPM_logo_2008_PRINT_B_Black-wp.jpg"
                    alt="JP Morgan"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card">
                <div className="card-body text-center">
                  <img
                    src="https://th.bing.com/th/id/R.9ccef8eba80d2ae4316b19f6c2c58ed7?rik=Fv64mJ%2bveUY8Cg&riu=http%3a%2f%2fwww.topnews.in%2ffiles%2fReliance-Communications_6.jpg&ehk=iRmsKbYZbOA2iWHrFlFaZgaqM3hECgMjVkT5QtfihYs%3d&risl=&pid=ImgRaw&r=0"
                    alt="Reliance"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      
      <section className={`py-4 bg-${theme}`} id="upcoming-events">
        <div className="container">
          <h2 className="section-heading text-center">Upcoming Drives</h2>
          <hr className="divider my-4" />

          {/* Community Health Check-up */}
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
                  <h5 className="card-title">Community Health Check-up</h5>
                  <p className="card-text">
                    Join us for a comprehensive health check-up camp aimed at
                    providing essential health services to underserved
                    communities. Your support can help provide medical supplies
                    and professional care to those in need.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Date: October 15, 2024 | Location: Airoli
                    </small>
                  </p>
                  {/* <button
                    className="btn btn-primary float-end read_more"
                    // onClick={() => navigate("events/view", { state: { action: "view", data: e } })}
                  >
                    Read More
                  </button> */}
                </div>
              </div>
            </div>
          </div>


          {/* Beach Cleaning */}
          <div className="card mb-3 mx-auto" style={{ maxWidth: "720px"}}>
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
      </section>
    </div>
  );
};

export default Home;
