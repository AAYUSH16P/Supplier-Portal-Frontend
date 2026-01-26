import { useRef, useState } from "react";
import "../../style/RegisteredUser/AddEmployee.css";
import "../../style/RegisteredUser/AddCapacityManually.css";
import "../../style/RegisteredUser/BulkCapacityUpload.css"; // optional if you want same styles
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import InfoTooltip from "../../Components/InfoTooltip";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitManualCapacity } from "../../services/supplier";

export default function AddEmployee() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Modal
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [activeOption, setActiveOption] = useState(null);

    // Suppliers
    const [suppliers, setSuppliers] = useState([]);
    const [supplierLoading, setSupplierLoading] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState("");
    const [selectedSupplierName, setSelectedSupplierName] = useState("");

    // Option2 upload state
    const [uploading, setUploading] = useState(false);

    // Option3 invite link state
    const [generatedLink, setGeneratedLink] = useState("");
    const [referenceCode, setReferenceCode] = useState("");

    // Capacity form (Option1)
    const [certifications, setCertifications] = useState([""]);
    const [employerNote, setEmployerNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [capacityForm, setCapacityForm] = useState({
        employeeId: "",
        workingSince: "",
        ctc: "",
        jobTitle: "",
        role: "",
        gender: "",
        location: "",
        experience: "",
        skills: "",
        tools: "",
        projects: "",
    });

    const [errors, setErrors] = useState({});

    const requiredFields = new Set([
        "employeeId",
        "workingSince",
        "ctc",
        "jobTitle",
        "role",
        "gender",
        "location",
        "experience",
        "skills",
        "tools",
        "projects",
    ]);

    const Label = ({ name, children }) => (
        <label>
            {children}
            {requiredFields.has(name) && <InfoTooltip field={name} trigger="*" />}
        </label>
    );

    // ===== Suppliers load =====
    const openOptionModal = async (optionKey) => {
        setActiveOption(optionKey);
        setShowOptionModal(true);

        if (suppliers.length > 0) return;

        try {
            setSupplierLoading(true);
            const res = await fetch(
                "https://sp-portal-backend-production.up.railway.app/api/Supplier/All-supplier",
                { headers: { accept: "*/*" } }
            );

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "Failed to load suppliers");
            }

            const data = await res.json();
            setSuppliers(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            toast.error("Failed to load suppliers");
        } finally {
            setSupplierLoading(false);
        }
    };

    const resetModalState = () => {
        setSelectedSupplierId("");
        setSelectedSupplierName("");
        setErrors({});
        setEmployerNote("");
        setCertifications([""]);
        setCapacityForm({
            employeeId: "",
            workingSince: "",
            ctc: "",
            jobTitle: "",
            role: "",
            gender: "",
            location: "",
            experience: "",
            skills: "",
            tools: "",
            projects: "",
        });
        setIsSubmitting(false);
        setUploading(false);

        // Option 3 reset
        setGeneratedLink("");
        setReferenceCode("");

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const closeOptionModal = () => {
        setShowOptionModal(false);
        setActiveOption(null);
        resetModalState();
    };

    const handleSupplierChange = (e) => {
        const supplierId = e.target.value;
        setSelectedSupplierId(supplierId);

        const supplierObj =
            suppliers.find((s) => String(s.id || s.Id) === String(supplierId)) || null;

        const name =
            supplierObj?.companyName ||
            supplierObj?.CompanyName ||
            supplierObj?.company_name ||
            "";

        setSelectedSupplierName(name);

        if (supplierId) setErrors((prev) => ({ ...prev, supplier: "" }));

        setGeneratedLink("");
        setReferenceCode("");
    };

    // ===== Option1 (manual form) =====
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCapacityForm((prev) => ({ ...prev, [name]: value }));
        if (value?.toString().trim()) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!selectedSupplierId) newErrors.supplier = "Supplier is required";
        if (!capacityForm.employeeId.trim()) newErrors.employeeId = "Company Employee ID is required";

        if (!capacityForm.workingSince.trim()) {
            newErrors.workingSince = "Working Since date is required";
        } else {
            const d = new Date(capacityForm.workingSince);
            if (isNaN(d.getTime())) newErrors.workingSince = "Please enter a valid date";
        }

        if (!capacityForm.ctc.trim()) {
            newErrors.ctc = "CTC is required";
        } else {
            const n = parseFloat(capacityForm.ctc);
            if (isNaN(n) || n < 0) newErrors.ctc = "Please enter a valid positive number";
        }

        if (!capacityForm.jobTitle.trim()) newErrors.jobTitle = "Job Title is required";
        if (!capacityForm.role.trim()) newErrors.role = "Role is required";
        if (!capacityForm.gender.trim()) newErrors.gender = "Gender is required";
        if (!capacityForm.location.trim()) newErrors.location = "Location is required";

        if (!capacityForm.experience.trim()) {
            newErrors.experience = "Total Years of Experience is required";
        } else {
            const n = parseFloat(capacityForm.experience);
            if (isNaN(n) || n < 0) newErrors.experience = "Please enter a valid positive number";
        }

        if (!capacityForm.skills.trim()) newErrors.skills = "Technical Skills is required";
        if (!capacityForm.tools.trim()) newErrors.tools = "Tools is required";

        if (!capacityForm.projects.trim()) {
            newErrors.projects = "Number of Projects is required";
        } else {
            const n = parseInt(capacityForm.projects);
            if (isNaN(n) || n < 0) newErrors.projects = "Please enter a valid positive whole number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = () => {
        if (!selectedSupplierId) return false;
        const keys = [
            "employeeId",
            "workingSince",
            "ctc",
            "jobTitle",
            "role",
            "gender",
            "location",
            "experience",
            "skills",
            "tools",
            "projects",
        ];

        return keys.every((k) => {
            const v = capacityForm[k];
            if (!v || !v.trim()) return false;

            if (k === "ctc" || k === "experience") {
                const n = parseFloat(v);
                return !isNaN(n) && n >= 0;
            }
            if (k === "projects") {
                const n = parseInt(v);
                return !isNaN(n) && n >= 0;
            }
            if (k === "workingSince") return v.length === 10;
            return true;
        });
    };

    const handleSubmitCapacity = async () => {
        if (!validate()) {
            toast.error("Please fix all validation errors before submitting");
            return;
        }

        setIsSubmitting(true);

        try {
            const validCertifications = certifications.filter((c) => c.trim() !== "");

            const payload = {
                companyEmployeeId: capacityForm.employeeId.trim(),
                companyId: selectedSupplierId,
                isRefered: false,
                workingSince: capacityForm.workingSince,
                ctc: parseFloat(capacityForm.ctc),
                jobTitle: capacityForm.jobTitle.trim(),
                role: capacityForm.role.trim(),
                gender: capacityForm.gender.trim(),
                location: capacityForm.location.trim(),
                totalExperience: parseFloat(capacityForm.experience),
                technicalSkills: capacityForm.skills.trim(),
                tools: capacityForm.tools.trim(),
                numberOfProjects: parseInt(capacityForm.projects),
                employerNote: employerNote.trim() || "",
                certifications: validCertifications,
            };

            const response = await submitManualCapacity(payload);

            if (response.status === 200 || response.status === 201) {
                toast.success("Capacity record submitted successfully!");
                closeOptionModal();
            } else {
                toast.error("Failed to submit capacity record");
            }
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Failed to submit capacity record. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ===== Option2 (bulk upload) =====
    const handleDownloadTemplate = () => {
        const link = document.createElement("a");
        link.href = "/templates/bulk-capacity-template.xlsx";
        link.download = "Bulk_Capacity_Template.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!selectedSupplierId) {
            toast.error("Please select a supplier first");
            event.target.value = "";
            return;
        }

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

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);

            const response = await fetch(
                `https://sp-portal-backend-production.up.railway.app/api/Supplier/${selectedSupplierId}/bulk-upload`,
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

            toast.success(data?.message || "Upload successful. Processing started.");
            closeOptionModal();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong during upload");
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    };

    // ===== Option3 (Invite Link) =====
    const handleGenerateInviteLink = () => {
        if (!selectedSupplierId) {
            toast.error("Please select a supplier first");
            return;
        }

        // get supplier name (from dropdown selection)
        const supplierObj =
            suppliers.find((s) => String(s.id || s.Id) === String(selectedSupplierId)) || null;

        const supplierName =
            supplierObj?.companyName || supplierObj?.CompanyName || supplierObj?.company_name || "";

        if (!supplierName) {
            toast.error("Supplier name not found");
            return;
        }

        const encodedSupplierName = encodeURIComponent(supplierName);

        // ✅ Use your frontend base url
        const baseUrl = "https://supplier-portal-frontend-production.up.railway.app";

        // ✅ inviteId should be supplier companyId
        const link = `${baseUrl}/employeeInviteInfo?inviteId=${selectedSupplierId}&companyName=${encodedSupplierName}`;

        setGeneratedLink(link);
        setReferenceCode(selectedSupplierId);
    };


    const copyInviteLink = async () => {
        if (!generatedLink) {
            toast.error("No link to copy");
            return;
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(generatedLink);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = generatedLink;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }

            toast.success("Link copied to clipboard!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: false,
            });
        } catch {
            toast.error("Failed to copy link. Please copy manually.");
        }
    };

    return (
        <>
            <AppHeader />

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnHover={false}
            />

            <div className="admin-page">
                <div className="approval-banner">👥 Add & Manage Employees</div>

                <div className="approval-tabs">
                    <button className="tab" onClick={() => navigate("/supplierApprovals")}>
                        Supplier Approvals
                    </button>

                    <button className="tab" onClick={() => navigate("/candidate-validation")}>
                        Candidate Validation
                    </button>

                    <button className="tab" onClick={() => navigate("/request-for-change")}>
                        Request for Change
                    </button>

                    <button
                        className="tab"
                        onClick={() => navigate("/add-supplier")}
                    >
                        Add Supplier
                    </button>

                    <button className="tab active" onClick={() => navigate("/add-employee")}>
                        Add Employee
                    </button>

                 
                </div>

                <h2 className="page-title">Add Employee</h2>
                <p className="page-subtitle">Option 1 = manual form. Option 2 = bulk upload.</p>

                <div className="option-grid">
                    <button className="option-card" onClick={() => openOptionModal("OPTION_1")}>
                        <div className="option-title">Option 1</div>
                        <div className="option-sub">Capacity Registration Form (Popup)</div>
                    </button>

                    <button className="option-card" onClick={() => openOptionModal("OPTION_2")}>
                        <div className="option-title">Option 2</div>
                        <div className="option-sub">Bulk Upload (Popup)</div>
                    </button>

                    <button className="option-card" onClick={() => openOptionModal("OPTION_3")}>
                        <div className="option-title">Option 3</div>
                        <div className="option-sub">Invite Link (Popup)</div>
                    </button>
                </div>

                {showOptionModal && (
                    <div className="modal-backdrop" onClick={closeOptionModal}>
                        <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>
                                    {activeOption === "OPTION_1"
                                        ? "Capacity Registration Form"
                                        : activeOption === "OPTION_2"
                                            ? "Bulk Capacity Upload"
                                            : activeOption === "OPTION_3"
                                                ? "Employer Invite Link"
                                                : "Option"}
                                </h3>
                                <button onClick={closeOptionModal}>✕</button>
                            </div>

                            {/* ✅ Scrollable content */}
                            <div className="modal-scroll">
                                {/* Supplier dropdown (common for Option1 & Option2) */}
                                <div className="modal-section">
                                    <label>Supplier *</label>
                                    {errors.supplier && <small style={{ color: "red" }}>{errors.supplier}</small>}

                                    {supplierLoading ? (
                                        <p style={{ marginTop: 10 }}>Loading suppliers...</p>
                                    ) : (
                                        <select
                                            className="supplier-select"
                                            value={selectedSupplierId}
                                            onChange={handleSupplierChange}
                                        >
                                            <option value="">-- Select supplier --</option>
                                            {suppliers.map((s) => {
                                                const id = s.id || s.Id;
                                                const name = s.companyName || s.CompanyName || s.company_name;
                                                return (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    )}

                                    {selectedSupplierName && (
                                        <p style={{ marginTop: 8, color: "#64748b", fontSize: 13 }}>
                                            Selected: <strong>{selectedSupplierName}</strong>
                                        </p>
                                    )}
                                </div>

                                {/* OPTION 2 UI */}
                                {activeOption === "OPTION_2" && (
                                    <div className="bulk-modal">
                                        <div className="bulk-card info-card">
                                            <div className="bulk-icon light-green">ℹ️</div>
                                            <p>
                                                Download the Excel template, fill it, then upload. Max 5MB. Supported:
                                                .xls, .xlsx
                                            </p>
                                        </div>

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
                                                disabled={uploading}
                                                onClick={() => {
                                                    if (!selectedSupplierId) {
                                                        toast.error("Please select a supplier first");
                                                        return;
                                                    }
                                                    fileInputRef.current?.click();
                                                }}
                                            >
                                                {uploading ? "Uploading..." : "⬆ Upload File"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* OPTION 3 UI */}
                                {activeOption === "OPTION_3" && (
                                    <div className="bulk-modal">
                                        <div className="bulk-card info-card">
                                            <div className="bulk-icon light-green">ℹ️</div>
                                            <p>
                                                Generate a secure invite link for employees. Link is created using your
                                                Company ID from JWT token.
                                            </p>
                                        </div>

                                        {!generatedLink ? (
                                            <div className="step-card green">
                                                <div className="step-left">
                                                    <div className="step-icon green">🔗</div>
                                                    <div>
                                                        <h3>Generate Invitation Link</h3>
                                                        <p>Creates a dynamic link for your organisation</p>
                                                    </div>
                                                </div>

                                                <button
                                                    className="btn-green"
                                                    onClick={handleGenerateInviteLink}
                                                    disabled={!selectedSupplierId}
                                                    style={{ opacity: !selectedSupplierId ? 0.6 : 1, cursor: !selectedSupplierId ? "not-allowed" : "pointer" }}
                                                >
                                                    🔗 Generate Link
                                                </button>

                                            </div>
                                        ) : (
                                            <div className="step-card blue">
                                                <div className="step-left">
                                                    <div className="step-icon blue">✅</div>
                                                    <div>
                                                        <h3>Link Generated</h3>
                                                        <p>
                                                            Reference: <strong>{referenceCode}</strong>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div style={{ marginTop: 10, width: "100%" }}>
                                                    <div
                                                        style={{
                                                            padding: "12px",
                                                            borderRadius: "10px",
                                                            background: "#0b1220",
                                                            color: "#e2e8f0",
                                                            fontSize: "13px",
                                                            wordBreak: "break-all",
                                                        }}
                                                    >
                                                        {generatedLink}
                                                    </div>

                                                    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                                                        <button className="btn-blue" onClick={copyInviteLink}>
                                                            Copy Link
                                                        </button>

                                                        <button className="btn-green" onClick={() => setGeneratedLink("")}>
                                                            Generate Again
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* OPTION 1 FORM */}
                                {activeOption === "OPTION_1" && (
                                    <section className="capacity-form" style={{ marginTop: 14 }}>
                                        <div className="form-header">📄 Capacity Registration Form</div>

                                        <div className="form-section">
                                            <div className="section-title">
                                                <span className="line" />
                                                Company-Provided Information
                                            </div>

                                            <div className="form-grid">
                                                <div className="form-field">
                                                    <Label name="employeeId">Company Employee ID</Label>
                                                    <input
                                                        name="employeeId"
                                                        value={capacityForm.employeeId}
                                                        placeholder="EMP001"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.employeeId && <small>{errors.employeeId}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="workingSince">Working Since</Label>
                                                    <input
                                                        name="workingSince"
                                                        type="date"
                                                        value={capacityForm.workingSince}
                                                        onChange={handleChange}
                                                        max={new Date().toISOString().split("T")[0]}
                                                    />
                                                    {errors.workingSince && <small>{errors.workingSince}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="ctc">CTC (₹)</Label>
                                                    <input
                                                        name="ctc"
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={capacityForm.ctc}
                                                        placeholder="800000"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.ctc && <small>{errors.ctc}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="jobTitle">Job Title</Label>
                                                    <input
                                                        name="jobTitle"
                                                        value={capacityForm.jobTitle}
                                                        placeholder="Senior Software Engineer"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.jobTitle && <small>{errors.jobTitle}</small>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-section">
                                            <div className="section-title">
                                                <span className="line" />
                                                Professional Information
                                            </div>

                                            <div className="form-grid">
                                                <div className="form-field">
                                                    <Label name="role">I Can Be</Label>
                                                    <input
                                                        name="role"
                                                        value={capacityForm.role}
                                                        placeholder="Full Stack Developer"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.role && <small>{errors.role}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="gender">Gender</Label>
                                                    <select name="gender" value={capacityForm.gender} onChange={handleChange}>
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                    {errors.gender && <small>{errors.gender}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="location">Location</Label>
                                                    <input
                                                        name="location"
                                                        value={capacityForm.location}
                                                        placeholder="Bangalore, India"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.location && <small>{errors.location}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="experience">Total Years of Experience</Label>
                                                    <input
                                                        name="experience"
                                                        type="number"
                                                        min="0"
                                                        step="0.1"
                                                        value={capacityForm.experience}
                                                        placeholder="5.5"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.experience && <small>{errors.experience}</small>}
                                                </div>

                                                <div className="form-field full">
                                                    <Label name="skills">Technical Skills</Label>
                                                    <input
                                                        name="skills"
                                                        value={capacityForm.skills}
                                                        placeholder="React, Node.js, TypeScript, MongoDB, AWS"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.skills && <small>{errors.skills}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="tools">Tools</Label>
                                                    <input
                                                        name="tools"
                                                        value={capacityForm.tools}
                                                        placeholder="VS Code, Git, Docker, Jira"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.tools && <small>{errors.tools}</small>}
                                                </div>

                                                <div className="form-field">
                                                    <Label name="projects">Number of Projects</Label>
                                                    <input
                                                        name="projects"
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        value={capacityForm.projects}
                                                        placeholder="12"
                                                        onChange={handleChange}
                                                    />
                                                    {errors.projects && <small>{errors.projects}</small>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-section">
                                            <div className="section-title">
                                                <span className="line" />
                                                Certifications
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                                {certifications.map((cert, index) => (
                                                    <div className="cert-row" key={index}>
                                                        <input
                                                            placeholder="Enter certification name"
                                                            value={cert}
                                                            onChange={(e) => {
                                                                const updated = [...certifications];
                                                                updated[index] = e.target.value;
                                                                setCertifications(updated);
                                                            }}
                                                        />

                                                        {index === certifications.length - 1 ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => setCertifications([...certifications, ""])}
                                                            >
                                                                Add
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setCertifications(certifications.filter((_, i) => i !== index))
                                                                }
                                                                style={{
                                                                    background: "transparent",
                                                                    padding: "0 8px",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                <X size={18} color="#dc2626" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <section className="form-section">
                                            <div className="section-title">
                                                <span className="line" />
                                                Employer Note (Optional)
                                            </div>

                                            <div className="note-box">
                                                <label>Additional Context or Notes</label>
                                                <textarea
                                                    value={employerNote}
                                                    onChange={(e) => setEmployerNote(e.target.value)}
                                                    placeholder="Add any additional context about this capacity record..."
                                                />
                                            </div>
                                        </section>

                                        <div className="form-actions" style={{ marginTop: 10 }}>
                                            <button className="btn-secondary" onClick={closeOptionModal}>
                                                Cancel
                                            </button>

                                            <button
                                                className="btn-primary"
                                                disabled={!isFormValid() || isSubmitting}
                                                onClick={handleSubmitCapacity}
                                            >
                                                {isSubmitting ? "Submitting..." : "Submit Capacity Record"}
                                            </button>
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
