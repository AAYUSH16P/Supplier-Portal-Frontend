import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/MyCompanyDetails.css";
import GlobalLoader from "../../Components/common/GlobalLoader";


const FieldKeyMap = {
  companyName: "CompanyName",
  companyWebsite: "CompanyWebsite",
  businessType: "BusinessType",
  companySize: "CompanySize",
  yearEstablished: "YearEstablished",
  companyOverview: "CompanyOverview",
  domainExpertise: "DomainExpertise",
  totalProjectsExecuted: "TotalProjectsExecuted",
};

const getSupplierIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.companyId ;
  } catch {
    return null;
  }
};





export default function MyCompanyDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestEdit, setShowRequestEdit] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [newValue, setNewValue] = useState("");
  const [reason, setReason] = useState("");

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");



  const isFormValid =
    selectedField &&
    newValue.trim().length > 0 &&
    reason.trim().length > 0;


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    let companyId;
    try {
      const decoded = jwtDecode(token);
      companyId = decoded.companyId;
    } catch (err) {
      console.error("Invalid token", err);
      setLoading(false);
      return;
    }

    if (!companyId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5035/api/company/details?companyId=${companyId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* =========================
     LOADING
     ========================= */
  if (loading) {
    return <GlobalLoader />;
  }

  /* =========================
     NO DATA
     ========================= */
  if (!data) {
    return (
      <>
        <AppHeader />
        <div className="company-layout">
          <AppSidebar unlocked active="My Details" />
          <main className="company-page">
            <p style={{ padding: "24px" }}>No company details found.</p>
          </main>
        </div>
      </>
    );
  }

  const primaryContact = data.contacts?.find(
    (c) => c.contactType === "PRIMARY"
  );
  const secondaryContact = data.contacts?.find(
    (c) => c.contactType === "SECONDARY"
  );
  const address = data.addresses?.[0];

  const domainList = data.domainExpertise
    ? data.domainExpertise.split(",").map((d) => d.trim())
    : [];

  return (
    <>
      <AppHeader />

      <div className="company-layout">
        <AppSidebar unlocked active="My Details" />

        <main className="company-page">
          {/* HERO */}
          <section className="company-hero">
            <div className="hero-left">
              <div className="hero-icon">🏢</div>
              <div>
                <h1>My Company Details</h1>
                <p>Keep Your Information Current and Accurate</p>
              </div>
            </div>
            <div className="hero-actions vertical">
              <button
                className="request-btn"
                onClick={() => setShowRequestEdit(true)}
              >
                ✏️ Request Edit
              </button>

              <button
                className="secondary-btn"
                onClick={() => setShowChangePassword(true)}
              >
                🔒 Change Password
              </button>
            </div>


          </section>


          {showRequestEdit && (
            <section className="change-request-card">
              <h3>Request Changes to Company Details</h3>

              <div className="cr-grid">
                <div>
                  <label>
                    Field to Update <span className="required">*</span>
                  </label>
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                  >
                    <option value="">Select field...</option>
                    <option value="companyName">Company Name</option>
                    <option value="companyWebsite">Website</option>
                    <option value="businessType">Business Type</option>
                    <option value="companySize">Company Size</option>
                    <option value="yearEstablished">Year Established</option>
                    <option value="domainExpertise">Domain Expertise</option>
                    <option value="totalProjectsExecuted">
                      Total Projects Executed
                    </option>
                  </select>
                </div>

                <div>
                  <label>Current Value</label>
                  <input
                    disabled
                    value={
                      selectedField ? data[selectedField] ?? "" : ""
                    }
                    placeholder="What is the current value?"
                  />
                </div>

                <div>
                  <label>Requested New Value <span className="required">*</span></label>
                  <input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="What should it be changed to?"
                  />
                </div>

                <div>
                  <label>Reason for Change <span className="required">*</span></label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please explain why this change is needed..."
                  />
                </div>
              </div>

              <div className="cr-actions">
                <button
                  className="btn-outline"
                  onClick={() => setShowRequestEdit(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn-primary"
                  disabled={!isFormValid}
                  onClick={async () => {
                    await fetch(
                      "http://localhost:5035/company/change-request",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          companyId: data.id,
                          fieldKey: FieldKeyMap[selectedField],
                          oldValue: data[selectedField]?.toString() ?? "",
                          newValue,
                          reason,
                        }),
                      }
                    );

                    setShowRequestEdit(false);
                    setSelectedField("");
                    setNewValue("");
                    setReason("");
                    alert("Change request submitted");
                  }}
                >
                  Submit Request
                </button>

              </div>
            </section>
          )}



          {/* GRID */}
          <section className="company-grid">
            {/* COMPANY INFORMATION */}
            <div className="company-card">
              <h3>🏢 Company Information</h3>

              <div className="info-grid">
                {data.companyName && (
                  <Info label="Company Name" value={data.companyName} />
                )}
                {data.companyWebsite && (
                  <Info label="Website" value={data.companyWebsite} />
                )}
                {data.businessType && (
                  <Info label="Business Type" value={data.businessType} />
                )}
                {data.companySize && (
                  <Info label="Company Size" value={data.companySize} />
                )}
                {data.yearEstablished && (
                  <Info
                    label="Year Established"
                    value={data.yearEstablished}
                  />
                )}
                {data.totalProjectsExecuted !== null && (
                  <Info
                    label="Total Projects Executed"
                    value={data.totalProjectsExecuted}
                  />
                )}
              </div>
            </div>

            {/* PRIMARY CONTACT */}
            {primaryContact && (
              <div className="company-card">
                <h3>📧 Primary Contact</h3>
                <div className="info-grid">
                  <Info
                    label="Contact Name"
                    value={primaryContact.contactName}
                  />
                  <Info
                    label="Contact Role"
                    value={primaryContact.roleDesignation}
                  />
                  <Info label="Email" value={primaryContact.email} />
                  <Info label="Phone" value={primaryContact.phone} />
                </div>
              </div>
            )}

            {/* SECONDARY CONTACT */}
            {secondaryContact && (
              <div className="company-card">
                <h3>👥 Secondary Contact</h3>
                <div className="info-grid">
                  <Info
                    label="Name"
                    value={secondaryContact.contactName}
                  />
                  <Info
                    label="Role"
                    value={secondaryContact.roleDesignation}
                  />
                  <Info label="Email" value={secondaryContact.email} />
                  <Info label="Phone" value={secondaryContact.phone} />
                </div>
              </div>
            )}

            {/* ADDRESS */}
            {address && (
              <div className="company-card">
                <h3>📍 Address</h3>
                <p className="address-text">
                  {address.addressLine1}
                  <br />
                  {address.addressLine2 && (
                    <>
                      {address.addressLine2}
                      <br />
                    </>
                  )}
                  {address.city}, {address.state}
                  <br />
                  {address.postalCode}, {address.country}
                </p>
              </div>
            )}

            {/* EXECUTIVE SUMMARY */}
            {data.companyOverview && (
              <div className="company-card">
                <h3>📝 Executive Summary</h3>
                <p className="summary-text">{data.companyOverview}</p>
              </div>
            )}

            {/* CERTIFICATIONS */}
            <div className="company-card">
              <h3>🏅 Certifications</h3>
              {data.certifications?.length > 0 ? (
                <div className="tag-list green">
                  {data.certifications.map((cert) => (
                    <span key={cert.id}>{cert.certificationName}</span>
                  ))}
                </div>
              ) : (
                <span className="muted">No certifications</span>
              )}
            </div>

            {/* DOMAIN EXPERTISE */}
            <div className="company-card">
              <h3>🧠 Domain Expertise</h3>
              {domainList.length > 0 ? (
                <div className="tag-list blue">
                  {domainList.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              ) : (
                <span className="muted">Not specified</span>
              )}
            </div>

            {/* FOOTER NOTE */}
            <div className="company-card note">
              <h4>Need to Update?</h4>
              <p>
                All fields are protected. Click{" "}
                <strong>Request Edit</strong> to submit changes. Admin team will
                review within 5 business days.
              </p>
            </div>
          </section>


          {showChangePassword && (
            <div className="modal-backdrop">
              <div className="modal-card password-modal">
                <div className="modal-header">
                  <h3>Change Password</h3>
                  <button onClick={() => setShowChangePassword(false)}>✕</button>
                </div>

                <div className="modal-body">


                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Re-type New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                    />
                  </div>
                </div>
                
                {passwordError && (
                    <p
                      className="error-text"
                      style={{ textAlign: "center" }}
                    >
                      {passwordError}
                    </p>
                  )}
                <div className="modal-footer">

                 
                  <button
                    className="btn-outline"
                    onClick={() => setShowChangePassword(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn-primary"
                    onClick={async () => {
                      if (!currentPassword || !newPassword || !confirmPassword) {
                        setPasswordError("All fields are required");
                        return;
                      }

                      if (newPassword !== confirmPassword) {
                        setPasswordError("New passwords do not match");
                        return;
                      }

                      setPasswordError("");

                      const supplierId = getSupplierIdFromToken();
                      if (!supplierId) {
                        setPasswordError("Session expired. Please login again.");
                        return;
                      }

                      try {
                        const res = await fetch(
                          `http://localhost:5035/api/Supplier/${supplierId}/set-password`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              accept: "*/*",
                            },
                            body: JSON.stringify({
                              currentPassword,
                              password: newPassword,
                            }),
                          }
                        );

                        if (!res.ok) {
                          throw new Error("Current password is incorrect");
                        }

                        alert("Password changed successfully");

                        setShowChangePassword(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPasswordError("");

                      } catch (err) {
                        setPasswordError(err.message);
                      }
                    }}
                  >
                    Update Password
                  </button>

                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

/* ===== Helper Component ===== */
function Info({ label, value }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
