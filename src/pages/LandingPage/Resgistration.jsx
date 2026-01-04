import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../style/LandingPage/Registration.css";

export default function Registration() {
    const [isAcknowledged, setIsAcknowledged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // or "smooth"
        });
    }, []);

    return (
        <>
            <Header />

            <div className="layout">
                <Sidebar active="registration" />

                <main className="page-content">
                    <div className="obligations-container">

                        {/* HERO */}
                        <section className="ob-hero">
                            <h1>
                                <span className="ob-icon">🛡️</span>
                                Supplier Obligations
                            </h1>
                            <p>High-Level Expectations for Onboarding & Readiness</p>
                        </section>

                        {/* IMPORTANT NOTE */}
                        <section className="ob-note">
                            <h4>Important Note</h4>

                            <p>
                                Acknowledgement of the below confirms understanding of onboarding
                                expectations only and does not constitute a commercial agreement,
                                delivery commitment, or guarantee of engagement.
                            </p>

                            <p>
                                Detailed obligations, governance requirements, commercial terms,
                                roles, responsibilities, and legal arrangements are formally
                                defined in the <strong>Supplier SLA</strong>.
                            </p>
                        </section>

                        {/* CONFIRMATION */}
                        <section className="ob-confirm">
                            <h4>Confirmation</h4>

                            <label className="ob-checkbox">
                                <input
                                    type="checkbox"
                                    checked={isAcknowledged}
                                    onChange={(e) => setIsAcknowledged(e.target.checked)}
                                />
                                <span>
                                    I acknowledge and understand the below onboarding obligations
                                </span>
                            </label>

                            <button
                                className={`ob-btn ${isAcknowledged ? "enabled" : ""}`}
                                disabled={!isAcknowledged}
                                onClick={() => navigate("/supplier-registration")}
                            >
                                Proceed to Supplier Registration →
                            </button>

                            <small>Please acknowledge the obligations to proceed</small>
                        </section>

                        {/* FOOTER TEXT */}
                        <p className="ob-text">
                            Suppliers participating in this onboarding and readiness phase are expected to operate in good faith and in line with standard enterprise delivery practices.
                        </p>

                        <p className="ob-text">
                            These obligations apply only to the onboarding and readiness stage and are intended to set clear expectations around participation, conduct, and alignment.

                        </p>


                        {/* HIGH LEVEL EXPECTATIONS */}
                        <section className="ob-expectations">
                            <h4>At a high level, suppliers are expected to:</h4>

                            <ul className="expectation-list">
                                <li>
                                    <span>1</span>
                                    Provide accurate and truthful information during registration and onboarding
                                </li>
                                <li>
                                    <span>2</span>
                                    Nominate capacity responsibly, with realistic availability and appropriate continuity planning
                                </li>
                                <li>
                                    <span>3</span>
                                    Engage through Westgate India as the single operational point of contact
                                </li>
                                <li>
                                    <span>4</span>
                                    Follow the agreed onboarding and readiness process
                                </li>
                                <li>
                                    <span>5</span>
                                    Respect the invite-only and governed nature of this engagement model
                                </li>
                            </ul>

                            <div className="expectation-note">
                                These obligations are intended to support clarity, continuity, and trust,
                                rather than impose additional burden or create commercial commitment at this stage.
                            </div>
                        </section>

                        {/* LEGAL FOOTER */}


                    </div>
                </main>
            </div>
            <LandingFooter />
        </>
    );
}