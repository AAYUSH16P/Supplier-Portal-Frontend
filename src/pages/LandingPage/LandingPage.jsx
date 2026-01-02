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
        <Sidebar active="landingPage"/>
        
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
                This portal is used to support early-stage supplier onboarding
                and readiness activities as part of a controlled, invite-only
                programme. The programme is designed to prepare selected
                technology suppliers and employers to participate in a UK-facing
                IT engagement model, where supplier capacity is aligned in
                advance of real market demand.
              </p>

              <p>
                The focus at this stage is readiness and alignment, ensuring
                suppliers understand the business context, operating principles,
                and onboarding expectations before wider platform access is
                introduced.
              </p>

              <div className="info-highlight">
                <h3>
                  <span className="info-bar" />
                  Business Context (Why This Portal Matters)
                </h3>

                <p>
                  UK employers and agencies increasingly require prepared,
                  reliable supplier capacity rather than speculative or
                  last-minute sourcing. This portal supports a structured talent
                  and capacity engagement approach.
                </p>

                <p>
                  Rather than operating as an open recruitment or job
                  marketplace, this model prioritises continuity, readiness, and
                  long-term collaboration.
                </p>
              </div>
            </div>






          </section>



          <section className="two-column-info">
        {/* LEFT */}
        <div className="info-box success">
          <h3>What This Portal Is For</h3>
          <p>This portal helps invited suppliers to:</p>

          <ul>
            <li>Understand who we are and what we do</li>
            <li>Understand the business context and engagement model</li>
            <li>Understand how the onboarding process works</li>
            <li>Review supplier expectations and participation principles</li>
            <li>Request clarifications or onboarding support, where required</li>
            <li>Complete supplier onboarding in a structured and governed manner</li>
          </ul>

          <div className="info-note">
            This space is designed to support pre-launch preparation, not open or
            speculative engagement.
          </div>
        </div>

        {/* RIGHT */}
        <div className="info-box danger">
          <h3>What This Portal Is Not</h3>
          <p>To avoid any confusion:</p>

          <ul className="danger-list">
            <li>This is not a job portal</li>
            <li>This is not a recruitment marketplace</li>
            <li>This portal does not allocate or advertise live roles</li>
          </ul>

          <p className="danger-text">
            Participation at this stage forms part of an early-bird onboarding
            programme, focused on readiness, alignment, and eligibility ahead
            of wider engagement phases.
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
