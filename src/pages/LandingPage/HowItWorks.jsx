import { useEffect } from "react";
import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../index.css";
import { useNavigate } from "react-router-dom";






export default function HowItWorks() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // or "smooth"
    });
  }, []);


  return (




    <>
      <Header />

      <div className="layout">
        <Sidebar active="how-it-works" />

        <main className="page-content">

          {/* GREEN STRIP */}
          <div className="top-strip">
            🚀 Your Journey to UK Market Access Starts Here
          </div>

          {/* HERO CARD */}
          <section className="hero-card blue">
            <h1>How It Works</h1>
            <p>Your Step-by-Step Onboarding Journey</p>
          </section>

          {/* WELCOME CARD */}
          <section className="content-card onboarding-welcome">
            <div className="welcome-title">
              ✨Welcome to the Onboarding Journey
            </div>

            <p>
  This onboarding journey supports <strong>early-phase supplier readiness</strong>{" "}
  within a <strong>controlled, invite-only engagement model</strong>.
</p>

<p>
  It forms part of a <strong>UK-facing, demand-led IT engagement approach</strong>, where
  suppliers are <strong>onboarded</strong> and aligned in <strong>advance of engagement</strong>.
  This ensures that, when client demand is introduced, participation can be{" "}
  <strong>structured, relevant, and governed</strong>, rather than reactive or speculative.
</p>


            {/* STEPS */}
            <div className="steps-box">
              <p className="steps-heading">
                The onboarding process consists of 3 structured steps
              </p>

              <div className="steps-row">
                <div className="step active">
                  <span>1</span>
                  <small>Register</small>
                </div>
                <div className="step active">
                  <span>2</span>
                  <small>SLA Review</small>
                </div>
                <div className="step active">
                  <span>3</span>
                  <small>Build Capacity</small>
                </div>
                <div className="step active">
  <span className="step-badge">
    <img src="/25499.jpg" alt="Business" className="step-icon" />
  </span>
  <small>Business Opportunities</small>
</div>

              </div>
            </div>
          </section>

          {/* STEP 1 CARD */}
          <section className="step-card step-green">
            <div className="step-line"></div>

            <div className="step-content">
              {/* STEP HEADER */}
              <div className="step-header">
                <div className="step-number">1</div>

                <div>
                  <h3>Supplier Registration</h3>
                  <p className="step-subtitle">
                    Submit organisational details required for onboarding, verification,
                    and readiness assessment through our structured registration form.
                  </p>
                </div>
              </div>

              {/* PROVIDE BOX */}
              <div className="step-box">
                <strong>What you’ll provide:</strong>

                <div className="provide-grid">
                  <div className="provide-card">
                    <span className="provide-icon">🏢</span>
                    <h4>Organisation Info</h4>
                    <p>Company details and registration information</p>
                  </div>

                  <div className="provide-card">
                    <span className="provide-icon">👤</span>
                    <h4>Contact Details</h4>
                    <p>Primary points of contact and roles</p>
                  </div>

                  <div className="provide-card">
                    <span className="provide-icon">🧩</span>
                    <h4>Capability Info</h4>
                    <p>High-level delivery capability indicators</p>
                  </div>
                </div>
              </div>

              {/* PRIVACY */}
              <div className="privacy-note">
                <strong>Privacy Note:</strong>  Information collected at this stage is used solely for onboarding and readiness verification, to confirm supplier alignment before any further progression
              </div>

              {/* CTA */}
              <button className="step-cta" onClick={() => navigate("/registration")}    >
                Start Your Registration →
              </button>
            </div>
          </section>


          <div className="step-connector green-to-purple"></div>



          <section className="step-card step-purple">
            <div className="step-line"></div>

            <div className="step-content">
              {/* HEADER */}
              <div className="step-header">
                <div className="step-number">2</div>

                <div>
                  <h3>Supplier SLA Review & Confirmation</h3>

                  <div className="step-alert">
                    ⏱ <strong>After Registration:</strong> This step happens after your
                    registration is successfully submitted and reviewed.
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="step-desc">
                Review, sign, and return the Supplier SLA to confirm governance and
                operating alignment with the TalentedStaff ecosystem.
              </div>

              {/* INCLUDES */}
              <div className="step-includes">
                <strong>What this step includes:</strong>

                <div className="include-item">
                  <span className="include-dot"></span>
                  <div>
                    <strong>Governance Framework</strong>
                    <p>Understanding operating principles and accountability structures</p>
                  </div>
                </div>

                <div className="include-item">
                  <span className="include-dot"></span>
                  <div>
                    <strong>Service Level Agreement</strong>
                    <p>Reviewing and confirming operational commitments</p>
                  </div>
                </div>

                <div className="include-item">
                  <span className="include-dot"></span>
                  <div>
                    <strong>Formal Alignment</strong>
                    <p>Signing and returning documentation to proceed</p>
                  </div>
                </div>
              </div>

              {/* PURPOSE */}
              <div className="purpose-box">
                🎯 <strong>Purpose:</strong> This step helps confirm alignment with the
                operating and governance framework before moving forward to capacity
                preparation.
              </div>
            </div>
          </section>




          {/* CONNECTOR: STEP 2 → STEP 3 */}
          <div className="step-connector purple-to-pink"></div>

          {/* STEP 3 CARD */}
          <section className="step-card step-pink">
            <div className="step-content">

              {/* HEADER */}
              <div className="step-header">
                <div className="step-number pink">3</div>

                <div>
                  <h3>Build Capacity</h3>

                  <div className="step-alert yellow">
                    ⏱ <strong>After Registration & SLA Confirmation:</strong> This step
                    happens after completing Steps 1 and 2.
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="step-desc">
                Prepare high-level capacity readiness information in line with the
                onboarding model, indicating your available technology talent and
                delivery capacity.
              </div>

              {/* METHODS */}
              <div className="step-methods">
                <strong>Capacity submission methods:</strong>

                <div className="method-grid">
                  <div className="method-card">
                    <span className="method-icon">✍️</span>
                    <h4>Manual Entry</h4>
                    <p>Enter capacity details directly through the portal</p>
                  </div>

                  <div className="method-card">
                    <span className="method-icon">📊</span>
                    <h4>Excel Upload</h4>
                    <p>Use structured templates for bulk uploads</p>
                  </div>

                  <div className="method-card">
                    <span className="method-icon">🔗</span>
                    <h4>Secure Link Entry</h4>
                    <p>Enhanced options in later platform phases</p>
                  </div>
                </div>
              </div>

              {/* NOTE */}
              <div className="info-note pink">
              No individual candidate personal data is collected or processed at this stage.
  Candidate details, documentation, or profiles are addressed separately{" "}
  <strong>after supplier registration</strong>, and{" "}
  <strong>only where relevant client demand requires it</strong>.              </div>
            </div>
          </section>


          <div className="step-connector purple-to-pink"></div>

          <section className="step-card step-green">
            <div className="step-content">

              {/* HEADER */}
              <div className="step-header">
                <div className="step-number green">4</div>

                <div>
                  <h3>Business Opportunities</h3>

                  <div className="step-alert yellow">
                    ⏱ <strong>After Capacity Building:</strong> This step happens after
                    completing Steps 1, 2, and 3.
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="step-desc">
                Access demand-led UK IT opportunities matched to your verified capacity
                and supplier readiness, as client requirements emerge.
              </div>

              {/* HOW IT WORKS */}
              <div className="step-includes">
                <strong>How opportunities work:</strong>

                <div className="method-grid">
                  <div className="method-card">
                    <span className="method-icon">🎯</span>
                    <h4>Demand-Driven</h4>
                    <p>Based on actual client requirements, not speculative engagement</p>
                  </div>

                  <div className="method-card">
                    <span className="method-icon">🧠</span>
                    <h4>Readiness-Aligned</h4>
                    <p>Matched based on your capacity, preparedness and capability</p>
                  </div>

                  <div className="method-card">
                    <span className="method-icon">📈</span>
                    <h4>Progressive</h4>
                    <p>Introduced as platform capabilities and demand expand</p>
                  </div>
                </div>
              </div>

              {/* LIST ITEMS */}
              <div className="include-list">
                <div className="include-item" style={{ paddingTop: "10px" }}>
                  <span className=""></span>
                  <div>
                    <strong>Opportunity Notifications</strong>
                    <p>
                      Receive alerts when relevant UK client requirements match your
                      capacity profile
                    </p>
                  </div>
                </div>

                <div className="include-item">
                  <span className=""></span>
                  <div>
                    <strong>Structured Engagement</strong>
                    <p>
                      Participate in governed, transparent processes for role allocation
                      and placement
                    </p>
                  </div>
                </div>

                <div className="include-item">
                  <span className=""></span>
                  <div>
                    <strong>Long-Term Collaboration</strong>
                    <p>
                      Build sustainable partnerships through consistent quality delivery
                      and alignment
                    </p>
                  </div>
                </div>
              </div>

              {/* PHILOSOPHY */}
              <div className="info-note green">
  <strong>Key Philosophy:</strong> <strong>TalentedStaff</strong> follows a{" "}
  <strong>demand-led engagement approach</strong> in which opportunities are introduced
  progressively in response to confirmed client requirements. Engagements are structured
  to align supplier capacity with client needs, supporting continuity and long-term
  collaboration over speculative activity.
</div>


              {/* GETTING STARTED */}
              <div className="info-note neutral">
                🚀 <strong>Getting Started:</strong> By completing Steps 1–3, you position
                yourself to be among the first suppliers considered when relevant UK
                opportunities arise, ensuring you’re ready when demand is introduced.
              </div>
            </div>
          </section>

          {/* KEY TAKEAWAY */}
          <section className="final-card takeaway-card">
            <h4 className="card-title">
              Key Takeaway
            </h4>

            <p>
              At this stage, the onboarding process is focused on
              <strong> readiness and alignment</strong>. Opportunities are introduced
              only when there is confirmed client demand and are aligned based on
              supplier preparedness and suitability.
            </p>

            <p>
              This approach ensures engagement remains measured, transparent, and
              demand-driven, supporting long-term collaboration rather than short-term
              speculation.
            </p>
          </section>

          {/* FINAL CTA */}
          <section className="final-cta">
            <div>
              <h3>🚀 Ready to Begin Your Journey?</h3>
              <p>
                Now that you understand how it works, take the next step and start
                your supplier registration.
              </p>
            </div>

            <button className="cta-button" onClick={() => navigate("/registration")}
            >
              Proceed to Registration →
            </button>
          </section>

          {/* COMPLIANCE FOOTER */}





        </main>
      </div>
      <LandingFooter />

    </>
  );
}
