import { useEffect, useState } from "react";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/ReviewCandidates.css";
import GlobalLoader from "../../Components/common/GlobalLoader";
import AppFooter from "../../Components/common/AppFooter";
import { toast } from "react-toastify";


/* ================= HELPERS ================= */

const getCompanyIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.companyId;
  } catch {
    return null;
  }
};




export default function ReviewCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState({});


  const isFutureDate = (dateStr) => {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    const today = new Date();

    // Remove time part for accurate comparison
    today.setHours(0, 0, 0, 0);

    return selected > today;
  };


  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [rejectRemark, setRejectRemark] = useState("");


  const handleEditSubmit = async () => {
    try {
      const payload = {
        ...editForm,
        certifications: editForm.certifications
          ? editForm.certifications.split(",").map((c) => c.trim())
          : [],
      };
  
      await fetch(
        `https://sp-portal-backend-production.up.railway.app/api/Supplier/manual-upload/${editForm.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
  
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === editForm.id
            ? {
                ...c,
                ...payload, // certifications is ARRAY again
              }
            : c
        )
      );
  
      // ✅ SUCCESS TOAST
      toast.success("Candidate details updated successfully");
  
      // ✅ Close modal
      setShowEditModal(false);
    } catch {
      toast.error("Failed to update candidate");
    }
  };
  


  const handleEditOpen = (candidate) => {
    let certs = [];

    if (Array.isArray(candidate.certifications)) {
      certs = candidate.certifications.filter(Boolean);
    } else if (typeof candidate.certifications === "string") {
      certs = [candidate.certifications];
    }

    setEditForm({
      ...candidate,
      certifications: certs.join(", "),
    });

    setShowEditModal(true);
  };


  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const companyId = getCompanyIdFromToken();
    if (!companyId) {
      setLoading(false);
      return;
    }

    fetch(
      `https://sp-portal-backend-production.up.railway.app/api/hr/capacities?companyId=${companyId}&filter=all`
    )
      .then((res) => res.json())
      .then((data) => setCandidates(data || []))
      .catch(() => setCandidates([]))
      .finally(() => setLoading(false));
  }, []);

  const pendingCandidates = candidates.filter((c) => c.status === 0);
  const hasPending = pendingCandidates.length > 0;

  /* ================= ACTION HANDLERS ================= */

  const handleApprove = async (candidate) => {
    try {
      await fetch(
        `https://sp-portal-backend-production.up.railway.app/api/hr/capacities/${candidate.id}/approve`,
        { method: "POST" }
      );

      setCandidates((prev) => prev.filter((c) => c.id !== candidate.id));
      setShowModal(false);
    } catch {
      toast.error("Failed to approve candidate");
    }
  };

  const handleReject = async () => {
    if (!rejectRemark.trim()) {
      toast.warning("Please enter rejection remark");
      return;
    }

    try {
      await fetch(
        `https://sp-portal-backend-production.up.railway.app/api/hr/capacities/${selectedCandidate.id}/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rejectRemark),
        }
      );

      setCandidates((prev) =>
        prev.filter((c) => c.id !== selectedCandidate.id)
      );

      setRejectRemark("");
      setShowRejectModal(false);
      setShowModal(false);
    } catch {
      toast.error("Failed to reject candidate");
    }
  };

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <>
      <AppHeader />

      <div className="app-shell">
        <AppSidebar unlocked active="Review Your Candidates" />

        <main className="app-content review-page">
          {/* HERO */}
          <section className="review-hero">
            👥 Review & Validate Employee Submissions
          </section>

          {/* TITLE + DESC (RESTORED) */}
          <h2 className="page-title">Review Your Candidates</h2>

          <p className="page-desc">
            Review and validate candidate information submitted through the
            Employee Capacity Confirmation link (Option 3).
          </p>

          <div className="info-box">
            ℹ️ Candidates listed below have self-submitted their capacity details.
            Your review and approval are required.
          </div>

          {/* ================= FIRST TIME USER ================= */}
          {!hasPending && (
            <div className="empty-state">
              <div className="empty-icon">⬆️</div>
              <h3>Welcome, First Time User!</h3>
              <p>
                Upload candidate information using <strong>Option 3</strong>.
              </p>
            </div>
          )}

          {/* ================= TABLE ================= */}
          {hasPending && (
  <div className="table-card">
    <div className="table-card-header">
      <h3 className="table-title">
        Pending Review ({pendingCandidates.length})
      </h3>
    </div>

    <div className="table-scroll">
      <table className="c-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Role</th>
            <th>Submitted By</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {pendingCandidates.map((c) => (
            <tr key={c.id}>
              <td>
                <div className="emp-id">
                  <div className="emp-main">{c.id || "-"}</div>
                  <div className="emp-sub">({c.companyEmployeeId || "—"})</div>
                </div>
              </td>

              <td>{c.role || c.jobTitle || "-"}</td>

              <td>
                <span className="status-pill pending">Employee</span>
              </td>

              <td>
                <div className="action-stack">
                  <button className="btn-pill btn-approve" onClick={() => handleApprove(c)}>
                    ✔ Approve
                  </button>

                  <button
                    className="btn-pill btn-reject"
                    onClick={() => {
                      setSelectedCandidate(c);
                      setShowRejectModal(true);
                    }}
                  >
                    ✖ Reject
                  </button>

                  <button className="btn-pill btn-edit" onClick={() => handleEditOpen(c)}>
                    ✎ Edit
                  </button>

                  <button
                    className="btn-pill btn-view"
                    onClick={() => {
                      setSelectedCandidate(c);
                      setShowModal(true);
                    }}
                  >
                    👁 View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

        </main>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {showModal && selectedCandidate && (
        <div className="cv-modal-backdrop">
          <div className="cv-modal">
            <div className="cv-header">
              <div>
                <h3>View Complete Candidate Details</h3>
                <p>Review all submitted information for this candidate.</p>
              </div>
              <button className="cv-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            {/* PROFESSIONAL INFORMATION */}
            <Section title="Professional Information">
              <InfoGrid
                items={[
                  { label: "Job Title", value: selectedCandidate.jobTitle || "-" },
                  { label: "Role", value: selectedCandidate.role || "-" },
                  {
                    label: "Total Experience",
                    value: `${selectedCandidate.totalExperience ?? "-"} yrs`,
                  },
                  { label: "Gender", value: selectedCandidate.gender || "-" },
                  { label: "Location", value: selectedCandidate.location || "-" },
                  { label: "Working Since", value: selectedCandidate.workingSince || "-" },
                ]}
              />
            </Section>

            {/* EMPLOYMENT DETAILS */}
            <Section title="Employment Details">
              <InfoGrid
                items={[
                  {
                    label: "CTC",
                    value:
                      selectedCandidate.ctc !== undefined
                        ? `₹ ${selectedCandidate.ctc} LPA`
                        : "-",
                  },
                  {
                    label: "Number of Projects",
                    value: selectedCandidate.numberOfProjects ?? "-",
                  },
                  {
                    label: "Referred",
                    value: selectedCandidate.isRefered ? "Yes" : "No",
                  },
                  {
                    label: "Company Name",
                    value: selectedCandidate.companyName || "-",
                  },
                ]}
              />
            </Section>

            {/* SKILLS */}
            <Section title="Skills & Tools">
              <InfoGrid
                items={[
                  {
                    label: "Technical Skills",
                    value: selectedCandidate.technicalSkills || "-",
                  },
                  { label: "Tools", value: selectedCandidate.tools || "-" },
                ]}
              />
            </Section>

            {/* CERTIFICATIONS */}
            <Section title="Certifications">
              {Array.isArray(selectedCandidate.certifications) &&
                selectedCandidate.certifications.length > 0 ? (
                <ul className="cv-list">
                  {selectedCandidate.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              ) : (
                <p className="cv-empty">No certifications provided</p>
              )}
            </Section>


            {/* EMPLOYER NOTE */}
            <Section title="Employer Note">
              <p className="cv-note">
                {selectedCandidate.employerNote?.trim() || "No additional notes provided."}
              </p>
            </Section>






            <div className="cv-footer">




              <button className="cv-close-btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= REJECT MODAL ================= */}
      {showRejectModal && selectedCandidate && (
        <div className="cv-modal-backdrop">
          <div className="cv-modal">
            <h3>Reject Candidate</h3>

            <textarea
              className="text-area"
              rows={4}
              placeholder="Enter rejection remark"
              value={rejectRemark}
              onChange={(e) => setRejectRemark(e.target.value)}
              style={{ width: "100%", marginTop: 12 }}
            />

            <div className="cv-footer">
              <button className="reject01" onClick={handleReject}>
                Confirm Reject
              </button>

              <button className="cancel"
                onClick={() => {
                  setRejectRemark("");
                  setShowRejectModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ================= EDIT MODAL ================= */}
      {showEditModal && editForm && (
  <div className="cv-modal-backdrop">
    <div className="cv-modal">
      <div className="cv-header">
        <h3>Edit Candidate Details</h3>
        <button className="cv-close" onClick={() => setShowEditModal(false)}>
          ✕
        </button>
      </div>

      <div className="cv-grid">
        <EditField
          label="Company Employee ID"
          value={editForm.companyEmployeeId}
          onChange={(v) => handleEditChange("companyEmployeeId", v)}
        />

        <EditField
          label="Job Title"
          value={editForm.jobTitle}
          onChange={(v) => handleEditChange("jobTitle", v)}
        />

        {/* 🔽 label aligned with form */}
        <EditField
          label="I Can Be"
          value={editForm.role}
          onChange={(v) => handleEditChange("role", v)}
        />

        {/* 🔽 ONLY real structural change (dropdown instead of text) */}
        <div className="form-field" id="lo">
          <label >Gender *</label>
          <select
            value={editForm.gender || ""}
            onChange={(e) => handleEditChange("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <EditField
          label="Location"
          value={editForm.location || ""}
          onChange={(v) => handleEditChange("location", v)}
        />

        <EditField
          label="Total Years of Experience"
          type="number"
          step="0.1"
          value={editForm.totalExperience}
          onChange={(v) => handleEditChange("totalExperience", v)}
        />

        <EditField
          label="CTC"
          type="number"
          value={editForm.ctc}
          onChange={(v) => handleEditChange("ctc", v)}
        />

        <EditField
          label="Technical Skills"
          value={editForm.technicalSkills || ""}
          onChange={(v) => handleEditChange("technicalSkills", v)}
        />

        <EditField
          label="Tools"
          value={editForm.tools || ""}
          onChange={(v) => handleEditChange("tools", v)}
        />

        <EditField
          label="Number of Projects"
          type="number"
          value={editForm.numberOfProjects}
          onChange={(v) => handleEditChange("numberOfProjects", v)}
        />

        <EditField
          label="Certifications (comma separated)"
          value={editForm.certifications}
          onChange={(v) => handleEditChange("certifications", v)}
        />

        <EditField
          label="Working Since"
          type="date"
          value={editForm.workingSince?.substring(0, 10) || ""}
          onChange={(v) => {
            if (isFutureDate(v)) {
              setEditErrors((prev) => ({
                ...prev,
                workingSince: "Working Since date cannot be in the future",
              }));
            } else {
              setEditErrors((prev) => ({
                ...prev,
                workingSince: "",
              }));
            }

            handleEditChange("workingSince", v);
          }}
        />

        {editErrors.workingSince && (
          <p className="form-error">{editErrors.workingSince}</p>
        )}
      </div>

      <div className="cv-footer">
        <button className="approve" onClick={handleEditSubmit}>
          💾 Save Changes
        </button>
        <button onClick={() => setShowEditModal(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}

      <AppFooter />
    </>
  );
}

/* ================= SUB COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div className="cv-section">
      <div className="cv-section-title">
        <span className="cv-line" />
        {title}
      </div>
      {children}
    </div>
  );
}

function InfoGrid({ items }) {
  return (
    <div className="cv-grid">
      {items.map((item, idx) => (
        <div key={idx} className="cv-grid-item">
          <span className="cv-label">{item.label}</span>
          <span className="cv-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function EditField({ label, value, onChange, type = "text" }) {
  return (
    <div className="cv-grid-item">
      <span className="cv-label">{label}</span>
      <input
        className="cv-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}



