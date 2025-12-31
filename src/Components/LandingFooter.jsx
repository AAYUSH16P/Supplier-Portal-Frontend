import "../style/LandingPage/LandingFooter.css";

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-content">
        <p>
          This portal is part of a controlled, invite-only onboarding and
          readiness programme operated by <strong>Westgate India</strong>, an
          authorised and licensed delivery partner for{" "}
          <strong>Spectrum IT Hub Ltd (UK)</strong> and the{" "}
          <strong>TalentedStaff.com</strong> ecosystem.
        </p>

        <p>
          The current functionality is intentionally limited to supplier
          onboarding, verification, and readiness activities. Additional
          platform capabilities — including dynamic reporting, industry-level
          insights, and trend-based intelligence — will be introduced in later
          phases (V0.3, planned for later in 2026).
        </p>

        <p>
          This portal does not advertise jobs, allocate roles, or guarantee
          engagement. Participation at this stage does not constitute a
          commercial agreement.
        </p>

        <p>
          All obligations, roles, responsibilities, and commercial terms are
          defined separately through formal agreements and SLAs, where applicable.
        </p>

        <div className="landing-footer-divider" />

        <span className="landing-footer-copyright">
          © 2025 TalentedStaff.com. All Rights Reserved
        </span>
      </div>
    </footer>
  );
}

