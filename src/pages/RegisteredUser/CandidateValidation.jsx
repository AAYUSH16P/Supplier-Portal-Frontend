import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/CandidateValidation.css";

export default function CandidateValidation() {
    const navigate = useNavigate();
    const [selectedCandidate, setSelectedCandidate] = useState(null);


    const COMPANY_ID = "edb52127-ac68-4e05-bce8-70044e74cdb0";

    const [candidates, setCandidates] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [supplierFilter, setSupplierFilter] = useState("All Suppliers");

    /* =========================
       FETCH PENDING CANDIDATES
    ========================== */
    const fetchCandidates = async () => {
        try {
            const res = await fetch(
                `http://localhost:5035/api/supplier/capacities?companyId=${COMPANY_ID}&filter=pending`
            );
            const data = await res.json();
            setCandidates(data);
        } catch (err) {
            console.error("Failed to fetch candidates", err);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    /* =========================
       APPROVE / REJECT
    ========================== */
    const handleApprove = async (capacityId) => {
        try {
            await fetch(
                `http://localhost:5035/api/supplier/capacities/${capacityId}/approve`,
                { method: "POST" }
            );
            fetchCandidates();
        } catch (err) {
            console.error("Approve failed", err);
        }
    };

    const handleReject = async (capacityId) => {
        const remark = prompt("Enter rejection remark:");
        if (!remark) return;

        try {
            await fetch(
                `http://localhost:5035/api/supplier/capacities/${capacityId}/reject`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(remark),
                }
            );
            fetchCandidates();
        } catch (err) {
            console.error("Reject failed", err);
        }
    };

    /* =========================
       SEARCH & FILTER
    ========================== */
    const supplierList = useMemo(() => {
        const names = candidates.map((c) => c.companyName);
        return ["All Suppliers", ...new Set(names)];
    }, [candidates]);

    const filteredCandidates = useMemo(() => {
        return candidates.filter((c) => {
            const searchMatch =
                c.companyEmployeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
                c.role?.toLowerCase().includes(searchText.toLowerCase()) ||
                c.companyName?.toLowerCase().includes(searchText.toLowerCase());

            const supplierMatch =
                supplierFilter === "All Suppliers" ||
                c.companyName === supplierFilter;

            return searchMatch && supplierMatch;
        });
    }, [candidates, searchText, supplierFilter]);

    return (
        <>
            <AppHeader />

            <div className="app-shell">
                <main className="app-content candidate-validation-page">
                    {/* PAGE HEADER */}
                    <div className="page-header">
                        <div>
                            <h2>Candidate Validation</h2>
                            <p>Review candidates with less than 1 year working experience</p>
                        </div>

                        <div className="page-date">
                            Wednesday, December 31, 2025
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="validation-tabs">
                        <button className="tab active">
                            ⏳ Pending Approval (Less than 1 Year)
                        </button>

                    </div>

                    {/* SEARCH BAR */}
                    <div className="filter-bar">
                        <input
                            type="text"
                            placeholder="Search by employee ID, role, or supplier..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />

                        <select
                            value={supplierFilter}
                            onChange={(e) => setSupplierFilter(e.target.value)}
                        >
                            {supplierList.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="approval-tabs">
                        <button className="tab" onClick={() => navigate("/supplierApprovals")}>
                            Supplier Approvals
                        </button>

                        <button className="tab active">
                            Candidate Validation
                        </button>

                        <button
                            className="tab"
                            onClick={() => navigate("/request-for-change")}
                        >
                            Request for Change
                        </button>
                    </div>

                    {/* TABLE */}
                    <div className="table-card">
                        <table>
                            <thead>
                                <tr>
                                    <th>Supplier Name</th>
                                    <th>System ID</th>
                                    <th>Company Emp ID</th>
                                    <th>Role</th>
                                    <th>Working Since</th>
                                    <th>Working Years</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredCandidates.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center" }}>
                                            No candidates found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCandidates.map((c) => (
                                        <tr key={c.id}>
                                            <td>{c.companyName}</td>
                                            <td>{c.id}</td>
                                            <td>{c.companyEmployeeId}</td>
                                            <td>{c.role}</td>
                                            <td>{c.workingSince}</td>
                                            <td>
                                                <span className="year-badge red">
                                                    {c.totalExperience} yrs
                                                </span>
                                            </td>
                                            <td>
                                                <span className="status pending">
                                                    Pending Approval
                                                </span>
                                            </td>
                                            <td className="actions">
                                                <button
                                                    className="view"
                                                    onClick={() => setSelectedCandidate(c)}
                                                >
                                                    👁 View
                                                </button>
                                                <button
                                                    className="approve"
                                                    onClick={() => handleApprove(c.id)}
                                                >
                                                    ✔ Approve
                                                </button>
                                                <button
                                                    className="reject"
                                                    onClick={() => handleReject(c.id)}
                                                >
                                                    ✖ Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}


{selectedCandidate && (
  <div className="modal-overlay" onClick={() => setSelectedCandidate(null)}>
    <div
      className="modal-card"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="modal-header">
        <h3>Candidate Details</h3>
        <button
          className="modal-close"
          onClick={() => setSelectedCandidate(null)}
        >
          ✖
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body">
        <div className="detail-grid">
          <div>
            <label>Supplier Name</label>
            <p>{selectedCandidate.companyName}</p>
          </div>

          <div>
            <label>System ID</label>
            <p>{selectedCandidate.id}</p>
          </div>

          <div>
            <label>Company Employee ID</label>
            <p>{selectedCandidate.companyEmployeeId}</p>
          </div>

          <div>
            <label>Role</label>
            <p>{selectedCandidate.role}</p>
          </div>

          <div>
            <label>Job Title</label>
            <p>{selectedCandidate.jobTitle}</p>
          </div>

          <div>
            <label>Location</label>
            <p>{selectedCandidate.location}</p>
          </div>

          <div>
            <label>Working Since</label>
            <p>{selectedCandidate.workingSince}</p>
          </div>

          <div>
            <label>Total Experience</label>
            <p>{selectedCandidate.totalExperience} yrs</p>
          </div>

          <div>
            <label>Status</label>
            <p className="status pending">Pending Approval</p>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="cert-section">
          <label>Certifications</label>
          {selectedCandidate.certifications?.length ? (
            <ul>
              {selectedCandidate.certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer">
        <button
          className="approve"
          onClick={() => {
            handleApprove(selectedCandidate.id);
            setSelectedCandidate(null);
          }}
        >
          ✔ Approve
        </button>

        <button
          className="reject"
          onClick={() => {
            handleReject(selectedCandidate.id);
            setSelectedCandidate(null);
          }}
        >
          ✖ Reject
        </button>
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
