import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/Candidates.css";
import { getSupplierCapacities } from "../../services/supplier";
import GlobalLoader from "../../Components/common/GlobalLoader";
import AppFooter from "../../Components/common/AppFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const normalizeCertifications = (certifications, technicalSkills) => {
  if (Array.isArray(certifications) && certifications.length > 0) {
    return certifications
      .map(c => (typeof c === "string" ? c : c?.name || c?.title || ""))
      .filter(Boolean);
  }

  // 🔁 fallback (matches earlier UI expectation)
  if (typeof technicalSkills === "string" && technicalSkills.trim()) {
    return technicalSkills
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  return [];
};



const getRejectedSupplierCapacities = async (companyId) => {
  const res = await fetch(
    `https://sp-portal-backend-production.up.railway.app/api/company/rejected/supplier/${companyId}`,
    {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rejected suppliers");
  }

  return res.json();
};






export default function Candidates() {
  const [capacities, setCapacities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // all | approved | pending | rejected
  const navigate = useNavigate();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectRemark, setRejectRemark] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [rejectedApiList, setRejectedApiList] = useState([]); // rejected from API

  const isSlaSigned = useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.isSlaSigned === "True";
    } catch {
      return false;
    }
  }, []);


  const handleApprove = async (candidate) => {
    try {
      await fetch(
        `https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/${candidate.id}/approve`,
        { method: "POST" }
      );

      setCapacities((prev) =>
        prev.map((c) =>
          c.id === candidate.id ? { ...c, status: 1 } : c
        )
      );
    } catch {
      toast.error("Failed to approve candidate");
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectRemark.trim()) {
      toast.warning("Please enter a rejection remark");
      return;
    }

    try {
      await fetch(
        `https://sp-portal-backend-production.up.railway.app/api/supplier/capacities/${selectedCandidate.id}/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rejectRemark),
        }
      );

      setCapacities((prev) =>
        prev.map((c) =>
          c.id === selectedCandidate.id ? { ...c, status: 2 } : c
        )
      );

      setRejectRemark("");
      setShowRejectModal(false);
      setSelectedCandidate(null);
    } catch {
      toast.error("Failed to reject candidate");
    }
  };


  useEffect(() => {
    const companyId = getCompanyIdFromToken();
    if (!companyId) {
      setLoading(false);
      return;
    }

    Promise.all([
      getSupplierCapacities(companyId),
      getRejectedSupplierCapacities(companyId)
    ])
      .then(([allRes, rejectedRes]) => {
        setCapacities(allRes.data || []);

        const normalizedRejected = (rejectedRes || []).map(c => ({
          ...c,
          certifications: normalizeCertifications(
            c.certifications,
            c.technicalSkills
          ),
        }));

        setRejectedApiList(normalizedRejected);
      })
      .catch(() => {
        setCapacities([]);
        setRejectedApiList([]);
      })
      .finally(() => setLoading(false));
  }, []);


  const hasCandidates = capacities.length > 0;

  /* ================= FILTER LOGIC ================= */

  const approvedList = useMemo(
    () => capacities.filter((c) => c.status === 1),
    [capacities]
  );

  const pendingList = useMemo(
    () => capacities.filter((c) => c.status === 0),
    [capacities]
  );

  // const rejectedList = useMemo(
  //   () => capacities.filter((c) => c.status === 2), // future-ready
  //   [capacities]
  // );

  const filteredCapacities = useMemo(() => {
    switch (activeFilter) {
      case "approved":
        return approvedList;
      case "pending":
        return pendingList;
      case "rejected":
        return rejectedApiList;
      default:
        return capacities;
    }
  }, [activeFilter, capacities, approvedList, pendingList, rejectedApiList]);


  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <>
      <AppHeader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="app-shell">
        <AppSidebar unlocked active="Candidates" />

        <main className="app-content candidates-page">
          {/* HERO */}
          <section className="candidates-hero">
            👥 Track Your Candidates' Journey to Success
          </section>

          {/* PAGE HEADER */}
          <div className="page-header">
            <div>
              <h2>Candidates</h2>
              <p>
                Track and monitor the approval status of all your candidate
                submissions
              </p>
            </div>

            {hasCandidates && (
              <div className="filters">
                <button
                  className={`filter ${activeFilter === "all" ? "active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  All Uploaded <span>{capacities.length}</span>
                </button>

                <button
                  className={`filter ${activeFilter === "approved" ? "active" : ""
                    }`}
                  onClick={() => setActiveFilter("approved")}
                >
                  Approved <span>{approvedList.length}</span>
                </button>

                <button
                  className={`filter ${activeFilter === "pending" ? "active" : ""
                    }`}
                  onClick={() => setActiveFilter("pending")}
                >
                  Pending for Approval <span>{pendingList.length}</span>
                </button>

                <button
                  className={`filter ${activeFilter === "rejected" ? "active" : ""}`}
                  onClick={() => setActiveFilter("rejected")}
                >
                  Rejected <span>{rejectedApiList.length}</span>
                </button>


              </div>
            )}
          </div>



          {/* SLA WARNING */}
          {!isSlaSigned && (
            <div className="sla-warning-box">
              <div className="sla-warning-header">
                <span className="sla-warning-icon">⚠</span>
                <h4>SLA Not Signed</h4>
              </div>

              <p>
                We haven’t received your signed SLA (Service Level Agreement).
                Approved candidates from your list will only be ready for the UK
                Market once you send back the signed SLA to{" "}
                <strong>onboarding@westgateithub.in</strong>.
              </p>

              <p className="sla-warning-action">
                📄 Please review, sign, and return the SLA document as soon as possible
                to activate your approved candidates.
              </p>
            </div>
          )}


          {/* ================= FIRST TIME USER ================= */}
          {!hasCandidates && (
            <div className="empty-state large">
              <div className="empty-icon">👤➕</div>

              <h3>Welcome! Get Started with Candidate Upload</h3>

              <p>
                Upload candidate information using{" "}
                <strong>
                  Option 3: Employer-Initiated Candidate Invite
                </strong>
                .
              </p>

              <p className="muted">
                Invite employees via a secure link — no login required.
              </p>

              <button
                className="primary-btn"
                onClick={() => navigate("/capacityRegistration")}
              >
                ⬆ Go to Capacity Registration
              </button>
            </div>
          )}

          {/* ================= CANDIDATE LIST ================= */}
          {hasCandidates && (
            <>
              <div className="action-bar">
                <button
                  className="primary-btn"
                  onClick={() => navigate("/capacityRegistration")}
                >
                  ⬆ Upload More Candidates
                </button>
              </div>

              <div className="list-card">
                <h3>
                  {activeFilter === "all"
                    ? "All Candidates"
                    : activeFilter.charAt(0).toUpperCase() +
                    activeFilter.slice(1)}{" "}
                  ({filteredCapacities.length})
                </h3>

                {filteredCapacities.map((c) => (
                  <div className="candidate-row" key={c.id}>
                    <div>
                      <strong>{c.companyEmployeeId}</strong>
                      <span className="code">{c.jobTitle}</span>

                      <p>Location: {c.location || "-"}</p>
                      <p>Experience: {c.totalExperience} years</p>

                      {c.status === 1 && (
                        <span className="badge approved">✔ Approved</span>
                      )}
                      {c.status === 0 && (
                        <span className="badge pending">
                          ⏳ Pending Approval
                        </span>
                      )}
                      {c.status === 2 && (
                        <span className="badge rejected">✖ Rejected</span>
                      )}

                      {c.status === 1 && (
                        <span
                          className={`badge ${c.isRefered ? "employee" : "company"}`}
                        >
                          {c.isRefered ? "👤 Added by Employee" : "🏢 Added by Company"}
                        </span>
                      )}


                      {c.status === 0 && (
                        <div className="pending-actions">
                          <button
                            className="approve-btn"
                            onClick={() => handleApprove(c)}
                          >
                            ✔ Approve
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() => {
                              setSelectedCandidate(c);
                              setShowRejectModal(true);
                            }}
                          >
                            ✖ Reject
                          </button>
                        </div>
                      )}

                      {c.employerNote && (
                        <div className="system-note">
                          Note: {c.employerNote}
                        </div>
                      )}
                    </div>

                    <div>
                      <p>
                        <strong>Role:</strong> {c.role}
                      </p>
                      <p>
                        <strong>Certifications:</strong>{" "}
                        {c.certifications.length > 0 ? c.certifications.join(", ") : "—"}
                      </p>

                    </div>
                  </div>
                ))}
              </div>
            </>
          )}



          {showRejectModal && selectedCandidate && (
            <div className="modal-backdrop">
              <div className="modal">
                <h3>Reject Candidate</h3>

                <p>
                  Please provide a reason for rejecting{" "}
                  <strong>{selectedCandidate.companyEmployeeId}</strong>
                </p>

                <textarea
                  className="text-area"
                  rows={4}
                  placeholder="Enter rejection remark"
                  value={rejectRemark}
                  onChange={(e) => setRejectRemark(e.target.value)}
                  style={{ width: "100%", marginTop: 12 }}
                />

                <div className="modal-actions">
                  <button className="reject-btn" onClick={handleRejectConfirm}>
                    Confirm Reject
                  </button>

                  <button className="cancel"
                    onClick={() => {
                      setRejectRemark("");
                      setShowRejectModal(false);
                      setSelectedCandidate(null);
                    }}
                  >
                    Cancel
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

/* ================= HELPER ================= */

function getCompanyIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.companyId;
  } catch {
    return null;
  }
}
