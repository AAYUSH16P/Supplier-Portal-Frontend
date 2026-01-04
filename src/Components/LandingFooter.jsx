import "../style/LandingPage/LandingFooter.css";

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <p>
          This portal is part of a controlled, invite-only onboarding and
          readiness programme operated by <strong>Westgate India</strong>, an
          authorised and licensed delivery partner for{" "}
          <strong>Spectrum IT Hub Ltd (UK)</strong> and the{" "}
          <strong>TalentedStaff.com</strong> ecosystem.
        </p>

        <p>
          The current functionality is intentionally limited to supplier
          onboarding, verification, and readiness activities. Additional platform
          capabilities will be introduced in later phases.
        </p>

        <p>
          This portal does not advertise jobs, allocate roles, or guarantee
          engagement. Participation does not constitute a commercial agreement.
        </p>

        <p>
          All obligations and commercial terms are defined separately through
          formal agreements and SLAs.
        </p>

        <div className="landing-footer-divider" />

        <span className="landing-footer-copy">
          © 2025 TalentedStaff.com. All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
