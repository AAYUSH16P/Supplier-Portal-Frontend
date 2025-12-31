import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/SupplierApprovals.css";

export default function SupplierApprovals() {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [slaFilter, setSlaFilter] = useState("All");
  const [selectedSupplier, setSelectedSupplier] = useState(null);


  /* =========================
     API CALL – ALL SUPPLIERS
  ========================== */
  useEffect(() => {
    fetch("http://localhost:5035/api/company/admin/pending-companies")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err));
  }, []);


  const refreshSuppliers = () => {
    fetch("http://localhost:5035/api/company/admin/pending-companies")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err));
  };

  const handleApprove = async (companyId) => {
    try {
      debugger;
      await fetch("http://localhost:5035/api/company/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyId }),
      });

      refreshSuppliers();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (companyId) => {
    const remark = prompt("Enter rejection remark:");
    if (!remark) return;

    try {
      await fetch("http://localhost:5035/api/company/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyId, remark }),
      });

      refreshSuppliers();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  const handleSignSla = async (companyId) => {
    try {
      await fetch(
        `http://localhost:5035/api/Supplier/${companyId}/sign-sla`,
        {
          method: "POST",
        }
      );

      refreshSuppliers();
    } catch (err) {
      console.error("Sign SLA failed", err);
    }
  };


  /* =========================
     SEARCH + FILTER LOGIC
  ========================== */
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const search =
        s.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
        s.contacts?.[0]?.email
          ?.toLowerCase()
          .includes(searchText.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        (statusFilter === "Pending" &&
          s.isApproved === false &&
          s.remark == null) ||
        (statusFilter === "Rejected" &&
          s.isApproved === false &&
          s.remark != null) ||
        (statusFilter === "Approved" &&
          s.isApproved === true);

      const slaMatch =
        slaFilter === "All" ||
        (slaFilter === "SLA Signed" && s.isSlaSigned === true) ||
        (slaFilter === "SLA Not Signed" && s.isSlaSigned === false);

      return search && statusMatch && slaMatch;
    });
  }, [suppliers, searchText, statusFilter, slaFilter]);


  /* =========================
     STATUS UI HELPERS
  ========================== */
  const getStatusBadge = (supplier) => {
    if (supplier.isApproved) {
      return <span className="badge approved">Approved</span>;
    }

    if (!supplier.isApproved && supplier.remark) {
      return <span className="badge rejected">Rejected</span>;
    }

    return <span className="badge pending">Pending</span>;
  };


  return (
    <>
      <AppHeader />

      <div className="app-shell">

        <main className="app-content supplier-approvals-page">
          {/* TOP BANNER */}
          <div className="approval-banner">
            🏢 Review & Approve Supplier Registrations
          </div>

          {/* NAV TABS */}
          <div className="approval-tabs">
            <button className="tab active">Supplier Approvals</button>

            <button
              className="tab"
              onClick={() => navigate("/candidate-validation")}
            >
              Candidate Validation
            </button>

            <button
              className="tab"
              onClick={() => navigate("/request-for-change")}
            >
              Request for Change
            </button>
          </div>

          {/* TITLE */}
          <h2 className="page-title">Supplier Approvals</h2>
          <p className="page-subtitle">
            Review and manage supplier registration requests
          </p>

          {/* SEARCH & FILTER BAR */}
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search by company name or email..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <select
              value={slaFilter}
              onChange={(e) => setSlaFilter(e.target.value)}
            >
              <option>All</option>
              <option>SLA Signed</option>
              <option>SLA Not Signed</option>
            </select>
          </div>

          {/* TABLE CARD */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Contact Email</th>
                  <th>Date Registered</th>
                  <th>Status</th>
                  <th>SLA</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No suppliers found
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((s) => (
                    <tr key={s.id}>
                      <td>{s.companyName}</td>
                      <td>{s.contacts?.[0]?.email || "-"}</td>
                      <td>
                        {new Date(s.createdAt)
                          .toISOString()
                          .split("T")[0]}
                      </td>
                      <td>{getStatusBadge(s)}</td>
                      <td>
                        {s.isSlaSigned ? (
                          <span className="pill success">Signed</span>
                        ) : (
                          <span className="pill">Not Signed</span>
                        )}
                      </td>

                      <td className="actions">
                        {/* VIEW – always available */}
                        <button
                          className="view"
                          onClick={() => setSelectedSupplier(s)}
                        >
                          👁 View
                        </button>


                        {/* PENDING: Approve + Reject */}
                        {!s.isApproved && s.remark == null && (
                          <>
                            <button
                              className="approve"
                              onClick={() => handleApprove(s.id)}
                              
                            >
                              ✔ Approve
                            </button>

                            <button
                              className="reject"
                              onClick={() => handleReject(s.id)}
                            >
                              ✖ Reject
                            </button>
                          </>
                        )}

                        {/* APPROVED but SLA NOT signed */}
                        {s.isApproved && !s.isSlaSigned && (
                          <button
                            className="sla"
                            onClick={() => handleSignSla(s.id)}
                          >
                            ✍ Sign SLA
                          </button>
                        )}

                        {/* REJECTED → NOTHING extra */}
                      </td>

                    </tr>
                  ))
                )}


{selectedSupplier && (
  <div className="admin-modal-overlay" onClick={() => setSelectedSupplier(null)}>
    <div
      className="admin-modal"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="admin-modal-header">
        <div>
          <h2>{selectedSupplier.companyName}</h2>
          <div className="meta-row">
            {getStatusBadge(selectedSupplier)}
            <span
              className={`sla-pill ${
                selectedSupplier.isSlaSigned ? "signed" : "not-signed"
              }`}
            >
              {selectedSupplier.isSlaSigned ? "SLA Signed" : "SLA Not Signed"}
            </span>
          </div>
        </div>

        <button
          className="close-icon"
          onClick={() => setSelectedSupplier(null)}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="admin-modal-body">

        {/* COMPANY DETAILS */}
        <div className="section-card">
          <h3>Company Details</h3>

          <div className="kv-grid">
            <div>
              <label>Website</label>
              <span>{selectedSupplier.companyWebsite}</span>
            </div>

            <div>
              <label>Business Type</label>
              <span>{selectedSupplier.businessType}</span>
            </div>

            <div>
              <label>Company Size</label>
              <span>{selectedSupplier.companySize}</span>
            </div>

            <div>
              <label>Established</label>
              <span>{selectedSupplier.yearEstablished}</span>
            </div>
          </div>

          <div className="description-box">
            {selectedSupplier.companyOverview}
          </div>
        </div>

        {/* CONTACT */}
        <div className="section-card">
          <h3>Primary Contact</h3>

          {selectedSupplier.contacts.map((c, i) => (
            <div key={i} className="contact-row">
              <div className="avatar">
                {c.contactName.charAt(0)}
              </div>

              <div>
                <strong>{c.contactName}</strong>
                <p>{c.roleDesignation}</p>
                <p>{c.email}</p>
                <p>{c.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ADDRESS */}
        <div className="section-card">
          <h3>Address</h3>

          {selectedSupplier.addresses.map((a, i) => (
            <p key={i} className="address-text">
              {a.addressLine1}, {a.addressLine2}<br />
              {a.city}, {a.state} – {a.postalCode}, {a.country}
            </p>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div className="section-card">
          <h3>Certifications</h3>

          <div className="cert-row">
            {selectedSupplier.certifications.length === 0
              ? <span className="muted">No certifications</span>
              : selectedSupplier.certifications.map((c, i) => (
                  <span key={i} className="cert-pill">
                    {c.certificationName}
                  </span>
                ))}
          </div>
        </div>

      </div>
    </div>
  </div>
)}



              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
