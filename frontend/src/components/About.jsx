import axios from 'axios'
import React, { useEffect, useState } from 'react'
import logo from '../assets/uploads/logo.png'

const About = () => {
  const [system, setSystem] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/settings')
      .then((res) => {
        setSystem(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <header className="masthead">
        <div className="container">
          <div className="row mt-5 h-100 align-items-center justify-content-center text-center">
            <div
              className="col-lg-10 align-self-end mb-4"
              style={{
                background: '#0000002e',
                borderRadius: '10px',
                padding: '20px',
              }}
            >
              <h2 className="text-uppercase text-white font-weight-bold">
                About Us
              </h2>
              <hr className="divider my-4" />
              <p className="text-white-75 text-light mb-5">
                Time Limit Exceeded
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="page-section">
        <div className="container">
          <h2 className="text-center">Who We Are</h2>
          <br />
          <p>
            At <strong>Time Limit Exceeded</strong>, we are dedicated to
            empowering Non-Governmental Organizations (NGOs) by providing
            tailored website development services. Our mission is to enhance the
            operational efficiency and transparency of NGOs, allowing them to
            focus on their core activities while we take care of their
            technological needs.
          </p>
          <p>
            We believe that by leveraging the power of the web, NGOs can reach a
            wider audience, streamline their operations, and achieve greater
            impact in their communities. Our team is committed to delivering
            high-quality solutions that reflect the values and goals of the
            organizations we work with.
          </p>
        </div>
      </section>

    </>
  )
}

export default About
