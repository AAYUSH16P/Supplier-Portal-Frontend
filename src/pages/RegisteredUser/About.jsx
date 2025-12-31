import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/About.css";

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
            <p>Understanding the Ecosystem Powering Your Success</p>
          </section>

          {/* GRID */}
          <section className="about-grid">
            {/* LEFT CARD */}
            <div className="about-card">
              <div className="card-header blue">
                🌐 <span>What TalentedStaff.com Is</span>
              </div>

              <div className="card-body">
                <p>
                  TalentedStaff.com is a UK-focused talent and capacity engagement
                  ecosystem designed to connect organisations with prepared, governed
                  technology capacity through a demand-led and continuity-focused model.
                </p>

                <p>
                  Unlike open recruitment marketplaces, it’s built on
                  <strong> pre-alignment</strong> — ensuring suppliers and capacity are
                  prepared before real client demand is introduced.
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
              <div className="card-header green">
                ⚡ <span>Why This Ecosystem Exists</span>
              </div>

              <div className="card-body">
                <div className="alert-box orange">
                  <strong>Traditional recruitment models create:</strong>
                  <ul>
                    <li>• Time pressure</li>
                    <li>• Continuity risk</li>
                    <li>• Inconsistent delivery outcomes</li>
                  </ul>
                </div>

                <div className="alert-box green">
                  <strong>TalentedStaff.com’s approach enables:</strong>
                  <ul>
                    <li>✔ Faster response when demand emerges</li>
                    <li>✔ Better continuity through known capacity</li>
                    <li>✔ Clear expectations across all parties</li>
                    <li>✔ Structured, governed engagement</li>
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
      <div className="eco-icon blue">🏢</div>
      <h4>ITRF (Global) Ltd (UK)</h4>
      <p>
        Owner and governance authority of the TalentedStaff.com ecosystem,
        defining the overarching framework and operating model.
      </p>
    </div>

    {/* Card 2 */}
    <div className="ecosystem-card green">
      <div className="eco-icon green">🛡</div>
      <h4>Spectrum IT Hub Ltd (UK)</h4>
      <p>
        Authorised UK partner, responsible for UK-side governance, commercial
        alignment, and client-side engagement within the ecosystem.
      </p>
    </div>

    {/* Card 3 */}
    <div className="ecosystem-card purple">
      <div className="eco-icon purple">👥</div>
      <h4>Westgate India</h4>
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
        <li>✔ Complete structured onboarding</li>
        <li>✔ Prepare indicative capacity information</li>
        <li>✔ Align with governance principles</li>
        <li>✔ Be positioned for future demand-led opportunities</li>
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

    {/* CURRENT PHASE */}
    <div className="phase-box green">
      <div className="phase-header">
        <span className="phase-badge current">Current Phase</span>
        <strong>V0.1A</strong>
      </div>

      <p>
        Focuses on supplier onboarding, readiness, and alignment through
        controlled access.
      </p>
    </div>

    {/* PLANNED PHASE */}
    <div className="phase-box gray">
      <div className="phase-header">
        <span className="phase-badge planned">Planned</span>
        <strong>Later phases (V0.3, 2026+)</strong>
      </div>

      <p>Enhanced capabilities such as:</p>
      <ul className="phase-list">
        <li>○ Dynamic reporting</li>
        <li>○ Industry-level insights</li>
        <li>○ Trend-based intelligence</li>
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

    <div className="clarification-grid">
      <div className="clarification-item">
        <span className="x-icon">×</span>
        Represent an offer of engagement
      </div>

      <div className="clarification-item">
        <span className="x-icon">×</span>
        Guarantee opportunities or volume
      </div>

      <div className="clarification-item">
        <span className="x-icon">×</span>
        Replace formal agreements or SLAs
      </div>
    </div>

    <div className="clarification-footer">
      All commercial terms, governance requirements, roles,
      responsibilities, and legal arrangements are defined separately
      and formally, where applicable.
    </div>
  </div>
</section>



{/* PORTAL FOOTER */}
<footer className="portal-footer">
  <div className="portal-footer-inner">
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


