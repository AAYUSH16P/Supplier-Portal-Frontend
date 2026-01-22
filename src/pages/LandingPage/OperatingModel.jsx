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
                <strong>Westgate India</strong> is a business registered in India and operates as the
                <strong> authorised operational and delivery partner </strong>
                for <strong> Spectrum IT Hub Ltd (UK)</strong> within the <strong>TalentedStaff.com ecosystem.</strong>
              </p>

              <p>The onboarding this portal supports forms part of a <strong> UK-facing, demand-led IT engagement model</strong>, where supplier capacity is prepared and aligned <strong>in advance of engagement </strong>, against defined governance and operating expectations.</p>

              <p>
              This model avoids open or speculative sourcing and instead focuses on <strong> readiness, continuity, and structured participation.</strong>
              </p>

              <p>In this context, <strong> Westgate IT Hub Pvt. Ltd. acts as the single operational hub and primary point of contact </strong> for invite-only supplier onboarding and early readiness activities.</p>

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
    <strong>primary point of contact</strong> for invite-only supplier onboarding and
    early readiness activities.
  </p>
</section>


            {/* ================= WHAT WE DO ================= */}
            <section className="content-card">

              <div className="section-heading teal">
                <span className="section-bar teal" />
                <h3>What We Do</h3>
              </div>

              <p className="section-intro">
              During the onboarding and readiness phase, <strong>Westgate IT Hub Pvt. Ltd. acts as the sole operational interface </strong> for participating suppliers.
              </p>

              <div className="mint-highlight">
                <strong>This means:</strong>
                <ul>
                  <li>
                  Coordinating all onboarding and readiness interactions                  </li>
                  <li>
                  Acting as the day-to-day engagement hub for queries, clarification, and operational alignment
                  </li>
                  <li>
                  Ensuring suppliers are not required to engage with multiple entities during onboarding
                  </li>
                  <li>
                  Supporting supplier registration, readiness preparation, and alignment to the engagement model
                  </li>
                  <li>
                  Helping suppliers understand operating expectations  <strong>before any client demand is introduced</strong>
                  </li>
                </ul>

                <p>The focus at this stage is preparation and alignment, not activation or commercial engagement.</p>
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
      




          </div>
        </main>
      </div>
      <LandingFooter />
    </>
  );
}
