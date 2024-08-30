import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Blood Donation Drive",
      start: new Date(2024, 7, 1, 10, 0),
      end: new Date(2024, 7, 1, 12, 0),
    },
    {
      title: "Tree Plantation Campaign",
      start: new Date(2024, 7, 3, 14, 0),
      end: new Date(2024, 7, 3, 16, 0),
    },
    {
      title: "Clothes Donation",
      start: new Date(2024, 7, 19, 9, 0),
      end: new Date(2024, 7, 19, 11, 0),
    },
    {
      title: "Food Drive",
      start: new Date(2024, 7, 23, 13, 0),
      end: new Date(2024, 7, 23, 15, 0),
    },
    {
      title: "Beach Cleanup Drive",
      start: new Date(2024, 7, 8, 8, 0),
      end: new Date(2024, 7, 8, 10, 0),
    },
    {
      title: "Old Age Home Visit",
      start: new Date(2024, 7, 6, 9, 0),
      end: new Date(2024, 7, 6, 11, 0),
    },
    {
      title: "Disaster Relief Fundraiser",
      start: new Date(2024, 7, 10, 14, 0),
      end: new Date(2024, 7, 10, 16, 0),
    },

    // September Events
    {
      title: "Blood Donation Drive",
      start: new Date(2024, 8, 1, 10, 0),
      end: new Date(2024, 8, 1, 12, 0),
    },
    {
      title: "Tree Plantation Campaign",
      start: new Date(2024, 8, 2, 14, 0),
      end: new Date(2024, 8, 2, 16, 0),
    },
    {
      title: "Clothes Donation",
      start: new Date(2024, 8, 3, 9, 0),
      end: new Date(2024, 8, 3, 11, 0),
    },
    {
      title: "Food Drive",
      start: new Date(2024, 8, 4, 13, 0),
      end: new Date(2024, 8, 4, 15, 0),
    },
    {
      title: "Health Checkup Camp",
      start: new Date(2024, 8, 5, 11, 0),
      end: new Date(2024, 8, 5, 13, 0),
    },
    {
      title: "Education for All Seminar",
      start: new Date(2024, 8, 6, 15, 0),
      end: new Date(2024, 8, 6, 17, 0),
    },
    {
      title: "Animal Shelter Support",
      start: new Date(2024, 8, 7, 10, 0),
      end: new Date(2024, 8, 7, 12, 0),
    },
    {
      title: "Beach Cleanup Drive",
      start: new Date(2024, 8, 8, 8, 0),
      end: new Date(2024, 8, 8, 10, 0),
    },
    {
      title: "Old Age Home Visit",
      start: new Date(2024, 8, 9, 9, 0),
      end: new Date(2024, 8, 9, 11, 0),
    },
    {
      title: "Disaster Relief Fundraiser",
      start: new Date(2024, 8, 10, 14, 0),
      end: new Date(2024, 8, 10, 16, 0),
    },

    // October Events
    {
      title: "Blood Donation Drive",
      start: new Date(2024, 9, 1, 10, 0),
      end: new Date(2024, 9, 1, 12, 0),
    },
    {
      title: "Tree Plantation Campaign",
      start: new Date(2024, 9, 2, 14, 0),
      end: new Date(2024, 9, 2, 16, 0),
    },
    {
      title: "Clothes Donation",
      start: new Date(2024, 9, 3, 9, 0),
      end: new Date(2024, 9, 3, 11, 0),
    },
    {
      title: "Food Drive",
      start: new Date(2024, 9, 4, 13, 0),
      end: new Date(2024, 9, 4, 15, 0),
    },
    {
      title: "Health Checkup Camp",
      start: new Date(2024, 9, 5, 11, 0),
      end: new Date(2024, 9, 5, 13, 0),
    },
    {
      title: "Education for All Seminar",
      start: new Date(2024, 9, 6, 15, 0),
      end: new Date(2024, 9, 6, 17, 0),
    },
    {
      title: "Animal Shelter Support",
      start: new Date(2024, 9, 7, 10, 0),
      end: new Date(2024, 9, 7, 12, 0),
    },
    {
      title: "Beach Cleanup Drive",
      start: new Date(2024, 9, 8, 8, 0),
      end: new Date(2024, 9, 8, 10, 0),
    },
    {
      title: "Old Age Home Visit",
      start: new Date(2024, 9, 9, 9, 0),
      end: new Date(2024, 9, 9, 11, 0),
    },
    {
      title: "Disaster Relief Fundraiser",
      start: new Date(2024, 9, 10, 14, 0),
      end: new Date(2024, 9, 10, 16, 0),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event Name");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div
      style={{
        marginTop: "100px",
        height: 700,
        marginLeft: "auto",
        marginRight: "auto",
        width: "70%",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

const MyAccount = () => {
  return (
    <div style={{ marginTop: "200px" }}>
      <MyCalendar />
    </div>
  );
};

export default MyAccount;
