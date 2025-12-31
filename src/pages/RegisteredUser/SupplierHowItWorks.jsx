import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/HowItWorks.css";

export default function SupplierHowItWorks() {
  return (
    <>
      <AppHeader />

      <div className="how-layout">
        <AppSidebar unlocked active="How It Works" />

        <main className="how-page">
          {/* HERO */}
          <section className="how-hero">
            <div className="hero-icon">📘</div>
            <div>
              <h1>How It Works</h1>
              <p>End-to-End Supplier Onboarding Journey, Simplified</p>
            </div>
          </section>

          {/* MAIN GRID */}
          <section className="how-grid">
            {/* LEFT CARD */}
            <div className="how-card blue">
              <div className="how-card-header">
                🛡️ <span>Your Current Engagement Stage</span>
              </div>

              <div className="how-card-body">
                <p>
                  You are currently in the{" "}
                  <strong>Readiness & Alignment Phase</strong> of a controlled,
                  invite-only supplier engagement model. This phase is accessible
                  only to approved and registered suppliers.
                </p>

                <div className="check-box">
                  <p>At this stage, your organisation is now able to:</p>
                  <ul>
                    <li>✔ Complete formal onboarding and alignment activities</li>
                    <li>
                      ✔ Prepare and maintain indicative capacity information
                    </li>
                    <li>
                      ✔ Engage directly with the onboarding team for clarification
                    </li>
                    <li>
                      ✔ Position for future demand-led opportunities
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="how-card purple">
              <div className="how-card-header">
                🎯 <span>What This Phase Focuses On</span>
              </div>

              <div className="how-card-body">
                <div className="focus-item purple">
                  Your organisation is fully onboarded and verified
                </div>

                <div className="focus-item blue">
                  Capacity prepared responsibly, accurately, and with continuity
                  in mind
                </div>

                <div className="focus-item green">
                  Alignment is achieved before any client demand is introduced
                </div>

                <div className="focus-item yellow">
                  Engagement remains structured, transparent, and governed
                </div>

                <div className="focus-note">
                  Completion of this phase enables the platform to consider
                  introducing relevant, demand-led opportunities in later stages,
                  where applicable.
                </div>
              </div>
            </div>
          </section>

          {/* IMPORTANT CONTEXT */}
          <section className="context-box">
            <div className="context-header">
              ⚠️ <span>Important Context</span>
            </div>

            <div className="context-content">
              <p>
                Access to this phase reflects readiness status, not a guarantee of
                engagement.
              </p>

              <ul>
                <li>Driven by real client demand</li>
                <li>Introduced progressively</li>
                <li>
                  Aligned based on preparedness, suitability, and governance
                  criteria
                </li>
              </ul>
            </div>
          </section>




          <section className="journey-wrapper">
      {/* HEADER */}
      <div className="journey-header">
        <h2>→ Your Onboarding Journey</h2>
        <p>
          The onboarding journey below outlines the typical progression for
          registered suppliers, subject to governance and alignment at each
          stage.
        </p>
      </div>

      {/* SLA SELECT */}
      <div className="sla-box">
        <h4>Select Your Current SLA Status:</h4>
        <label>
          <input type="radio" name="sla" /> SLA Signed
        </label>
        <label className="active">
          <input type="radio" name="sla" defaultChecked /> SLA Not Signed
        </label>
      </div>

      {/* STEPS */}
      <div className="journey-steps">
        <Step label="Step 1" title="Registration" status="done" />
        <Step label="Step 2 - Current" title="SLA Review" status="current" />
        <Step label="Step 3" title="Capacity Prep" />
        <Step label="Step 4" title="Review" />
        <Step label="Step 5" title="Opportunities" />
      </div>

      {/* ACCORDIONS */}
      <div className="journey-accordion">
        <Accordion step={1} title="Registration & Approval" />
        <Accordion
          step={2}
          title="SLA Not Signed"
          current
          content={
            <>
              <p>
                Your SLA has not been signed yet. Please sign the SLA to make
                your capacity and approved candidates ready for opportunity
                alignment.
              </p>

              <div className="warning-box">
                <strong>Important:</strong> Until the SLA is signed and agreed
                upon, your registered capacity will remain in preliminary
                status and will not be considered for any opportunities.
              </div>
            </>
          }
        />
        <Accordion step={3} title="Capacity Preparation" />
        <Accordion step={4} title="Readiness Review" />
        <Accordion step={5} title="Opportunity Alignment (When Applicable)" />
      </div>

      {/* CTA */}
      <div className="journey-cta">
        <div>
          <h3>Ready to Continue Your Journey?</h3>
          <p>Start preparing your capacity information</p>
        </div>

        <button className="cta-btn">Go to Candidates →</button>
      </div>
    </section>


        </main>
      </div>
    </>
  );
}



function Step({ label, title, status }) {
  return (
    <div className={`step ${status || ""}`}>
      <div className="step-icon" />
      <span>{label}</span>
      <strong>{title}</strong>
    </div>
  );
}

function Accordion({ step, title, content, current }) {
  return (
    <div className={`accordion ${current ? "current" : ""}`}>
      <div className="accordion-header">
        <span className={`step-badge step-${step}`}>{step}</span>
        <strong>{title}</strong>
        {current && <span className="current-badge">CURRENT</span>}
      </div>

      {content && <div className="accordion-body">{content}</div>}
    </div>
  );
}