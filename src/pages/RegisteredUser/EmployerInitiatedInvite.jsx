import "../../style/RegisteredUser/EmployerInitiatedInvite.css";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AppFooter from "../../Components/common/AppFooter"; 
import { toast } from "react-toastify";



export default function EmployerInitiatedInvite() {
    const navigate = useNavigate();
    const [generatedLink, setGeneratedLink] = useState("");
    const [referenceCode, setReferenceCode] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
      

    const handleGenerateLink = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Token not found. Please login again.");
            return;
        }

        try {
            const decoded = jwtDecode(token);

            const companyId = decoded.companyId;
            const companyName = decoded.companyName; // 👈 from JWT

            if (!companyId || !companyName) {
                toast.error("Company information missing in token");
                return;
            }

            // IMPORTANT: encode company name for URL safety
            const encodedCompanyName = encodeURIComponent(companyName);

            const link = `https://supplier-portal-frontend-production.up.railway.app/employeeInviteInfo?inviteId=${companyId}&companyName=${encodedCompanyName}`;

            setGeneratedLink(link);

            // Optional unique reference
            setReferenceCode(companyId);

        } catch (err) {
            toast.error("Invalid token");
        }
    };


    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        toast.success("Link copied!");
    };


    return (
        <>
            <AppHeader />

            <div className="company-layout">
                <AppSidebar unlocked active="Candidates" />

                <main className="invite-page">
                    {/* TOP BANNER */}
                    <div className="invite-banner">
                        🔗 Share Secure Link for Employee-Led Capacity Confirmation
                    </div>

                    {/* BACK */}
                    <div
                        className="back-link"
                        onClick={() => navigate("/candidate")}
                        style={{ cursor: "pointer" }}
                    >
                        ← Back to Candidates
                    </div>


                    {/* TITLE CARD */}
                    <section className="title-card purple">
                        <div className="title-icon purple">🔗</div>
                        <h1>Employer-Initiated Capacity Confirmation (Invite Link)</h1>
                    </section>

                    {/* INFO CARD 1 */}
                    <section className="info-card purple">
                        <div className="info-icon purple">ℹ️</div>
                        <div>
                            <div className="info-bar purple" />
                            <h3>Employer-Initiated Capacity Confirmation (Shared Link)</h3>
                            <p>
                                Use this option to share a single, secure confirmation link with
                                selected employees, allowing them to provide limited, non-personal
                                capacity information under your organisation's direction. This
                                option is designed for employers who manage a structured workforce
                                and want employees to confirm or declare indicative skills and
                                availability, without creating profiles, uploading CVs, or engaging
                                directly with the platform.
                            </p>
                        </div>
                    </section>

                    {/* INFO CARD 2 */}
                    <section className="info-card purple">
                        <div className="info-icon purple">🛡️</div>
                        <div>
                            <div className="info-bar purple" />
                            <p>
                                The platform does not communicate with employees directly and does
                                not collect personal identifiers. All communication, consent, and
                                validation remain fully employer-controlled. Employee input is
                                restricted strictly to readiness-level information and is subject
                                to employer review before being recorded.
                            </p>
                        </div>
                    </section>

                    {/* WARNING */}
                    <section className="warning-card">
                        <div className="warning-icon">🛡️</div>
                        <div>
                            <div className="warning-bar" />
                            <p>
                                All capacity submitted through this option is stored as{" "}
                                <strong>Indicative (Not Active)</strong>. Capacity will turn{" "}
                                <strong>Active / Landed</strong> only after the Supplier SLA has been
                                signed and the capacity has been reviewed and explicitly approved
                                through the governance process. Until then, no information is
                                approved, activated, or shared, and it is used solely to support
                                readiness, alignment, and demand-led planning.
                            </p>
                        </div>
                    </section>

                    <section className="hiw-wrapper">
                        {/* HEADER */}
                        <div className="hiw-header">
                            ☑ How This Option Works (High-Level)
                        </div>

                        {/* STEP 1 */}
                        <div className="hiw-row">
                            <div className="hiw-left">
                                <div className="hiw-icon">🔗</div>
                                <span className="hiw-line" />
                            </div>

                            <div className="hiw-card hiw-row-content">
                                <span className="hiw-step">Step 1</span>
                                <div className="hiw-title">Generate a Shared Confirmation Link</div>
                                <div className="hiw-desc">
                                    A single confirmation link is generated for your organisation and
                                    shared internally by you (e.g. email, HR portal, internal tools).
                                </div>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="hiw-row">
                            <div className="hiw-left">
                                <div className="hiw-icon">👤+</div>
                                <span className="hiw-line" />
                            </div>

                            <div className="hiw-card">
                                <span className="hiw-step">Step 2</span>

                                <h3 className="hiw-title">
                                    Employee Submits Indicative Information
                                </h3>

                                <p className="hiw-desc">
                                    Employees access the link (no login required) and provide non-personal
                                    readiness information only, such as:
                                </p>

                                <div className="hiw-bullets">
                                    <div>Employer reference code (mandatory)</div>
                                    <div>Primary role / skill category</div>
                                    <div>Experience band</div>
                                    <div>Availability band</div>
                                    <div>etc (amend this)</div>
                                </div>

                                <p className="hiw-note">
                                    Employees confirm that submission is made with employer awareness
                                    and consent.
                                </p>
                            </div>
                        </div>

                        {/* STEP 3 */}
                        <div className="hiw-row">
                            <div className="hiw-left">
                                <div className="hiw-icon">👁</div>
                                <span className="hiw-line" />
                            </div>

                            <div className="hiw-card hiw-row-content">
                                <span className="hiw-step">Step 3</span>
                                <div className="hiw-title">Employer Review & Validation</div>
                                <div className="hiw-desc">
                                    All submissions are placed into an employer review queue. You
                                    review, validate, or discard entries before they are recorded as
                                    indicative capacity.
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="invite-footer">


                        {/* STEP 4 */}
                        <div className="hiw-row">
                            <div className="hiw-left">
                                <div className="hiw-icon">📄</div>
                            </div>

                            <div className="hiw-card hiw-row-content">
                                <span className="hiw-step">Step 4</span>

                                <div className="hiw-title">
                                    Indicative Capacity Recorded
                                </div>

                                <div className="hiw-desc">
                                    Approved entries are recorded as{" "}
                                    <strong>Indicative (Not Active)</strong> and remain inactive until SLA
                                    alignment, governance checks, and confirmed client demand are in place.
                                </div>
                            </div>
                        </div>


                        {/* IMPORTANT CLARIFICATIONS */}
                        <div className="clarifications-box">
                            <div className="clarifications-title">
                                <span className="info-icon">ℹ️</span>
                                Important Clarifications
                            </div>

                            <div className="clarification-item">This is not a job application or recruitment process</div>
                            <div className="clarification-item">Employees do not create accounts or profiles</div>
                            <div className="clarification-item">
                                No CVs, documents, personal contact details, or identifiers are collected
                            </div>
                            <div className="clarification-item">
                                The platform does not establish a direct employer–employee–candidate relationship
                            </div>
                            <div className="clarification-item">
                                Duplicate or speculative entries may be filtered or excluded during review
                            </div>

                            <div className="clarification-note">
                                This approach ensures employer accountability, avoids personal data collection,
                                and keeps capacity preparation measured, governed, and demand-led.
                            </div>
                        </div>

                        {/* ACTION */}
                        <div className="action-wrapper">
                            <div className="action-header">⬇ Action:</div>

                            {!generatedLink ? (
                                <div className="action-card">
                                    <div className="action-left">
                                        <div className="action-icon">🔗</div>
                                        <div>
                                            <h4>Generate Invitation Link</h4>
                                            <p>Create a unique, secure link to share with your employees</p>
                                        </div>
                                    </div>

                                    <button className="action-btn" onClick={handleGenerateLink}>
                                        Generate Link
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* SUCCESS BOX */}
                                    <div className="success-box">
                                        <div className="success-title">
                                            ✅ Link Generated Successfully!
                                        </div>

                                        <p className="success-desc">
                                            Share this link with your employees via email, HR portal, or
                                            any internal communication tool:
                                        </p>

                                        <div className="link-box">
                                            {generatedLink}
                                        </div>

                                        <button className="copy-btn" onClick={copyToClipboard}>
                                            Copy Link
                                        </button>
                                    </div>

                                    {/* NOTE */}
                                    <div className="note-box">
                                        <strong>Note:</strong> This link contains a unique reference:{" "}
                                        <span className="note-ref">{referenceCode}</span>
                                        <br />
                                        All submissions through this link will be associated with your
                                        organization for review and validation.
                                    </div>
                                </>
                            )}
                        </div>

                    </section>

                </main>
            </div>
            <AppFooter/>
        </>
    );
}
