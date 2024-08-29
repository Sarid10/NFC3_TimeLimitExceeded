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

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
            <span className="ms-1">Home</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/gallery")}`}
            to="/dashboard/gallery"
          >
            <FaImage />
            <span className="ms-1">Gallery</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/receipt")}`}
            to="/dashboard/receipt"
          >
            <FaImage />
            <span className="ms-1">Reports</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/projects")}`}
            to={"/dashboard/projects"}
          >
            <ImBooks />
            <span className="ms-1">Projects</span>
          </Link>
        </li>
        <hr />
        {/* <li onClick={toggleSidebar} className="nav-item">
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
            className={`nav-link ${isActive("/dashboard/jobs")}`}
            to={"/dashboard/jobs"}
          >
            <RiSuitcaseFill />
            <span className="ms-1">Jobs</span>
          </Link>
        </li> */}
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
            className={`nav-link ${isActive("/dashboard/inventory")}`}
            to="/dashboard/inventory"
          >
            <FaImage />
            <span className="ms-1">Inventory</span>
          </Link>
        </li>
        <li onClick={toggleSidebar} className="nav-item">
          <Link
            className={`nav-link ${isActive("/dashboard/events")}`}
            to={"/dashboard/events"}
          >
            <IoCalendar />
            <span className="ms-1">Events</span>
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

export default Sidebar;
