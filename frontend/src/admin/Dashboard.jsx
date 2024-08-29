import React, { useEffect, useState } from "react";
import Sidebar from "./SidebarAdmin";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import SidebarIM from "./SidebarIM";
import SidebarPM from "./SidebarPM";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdmin, isPM, isIM } = useAuth();
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      {isAdmin && (
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      {isIM && <SidebarIM isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      {isPM && <SidebarPM isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <main id="main" className={`main ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Outlet />
      </main>
    </>
  );
};

export default Dashboard;
