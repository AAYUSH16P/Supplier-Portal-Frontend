import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/About.css";
import AppFooter from "../../Components/common/AppFooter";


export default function About() {
  return (
    <>
      <AppHeader />

      <div className="about-layout">
        <AppSidebar unlocked active="About TS.com" />

        <main className="about-page">
          {/* HERO */}
          <section className="about-hero">
            <h1>About TalentedStaff.com</h1>
            <p>Understanding the ecosystem behind structured engagement</p>
          </section>

          {/* GRID */}
          <section className="about-grid">
            {/* LEFT CARD */}
            <div className="about-card">
            <div className="card-header blue center-title">
  <span className="card-logo">🌐</span>
  <span className="card-title">What TalentedStaff.com Is</span>
</div>





              <div className="card-body">
                <p>
                  TalentedStaff.com is a{" "}
                  <strong>UK-focused talent and capacity engagement ecosystem</strong> designed to
                  work with <strong>prepared, governed technology capacity</strong> through a{" "}
                  <strong>demand-led model</strong>.
                </p>

                <p>
                  It is built on <strong>pre-alignment</strong>, ensuring suppliers and capacity are
                  prepared <strong>before engagement</strong>, rather than sourced{" "}
                  <strong>reactively</strong>.
                </p>


                <div className="info-box blue">
                  <strong>The ecosystem prioritises:</strong>
                  <ul>
                    <li>✔ Readiness over reaction</li>
                    <li>✔ Governance over volume</li>
                    <li>✔ Continuity over ad-hoc sourcing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="about-card">
            <div className="card-header green center-title">
  <span className="card-logo">⚡</span>
  <span className="card-title">Why This Ecosystem Exists</span>
</div>


              <div className="card-body">
                <div className="alert-box orange">
                  <strong>Traditional recruitment models create:</strong>
                  <ul>
                    <li> Time pressure</li>
                    <li> Continuity risk</li>
                    <li> Inconsistent delivery outcomes</li>
                  </ul>
                </div>

                <div className="alert-box green">
                  <strong>TalentedStaff.com’s approach enables:</strong>
                  <ul>
                    <li>✔ Faster response when demand emerges</li>
                    <li>✔ Better continuity through known capacity</li>
                    <li>✔ Clear, governed engagement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          {/* HOW THE ECOSYSTEM IS STRUCTURED */}
          <section className="ecosystem-section">
            {/* Header */}
            <div className="ecosystem-header">
              <div className="ecosystem-icon">🧱</div>
              <div>
                <h3>How the Ecosystem Is Structured</h3>
                <span className="ecosystem-underline"></span>
              </div>
            </div>

            <p className="ecosystem-intro">
              The TalentedStaff.com ecosystem operates through clearly defined roles,
              ensuring separation of ownership, governance, and operations.
            </p>

            {/* Role Cards */}
            <div className="ecosystem-grid">
              {/* Card 1 */}
              <div className="ecosystem-card blue">
                <div className="eco-head">
                  <div className="eco-icon blue">🏢</div>
                  <h4>ITRF (Global) Ltd (UK)</h4>
                </div>
                <p>
                  Owner and governance authority of the TalentedStaff.com ecosystem,
                  defining the overarching framework and operating model.
                </p>
              </div>

              {/* Card 2 */}
              <div className="ecosystem-card green">
                <div className="eco-head">
                  <div className="eco-icon green">🛡</div>
                  <h4>Spectrum IT Hub Ltd (UK)</h4>
                </div>
                <p>
                  Authorised UK partner, responsible for UK-side governance, commercial
                  alignment, and client-side engagement within the ecosystem.
                </p>
              </div>

              {/* Card 3 */}
              <div className="ecosystem-card purple">
                <div className="eco-head">
                  <div className="eco-icon purple">👥</div>
                  <h4>Westgate India</h4>
                </div>
                <p>
                  Authorised delivery partner (India), responsible for supplier
                  onboarding, readiness coordination, and operational alignment.
                </p>
              </div>
            </div>

            {/* Footer Box */}
            <div className="ecosystem-footer">
              <strong>This structure ensures:</strong>

              <div className="ecosystem-points">
                <span>✔ Clear accountability</span>
                <span>✔ Consistent governance</span>
                <span>✔ Single point of contact</span>
              </div>
            </div>
          </section>


          {/* POSITION & PHASED ACCESS */}
          <section className="position-phase-section">
            {/* LEFT CARD */}
            <div className="pp-card pink">
              <div className="pp-header">
                <div className="pp-icon pink">🎯</div>
                <div>
                  <h3>Your Position as a Registered Supplier</h3>
                  <span className="pp-underline pink"></span>
                </div>
              </div>

              <p className="pp-text">
                As a registered supplier, you're participating in the onboarding and
                readiness layer of the ecosystem.
              </p>

              <div className="pp-box blue">
                <strong>This stage enables you to:</strong>
                <ul>
                  <li>
                    <span className="check">✔</span>
                    Complete structured onboarding
                  </li>
                  <li>                    <span className="check">✔</span>
                    Prepare indicative capacity information</li>
                  <li>                    <span className="check">✔</span>
                    Align with governance principles</li>
                  <li>                    <span className="check">✔</span>
                    Be positioned for future demand-led opportunities</li>
                </ul>
              </div>

              <div className="pp-note">
                <span className="note-icon">⚠</span>
                <strong>Note:</strong> Participation does not guarantee work or volume.
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="pp-card">
              <div className="pp-header">
                <div className="pp-icon gray">🧱</div>
                <div>
                  <h3>Phased Platform Access</h3>
                  <span className="pp-underline dark"></span>
                </div>
              </div>

              <p className="pp-text">
                TalentedStaff.com is introduced progressively by version.
              </p>

              {/* PHASED ACCESS BOX (like image) */}
<div className="phase-card">
  {/* CURRENT */}
  <div className="phase-row">
    <span className="phase-pill current">Current Phase</span>
    <span className="phase-title">V0.1A</span>
  </div>

  <p className="phase-text">
    Focuses on supplier onboarding, readiness, and alignment through controlled access.
  </p>

  <div className="phase-divider" />

  {/* PLANNED */}
  <div className="phase-row" style={{ marginTop: 14 }}>
    <span className="phase-pill planned">Planned</span>
    <span className="phase-title planned-title">Later phases (V0.3, 2026+)</span>
  </div>

  <p className="phase-text" style={{ marginTop: 10 }}>
    Enhanced capabilities such as:
  </p>

  <ul className="phase-checks">
    <li>Dynamic reporting</li>
    <li>Industry-level insights</li>
    <li>Trend-based intelligence</li>
  </ul>
</div>


              <div className="phase-footer">
                This phased approach ensures quality, stability, and responsible
                ecosystem growth.
              </div>
            </div>
          </section>



          {/* IMPORTANT CLARIFICATION */}
          <section className="clarification-section">
            <div className="clarification-header">
              <div className="clarification-icon">⚠</div>
              <div>
                <h3>Important Clarification</h3>
                <span className="clarification-underline"></span>
              </div>
            </div>

            <p className="clarification-subtext">
              This page is provided for context and understanding only.
            </p>

            <div className="clarification-box">
              <strong>It does not:</strong>

              <ul className="clarification-list">
  <li><span className="x-icon"></span> Represent an offer of engagement</li>
  <li><span className="x-icon"></span> Guarantee opportunities or volume</li>
  <li><span className="x-icon"></span> Replace formal agreements or SLAs</li>
</ul>

              <div className="clarification-footer">
                All commercial terms, governance requirements, roles,
                responsibilities, and legal arrangements are defined separately
                and formally, where applicable.
              </div>
            </div>
          </section>






        </main>






      </div>
      <AppFooter />

    </>
  );
}


