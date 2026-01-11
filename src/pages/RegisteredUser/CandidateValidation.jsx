import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import "../../style/RegisteredUser/CandidateValidation.css";
import AppFooter from "../../Components/common/AppFooter";


export default function CandidateValidation() {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [viewMode, setViewMode] = useState("PENDING");
    const [adminFilter, setAdminFilter] = useState("APPROVED"); // NEW

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // APPROVE | REJECT
    const [confirmCandidateId, setConfirmCandidateId] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");


    const [candidates, setCandidates] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [supplierFilter, setSupplierFilter] = useState("All Suppliers");

    const safeFetch = async (url) => {
        try {
            setIsLoading(true);
            setCandidates([]); // 🔥 clear old data immediately

            const res = await fetch(url);
            const data = await res.json();

            setCandidates(data);
        } catch (err) {
            console.error("Fetch failed", err);
            setCandidates([]);
        } finally {
            setIsLoading(false);
        }
    };


    const fetchAdminApprovedCandidates = () =>
        safeFetch(
            "https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/admin/approved"
        );


    const fetchAdminRejectedCandidates = () =>
        safeFetch(
            "https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/admin/rejected"
        );



    const handleConfirmAction = async () => {
        try {
            if (confirmAction === "APPROVE") {
                await fetch(
                    `https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/${confirmCandidateId}/approve?isRequestAdmin=true`,
                    { method: "POST" }
                );
            }

            if (confirmAction === "REJECT") {
                const remark = prompt("Enter rejection remark:");
                if (!remark) return;

                await fetch(
                    `https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/${confirmCandidateId}/reject?isRequestAdmin=true`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(remark),
                    }
                );
            }

            // cleanup
            setShowConfirmModal(false);
            setConfirmAction(null);
            setConfirmCandidateId(null);
            setSelectedCandidate(null);

            if (viewMode === "PENDING") fetchCandidates();
            if (viewMode === "AUTO") fetchAutoApprovedCandidates();
            if (viewMode === "ADMIN") {
                adminFilter === "APPROVED"
                    ? fetchAdminApprovedCandidates()
                    : fetchAdminRejectedCandidates();
            }
        } catch (err) {
            console.error("Action failed", err);
            alert("Operation failed");
        }
    };


    /* =========================
       FETCH PENDING CANDIDATES
    ========================== */
    const fetchCandidates = () =>
        safeFetch(
            "https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/getAllPendingCandidates"
        );

    const fetchAutoApprovedCandidates = () =>
        safeFetch(
            "https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/eligible"
        );

// eslint-disable-next-line
    useEffect(() => {fetchCandidates();}, []);

    /* =========================
       APPROVE / REJECT
    ========================== */
    // const handleApprove = async (capacityId) => {
    //     try {
    //         await fetch(
    //             `https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/${capacityId}/approve`,
    //             { method: "POST" }
    //         );
    //         fetchCandidates();
    //     } catch (err) {
    //         console.error("Approve failed", err);
    //     }
    // };

    // const handleReject = async (capacityId) => {
    //     const remark = prompt("Enter rejection remark:");
    //     if (!remark) return;

    //     try {
    //         await fetch(
    //             `https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/${capacityId}/reject`,
    //             {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify(remark),
    //             }
    //         );
    //         fetchCandidates();
    //     } catch (err) {
    //         console.error("Reject failed", err);
    //     }
    // };

    /* =========================
       SEARCH & FILTER
    ========================== */
    const supplierList = useMemo(() => {
        const names = candidates.map((c) => c.companyName);
        return ["All Suppliers", ...new Set(names)];
    }, [candidates]);

    const filteredCandidates = useMemo(() => {
        const query = searchText.trim().toLowerCase();

        return candidates.filter((c) => {
            // 🔍 SEARCH (added on top)
            const searchMatch =
                !query ||
                [
                    c.companyName,
                    c.companyEmployeeId,
                    c.role,
                    c.jobTitle,
                    c.location,
                    c.technicalSkills,
                    c.tools,
                    c.employerNote,
                ]
                    .filter(Boolean)
                    .some((field) =>
                        field.toString().toLowerCase().includes(query)
                    );

            // 🏷️ EXISTING FILTER (unchanged)
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
                        <button
                            disabled={isLoading}
                            className={`tab ${viewMode === "PENDING" ? "active" : ""}`}
                            onClick={() => {
                                setViewMode("PENDING");
                                fetchCandidates();
                            }}
                        >
                            ⏳ Pending Approval
                        </button>



                        <button
                            disabled={isLoading}
                            className={`tab ${viewMode === "AUTO" ? "active" : ""}`}
                            onClick={() => {
                                setViewMode("AUTO");
                                fetchAutoApprovedCandidates();
                            }}
                        >
                            ⚡ Auto Approved
                        </button>

                        <button
                            disabled={isLoading}
                            className={`tab ${viewMode === "ADMIN" ? "active" : ""}`}
                            onClick={() => {
                                setViewMode("ADMIN");
                                setAdminFilter("APPROVED");
                                fetchAdminApprovedCandidates();
                            }}
                        >
                            🛡 Approved By Admin
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

                    {viewMode === "ADMIN" && (
                        <div className="admin-radio-bar">
                            <label>
                                <input
                                    type="radio"
                                    name="adminStatus"
                                    checked={adminFilter === "APPROVED"}
                                    onChange={() => {
                                        setAdminFilter("APPROVED");
                                        fetchAdminApprovedCandidates();
                                    }}
                                />
                                Approved
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="adminStatus"
                                    checked={adminFilter === "REJECTED"}
                                    onChange={() => {
                                        setAdminFilter("REJECTED");
                                        fetchAdminRejectedCandidates();
                                    }}
                                />
                                Rejected
                            </label>
                        </div>
                    )}


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
                                    {viewMode === "PENDING" && <th>Status</th>}
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center", padding: "40px" }}>
                                            <div className="table-loader">
                                                <span className="spinner" />
                                                <p>Loading candidates...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredCandidates.length === 0 ? (
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
                                            <td>{c.jobTitle}</td>
                                            <td>{c.workingSince}</td>
                                            <td>
                                                <span className="year-badge red">
                                                    {c.totalExperience} yrs
                                                </span>
                                            </td>

                                            {viewMode === "PENDING" && (
                                                <td>
                                                    <span className="status pending">
                                                        Pending Approval
                                                    </span>
                                                </td>
                                            )}

                                            <td className="actions">
                                                <button
                                                    className="view"
                                                    onClick={() => setSelectedCandidate(c)}
                                                >
                                                    👁 View
                                                </button>

                                                {viewMode === "PENDING" && (
                                                    <>
                                                        <button
                                                            className="approve"
                                                            onClick={() => {
                                                                setConfirmAction("APPROVE");
                                                                setConfirmCandidateId(c.id);
                                                                setConfirmMessage(
                                                                    "Are you sure you want to approve this candidate?"
                                                                );
                                                                setShowConfirmModal(true);
                                                            }}
                                                        >
                                                            ✔ Approve
                                                        </button>

                                                        <button
                                                            className="reject"
                                                            onClick={() => {
                                                                setConfirmAction("REJECT");
                                                                setConfirmCandidateId(c.id);
                                                                setConfirmMessage(
                                                                    "Are you sure you want to reject this candidate?"
                                                                );
                                                                setShowConfirmModal(true);
                                                            }}
                                                        >
                                                            ✖ Reject
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* VIEW MODAL */}
                    {selectedCandidate && (
                        <div
                            className="modal-overlay"
                            onClick={() => setSelectedCandidate(null)}
                        >
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
                                            <label>I Can be</label>
                                            <p>{selectedCandidate.role}</p>
                                        </div>

                                        <div>
                                            <label>Job Title</label>
                                            <p>{selectedCandidate.jobTitle || "-"}</p>
                                        </div>

                                        <div>
                                            <label>Gender</label>
                                            <p>{selectedCandidate.gender || "-"}</p>
                                        </div>

                                        <div>
                                            <label>Location</label>
                                            <p>{selectedCandidate.location || "-"}</p>
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
                                            <label>CTC</label>
                                            <p>
                                                {selectedCandidate.ctc
                                                    ? `₹ ${selectedCandidate.ctc.toLocaleString()}`
                                                    : "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <label>Technical Skills</label>
                                            <p>{selectedCandidate.technicalSkills || "-"}</p>
                                        </div>

                                        <div>
                                            <label>Tools</label>
                                            <p>{selectedCandidate.tools || "-"}</p>
                                        </div>

                                        <div>
                                            <label>Number of Projects</label>
                                            <p>{selectedCandidate.numberOfProjects ?? "-"}</p>
                                        </div>

                                        <div className="full-width">
                                            <label>Employer Note</label>
                                            <p>{selectedCandidate.employerNote || "-"}</p>
                                        </div>

                                        <div>
                                            <label>Status</label>
                                            <p
                                                className={`status ${viewMode === "PENDING"
                                                        ? "pending"
                                                        : adminFilter === "REJECTED"
                                                            ? "rejected"
                                                            : "approved"
                                                    }`}
                                            >
                                                {viewMode === "PENDING"
                                                    ? "Pending Approval"
                                                    : adminFilter === "REJECTED"
                                                        ? "Rejected by Admin"
                                                        : "Approved by Admin"}
                                            </p>
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

                                    <p className="confirm-text">
                                        {confirmMessage}
                                    </p>

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
                                        className="btn confirm" id="abc"
                                        onClick={handleConfirmAction}
                                    >
                                        ✔ Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </main>
            </div>
            <AppFooter />
        </>
    );
}
