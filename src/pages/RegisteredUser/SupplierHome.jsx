import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/SupplierHome.css";
import { useNavigate } from "react-router-dom";
import AppFooter from "../../Components/common/AppFooter";
import { useMemo, useEffect } from "react";


export default function SupplierHome() {
  const navigate = useNavigate();

  const isSlaSigned = useMemo(() => {

    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.isSlaSigned === "True";
    } catch {
      return false;
    }
  }, []);


  const handleRefreshToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));
  
      const email = payload.email;
      const companyId = payload.companyId;
  
      const response = await fetch(
        "https://sp-portal-backend-production.up.railway.app/api/company/refreshToken",
        {
          method: "POST",
          headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password: "string", // backend-required placeholder
            companyId
          })
        }
      );

      debugger;
  
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
  
      const data = await response.json();
  
      // 🔐 Replace token with new token from API
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Refresh token error:", error);
    }
  };

  useEffect(() => {
    handleRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  


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
          <section className="hero-exact">
            <span className="hero-pill">
              ✨ Version 0.1A – Readiness Phase
            </span>

            <div className="hero-content">
              <div className="hero-icon-wrap">
                <span className="hero-icon">🏠</span>
              </div>

              <div className="hero-text">
                <h1>Welcome to Your Supplier Portal</h1>

                <p>
                  Your organisation is now registered and approved as part of the controlled
                  supplier onboarding and readiness programme. You have completed the initial
                  access and acknowledgement steps and can now proceed with guided onboarding
                  and readiness activities.
                </p>

                <p className="hero-muted">
                  At this stage, the focus remains on preparation, alignment, and governance,
                  ahead of any wider platform access or client demand.
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

            <div className={`status-card ${isSlaSigned ? "green" : "orange"}`}>
              <div className="status-icon">
                {isSlaSigned ? "✔" : "⏳"}
              </div>
              <div style={{
                display:"grid",
                gridTemplateColumns:"1fr 1fr",
                gap:"6rem"
              }}>
                <div>
                <small>SLA Status</small>
                <h3>{isSlaSigned ? "Signed" : "Pending"}</h3>
                <div className={`status-bar ${isSlaSigned ? "green" : "orange"}`} />
                </div>
           

             

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

            </div>

            {/* What This Means */}
            <div className="status-info">
              <h4>• What This Means</h4>

              {isSlaSigned ? (
                /* ✅ SLA SIGNED */
                <div className="status-success">
                  <div className="success-header">
                    <span className="success-icon">✔</span>
                    <h5>SLA Signed</h5>
                  </div>

                  <p>
                    We have received your signed SLA (Service Level Agreement).
                    Candidates approved from your list are now ready for the UK Market
                    and can be considered for demand-led opportunities.
                  </p>
                </div>

              ) : (
                /* ❌ SLA NOT SIGNED */
                <div className="sla-warning-card">
                  <div className="sla-warning-header">
                    <span className="sla-warning-icon">⚠️</span>
                    <h5>SLA Not Signed</h5>
                  </div>

                  <p className="sla-warning-text">
                    We haven't received your signed SLA (Service Level Agreement).
                    Approved candidates from your list will only be ready for the UK Market
                    once you send back the signed SLA to{" "}
                    <strong>onboarding@westgateithub.in</strong>.
                  </p>

                  <div className="sla-warning-note">
                    📄 Please review, sign, and return the SLA document as soon as possible
                    to activate your approved candidates.
                  </div>
                </div>
              )}

            </div>


          </section>



          <section className="what-now-wrapper">
            {/* HEADER */}
            <div className="what-now-header">
              <h2>What You Can Do Now</h2>
              <p>Get started with these key activities</p>
            </div>

            {/* CONTENT */}
            <div className="what-now-content">
              <div className="what-now-grid">
                {/* CARD 1 */}
                <div className="what-now-card">
                  <div className="card-top">
                    <div className="card-icon blue">📄</div>

                    <div className="card-title">
                      <h4>Review & Update My Details</h4>
                      <span className="pill essential">Essential</span>
                    </div>
                  </div>

                  <p className="card-text">
                    Manage your organisation information and primary points of contact to
                    ensure onboarding records remain accurate and up to date.
                  </p>

                  <button className="card-btn blue" onClick={() => navigate("/detail")}>
                    Go to My Details <span>→</span>
                  </button>
                </div>

                {/* CARD 2 */}
                <div className="what-now-card">
                  <div className="card-top">
                    <div className="card-icon green">👥</div>

                    <div className="card-title">
                      <h4>Prepare Candidate Information</h4>
                      <span className="pill recommended">Recommended</span>
                    </div>
                  </div>

                  <p className="card-text">
                    Prepare indicative capacity information for readiness and alignment
                    purposes. Not activated until SLA agreement and relevant demand arise.
                  </p>

                  <button className="card-btn green" onClick={() => navigate("/candidate")}>
                    Go to Candidates <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>





          {/* IMPORTANT REMINDER */}
          <section className="reminder-wrapper">
            <div className="reminder-header">
              <div className="reminder-icon">⚠</div>
              <div>
                <h4>Important Reminder</h4>
                <p>Please keep these key points in mind</p>
              </div>
            </div>

            <div className="reminder-list">
              <div className="reminder-pill">This portal is not a job platform</div>
              <div className="reminder-pill">
                No roles or opportunities are allocated at this stage
              </div>
              <div className="reminder-pill">
                Participation remains invite-only and governed
              </div>
              <div className="reminder-pill">
                Opportunities are demand-led and based on preparedness
              </div>
            </div>
          </section>


          {/* NEED HELP */}
          <section className="help-box">
            <h3>Need Help?</h3>
            <p>If you have questions or require support:</p>

            <div className="help-actions">
              <button className="help-btn primary" onClick={() => navigate("/meeting")}>📅 Book a Meeting</button>
              <button className="help-btn outline" onClick={() => navigate("/contact")} >Contact Onboarding Team</button>
            </div>
          </section>


          {/* FOOTER */}
          {/* <footer className="portal-footer">
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
          </footer> */}



        </main>
      </div>
      <AppFooter />

    </>
  );
}
