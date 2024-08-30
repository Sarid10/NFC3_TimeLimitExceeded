import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ReportRecieved = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/reports');
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
    // console.log(html);
    setModalContent(html);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalContent('');
  };

  const sendEmail = async(e) => {
    e.preventDefault();
    const escapedHtml = modalContent.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    console.log(escapedHtml);
    // const jsonData = {
    //     htmlContent: escapedHtml
    // };
    try {
        const response = await axios.post('http://localhost:3000/auth/generate_pdf', {
          htmlContent: escapedHtml,
        });
        console.log(response);
        if (response.data.filePath) {
          const mailDataWithPdf = {
            from: "timelimitexceeded4@gmail.com",
            to: "mhdbhadsorawala@gmail.com",
            subject: "Your Donation Report is here!",
            text: `Hey Mohammed, your detailed Donation report is here. Check out how your funds have been utilized!`,
            attachments: [
              {
                filename: 'Donation_report.pdf',
                path: response.data.filePath,
                contentType: 'application/pdf'
              },
            ],
          };
    
          await axios.post("http://localhost:3000/auth/send_email_with_pdf", mailDataWithPdf)
            .then((res) => {
              console.log("Mail sent");
              toast.success(res.data.message);
            });
        }
      } catch (error) {
        console.error('Error sending email:', error);
        toast.error('Failed to send email');
      }
  }

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
        <>
            <div className="modal" style={modalStyles.modal}>
            
            <div className="modal-content" style={modalStyles.modalContent}>
            
            <span className="close" style={modalStyles.close} onClick={handleClose}>
                &times;
            </span>
            <div dangerouslySetInnerHTML={{ __html: modalContent }} />
            <button
                className="btn btn-primary btn-sm"
                onClick={sendEmail}
                >
                Send Email
            </button>
            </div>
        </div>

        
        </>
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
