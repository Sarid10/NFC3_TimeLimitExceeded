import React, { useEffect, useState } from "react";
import axios from "axios";

const Notify = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/notifications"
        ); // Update the URL if necessary
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#2C3E50" }}>Notifications</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Organization Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Address
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Category
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {notification.org_name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {notification.address}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {notification.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {notification.phone}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {notification.category}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {notification.description}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No notifications available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Notify;
