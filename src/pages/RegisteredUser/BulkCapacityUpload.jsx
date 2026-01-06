import "../../style/RegisteredUser/BulkCapacityUpload.css";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import { useRef } from "react";
import { toast } from "react-toastify";
import AppFooter from "../../Components/common/AppFooter"; 
import {  useNavigate } from "react-router-dom";


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

/* ================= DOWNLOAD TEMPLATE ================= */

const handleDownloadTemplate = () => {
  const link = document.createElement("a");
  link.href = "/templates/bulk-capacity-template.xlsx";
  link.download = "Bulk_Capacity_Template.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/* ================= FILE UPLOAD ================= */

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const allowedTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (!allowedTypes.includes(file.type)) {
    toast.error("Please upload a valid Excel file (.xls or .xlsx)");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("File size must be under 5MB");
    event.target.value = "";
    return;
  }

  const companyId = getCompanyIdFromToken();
  if (!companyId) {
    toast.error("Company information not found. Please login again.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      `https://sp-portal-backend-production.up.railway.app/api/Supplier/${companyId}/bulk-upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    let data = null;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      toast.error(data?.message || "Upload failed");
      return;
    }

    toast.success(
      data?.message || "Upload successful. Processing started."
    );
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong during upload");
  } finally {
    event.target.value = "";
  }
};


/* ================= COMPONENT ================= */

export default function BulkCapacityUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  return (
    <>
      <AppHeader />

      <div className="app-shell">
        <AppSidebar unlocked active="Candidates" />

        <main className="bulk-page">
          {/* TOP GREEN BANNER */}
          <div className="bulk-top-banner">
            📊 Upload Bulk Capacity Using Structured Excel Template
          </div>

          {/* BACK LINK */}
          <div
  className="bulk-back"
  onClick={() => navigate("/candidate")}
>
  ← Back to Candidates
</div>

          {/* TITLE CARD */}
          <div className="bulk-card bulk-title-card">
            <div className="bulk-icon green">📄</div>
            <h2>Bulk Capacity Upload (Excel Template)</h2>
          </div>

          {/* INFO CARD */}
          <div className="bulk-card info-card">
            <div className="bulk-icon light-green">ℹ️</div>
            <p>
              Use this option to prepare and upload indicative capacity in bulk
              using a structured Excel template. All records are initially saved
              as indicative and will become active only after SLA signing and
              approval.
            </p>
          </div>

          {/* WARNING CARD */}
          <div className="bulk-card warning-card">
            <div className="bulk-icon yellow">🛡️</div>
            <p>
              Uploaded capacity is not activated or shared until explicitly
              approved. This upload supports structured planning ahead of demand.
            </p>
          </div>

          <section className="bulk-upload">
            {/* GUIDELINES */}
            <div className="guidelines-card">
              <div className="guidelines-title">
                <span className="info-icon">ℹ️</span>
                <span className="line" />
                Important Guidelines
              </div>

              <ul className="guidelines-list">
                <li>Maximum 100 candidates per Excel file</li>
                <li>Do not modify template headers</li>
                <li>Required fields must be filled</li>
                <li>Date format: YYYY-MM-DD</li>
                <li>File size max: 5MB</li>
                <li>Supported: .xls, .xlsx</li>
              </ul>
            </div>

            {/* STEP 1 */}
            <div className="step-card green">
              <div className="step-left">
                <div className="step-icon green">⬇</div>
                <div>
                  <h3>Step 1: Download Template</h3>
                  <p>Get the Excel template</p>
                </div>
              </div>
              <button className="btn-green" onClick={handleDownloadTemplate}>
                ⬇ Download Template
              </button>
            </div>

            {/* STEP 2 */}
            <div className="step-card blue">
              <div className="step-left">
                <div className="step-icon blue">⬆</div>
                <div>
                  <h3>Step 2: Upload Filled Template</h3>
                  <p>Upload your completed Excel file</p>
                </div>
              </div>

              <input
                type="file"
                accept=".xls,.xlsx"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />

              <button
                className="btn-blue"
                onClick={() => fileInputRef.current.click()}
              >
                ⬆ Upload File
              </button>
            </div>
          </section>
        </main>
      </div>
      <AppFooter/>
    </>
  );
}
