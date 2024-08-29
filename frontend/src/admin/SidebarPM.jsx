import React from "react";
import {
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaImage,
  FaBriefcase,
} from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { IoSettingsSharp, IoCalendar } from "react-icons/io5";
import { RiSuitcaseFill } from "react-icons/ri";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { MdForum } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const SidebarPM = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "navactive" : "";
  };

  return (
    <aside id="sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard")}`}
            to="/dashboard"
          >
            <FaHome />
            <span className="ms-1">PM</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/assigned")}`}
            to="/dashboard/assigned"
          >
            <FaImage />
            <span className="ms-1">Projects Assigned</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/courses")}`}
            to={"/dashboard/courses"}
          >
            <ImBooks />
            <span className="ms-1">Courses</span>
          </Link>
        </li>
        <hr />
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/alumnilist")}`}
            to={"/dashboard/alumnilist"}
          >
            <FaUserGraduate />
            <span className="ms-1">Alumni List</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/donations")}`}
            to={"/dashboard/donations"}
          >
            <RiMoneyDollarBoxFill />
            <span className="ms-1">Donations</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/reports")}`}
            to={"/dashboard/reports"}
          >
            <IoCalendar />
            <span className="ms-1">Report</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/forum")}`}
            to={"/dashboard/forum"}
          >
            <MdForum />
            <span className="ms-1">Forum</span>
          </Link>
        </li>
        <hr />
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/users")}`}
            to={"/dashboard/users"}
          >
            <FaUsers />
            <span className="ms-1">Users</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarPM;
