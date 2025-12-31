import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../index.css";

export default function OperatingModel() {
  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar active="operating" />

        <main className="page-content">
          {/* CENTERED CONTENT WRAPPER */}
          <div className="content-wrapper">

            {/* HERO */}
            <section className="operating-hero">
              <h1>Operating Model</h1>
              <p>Your operational hub for supplier onboarding and readiness</p>
            </section>

            {/* WHO WE ARE */}
            <section className="content-card">
              <div className="section-heading">
                <span className="section-bar" />
                <h3>Who We Are</h3>
              </div>

              <p>
                <strong>Westgate India</strong> is a business registered in India.
              </p>

              <p>
                We operate as an authorised and licensed delivery partner for{" "}
                <strong>Spectrum IT Hub Ltd (UK)</strong> and the{" "}
                <strong>TalentedStaff.com</strong> ecosystem.
              </p>

              <div className="info-highlight">
                <p>
                  The wider business model this onboarding supports is a UK-facing,
                  demand-led IT engagement approach, where supplier capacity is
                  prepared in advance and aligned to governance expectations
                  before client demand is introduced.
                </p>

                <p>
                  This avoids open or speculative sourcing and focuses instead on
                  readiness, continuity, and structured participation.
                </p>
              </div>
            </section>

            {/* PRIMARY ROLE BOX */}
            <section className="primary-outline-box">
              <p>
                Through this role, <strong>Westgate India</strong> acts as the{" "}
                <strong>single operational hub</strong> and{" "}
                <strong>primary point of contact</strong> for invite-only supplier
                onboarding and early readiness activities.
              </p>
            </section>

            {/* ================= WHAT WE DO ================= */}
<section className="content-card">

<div className="section-heading teal">
  <span className="section-bar teal" />
  <h3>What We Do</h3>
</div>

<p className="section-intro">
  At this stage, <strong>Westgate India</strong> acts as the{" "}
  <strong>primary and single operational point of contact</strong> for
  suppliers participating in the onboarding and readiness phase.
</p>

<div className="mint-highlight">
  <strong>This means:</strong>
  <ul>
    <li>
      <strong>Westgate India</strong> coordinates all onboarding interactions
    </li>
    <li>
      <strong>Westgate India</strong> acts as the day-to-day engagement hub for
      readiness activities, queries, and operational alignment
    </li>
    <li>
      Suppliers are not required to engage with multiple entities during
      onboarding
    </li>
  </ul>
</div>

<p className="section-footer">
  <strong>Westgate India</strong> supports suppliers by managing supplier
  registration, readiness preparation, and operational alignment, and by
  helping suppliers understand how the engagement model works before any
  client demand is introduced.
</p>

</section>


{/* ================= IMPORTANT INFORMATION ================= */}
<section className="important-info-card">
  <div className="important-info-header">
    <span className="info-icon">ⓘ</span>
    <h4>Important Information</h4>
  </div>

  <p>
    All commercial terms, governance arrangements, roles, responsibilities, and
    legal details are formally defined through the{" "}
    <strong>Supplier SLA</strong>, which is shared and discussed after
    registration. This ensures clarity, consistency, and accountability as the
    engagement progresses.
  </p>
</section>

{/* ================= LEGAL FOOTER ================= */}
<LandingFooter />




          </div>
        </main>
      </div>
    </>
  );
}
