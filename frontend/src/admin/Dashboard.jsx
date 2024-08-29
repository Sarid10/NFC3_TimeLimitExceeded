import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main id="main" className={`main ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <Outlet />
            </main>
        </>
    )
}

export default Dashboard