import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../index.css";

export default function AboutTalentedStaff() {
  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar active="about" />

        <main className="page-content">
          {/* ================= HERO ================= */}
          <section className="about-hero">
            <h1>About TalentedStaff.com</h1>
            <p>Building Bridges Between Talent and Opportunity</p>
          </section>

          {/* ================= IN BRIEF ================= */}
          <section className="content-card">
            <div className="card-title">
              <span className="icon blue">◎</span>
              <h3>About the TalentedStaff Ecosystem (Prepared Capacity. Governed Engagement)</h3>
            </div>

            <p>
            TalentedStaff.com is a UK-focused talent and capacity engagement ecosystem designed to help organisations work with prepared and governed technology suppliers through a demand-led engagement model.
            </p>

            <p>
            Rather than relying on open recruitment or speculative staffing, the ecosystem is built around early supplier onboarding and alignment, so that capacity is already prepared when engagement is required. Platform access and capabilities are introduced progressively by phase, supporting quality, continuity, and controlled participation for both suppliers and UK clients.
            </p>
          </section>

          {/* ================= TWO COLUMN ================= */}
          <section className="two-col-grid">
            <div className="content-card">
              <div className="card-title">
                <span className="icon light-blue">📘</span>
                <h4>How TalentedStaff.com Operates</h4>
              </div>

              <p>
              TalentedStaff.com operates as a structured engagement ecosystem connecting UK businesses, agencies, and delivery partners with pre-aligned technology suppliers.
              </p>

              <p>
              Suppliers are onboarded and aligned in advance against defined operating principles, governance requirements, and continuity expectations. Engagement is demand-led and structured, prioritising direct, 1-to-1 resource relationships over project subcontracting or multi-layer delivery chains.
              </p>

              <p>
              The model is designed to support relevant, governed engagement when demand arises, rather than reactive sourcing under time or delivery pressure.
              </p>
            </div>

            <div className="content-card">
              <div className="card-title">
                <span className="icon light-blue">⚡</span>
                <h4>Why This Model Exists</h4>
              </div>

              <p>
              Traditional recruitment and staffing models typically operate reactively, sourcing capacity only after demand is confirmed. This approach often introduces delays, continuity risk, and inconsistent delivery outcomes.
              </p>

              <div className="highlight-box">
                <strong>
                TalentedStaff.com is designed to reverse this sequence by preparing and aligning supplier capacity before engagement. This enables:                </strong>
              </div>

              <ul className="benefits">
                <li>✔ Faster response when client demand is introduced</li>
                <li>✔ Improved continuity through pre-aligned supplier capacity</li>
                <li>✔ Reduced reliance on last-minute sourcing</li>
                <li>✔ Clear governance and accountability across all parties</li>
              </ul>

              <p>The focus is not scale or volume, but preparedness, relevance, and controlled engagement.</p>
            </div>
          </section>
          {/* ================= ECOSYSTEM ================= */}
          <section className="content-card ecosystem-card">
            <div className="card-title">
              <span className="icon light-blue">🧩</span>
              <h3>How the Ecosystem Works</h3>
            </div>

            <p className="ecosystem-subtitle">
              Three coordinated layers working together
            </p>

            <div className="ecosystem-grid">
              {/* LEFT */}
              <div className="ecosystem-col active">
                <h4>Supply Readiness Layer</h4>
                <p className="ecosystem-desc">
                  Controlled onboarding focusing on:
                </p>
                <ul>
                  <li>Organisational readiness</li>
                  <li>Capacity planning</li>
                  <li>Continuity considerations</li>
                </ul>
                <small>Preparation, not immediate engagement</small>
              </div>

              {/* CENTER */}
              <div className="ecosystem-col">
                <h4>Governance & Engagement Layer</h4>
                <p className="ecosystem-desc">
                  Demand-driven engagement through:
                </p>
                <ul>
                  <li>Defined operating principles</li>
                  <li>Clear accountability</li>
                  <li>Structured alignment</li>
                </ul>
                <small>Demand-led, relevant, governed</small>
              </div>

              {/* RIGHT */}
              <div className="ecosystem-col">
                <h4>Platform Enablement Layer</h4>
                <p className="ecosystem-desc">
                  Ecosystem framework supporting:
                </p>
                <ul>
                  <li>Controlled participation</li>
                  <li>Reporting & insights (later phases)</li>
                  <li>Structured workflows</li>
                </ul>
                <small>Introduced progressively</small>
              </div>
            </div>
          </section>


          {/* ================= WHO THIS IS FOR + PARTNERS ================= */}
          <section className="two-col-grid who-partner-section">
            {/* LEFT CARD */}
            <div className="content-card who-card">
              <div className="card-title">
                <span className="icon light-blue">👥</span>
                <h4>Who This Is For</h4>
              </div>

              <p className="who-subtitle">
                Designed for organisations valuing preparedness over speculation:
              </p>

              <ul className="check-list">
                <li>Technology service providers and delivery partners</li>
                <li>Employers and agencies with ongoing demand</li>
                <li>Suppliers seeking structured access</li>
              </ul>

              <div className="not-intended-box">
                <strong>Not intended for:</strong>
                <ul>
                  <li>Job seekers</li>
                  <li>Open CV marketplaces</li>
                  <li>Ad-hoc or speculative recruitment</li>
                </ul>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="content-card partner-card">
              <div className="card-title">
                <span className="icon light-blue">🛡️</span>
                <h4>How Westgate India and Spectrum IT Hub Fit In</h4>
              </div>

              <ul className="bullet-list">
                <li>
                  <strong>Spectrum IT Hub Ltd (UK)</strong> provides the UK-side governance
                  and commercial framework for the ecosystem.
                </li>
                <li>
                  <strong>Westgate India</strong> acts as an authorised delivery partner,
                  supporting supplier onboarding, readiness coordination, and operational
                  alignment.
                </li>
              </ul>

              <div className="partner-highlight">
                <strong>This ensures:</strong>
                <ul className="check-list">
                  <li>Clear accountability</li>
                  <li>Local operational support</li>
                  <li>Consistent governance across regions</li>
                </ul>
              </div>

              <p className="partner-footnote">
                Detailed arrangements are defined through formal agreements and SLAs.
              </p>
            </div>
          </section>


          {/* ================= PHASED ACCESS ================= */}
          <section className="content-card phased-card">
            <div className="card-title">
              <span className="icon light-blue">📈</span>
              <h3>Phased Access & Platform Evolution</h3>
            </div>

            <div className="phased-intro">
              <p>TalentedStaff.com is intentionally launched in phases.</p>
              <p className="muted">Advanced features introduced progressively.</p>
            </div>

            <div className="two-col-grid phased-grid">
              {/* LEFT */}
              <div className="boxed phased-active">
                <h4>Early phases focus on:</h4>
                <ul className="check-list">
                  <li>Supplier onboarding</li>
                  <li>Readiness and alignment</li>
                  <li>Controlled participation</li>
                </ul>
              </div>

              {/* RIGHT */}
              <div className="boxed phased-muted">
                <h4>Later phases (V0.3, planned 2026+):</h4>
                <ul className="dot-list">
                  <li>Enhanced reporting</li>
                  <li>Industry-level insights</li>
                  <li>Trend-based intelligence</li>
                </ul>
              </div>
            </div>

            <p className="phased-note">
              This phased approach avoids premature scale and ensures the ecosystem
              develops responsibly.
            </p>
          </section>

          {/* ================= IMPORTANT CLARIFICATION ================= */}
          <section className=" clarification-box">
            <div className="clarification-header">

              <h4>Important Clarification</h4>
            </div>

            <p className="clarification-text">
              This explainer page is provided for context and understanding only.
            </p>

            <ul className="clarification-list">
              <li>Does not guarantee work or volume</li>
              <li>Not an offer of engagement</li>
              <li>Does not replace formal agreements</li>
            </ul>

            <p className="clarification-footnote">
              Participation, obligations, and commercial terms are defined separately
              and formally, when relevant.
            </p>
          </section>


          {/* ================= FOOTER DISCLAIMER ================= */}



        </main>
        
      </div>
      <LandingFooter />

    </>
  );
}
