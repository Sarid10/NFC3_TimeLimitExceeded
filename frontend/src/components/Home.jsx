import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FiBook, FiUsers, FiClipboard, FiTool } from 'react-icons/fi'
import { FaCalendar } from 'react-icons/fa'
import { useAuth } from '../AuthContext'
import { useTheme } from '../ThemeContext'
import carousel1 from '../assets/img/ngo_1.jpg'
import carousel2 from '../assets/img/ngo_2.jpg'
import carousel3 from '../assets/img/ngo_3.jpg'
import carousel4 from '../assets/img/ngo_4.jpg'
import tata from '../assets/img/tata.jpeg'
import jpmc from '../assets/img/jpmc.jpg'
import hdfc from '../assets/img/hdfc_bank.jpg'
import reliance from '../assets/img/reliance.jpeg'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './home.css'

const Home = () => {
  const { theme } = useTheme()
  const { isLoggedIn } = useAuth()
  const [events, setEvents] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      const user_name = localStorage.getItem('user_name')
      if (location.state && location.state.action === 'homelogin') {
        toast.success(`Welcome ${user_name}`)
      }
    }
    if (location.state && location.state.action === 'homelogout') {
      toast.info('Logout Success')
    }
  }, [location.state, isLoggedIn])

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/up_events')
      .then((res) => {
        setEvents(res.data)
        console.log(events);
      })
      .catch((err) => console.log(err))
  }, [])

  const formatDate = (timestamp) => {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return new Date(timestamp).toLocaleDateString('en-US', options)
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  }

  console.log(events);
  console.log(events.length);

  return (
    <div>
      <ToastContainer
        hideProgressBar
        position="top-center"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />

      
      <section className="carousel-section" style={{marginTop:"5rem"}}>
        <Slider {...sliderSettings}>
          <div>
            <img src={carousel1} alt="Event 1" />
          </div>
          <div>
            <img src={carousel4} alt="Event 2" />
          </div>
          <div>
            <img src={carousel3} alt="Event 3" />
          </div>
        </Slider>
      </section>

      <section className="tagline-section text-center my-4">
  <h2 className="tagline" style={{ fontSize: '1.5rem', color: '#555' }}>
    "Empowering Communities, One Step at a Time"
  </h2>
  <p style={{ fontSize: '1.2rem', color: '#777' }}>
    Join us in making a difference. Your support helps us bring hope and change to those in need.
  </p>
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
              <div className="card h-100 donor-card" style={{padding:"20px"}}>
                <div className="card-body text-center">
                  <img src={tata} alt="Tata" className="img-fluid mb-3" />
                </div>
                <b>Amount Donated</b>
                <p
                  className="card-text"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginTop: '0px',
                    display: 'block',
                  }}
                >
                  ₹1.5 Lakhs
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card" style={{padding:"20px"}}>
                <div className="card-body text-center">
                  <img src={hdfc} alt="HDFC" className="img-fluid mb-3" />
                </div>
                <b>Amount Donated</b>
                <p
                  className="card-text"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginTop: '0px',
                    display: 'block',
                  }}
                >
                  ₹5 Lakhs
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card" style={{padding:"20px"}}>
                <div className="card-body text-center">
                  <img src={jpmc} alt="JP Morgan" className="img-fluid mb-3"  />
                </div>
                <b>Amount Donated</b>
                <p
                  className="card-text"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginTop: '0px',
                    display: 'block',
                  }}
                >
                  ₹2 Lakhs
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 donor-card" style={{padding:"20px"}}>
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
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginTop: '0px',
                    display: 'block',
                  }}
                >
                  ₹3 Lakhs
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
              <div
                className="card mb-3 mx-auto"
                style={{ maxWidth: '720px' }}
                key={index}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={e.event_url}
                      className="img-fluid rounded-start"
                      alt={e.title}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{e.title}</h5>
                      <p
                        className="card-text truncate"
                        dangerouslySetInnerHTML={{ __html: e.content }}
                      ></p>
                      <div>
                        <small>
                          <p>
                            <b>
                              <FaCalendar className="me-1 " />
                              {formatDate(e.schedule)}
                            </b>
                          </p>
                        </small>
                      </div>
                      <button
                      style={{marginBottom:"20px"}}
                        className="btn btn-primary float-right read_more"
                        onClick={() =>
                          navigate('events/view', {
                            state: { action: 'view', data: e },
                          })
                        }
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
              <h4 className="text-info-emphasis">
                No Upcoming Drives Available
              </h4>
            </div>
          )}
        </div>
      </section>

      <section className={`py-4 bg-${theme}`} id="donation-links">
        <div className="container text-center">
          <h2 className="section-heading">Get Involved</h2>
          <hr className="divider my-4" />

          <div className="row justify-content-center">
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Support with a Small Donation
                  </h5>
                  <p className="card-text">
                    Every little bit helps! Your small contribution can make a
                    big difference in someone's life.
                  </p>
                  <a href="/smalldonate" className="btn btn-primary btn-block">
                    Donate Now
                  </a>
                </div>
              </div>
            </div>

      
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">Request Resources</h5>
                  <p className="card-text">
                    Are you an orphanage, old age home, or similar organization?
                    Request resources from us to help those in need.
                  </p>
                  <a href="/orgform" className="btn btn-primary btn-block">
                    Request Resources
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  )
}

export default Home
