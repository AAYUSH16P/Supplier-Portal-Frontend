import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/SupplierAcknowledgement.css";
import { useState } from "react";
import AppFooter from "../../Components/common/AppFooter";

import { useNavigate } from "react-router-dom";


export default function SupplierAcknowledgement() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({
    one: false,
    two: false,
    three: false,
  });

  const allChecked = Object.values(checks).every(Boolean);

  const toggle = (key) => {
    setChecks({ ...checks, [key]: !checks[key] });
  };

  return (
    <>
      <AppHeader />

      <div className="ack-layout">
        <AppSidebar unlocked={allChecked} />

        <main className="ack-page">
          <section className="ack-welcome">
            <h1>Welcome to the TalentedStaff Supplier Onboarding Portal</h1>
            <p>
              Your account has been approved, and you have been granted access to
              this portal as part of the controlled supplier onboarding and
              readiness programme.
            </p>
          </section>

          <div className="ack-grid">
            <div className="ack-card">
              <h3>Supplier SLA Acknowledgement</h3>

              <ul>
                <li>The Supplier SLA is provided for review and discussion</li>
                <li>You may return with questions or clarifications</li>
                <li>
                  No commercial engagement is activated until SLA agreement
                </li>
              </ul>

              <div className="ack-note">
                <strong>Important:</strong> Acknowledgement does not constitute
                acceptance.
              </div>
            </div>

            <div className="ack-card">
              <h3>Important Clarification on Capacity Registration</h3>

              <ul className="orange">
                <li>Preliminary and indicative only</li>
                <li>Used for readiness and alignment</li>
                <li>
                  Not approved or shared until SLA is discussed and agreed
                </li>
              </ul>

              <div className="ack-note">
                This ensures clarity and alignment before engagement.
              </div>
            </div>
          </div>


          <section className="ack-confirm">
            <h3>Confirmation Required to Proceed</h3>
            <p className="ack-confirm-sub">
              Please confirm the following to continue:
            </p>

            <div
              className={`ack-check ${checks.one ? "checked" : ""}`}
              onClick={() => toggle("one")}
            >
              <span className="check-icon">{checks.one && "✔"}</span>
              <span>I confirm that I have received the Supplier SLA (V0.1A)</span>
            </div>

            <div
              className={`ack-check ${checks.two ? "checked" : ""}`}
              onClick={() => toggle("two")}
            >
              <span className="check-icon">{checks.two && "✔"}</span>
              <span>
                I understand that the SLA must be discussed and agreed before any
                capacity is approved
              </span>
            </div>

            <div
              className={`ack-check ${checks.three ? "checked" : ""}`}
              onClick={() => toggle("three")}
            >
              <span className="check-icon">{checks.three && "✔"}</span>
              <span>
                I understand that any capacity registered at this stage is not
                active or approved until SLA alignment is completed
              </span>
            </div>

            {!allChecked && (
              <div className="ack-hint">
                Please confirm all three items above to proceed to the portal
                home page
              </div>
            )}

            {allChecked && (
              <div className="ack-success">
                Great! You can now proceed to the home page.
              </div>
            )}

            <div className="ack-actions">
              <button
                className="ack-btn"
                disabled={!allChecked}
                onClick={() => navigate("/home")}
              >
                Proceed to Home Page →
              </button>
            </div>
          </section>


         
        </main>
      </div>
      <AppFooter />
    </>
  );
}
