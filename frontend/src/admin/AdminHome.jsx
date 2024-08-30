import React, { useState, useEffect } from "react";
import { FaUsers, FaBriefcase, FaRupeeSign } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import axios from "axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
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
    staff: 0,
    volunteers: 0,
    projects: 0,
    funding: 0,
    donations: [],
    projectBudgets: [],
    volunteersCount:0,
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

  const budgetDistributionData = {
    labels: ['Project A', 'Project B', 'Project C'],
    datasets: [
      {
        label: 'Budget Distribution',
        data: [30000, 20000, 10000],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
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
   console.log("countss", counts);
  return (
    <>
      <section className="section dashboard cutommargin p-3">
        <div className="row">
          <div className="col-lg-10 m-2">
            <div className="row">
              <InfoCard
                title={`Project Manager <span>| Total</span>`}
                count={counts.projectManager}
                Icon={FaUsers}
                className="customers-card"
              />
              <InfoCard
                title={`Volunteers <span>| Total</span>`}
                count={counts.volunteer}
                Icon={FaUsers}
                className="customers-card"
              />
              <InfoCard
                title="Projects/Events <span>| Total</span>"
                count={counts.events}
                Icon={IoCalendar}
                className="revenue-card"
              />
              <InfoCard
                title="Total Funding <span>| Received</span>"
                count={counts.donate}
                Icon={FaRupeeSign}
                className="purple-card"
              />
            </div>
            <div className="row mt-4 justify-content-center">
           <div className="col-lg-8 d-flex justify-content-center">
           <div className="card p-3" style={{ width: "100%" }}>
           <h5>Donation Trends</h5>
          <Line data={donationData} />
         </div>
         </div>
         </div>

              {/* <div className="col-lg-6">
                <div className="card p-3">
                  <h5>Project-wise Budget Distribution</h5>
                  <Doughnut data={budgetDistributionData} />
                </div>
              </div> */}
            </div>
          </div>
   
      </section>
    </>
  );
};

export default AdminHome;
