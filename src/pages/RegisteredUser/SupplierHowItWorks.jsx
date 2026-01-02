import { useState } from "react";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/HowItWorks.css";

export default function SupplierHowItWorks() {
  // Step 2 open by default
  const [openStep, setOpenStep] = useState(2);

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
            <div className="how-card blue">
              <div className="how-card-header">
                🛡️ <span>Your Current Engagement Stage</span>
              </div>

              <div className="how-card-body">
                <p>
                  You are currently in the{" "}
                  <strong>Readiness & Alignment Phase</strong> of a controlled,
                  invite-only supplier engagement model.
                </p>

                <div className="check-box">
                  <p>At this stage, your organisation is now able to:</p>
                  <ul>
                    <li>✔ Complete formal onboarding and alignment activities</li>
                    <li>✔ Prepare and maintain indicative capacity information</li>
                    <li>✔ Engage directly with the onboarding team</li>
                    <li>✔ Position for future demand-led opportunities</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="how-card purple">
              <div className="how-card-header">
                🎯 <span>What This Phase Focuses On</span>
              </div>

              <div className="how-card-body">
                <div className="focus-item purple">
                  Your organisation is fully onboarded and verified
                </div>
                <div className="focus-item blue">
                  Capacity prepared responsibly and accurately
                </div>
                <div className="focus-item green">
                  Alignment achieved before demand
                </div>
                <div className="focus-item yellow">
                  Structured and governed engagement
                </div>
                <div className="focus-note">
                  Completion enables demand-led opportunities later.
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
                Access to this phase reflects readiness, not a guarantee of engagement.
              </p>
              <ul>
                <li>Driven by real client demand</li>
                <li>Introduced progressively</li>
                <li>Aligned to governance criteria</li>
              </ul>
            </div>
          </section>

          {/* JOURNEY */}
          <section className="journey-wrapper">
            <div className="journey-header">
              <h2>→ Your Onboarding Journey</h2>
              <p>
                Typical progression for registered suppliers, subject to governance and
                alignment at each stage.
              </p>
            </div>

            {/* PROGRESS */}
            <div className="journey-progress">
              <div className="progress-line" />

              {JOURNEY_STEPS.map(step => (
                <JourneyStep
                  key={step.value}
                  step={step.stepLabel}
                  title={step.title}
                  color={step.color}
                  icon={step.icon}
                  current={step.current}
                />
              ))}
            </div>

            {/* ACCORDIONS */}
            <div className="journey-accordion">
              {JOURNEY_STEPS.map(step => (
                <JourneyAccordion
                  key={step.value}
                  step={step.value}
                  title={step.accordionTitle}
                  color={step.color}
                  current={step.current}
                  isOpen={openStep === step.value}
                  onToggle={() =>
                    setOpenStep(openStep === step.value ? null : step.value)
                  }
                >
                  <p>{step.description}</p>

                  {step.warning && (
                    <div className="warning-box">
                      <strong>Important:</strong> {step.warning}
                    </div>
                  )}
                </JourneyAccordion>
              ))}
            </div>

            {/* CTA */}
            <div className="journey-cta">
              <div>
                <h3>Ready to Continue Your Journey?</h3>
                <p>Start preparing your capacity information</p>
              </div>

              <button className="cta-btn">
                Go to Candidates <span>→</span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

/* ================= COMPONENTS ================= */

function JourneyStep({ step, title, color, icon, current }) {
  return (
    <div className={`journey-step ${current ? "current" : ""}`}>
      <div className={`step-circle ${color} ${current ? "current" : ""}`}>
        <span className="step-icon-inner">{icon}</span>
      </div>
      <span className="step-label">{step}</span>
      <strong>{title}</strong>
    </div>
  );
}

function JourneyAccordion({
  step,
  title,
  color,
  current,
  isOpen,
  onToggle,
  children
}) {
  return (
    <div className={`accordion-row ${current ? "current" : ""}`}>
      <div className="accordion-header" onClick={onToggle}>
        <span className={`step-badge ${color}`}>{step}</span>
        <strong>{title}</strong>
        {current && <span className="current-pill">CURRENT</span>}
        <span className={`chevron ${isOpen ? "open" : ""}`}>⌄</span>
      </div>

      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
}

/* ================= DATA ================= */




const JOURNEY_STEPS = [
  {
    value: 1,
    stepLabel: "Step 1",
    title: "Registration",
    accordionTitle: "Registration & Approval",
    color: "green",
    icon: "✔",
    description:
      "Your organisation has completed initial registration and approval to access the portal."
  },
  {
    value: 2,
    stepLabel: "Step 2 - Current",
    title: "SLA Review",
    accordionTitle: "SLA Not Signed",
    color: "blue",
    icon: "📄",
    current: true,
    description:
      "Your SLA has not been signed yet. Please sign the SLA to make your capacity and approved candidates ready for opportunity alignment.",
    warning:
      "Until the SLA is signed and agreed upon, your registered capacity will remain in preliminary status and will not be considered for any opportunities."
  },
  {
    value: 3,
    stepLabel: "Step 3",
    title: "Capacity Prep",
    accordionTitle: "Capacity Preparation",
    color: "gray",
    icon: "👥",
    description:
      "You may prepare and submit indicative capacity information for readiness purposes only."
  },
  {
    value: 4,
    stepLabel: "Step 4",
    title: "Review",
    accordionTitle: "Readiness Review",
    color: "gray",
    icon: "🔍",
    description:
      "Capacity and onboarding status are reviewed to confirm preparedness and continuity."
  },
  {
    value: 5,
    stepLabel: "Step 5",
    title: "Opportunities",
    accordionTitle: "Opportunity Alignment (When Applicable)",
    color: "purple",
    icon: "✨",
    description:
      "Opportunities are introduced only when real client demand exists, and only where readiness and suitability criteria are met."
  }
];