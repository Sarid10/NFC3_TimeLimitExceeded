import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Careers from "./components/Careers";
import Forum from "./components/Forum";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyAccount from "./components/MyAccount";
import Dashboard from "./admin/Dashboard";
import DonationDetail from "./admin/DonationDetail";
import AdminHome from "./admin/AdminHome";
import AdminCourses from "./admin/AdminCourses";
import AdminUsers from "./admin/AdminUsers";
import AdminGallery from "./admin/AdminGallery";
import AdminSettings from "./admin/AdminSettings";
import AdminEvents from "./admin/AdminEvents";
import AdminForum from "./admin/AdminForum";
import AdminAlumni from "./admin/AdminAlumni";
import AdminJobs from "./admin/AdminJobs";
import AdminDonations from "./admin/AdminDonations";
import ManageJobs from "./admin/save/ManageJobs";
import View_Event from "./components/view/View_Event";
import ManageEvents from "./admin/save/ManageEvents";
import View_Forum from "./components/view/View_Forum";
import ManageForum from "./admin/save/ManageForum";
import ManageUser from "./admin/save/ManageUser";
import ViewAlumni from "./admin/view/ViewAlumni";
import { AuthProvider, useAuth } from "./AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Manage_Career from "./components/manage/Manage_Career";
import "react-quill/dist/quill.snow.css";
import { ThemeProvider } from "./ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import ManageDonations from "./admin/save/ManageDonations";
import Donations from "./components/Donations";
import AdminProjects from "./admin/AdminProjects";
import PMAssigned from "./PM/PMAssigned";
import ViewProject from "./PM/ViewProject";
import SmallDonatePage from "./components/SmallDonate";
import OrganizationForm from "./components/OrganizationForm";
import PMReport from "./PM/PMReport";
import PMlist from "./PM/PMList";
import AddItem from "./IM/AddItem";
import Inventory from "./IM/Inventory";
import Requests from "./IM/Requests";
import ReportTemplate from "../src/admin/report/ReportTemplate";
import ReportRecieved from "./admin/ReportRecieved";
import Notify from "./admin/Notify";
import SendFunds from "./admin/SendFunds";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function AppRouter() {
  const { isLoggedIn, isAdmin, isIM, isPM } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Header />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/smalldonate" element={<SmallDonatePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/orgform" element={<OrganizationForm />} />
        <Route path="/jobs" element={<Careers />} />
        <Route path="/donate" element={<Donations />} />
        <Route path="/forums" element={<Forum />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isLoggedIn && (isAdmin || isIM || isPM) && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<AdminHome />} />
            <Route path="/dashboard/courses" element={<AdminCourses />} />

            <Route path="/dashboard/assigned" element={<PMAssigned />} />
            <Route path="/dashboard/projects" element={<AdminProjects />} />
            <Route path="/dashboard/users" element={<AdminUsers />} />
            <Route path="/dashboard/gallery" element={<AdminGallery />} />
            <Route path="/dashboard/settings" element={<AdminSettings />} />
            <Route path="/dashboard/receipt" element={<ReportRecieved />} />
            <Route path="/dashboard/reports" element={<AdminEvents />} />
            <Route path="/dashboard/send" element={<SendFunds />} />
            <Route path="/dashboard/forum" element={<AdminForum />} />
            <Route path="/dashboard/alumnilist" element={<AdminAlumni />} />
            <Route path="/dashboard/jobs" element={<AdminJobs />} />
            <Route path="/dashboard/add" element={<AddItem />} />
            <Route path="/dashboard/inventory" element={<Inventory />} />
            {/* <Route path="/dashboard/reports" element={<PMlist />} /> */}
            <Route path="/dashboard/donations" element={<AdminDonations />} />
            <Route path="/dashboard/requests" element={<Requests />} />
            <Route
              path="/dashboard/donations/:id"
              element={<DonationDetail />}
            />
            <Route path="/dashboard/jobs/manage" element={<ManageJobs />} />
            <Route path="/dashboard/reports/manage " element={<PMReport />} />
            <Route
              path="/dashboard/reports/sample"
              element={<ReportTemplate />}
            />
            <Route
              path="/dashboard/donations/manage"
              element={<ManageDonations />}
            />
            <Route
              path="/dashboard/reports/manage"
              element={<ManageEvents />}
            />
            <Route path="/dashboard/forum/manage" element={<ManageForum />} />
            <Route path="/dashboard/notifications" element={<Notify />} />
            <Route path="/dashboard/users/manage" element={<ManageUser />} />
            <Route path="/dashboard/alumni/view" element={<ViewAlumni />} />
            <Route path="/dashboard/projects/:id" element={<ViewProject />} />
          </Route>
        )}
        <Route path="events/view" element={<View_Event />} />
        {isLoggedIn && <Route path="account" element={<MyAccount />} />}
        <Route path="forum/view" element={<View_Forum />} />
        <Route path="jobs/add" element={<ManageJobs />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;
