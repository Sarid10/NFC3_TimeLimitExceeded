import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ReportRecieved = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    // Fetch reports from the API
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/reports'); // Update the URL accordingly
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast.error('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const CutContent = (content, maxLength) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    if (strippedContent.length > maxLength) {
      return strippedContent.substring(0, maxLength) + "...";
    }
    return strippedContent;
  };

  const handleView = (html) => {
    setModalContent(html);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalContent('');
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <h1>Reports</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              {/* Adjust these headers based on your report columns */}
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Number of Items</th>
              <th>PM_id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.title}</td>
                <td>{CutContent(report.description, 100)}</td>
                <td>{report.number_of_items}</td>
                <td>{report.pm_id}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleView(report.html_string)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal" style={modalStyles.modal}>
        <div className="modal-content" style={modalStyles.modalContent}>
          <span className="close" style={modalStyles.close} onClick={handleClose}>
            &times;
          </span>
          <div dangerouslySetInnerHTML={{ __html: modalContent }} />
        </div>
      </div>
      )}
    </div>
  );
};

const modalStyles = {
    modal: {
      display: 'block',
      position: 'fixed',
      zIndex: 1050,  // Make sure it's above other content
      left: '250px',  // Adjust based on the width of your sidebar
      top: '20px',  // Adjust if you want to add some top spacing
      width: 'calc(100% - 250px)',  // Adjust width considering the sidebar
      height: 'calc(100% - 40px)',  // Full height minus some margin
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',  // Dark background with transparency
    },
    modalContent: {
      backgroundColor: '#fefefe',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #888',
      width: '80%',
      maxWidth: '800px',  // Maximum width of the modal
    },
    close: {
      color: '#aaa',
      float: 'right',
      fontSize: '28px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };
export default ReportRecieved;
