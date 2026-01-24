import "../../style/RegisteredUser/AddCapacityManually.css";
import InfoTooltip from "../../Components/InfoTooltip";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { submitManualCapacity } from "../../services/supplier";
import AppFooter from "../../Components/common/AppFooter";  


export default function AddCapacityManually() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const inviteId = searchParams.get("inviteId");
    const companyName = searchParams.get("companyName");

    const isInvited = !!inviteId;

    const [certifications, setCertifications] = useState([""]);
    const [employerNote, setEmployerNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
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
        projects: ""
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
          {requiredFields.has(name) && (
            <InfoTooltip field={name} trigger="*" />
          )}
        </label>
      );
      


    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" // or "smooth" if you prefer animation
        });
    }, []);


    // Extract companyId from token
    const getCompanyIdFromToken = () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const decoded = jwtDecode(token);
            return decoded.companyId || null;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error once user types
        if (value.trim()) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Validate Employee ID
        if (!form.employeeId.trim()) {
            newErrors.employeeId = "Company Employee ID is required";
        }

        // Validate Working Since (date)
        if (!form.workingSince.trim()) {
            newErrors.workingSince = "Working Since date is required";
        } else {
            const date = new Date(form.workingSince);
            if (isNaN(date.getTime())) {
                newErrors.workingSince = "Please enter a valid date";
            }
        }

        // Validate CTC (number)
        if (!form.ctc.trim()) {
            newErrors.ctc = "CTC is required";
        } else {
            const ctcNum = parseFloat(form.ctc);
            if (isNaN(ctcNum) || ctcNum < 0) {
                newErrors.ctc = "Please enter a valid positive number";
            }
        }

        // Validate Job Title
        if (!form.jobTitle.trim()) {
            newErrors.jobTitle = "Job Title is required";
        }

        // Validate Role
        if (!form.role.trim()) {
            newErrors.role = "Role is required";
        }

        // Validate Gender
        if (!form.gender.trim()) {
            newErrors.gender = "Gender is required";
        }

        // Validate Location
        if (!form.location.trim()) {
            newErrors.location = "Location is required";
        }

        // Validate Experience (number)
        if (!form.experience.trim()) {
            newErrors.experience = "Total Years of Experience is required";
        } else {
            const expNum = parseFloat(form.experience);
            if (isNaN(expNum) || expNum < 0) {
                newErrors.experience = "Please enter a valid positive number";
            }
        }

        // Validate Skills
        if (!form.skills.trim()) {
            newErrors.skills = "Technical Skills is required";
        }

        // Validate Tools
        if (!form.tools.trim()) {
            newErrors.tools = "Tools is required";
        }

        // Validate Projects (number)
        if (!form.projects.trim()) {
            newErrors.projects = "Number of Projects is required";
        } else {
            const projectsNum = parseInt(form.projects);
            if (isNaN(projectsNum) || projectsNum < 0) {
                newErrors.projects = "Please enter a valid positive whole number";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Check if all required fields are filled
    const isFormValid = () => {
        const requiredFields = [
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
            "projects"
        ];

        // Check all required fields are filled
        const allFilled = requiredFields.every(key => {
            const value = form[key];
            if (!value || !value.trim()) return false;

            // Additional validation for numeric fields
            if (key === "ctc" || key === "experience") {
                const num = parseFloat(value);
                return !isNaN(num) && num >= 0;
            }
            if (key === "projects") {
                const num = parseInt(value);
                return !isNaN(num) && num >= 0;
            }
            if (key === "workingSince") {
                return value.length === 10; // yyyy-mm-dd
            }


            return true;
        });

        return allFilled;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            toast.error("Please fix all validation errors before submitting", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Get companyId based on scenario
            let companyId;
            if (isInvited) {
                // Payload B: Get companyId from inviteId (query param)
                companyId = inviteId;
            } else {
                // Payload A: Get companyId from token
                companyId = getCompanyIdFromToken();
                if (!companyId) {
                    throw new Error("Company ID not found in token. Please login again.");
                }
            }

            // Filter out empty certifications
            const validCertifications = certifications.filter(cert => cert.trim() !== "");

            // Build payload
            const payload = {
                companyEmployeeId: form.employeeId.trim(),
                companyId: companyId,
                isRefered: isInvited,
                workingSince: form.workingSince,
                ctc: parseFloat(form.ctc),
                jobTitle: form.jobTitle.trim(),
                role: form.role.trim(),
                gender: form.gender.trim(),
                location: form.location.trim(),
                totalExperience: parseFloat(form.experience),
                technicalSkills: form.skills.trim(),
                tools: form.tools.trim(),
                numberOfProjects: parseInt(form.projects),
                employerNote: employerNote.trim() || "",
                certifications: validCertifications
            };

            const response = await submitManualCapacity(payload);

            if (response.status === 200 || response.status === 201) {
                toast.success("Capacity record submitted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Reset form after successful submission
                setTimeout(() => {
                    setForm({
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
                        projects: ""
                    });
                    setCertifications([""]);
                    setEmployerNote("");
                    setErrors({});
                }, 1500);
            }
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Failed to submit capacity record. Please try again.";

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 4000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            {!isInvited && <AppHeader />}
            <ToastContainer />

            <div className="app-shell">
                {!isInvited && <AppSidebar unlocked active="Candidates" />}

                <main className="add-capacity-page">

                    {!isInvited && (
                        <>
                            {/* TOP GRADIENT HEADER */}
                            <div className="top-banner">
                                📋 Manually Add Indicative Capacity – One Entry at a Time
                            </div>

                            {/* BACK LINK */}
                            <div
                                className="back-link"
                                onClick={() => {
                                    if (inviteId && companyName) {
                                        navigate(
                                            `/employeeInviteInfo?inviteId=${inviteId}&companyName=${companyName}`
                                        );
                                    } else {
                                        navigate("/capacityRegistration");
                                    }
                                }}
                            >
                                ← Back to Candidates
                            </div>

                            {/* TITLE CARD */}
                            <section className="title-card">
                                <div className="title-icon">👤</div>
                                <h1>Add Capacity Manually (Individual Entry)</h1>
                            </section>

                            {/* INFO CARD */}
                            <section className="info-card">
                                <div className="info-icon">ℹ️</div>
                                <div>
                                    <div className="info-bar" />
                                    <p>
                                        Use this option to manually add indicative capacity, one record at a
                                        time, directly managed by your organisation.
                                    </p>
                                </div>
                            </section>

                            {/* SALARY NOTE */}
                            <section className="info-card blue">
                                <div className="info-icon">ℹ️</div>
                                <div>
                                    <div className="info-bar" />
                                    <h3>Note on Salary Information:</h3>
                                    <p>
                                        Salary information is collected solely for market benchmarking and
                                        planning purposes.
                                    </p>
                                </div>
                            </section>

                            {/* STATUS NOTE */}
                            <section className="warning-card">
                                <div className="warning-icon">🛡️</div>
                                <div>
                                    <div className="warning-bar" />
                                    <p>
                                        All records saved through this option are initially stored as{" "}
                                        <strong>Indicative (Not Active)</strong>.
                                    </p>
                                </div>
                            </section>
                        </>
                    )}



                    <section className="capacity-form">
                        {/* FORM HEADER */}
                        <div className="form-header">
                            📄 Capacity Registration Form

                            {isInvited && (<div className="invite-meta">
                                <div className="invite-meta-item">
                                    <strong>Company Name:</strong> {companyName}
                                </div>
                                <div className="invite-meta-item">
                                    <strong>Company ID:</strong> {inviteId}
                                </div>
                            </div>
                            )}
                        </div>

                        {isInvited && (<div className="invite-info-box">
                            Please confirm the following work-related details as requested by your
                            employer. These details are collected <strong>ONLY</strong> for internal
                            readiness and planning and <strong>NOT</strong> for recruitment or direct
                            engagement.
                        </div>)}



                        {/* COMPANY INFO */}
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
    value={form.employeeId}
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
    value={form.workingSince}
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
    value={form.ctc}
    placeholder="800000"
    onChange={handleChange}
  />
  {errors.ctc && <small>{errors.ctc}</small>}
</div>

<div className="form-field">
  <Label name="jobTitle">Job Title</Label>
  <input
    name="jobTitle"
    value={form.jobTitle}
    placeholder="Senior Software Engineer"
    onChange={handleChange}
  />
  {errors.jobTitle && <small>{errors.jobTitle}</small>}
</div>
                            </div>
                        </div>

                        {/* PROFESSIONAL INFO */}
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
    value={form.role}
    placeholder="Full Stack Developer"
    onChange={handleChange}
  />
  {errors.role && <small>{errors.role}</small>}
</div>

<div className="form-field">
  <Label name="gender">Gender</Label>
  <select name="gender" value={form.gender} onChange={handleChange}>
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
    value={form.location}
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
    value={form.experience}
    placeholder="5.5"
    onChange={handleChange}
  />
  {errors.experience && <small>{errors.experience}</small>}
</div>

<div className="form-field full">
  <Label name="skills">Technical Skills</Label>
  <input
    name="skills"
    value={form.skills}
    placeholder="React, Node.js, TypeScript, MongoDB, AWS"
    onChange={handleChange}
  />
  {errors.skills && <small>{errors.skills}</small>}
</div>


<div className="form-field">
  <Label name="tools">Tools</Label>
  <input
    name="tools"
    value={form.tools}
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
    value={form.projects}
    placeholder="12"
    onChange={handleChange}
  />
  {errors.projects && <small>{errors.projects}</small>}
</div>
                            </div>
                        </div>

                        {/* CERTIFICATIONS */}
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


                    </section>


                    {/* EMPLOYER NOTE */}
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

                    {/* ACTION BAR */}
                    <div className="form-actions">
                        <button className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                        <button
                            className="btn-primary"
                            disabled={!isFormValid() || isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Capacity Record"}
                        </button>
                    </div>

                </main>

            </div>
            {!isInvited && <AppFooter />}


        </>
    );
}
