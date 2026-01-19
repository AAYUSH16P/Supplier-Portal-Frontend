import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OnboardingLanding() {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState("");

  return (
    <>

      <div className="onboarding-container">
        {/* Top Navigation */}
        

        {/* Hero */}
        <section className="hero">
          <h1>Westgate Supplier Onboarding Portal</h1>
          <p>
            A controlled onboarding space for selected technology suppliers and
            employers, supporting structured capacity readiness for UK-facing IT
            opportunities.
          </p>
        </section>

        {/* Content Card */}
        <section className="content-card">
          <h2>Business Context: Why This Portal Exists</h2>
          <p>
          This portal supports an early-stage supplier onboarding and readiness phase for a UK-facing talent and capacity engagement model.
          </p>
          <p>
          It is designed to align prepared IT suppliers with future UK client demand through a governed, demand-led approach, rather than open recruitment or speculative staffing. The emphasis at this stage is on readiness, continuity planning, and structured supplier alignment, ahead of wider platform or market access.
          </p>

          <h2>Main Message</h2>
          <p>
          This portal supports pre-launch supplier registration, verification, and operational readiness activities, coordinated by WestGate India in support of Spectrum IT Hub Ltd (UK) and the TalentedStaff.com ecosystem.
          </p>
          <p>
          The current portal functionality is intentionally limited to onboarding and readiness activities only. Additional platform capabilities including dynamic reporting, industry-level insights, and trend-based intelligence will be introduced in a later phase (v0.3, planned for later in 2026).
          </p>
          <p>
          Access to V0.3 portal is provided for selected employers and businesses engaging with the UK IT market through a structured and governed operating model.
          </p>

          {/* Survey Box */}
          <div className="survey-box">
            <h3>How did you reach this portal?</h3>

            <ul className="source-list">
  <li
    className={`source-item ${selectedSource === "direct-invitation" ? "active" : ""}`}
    onClick={() => setSelectedSource("direct-invitation")}
  >
    Direct invitation (email or phone call)
  </li>

  <li
    className={`source-item ${selectedSource === "westgate-outreach" ? "active" : ""}`}
    onClick={() => setSelectedSource("westgate-outreach")}
  >
    Westgate India outreach (our team contacted you)
  </li>

  <li
    className={`source-item ${selectedSource === "authorised-referral" ? "active" : ""}`}
    onClick={() => setSelectedSource("authorised-referral")}
  >
    Authorised referral (introduced by a partner)
  </li>

  <li
    className={`source-item ${selectedSource === "social-post" ? "active" : ""}`}
    onClick={() => setSelectedSource("social-post")}
  >
    Limited social / industry post (shared selectively)
  </li>

  <li
    className={`source-item ${selectedSource === "other" ? "active" : ""}`}
    onClick={() => setSelectedSource("other")}
  >
    Other
  </li>
</ul>

<button
  className={`continue-btn enabled`}
  
  onClick={() => navigate("/landingPage")}
>
  Continue to Registration →
</button>

          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2025 TalentedStaff.com. All Rights reserved</p>
        <span>Connecting talented IT professionals with opportunities worldwide</span>
      </footer>
    </>
  );
}
