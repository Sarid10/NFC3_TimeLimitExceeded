import React, { useState, useEffect } from "react";
import { FaUsers, FaBriefcase, FaRupeeSign } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { MdForum } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const InfoCard = ({ title, count, Icon, className }) => (
  <div className="col-xxl-4 col-xl-6">
    <div className={`card info-card ${className}`}>
      <div className="card-body">
        <h5
          className="card-title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h5>
        <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <Icon />
          </div>
          <div className="ps-3">
            <h6>{count}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminHome = () => {
  const [counts, setCounts] = useState({
    alumni: 0,
    forums: 0,
    jobs: 0,
    upevents: 0,
    events: 0,
    donate: 0,
    course: 0
  });

  // Dummy Data for Charts
  const donationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Donations',
        data: [5000, 7000, 8000, 6000, 9000, 7500],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const volunteersData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Volunteer Status',
        data: [60, 40],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }
    ]
  };

  const initiativesData = {
    labels: ['Ongoing', 'Completed'],
    datasets: [
      {
        label: 'Initiatives Status',
        data: [30, 70],
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1
      }
    ]
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/counts")
      .then((res) => {
        console.log(res.data);
        setCounts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <section className="section dashboard cutommargin p-3">
        <div className="row">
          <div className="col-lg-10 m-2">
            <div className="row">
              <InfoCard
                title={`Donors <span>| Total</span>`}
                count={counts.alumni}
                Icon={FaUsers}
                className="customers-card"
              />
              {/* <InfoCard
                title="Forum Topics <span>| Total</span>"
                count={counts.forums}
                Icon={MdForum}
                className="sales-card"
              /> */}
              <InfoCard
                title="Posted Jobs <span>| Now</span>"
                count={counts.jobs}
                Icon={FaBriefcase}
                className="revenue-card"
              />
              <InfoCard
                title="Upcoming Events <span>| Total</span>"
                count={counts.upevents}
                Icon={IoCalendar}
                className="purple-card"
              />
              <InfoCard
                title="Amount Donated <span>| Total</span>"
                count={counts.donate}
                Icon={FaRupeeSign}
                className="purple-card"
              />
              {/* <InfoCard
                title="Courses <span>| Total</span>"
                count={counts.course}
                Icon={IoBookSharp}
                className="customers-card"
              /> */}
            </div>
            <div className="row mt-4">
              <div className="col-lg-6">
                <div className="card p-3">
                  <h5>Donation Trends</h5>
                  <Line data={donationData} />
                </div>
              </div>
              {/* <div className="col-lg-4">
                <div className="card p-3">
                  <h5>Volunteer Status</h5>
                  <Pie data={volunteersData} />
                </div>
              </div> */}
              {/* <div className="col-lg-4">
                <div className="card p-3">
                  <h5>Initiatives Status</h5>
                  <Bar data={initiativesData} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminHome;
