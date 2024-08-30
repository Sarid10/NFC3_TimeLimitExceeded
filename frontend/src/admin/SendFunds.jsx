import React, { useState } from "react";

const SendFunds = () => {
  const [funds, setFunds] = useState(0);
  const [imid, setImId] = useState(0);
  const sendFundsToIM = async () => {
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/auth/send-funds",
    //     {
    //       imid: imid,
    //       amount: funds,
    //     }
    //   );
    //   if (response.status === 200) {
    //     alert("Funds sent successfully!");
    //   } else {
    //     alert("Failed to send funds. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error sending funds:", error);
    //   alert("An error occurred while sending funds.");
    // }
  };

  return (
    <div className="card">
      <div className="card-header">Send Funds to IM</div>
      <div className="card-body">
        <input type="hidden" name="id" />
        <div className="form-group">
          <label className="control-label">Send Funds</label>
          <input
            type="text"
            className="form-control"
            style={{ width: "50 %" }}
            name="course"
            onChange={(e) => setFunds(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="control-label">Inventory Manager ID</label>
          <input
            type="text"
            className="form-control"
            style={{ width: "50 %" }}
            name="course"
            onChange={(e) => setImId(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="card-footer">
        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-sm btn-primary btn-block"
              onClick={sendFundsToIM}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendFunds;
