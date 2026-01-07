import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/MyCompanyDetails.css";
import GlobalLoader from "../../Components/common/GlobalLoader";
import AppFooter from "../../Components/common/AppFooter"; 
import ChangePasswordModal from "./changePassword";
import { toast } from "react-toastify";



const FieldKeyMap = {
  // ===== Company Information =====
  companyName: "CompanyName",
  companyWebsite: "CompanyWebsite",
  businessType: "BusinessType",
  companySize: "CompanySize",
  yearEstablished: "YearEstablished",
  companyOverview: "CompanyOverview",
  domainExpertise: "DomainExpertise",
  totalProjectsExecuted: "TotalProjectsExecuted",

  // ===== Address =====
  addressLine1: "AddressLine1",
  addressLine2: "AddressLine2",
  city: "City",
  state: "State",
  postalCode: "PostalCode",
  country: "Country",

  // ===== Primary Contact =====
  primaryContactName: "PrimaryContactName",
  primaryContactRole: "PrimaryContactRole",
  primaryContactEmail: "PrimaryContactEmail",
  primaryContactPhone: "PrimaryContactPhone",

  // ===== Secondary Contact =====
  secondaryContactName: "SecondaryContactName",
  secondaryContactRole: "SecondaryContactRole",
  secondaryContactEmail: "SecondaryContactEmail",
  secondaryContactPhone: "SecondaryContactPhone",

  // ===== Certifications =====
  certifications: "Certifications"
};



export default function MyCompanyDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestEdit, setShowRequestEdit] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [newValue, setNewValue] = useState("");
  const [reason, setReason] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
 
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

    fetch(`https://sp-portal-backend-production.up.railway.app/api/company/details?companyId=${companyId}`)
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


    const getCurrentValue = () => {
      switch (selectedField) {
        // ===== Primary Contact =====
        case "primaryContactName":
          return primaryContact?.contactName ?? "";
        case "primaryContactRole":
          return primaryContact?.roleDesignation ?? "";
        case "primaryContactEmail":
          return primaryContact?.email ?? "";
        case "primaryContactPhone":
          return primaryContact?.phone ?? "";
    
        // ===== Secondary Contact =====
        case "secondaryContactName":
          return secondaryContact?.contactName ?? "";
        case "secondaryContactRole":
          return secondaryContact?.roleDesignation ?? "";
        case "secondaryContactEmail":
          return secondaryContact?.email ?? "";
        case "secondaryContactPhone":
          return secondaryContact?.phone ?? "";
    
        // ===== Address =====
        case "addressLine1":
          return address?.addressLine1 ?? "";
        case "addressLine2":
          return address?.addressLine2 ?? "";
        case "city":
          return address?.city ?? "";
        case "state":
          return address?.state ?? "";
        case "postalCode":
          return address?.postalCode ?? "";
        case "country":
          return address?.country ?? "";
    
        // ===== Certifications =====
        case "certifications":
          return data.certifications?.map(c => c.certificationName).join(", ") ?? "";
    
        // ===== Default (Company fields) =====
        default:
          return data[selectedField] ?? "";
      }
    };
    

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
                   <option value="companyName">Company Name</option>
<option value="companyWebsite">Company Website</option>
<option value="businessType">Business Type</option>
<option value="companySize">Company Size</option>
<option value="yearEstablished">Year Established</option>
<option value="companyOverview">Company Overview</option>
<option value="domainExpertise">Domain Expertise</option>
<option value="totalProjectsExecuted">Total Projects Executed</option>

<option value="addressLine1">Address Line 1</option>
<option value="addressLine2">Address Line 2</option>
<option value="city">City</option>
<option value="state">State</option>
<option value="postalCode">Postal Code</option>
<option value="country">Country</option>

<option value="primaryContactName">Primary Contact Name</option>
<option value="primaryContactRole">Primary Contact Role</option>
<option value="primaryContactEmail">Primary Contact Email</option>
<option value="primaryContactPhone">Primary Contact Phone</option>

<option value="secondaryContactName">Secondary Contact Name</option>
<option value="secondaryContactRole">Secondary Contact Role</option>
<option value="secondaryContactEmail">Secondary Contact Email</option>
<option value="secondaryContactPhone">Secondary Contact Phone</option>

<option value="certifications">Certifications</option>

                  </select>
                </div>

                <div>
                  <label>Current Value</label>
                  <input
                    disabled
                    value={getCurrentValue()}
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
                      "https://sp-portal-backend-production.up.railway.app/company/change-request",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          companyId: data.id,
                          fieldKey: FieldKeyMap[selectedField],
                          oldValue: getCurrentValue().toString(),
                          newValue,
                          reason,
                        }),
                      }
                    );

                    setShowRequestEdit(false);
                    setSelectedField("");
                    setNewValue("");
                    setReason("");
                    toast.success("Change request submitted");
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


          <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />


        </main>
      </div>
      <AppFooter/>
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
