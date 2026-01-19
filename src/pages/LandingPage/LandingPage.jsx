import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../index.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar active="landingPage" />

        <main className="page-content">
          {/* Green Banner */}
          <div className="gateway-banner">
            🌍 Your Gateway to International IT Talent Opportunities
          </div>

          {/* Main Card */}
          <section className="portal-card">
            <div className="portal-header">
              <h1>
                Westgate Supplier Onboarding Portal
                <span>V0.1A</span>
              </h1>
            </div>

            <div className="portal-body">
              <p>
              This portal supports early-stage supplier onboarding and readiness activities as part of a controlled, invite-only programme within the TalentedStaff ecosystem.
              </p>

              <p>At this stage (V0.1A), the focus is on onboarding, readiness confirmation, and alignment. Suppliers are guided to understand the operating principles, participation expectations, and information requirements that apply before any wider platform access or market participation is introduced.</p>

              <p>
              This portal enables suppliers to align early to a structured capacity-readiness approach, ensuring governance, continuity, and operating expectations are understood before engagement.
              </p>

              <div className="info-highlight">
                <h3>
                  <span className="info-bar" />
                  Business Context (Why This Portal Matters)
                </h3>

                <p>
                UK employers and agencies increasingly require prepared, reliable supplier capacity rather than speculative or last-minute sourcing. The TalentedStaff ecosystem supports UK-based clients and agencies that require supplier capacity to be prepared, dependable, and aligned in advance
                </p>

                <p>
                The model is not designed around open recruitment or job advertising, but around long-term capability alignment between UK demand and prepared supplier capacity.
                </p>
              </div>
            </div>






          </section>



          <section className="two-column-info">
            {/* LEFT */}
            <div className="info-box success">
              <h3>What This Portal Is For</h3>
              <p>This portal supports invited suppliers to:</p>

              <ul>
                <li>Understand how the TalentedStaff engagement model operates</li>
                <li>Submit supplier and organisational information for review</li>
                <li>Confirm capacity, continuity, and operating alignment</li>
                <li>Progress through onboarding in a structured, governed manner</li>
              
              </ul>

              <div className="info-note">
              This environment supports pre-launch preparation only.
              </div>
            </div>

            {/* RIGHT */}
            <div className="info-box danger">
              <h3>What This Portal Is Not</h3>
              <p>To avoid any misunderstanding:</p>

              <ul className="danger-list">
                <li>Not a job portal</li>
                <li>Not a recruitment marketplace</li>
                <li>No publication or allocation of live roles</li>
                <li>Not an open client–supplier connection platform</li>

              </ul>
              <br />

              <p className="danger-text">
              Participation at this stage does not imply activation or commercial engagement.
              </p>
            </div>
          </section>

          <section className="how-started">
            <h2 className="how-title">
              🚀 How to Get Started
              <span>Follow these simple steps to complete your onboarding journey</span>
            </h2>

            {/* STEP 1 */}
            <div className="how-step active">
              <div className="how-step-left">
                <span className="how-step-number active">1</span>
              </div>

              <div className="how-step-content">
                <h4>How the Onboarding Process Works</h4>
                <p>
                  Understand the stages, expectations, and operating principles of the
                  onboarding and readiness model.
                </p>

                <button
                  className="how-btn"
                  onClick={() => navigate("/how-it-work")}
                >
                  View How It Works →
                </button>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="how-step active">
              <div className="how-step-left">
                <span className="how-step-number active">2</span>
              </div>

              <div className="how-step-content">
                <h4>Supplier Registration</h4>
                <p>
                  Submit organisational details required for onboarding, verification,
                  and readiness assessment.
                </p>

                <button
                  className="how-btn"
                  onClick={() => navigate("/registration")}
                >
                  Start Registration →
                </button>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="how-step disabled">
              <div className="how-step-left">
                <span className="how-step-number muted">3</span>
              </div>

              <div className="how-step-content">
                <h4>Build Capacity</h4>
                <p>
                  Upload candidate profiles and build your resource pool to showcase
                  your technical talent capacity.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="how-step disabled">
              <div className="how-step-left">
                <span className="how-step-number muted">4</span>
              </div>

              <div className="how-step-content">
                <h4>Business Opportunities</h4>
                <p>
                  Access demand-led UK IT opportunities as they arise, matched to
                  your verified capacity and supplier readiness.
                </p>
              </div>
            </div>
          </section>


          {/* FOOTER */}
          <LandingFooter />



        </main>
      </div>
    </>
  );
}
