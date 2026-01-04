import "../../style/component/AppFooter.css";

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          This portal is operated by <strong>Westgate India</strong>, a business
          registered in India, acting as an authorised and licensed delivery
          partner for <strong>Spectrum IT Hub Ltd (UK)</strong> in relation to the
          TalentedStaff.com ecosystem, which is owned and governed by
          <strong> ITRF (Global) Ltd (UK)</strong>.
        </p>

        <p className="highlight">
          Access to this portal is limited to onboarding, readiness, and
          alignment activities only.
        </p>

        <p className="warning">
          No capacity is active or approved until the Supplier SLA is discussed
          and agreed.
        </p>

        <p>
          This portal does not advertise roles, guarantee opportunities, or
          constitute a commercial agreement.
        </p>

        <p className="muted">
          All commercial terms, governance arrangements, roles,
          responsibilities, and legal obligations are defined separately through
          formal agreements and SLAs, where applicable.
        </p>

        <div className="footer-divider" />

        <span className="copyright">
          © 2025 WestGate IT Hub. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
