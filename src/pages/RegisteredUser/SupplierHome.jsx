import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/SupplierHome.css";

export default function SupplierHome() {
    return (
        <>
            <AppHeader />

            <div className="home-layout">
                <AppSidebar unlocked active="Home" />

                <main className="home-page">
                    {/* TOP STRIP */}
                    <div className="home-strip">
                        💼 Manage Your Talent Pool – Unlock Global Opportunities
                    </div>

                    {/* HERO */}
                    <section className="home-hero">
                        <span className="home-version">✨ Version 0.1A – Readiness Phase</span>

                        <div className="home-hero-content">
                            <div className="home-hero-icon">🏠</div>

                            <div>
                                <h1>Welcome to Your Supplier Portal</h1>
                                <p>
                                    Your organisation is now registered and approved as part of the
                                    controlled supplier onboarding and readiness programme. You
                                    have completed the initial access and acknowledgement steps and
                                    can now proceed with guided onboarding and readiness activities.
                                </p>

                                <p className="muted">
                                    At this stage, the focus remains on preparation, alignment, and
                                    governance, ahead of any wider platform access or client demand.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* STATUS CARDS */}
                    <section className="status-cards">
                        <div className="status-card green">
                            <div className="status-icon">✔</div>
                            <div>
                                <small>Registration Status</small>
                                <h3>Approved</h3>
                                <div className="status-bar green" />
                            </div>
                        </div>

                        <div className="status-card blue">
                            <div className="status-icon">📈</div>
                            <div>
                                <small>Engagement Stage</small>
                                <h3>Readiness</h3>
                                <div className="status-bar blue" />
                            </div>
                        </div>

                        <div className="status-card orange">
                            <div className="status-icon">⏳</div>
                            <div>
                                <small>SLA Status</small>
                                <h3>Pending</h3>
                                <div className="status-bar orange" />
                            </div>
                        </div>
                    </section>

                    <section className="current-status-card">
      {/* Header */}
      <div className="current-status-header">
        <div className="status-icon">
          <span>◎</span>
        </div>
        <div>
          <h3>Your Current Status</h3>
          <p>Select the option that best describes your current situation</p>
        </div>
      </div>

      {/* Status Options */}
      <div className="status-options">
        {/* Onboarding */}
        <div className="status-box inactive">
          <div className="status-radio"></div>
          <div>
            <h4>Onboarding in Progress</h4>
            <p>SLA discussions ongoing, readiness activities underway</p>
          </div>
        </div>

        {/* SLA Not Signed */}
        <div className="status-box active">
          <div className="status-radio active-dot"></div>
          <div className="status-content">
            <h4>
              <span className="warning-icon">⚠</span> SLA Not Signed
            </h4>
            <p>Registration complete, awaiting SLA alignment</p>
            <span className="active-badge">Active Status</span>
          </div>
        </div>
      </div>

      {/* What This Means */}
      <div className="status-info">
        <h4>• What This Means</h4>

        <div className="status-warning">
          <h5>⚠ SLA Not Signed</h5>
          <p>
            We haven’t received your signed SLA (Service Level Agreement).
            Approved candidates from your list will only be ready for the UK
            Market once you send back the signed SLA to{" "}
            <strong>onboarding@westgateithub.in</strong>.
          </p>
          <p className="warning-action">
            📄 Please review, sign, and return the SLA document as soon as
            possible to activate your approved candidates.
          </p>
        </div>
      </div>
    </section>



    <section className="actions-section">
        <div className="actions-header">
          <h3>What You Can Do Now</h3>
          <p>Get started with these key activities</p>
        </div>

        <div className="actions-grid">
          {/* CARD 1 */}
          <div className="action-card">
            <div className="action-top">
              <div className="action-icon blue">📄</div>
              <div>
                <h4>Review & Update My Details</h4>
                <span className="tag essential">Essential</span>
              </div>
            </div>

            <p className="action-desc">
              Manage your organisation information and primary points of contact
              to ensure onboarding records remain accurate and up to date.
            </p>

            <button className="action-btn blue">
              Go to My Details →
            </button>
          </div>

          {/* CARD 2 */}
          <div className="action-card">
            <div className="action-top">
              <div className="action-icon green">👥</div>
              <div>
                <h4>Prepare Candidate Information</h4>
                <span className="tag recommended">Recommended</span>
              </div>
            </div>

            <p className="action-desc">
              Prepare indicative capacity information for readiness and alignment
              purposes. Not activated until SLA agreement and relevant demand arise.
            </p>

            <button className="action-btn green">
              Go to Candidates →
            </button>
          </div>
        </div>
      </section>

     


     {/* IMPORTANT REMINDER */}
<section className="reminder-section">
  <div className="reminder-header">
    <div className="reminder-icon">⚠</div>
    <div>
      <h4>Important Reminder</h4>
      <p>Please keep these key points in mind</p>
    </div>
  </div>

  <div className="reminder-grid">
    <div className="reminder-item">This portal is not a job platform</div>
    <div className="reminder-item">
      No roles or opportunities are allocated at this stage
    </div>
    <div className="reminder-item">
      Participation remains invite-only and governed
    </div>
    <div className="reminder-item">
      Opportunities are demand-led and based on preparedness
    </div>
  </div>
</section>

{/* NEED HELP */}
<section className="help-box">
  <div>
    <h3>Need Help?</h3>
    <p>If you have questions or require support:</p>
  </div>

  <div className="help-actions">
    <button className="help-btn primary">📅 Book a Meeting</button>
    <button className="help-btn outline">Contact Onboarding Team</button>
  </div>
</section>

{/* FOOTER */}
<footer className="portal-footer">
  <div className="page-container">
    <p>
      This portal is operated by <strong>Westgate India</strong>, a business
      registered in India, acting as an authorised and licensed delivery partner
      for <strong>Spectrum IT Hub Ltd (UK)</strong> in relation to the
      TalentedStaff.com ecosystem, which is owned and governed by{" "}
      <strong>ITRF (Global) Ltd (UK)</strong>.
    </p>

    <p className="footer-highlight">
      Access to this portal is limited to onboarding, readiness, and alignment
      activities only. No capacity is active or approved until the Supplier SLA
      is discussed and agreed.
    </p>

    <p>
      This portal does not advertise roles, guarantee opportunities, or
      constitute a commercial agreement. All commercial terms, governance
      arrangements, roles, responsibilities, and legal obligations are defined
      separately through formal agreements and SLAs, where applicable.
    </p>

    <span className="footer-copy">
      © 2025 WestGate IT Hub. All rights reserved.
    </span>
  </div>
</footer>


                </main>
            </div>
        </>
    );
}
