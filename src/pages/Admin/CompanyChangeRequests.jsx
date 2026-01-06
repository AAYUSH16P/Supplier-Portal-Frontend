import { useEffect, useState } from "react";
import "../../style/RegisteredUser/CompanyChangeRequests.css";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import GlobalLoader from "../../Components/common/GlobalLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function CompanyChangeRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
const [confirmAction, setConfirmAction] = useState(null); // APPROVE | REJECT
const [confirmRequestId, setConfirmRequestId] = useState(null);
const [confirmMessage, setConfirmMessage] = useState("");


  const navigate = useNavigate();


  const handleConfirmAction = async () => {
    try {
      if (confirmAction === "APPROVE") {
        await approveRequest(confirmRequestId);
      }
  
      if (confirmAction === "REJECT") {
        const remark = prompt("Enter rejection reason");
        if (!remark) return;
  
        await fetch(
          `https://sp-portal-backend-production.up.railway.app/admin/company-change-requests/${confirmRequestId}/reject`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(remark),
          }
        );
  
        toast.error("Request rejected");
  
        setRequests(prev =>
          prev.map(r =>
            r.id === confirmRequestId ? { ...r, status: "REJECTED" } : r
          )
        );
      }
  
      // cleanup
      setShowConfirmModal(false);
      setConfirmAction(null);
      setConfirmRequestId(null);
    } catch (err) {
      console.error("Action failed", err);
      toast.error("Operation failed");
    }
  };
  

  useEffect(() => {
    fetch("https://sp-portal-backend-production.up.railway.app/admin/company-change-requests")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const approveRequest = async (id) => {
    await fetch(
      `https://sp-portal-backend-production.up.railway.app/admin/company-change-requests/${id}/approve`,
      { method: "POST" }
    );

    toast.success("Request approved successfully");
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: "APPROVED" } : r)
    );
  };

  // const rejectRequest = async (id) => {
  //   const remark = prompt("Enter rejection reason");
  //   if (!remark) return;

  //   await fetch(
  //     `https://sp-portal-backend-production.up.railway.app/admin/company-change-requests/${id}/reject`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(remark),
  //     }
  //   );

  //   toast.error("Request rejected");
  //   setRequests(prev =>
  //     prev.map(r => r.id === id ? { ...r, status: "REJECTED" } : r)
  //   );
  // };


  if (loading) {
    return <GlobalLoader />;
  }
  return (
    <>
      <AppHeader />

      <div className="admin-page">
        <div className="approval-banner">
          🏢 Review & Approve Supplier Change Requests
        </div>

        {/* NAV TABS */}
        <div className="approval-tabs">
          <button className="tab"  onClick={() => navigate("/supplierApprovals")}>Supplier Approvals</button>

          
          <button
            className="tab"
            onClick={() => navigate("/candidate-validation")}
          >
            Candidate Validation
          </button>

          <button
            className="tab active"
            onClick={() => navigate("/request-for-change")}
          >
            Request for Change
          </button>
        </div>

        <h2 className="page-title">Supplier Approvals</h2>
        <p className="page-subtitle">
          Review and manage supplier change requests
        </p>

        {/* SEARCH */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by company name or email..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <table className="cr-table">
          <thead>
            <tr>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
  {requests.length === 0 ? (
    <tr>
      <td colSpan="4" style={{ padding: "40px" }}>
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No change requests found</h3>
          <p>All supplier change requests have been reviewed.</p>
        </div>
      </td>
    </tr>
  ) : (
    requests.map(req => (
      <tr key={req.id}>
        <td className="mono">{req.companyId}</td>
        <td className="company-name">{req.companyName}</td>

        <td>
          <span className={`status-pill ${req.status?.toLowerCase()}`}>
            {req.status}
          </span>
        </td>

        <td>
  <div className="actions">
    <button
      className="view"
      onClick={() => setSelectedRequest(req)}
    >
      👁 View
    </button>

    {req.status === "PENDING" && (
      <>
       <button
  className="approve"
  onClick={() => {
    setConfirmAction("APPROVE");
    setConfirmRequestId(req.id);
    setConfirmMessage("Are you sure you want to approve this change request?");
    setShowConfirmModal(true);
  }}
>
  ✔ Approve
</button>


<button
  className="reject"
  onClick={() => {
    setConfirmAction("REJECT");
    setConfirmRequestId(req.id);
    setConfirmMessage("Are you sure you want to reject this change request?");
    setShowConfirmModal(true);
  }}
>
  ✖ Reject
</button>

      </>
    )}
  </div>
</td>

      </tr>
    ))
  )}
</tbody>

        </table>

        {/* MODAL */}
        {selectedRequest && (
          <div className="modal-backdrop">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Change Request Details</h3>
                <button onClick={() => setSelectedRequest(null)}>✕</button>
              </div>

              <div className="modal-section">
                <label>Company ID</label>
                <p className="mono">{selectedRequest.companyId}</p>
              </div>

              <div className="modal-section">
                <label>Company Name</label>
                <p>{selectedRequest.companyName}</p>
              </div>

              <div className="modal-grid">
                <div>
                  <label>Old Value</label>
                  <p>{selectedRequest.oldValue}</p>
                </div>

                <div>
                  <label>New Value</label>
                  <p className="highlight">{selectedRequest.newValue}</p>
                </div>
              </div>

              <div className="modal-section">
                <label>Reason</label>
                <p className="reason-box">{selectedRequest.reason}</p>
              </div>

              <div className="modal-footer">
                <span className={`status-pill ${selectedRequest.status.toLowerCase()}`}>
                  {selectedRequest.status}
                </span>

                {/* <button onClick={() => setSelectedRequest(null)}>Close</button> */}
              </div>
            </div>
          </div>
        )}
        {showConfirmModal && (
  <div
    className="admin-modal-overlay"
    onClick={() => setShowConfirmModal(false)}
  >
    <div
      className="admin-modal confirm-sla-modal"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="confirm-header">
        <h2>Confirm Action</h2>
        <button
          className="close-icon"
          onClick={() => setShowConfirmModal(false)}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="confirm-body">
        <div className="confirm-icon">
          {confirmAction === "REJECT" ? "⚠️" : "✅"}
        </div>

        <p className="confirm-text">{confirmMessage}</p>

        <p className="confirm-subtext">
          This action requires administrator confirmation.
        </p>
      </div>

      {/* FOOTER */}
      <div className="confirm-footer">
        <button
          className="btn cancel"
          onClick={() => setShowConfirmModal(false)}
        >
          Cancel
        </button>

        <button
          className="btn confirm"
          id="abc"
          onClick={handleConfirmAction}
        >
          ✔ Confirm
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </>
  );
}
