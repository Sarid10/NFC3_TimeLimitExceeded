import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown, FaCog, FaPowerOff, FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/uploads/logo.png";
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";
import axios from "axios";
import { Fade as Hamburger } from "hamburger-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout, isLoggedIn, isAdmin, isIM, isPM, isDonor, isVolunteer } =
    useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState();
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "headnavactive" : "";
  };

  useEffect(() => {
    const user_name = localStorage.getItem("user_name");
    setName(user_name);
  }, [location.state]);

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/auth/logout")
      .then((res) => {
        navigate("/", { state: { action: "homelogout" } });
        localStorage.clear();
        logout();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${theme} fixed-top`}
        id="mainNav"
      >
        <div className="container">
          <Link className="navbar-brand js-scroll-trigger" to="/">
            <img src={logo} className="" style={{ width: 50 }} />
          </Link>
          <button className="navbar-toggler navbar-light" type="button">
            <Hamburger
              hideOutline={false}
              rounded
              color="#FFFFFF"
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
            />
          </button>
          <div
            ref={navRef}
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarResponsive"
          >
            <ul className="navbar-nav ml-auto my-2 my-lg-0">
              <li className="nav-item">
                <Link
                  onClick={toggleMenu}
                  className={`nav-link js-scroll-trigger ${isActive("/")}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={toggleMenu}
                  className={`nav-link js-scroll-trigger ${isActive(
                    "/alumni"
                  )}`}
                  to="/alumni"
                >
                  Alumni
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={toggleMenu}
                  className={`nav-link js-scroll-trigger ${isActive(
                    "/gallery"
                  )}`}
                  to="/gallery"
                >
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={toggleMenu}
                  className={`nav-link js-scroll-trigger ${isActive("/jobs")}`}
                  to="/jobs"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={toggleMenu}
                  className={`nav-link js-scroll-trigger ${isActive(
                    "/donate"
                  )}`}
                  to="/donate"
                >
                  Donate
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={toggleMenu}
                  className={`nav-link js-scroll-trigger ${isActive(
                    "/forums"
                  )}`}
                  to="/forums"
                >
                  Forums
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={toggleMenu}
                  className={`nav-link js-scroll-trigger ${isActive("/about")}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              {isLoggedIn ? (
                <></>
              ) : (
                <li className="nav-item">
                  <Link
                    onClick={toggleMenu}
                    className={`nav-link js-scroll-trigger ${isActive(
                      "/login"
                    )}`}
                    to="/login"
                    id="login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {isLoggedIn ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link "
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {name}
                    <FaAngleDown />
                  </Link>
                  <ul className="dropdown-menu ">
                    {(isAdmin || isIM || isPM) && (
                      <li>
                        <Link
                          onClick={toggleMenu}
                          className="dropdown-item "
                          to="dashboard"
                        >
                          <MdDashboard /> Dashboard
                        </Link>
                      </li>
                    )}
                    {isDonor && isVolunteer && (
                      <li>
                        <Link
                          onClick={toggleMenu}
                          className="dropdown-item"
                          to="account"
                        >
                          <FaCog /> Manage Account
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FaPowerOff /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
