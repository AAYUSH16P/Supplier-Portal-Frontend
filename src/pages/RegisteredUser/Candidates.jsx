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


function CertCell({ certs }) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? certs : certs.slice(0, 2);
  const hasMore = certs.length > 2;

  return (
    <div className="cert-cell">
      <ul className="cert-list">
        {visible.map((x, idx) => (
          <li key={idx}>{x}</li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className="cert-more-btn"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : `+${certs.length - 2} more`}
        </button>
      )}
    </div>
  );
}


const normalizeCertifications = (certifications, technicalSkills) => {
  if (Array.isArray(certifications) && certifications.length > 0) {
    return certifications
      .map(c =>
        typeof c === "string"
          ? c
          : c?.certificationName || c?.name || c?.title || ""
      )
      .filter(Boolean);
  }

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

  const getRejectionRemark = (id) => {
    return rejectedApiList.find(r => r.id === id)?.remark;
  };

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
    <div className="action-bar full-width">
      <div className="upload-cta spread">
        <span className="upload-cta-text">Upload a new candidate</span>

        <button
          className="upload-btn"
          onClick={() => navigate("/capacityRegistration")}
        >
          <span className="upload-btn-icon">⬆</span>
          Upload More Candidates
        </button>
      </div>
    </div>

    {/* ✅ TABLE CARD UI (paste here) */}
    <div className="table-card">
      <div className="table-card-header">
        <h3>
          {activeFilter === "all"
            ? "All Candidates"
            : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}{" "}
          ({filteredCapacities.length})
        </h3>
      </div>

      <div className="table-scroll">
        <table className="c-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Role</th>
              <th>Working Since</th>
              <th>Experience</th>
              <th>Certifications</th>
              <th>Status</th>
              <th>Rejection Remark</th>
            </tr>
          </thead>

          <tbody>
            {filteredCapacities.map((c) => {
              const remark = c.status === 2 ? getRejectionRemark(c.id) : null;

              const certs =
                Array.isArray(c.certifications) && c.certifications.length > 0
                  ? c.certifications
                      .map((x) =>
                        typeof x === "string" ? x : x?.certificationName
                      )
                      .filter(Boolean)
                  : [];

              return (
                <tr key={c.id}>
                  <td>
                    <div className="emp-id">
                      <div className="emp-main">{c.id || "-"}</div>
                      <div className="emp-sub">({c.companyEmployeeId || "—"})</div>
                    </div>
                  </td>

                  <td>{c.role || "—"}</td>

                  {/* if you don't have workingSince, keep "—" */}
                  <td>{c.workingSince || "—"}</td>

                  <td>{c.totalExperience ? `${c.totalExperience} years` : "—"}</td>

                  <td>
  {certs.length > 0 ? (
    <CertCell certs={certs} />
  ) : (
    <span className="muted-italic">No certifications</span>
  )}
</td>


                  <td>
                    {c.status === 1 && (
                      <span className="status-pill approved">Approved</span>
                    )}
                    {c.status === 0 && (
                      <span className="status-pill pending">Pending</span>
                    )}
                    {c.status === 2 && (
                      <span className="status-pill rejected">Rejected</span>
                    )}
                  </td>

                  <td>
                    {c.status === 2 ? (
                      <span className="reject-text">{remark || "—"}</span>
                    ) : (
                      <span className="dash">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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

                  <button className="reject-btn" id="abce"
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
