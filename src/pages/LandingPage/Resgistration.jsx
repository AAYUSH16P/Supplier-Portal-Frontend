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
                            Acknowledgement of the statements below confirms <strong>understanding of onboarding expectations only.</strong> And it does not constitute a commercial agreement, delivery commitment, or guarantee of engagement.
                            </p>

                            <p>
                            All detailed <strong>commercial terms, governance requirements, roles, responsibilities, and legal arrangements </strong> are formally defined in the <strong>Supplier SLA</strong>, which is shared and discussed <strong>after registration</strong>, where relevant.
                            </p>
                        </section>

                        {/* CONFIRMATION */}
                        <section className="ob-confirm">
                            <h4>Confirmation</h4>

                        <p className="ob-text">To proceed with supplier registration, please confirm that you understand and accept the onboarding expectations outlined below.</p>
                            <label className="ob-checkbox">
                                <input
                                    type="checkbox"
                                    checked={isAcknowledged}
                                    onChange={(e) => setIsAcknowledged(e.target.checked)}
                                />
                                <span>
                                I acknowledge and understand the onboarding obligations listed below.                                </span>
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

                        <h3>Onboarding Expectations </h3>

                        {/* FOOTER TEXT */}
                        <p className="ob-text">
                        Suppliers participating in this onboarding and readiness phase are expected to operate <strong>in good faith</strong> and in line with <strong>standard enterprise delivery practices. </strong>
                        </p>

                        <p className="ob-text">
                        The listed expectations apply <strong>only to the onboarding and readiness stage </strong> and are intended to set clear boundaries around participation, conduct and alignment.
                        </p>


                        {/* HIGH LEVEL EXPECTATIONS */}
                        <section className="ob-expectations">
                            <h4>At a high level, suppliers are expected to:</h4>

                            <ul className="expectation-list">
                                <li>
                                    <span>1</span>
                                   <strong> Respect the invite-only and governed nature</strong>of this engagement model                                </li>
                                <li>
                                    <span>2</span>
                                    Engage through <strong> Westgate IT Hub Pvt. Ltd. </strong> as the <strong> single operational point of contact</strong> during onboarding                                </li>
                                <li>
                                    <span>3</span>
                                    Follow the defined  <strong> onboarding and readiness process  </strong>                             </li>
                                <li>
                                    <span>4</span>
                                    Provide <strong>accurate and truthful information</strong> during registration and onboarding                                </li>
                                <li>
                                    <span>5</span>
                                    Nominate capacity <strong>responsibly</strong>, with realistic availability and appropriate continuity planning                                </li>
                            </ul>

                            <div className="expectation-note">
                            These expectations are intended to support <strong> clarity, continuity, and trust, </strong>and do <strong>not </strong>impose commercial obligation or commitment at this stage.
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