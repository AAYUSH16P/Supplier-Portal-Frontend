import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OnboardingLanding() {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState("");

  return (
    <>

      <div className="onboarding-container">
        {/* Top Navigation */}
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate("/")}>← Back to Landing</button>
          <div className="brand">TalentedStaff</div>
        </div>

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
            This portal supports an early-stage onboarding phase for a UK-facing
            talent and capacity engagement model, designed to connect prepared
            technology suppliers with real client demand through a governed,
            demand-led approach.
          </p>
          <p>
            Rather than open recruitment or speculative staffing, the model
            focuses on early readiness, continuity planning, and structured
            supplier alignment, ahead of wider platform and market access.
          </p>

          <h2>Main Message</h2>
          <p>
            This portal supports pre-launch supplier registration, verification,
            and operational readiness activities, coordinated by Westgate India,
            for Spectrum IT Hub Ltd (UK) and the TalentedStaff.com ecosystem.
          </p>
          <p>
            The current portal functionality is intentionally limited to
            onboarding and readiness activities. Additional platform
            capabilities — including dynamic reporting, industry-level
            insights, and trend-based intelligence — will be introduced in a
            later phase (v0.3, planned for later in 2026).
          </p>
          <p>
            Access to this portal is provided strictly for selected employers and
            businesses willing to connect with the UK IT market through a
            structured and governed model.
          </p>

          {/* Survey Box */}
          <div className="survey-box">
            <h3>How did you reach this portal?</h3>
            <span>Please select one option to continue</span>

            <label><input type="radio" name="source" value="direct-invitation" checked={selectedSource === "direct-invitation"} onChange={(e) => setSelectedSource(e.target.value)} /> Direct invitation (email or phone call)</label>
            <label><input type="radio" name="source" value="westgate-outreach" checked={selectedSource === "westgate-outreach"} onChange={(e) => setSelectedSource(e.target.value)} /> Westgate India outreach (our team contacted you)</label>
            <label><input type="radio" name="source" value="authorised-referral" checked={selectedSource === "authorised-referral"} onChange={(e) => setSelectedSource(e.target.value)} /> Authorised referral (introduced by a partner)</label>
            <label><input type="radio" name="source" value="social-post" checked={selectedSource === "social-post"} onChange={(e) => setSelectedSource(e.target.value)} /> Limited social / industry post (shared selectively)</label>
            <label><input type="radio" name="source" value="other" checked={selectedSource === "other"} onChange={(e) => setSelectedSource(e.target.value)} /> Other</label>

            <button className={`continue-btn ${selectedSource ? "enabled" : ""}`} disabled={!selectedSource} onClick={() => navigate("/landingPage")}>
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
