import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LandingFooter from "../../Components/LandingFooter";

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
            This portal supports an <strong>early-stage supplier onboarding and readiness phase</strong>{" "}
            for a UK-facing talent and capacity engagement model.
          </p>
          <p>
            It is designed to align <strong>prepared IT suppliers</strong> with future UK client demand
            through a <strong>governed, demand-led approach</strong>, rather than open recruitment or
            speculative staffing. The emphasis at this stage is on{" "}
            <strong>readiness</strong>, <strong>continuity planning</strong>, and{" "}
            <strong>structured supplier alignment</strong>, ahead of wider platform or market access.
          </p>

          <h2>Key Message</h2>
          <p>
            This portal supports <strong>pre-launch supplier registration</strong>,{" "}
            <strong>verification</strong>, and <strong>operational readiness activities</strong>,
            coordinated by{" "}
            Westgate IT Hub Pvt. Ltd. in support of{" "}
            <strong>Spectrum IT Hub Ltd (UK)</strong> and the{" "}
            <strong>TalentedStaff.com ecosystem</strong>.
          </p>
          <p>
            <strong>The current portal functionality is intentionally limited</strong> to{" "}
            <strong>onboarding</strong> and readiness activities only. Additional platform capabilities
            including <strong>dynamic reporting</strong>, <strong>industry-level insights</strong>, and{" "}
            <strong>trend-based intelligence</strong> will be introduced in a later phase{" "}
            <strong>(v0.3, planned for later in 2026)</strong>.
          </p>
          <p>
            Access to V0.3 portal is provided for <strong>selected employers and businesses</strong>{" "}
            engaging with the UK IT market through a{" "}
            <strong>structured and governed operating model</strong>.
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
      <LandingFooter />
    </>
  );
}
