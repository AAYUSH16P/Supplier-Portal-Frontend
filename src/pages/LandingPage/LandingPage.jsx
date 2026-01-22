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
            <div className="portal-header" id="abhic">
              <h1>
                Westgate Supplier Onboarding Portal
                <span>Home - V0.1A</span>
              </h1>
            </div>

            <div className="portal-body">
            <p>
    This portal supports{" "}
    <strong>early-stage supplier</strong>{" "}
    onboarding and readiness activities as part of a{" "}
    <strong>controlled, invite-only programme</strong>{" "}
    within the <strong>TalentedStaff ecosystem</strong>.
  </p>

  <p>
    At this stage <strong>(V0.1A)</strong>, the focus is on{" "}
    <strong>onboarding</strong>,{" "}
    <strong>readiness confirmation</strong>, and{" "}
    <strong>alignment</strong>. Suppliers are guided to understand the{" "}
    <strong>operating principles</strong>,{" "}
    <strong>participation expectations</strong>, and{" "}
    <strong>information requirements</strong>{" "}
    that apply before any wider platform access or market participation is introduced.
  </p>
  <p>
    This portal enables suppliers to align early to a{" "}
    <strong>structured capacity-readiness approach</strong>, ensuring{" "}
    <strong>governance</strong>, <strong>continuity</strong>, and{" "}
    <strong>operating expectations</strong> are understood before engagement.
  </p>

              <div className="info-highlight">
                <h3>
                  <span className="info-bar" />
                  Business Context (Why This Portal Matters)
                </h3>

                <p>
      UK employers and agencies increasingly require prepared, reliable supplier capacity
      rather than speculative or last-minute sourcing. The{" "}
     <strong>TalentedStaff ecosystem</strong>{" "}
      supports <strong>UK-based clients and agencies</strong> that require supplier capacity
      to be <strong>prepared, dependable, and aligned in advance</strong>.
    </p>


    <p>
      The model is not designed around open recruitment or job advertising, but around{" "}
      <strong>long-term capability alignment</strong> between UK demand and prepared supplier capacity.
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
    <li>
      Understand how the <strong>TalentedStaff engagement model</strong> operates
    </li>

    <li>
      Submit supplier and <strong>organisational</strong> information for review
    </li>

    <li>
      Confirm <strong>capacity, continuity, and operating alignment</strong>
    </li>

    <li>
      Progress through <strong>onboarding</strong> in a{" "}
      <strong>structured, governed manner</strong>
    </li>
  </ul>

              <div className="info-note">
              This environment supports <strong>pre-launch preparation only.</strong>
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

              <p className="danger-text" id="abhi">
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
