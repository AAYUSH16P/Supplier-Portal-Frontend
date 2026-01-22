import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/OperatingModel.css";
import AppFooter from "../../Components/common/AppFooter";


export default function SupplierOperatingModel() {
  return (
    <>
      <AppHeader />

      <div className="operating-layout">
        <AppSidebar unlocked active="Operating Model" />

        <main className="operating-page">
          {/* HERO */}
          <section className="operating-hero">
            <h1>Operating Model</h1>
            <p>Your Trusted Partner in the Global Talent Ecosystem</p>
          </section>

          {/* TOP GRID */}
         {/* OPERATING MODEL INTRO */}
<section className="op-section op-section--intro">
  <div className="op-section-head">
    <div className="op-badge op-badge--blue">🏢</div>
    <div>
      <h2>Operating Model</h2>
      <div className="op-underline op-underline--blue" />
    </div>
  </div>

  <h3 className="op-subtitle">How the TalentedStaff ecosystem is structured and operated</h3>
  <p className="op-muted">
    The TalentedStaff.com ecosystem operates through clearly defined roles, ensuring separation between
    ownership, governance, and day-to-day operations. This structure is designed to provide clarity,
    accountability, and controlled engagement across regions.
  </p>
</section>

{/* ECOSYSTEM STRUCTURE */}
<section className="op-section">
  <div className="op-section-head">
    <div className="op-badge op-badge--green">🎯</div>
    <div>
      <h2>Ecosystem Structure</h2>
      <div className="op-underline op-underline--green" />
    </div>
  </div>

  <div className="op-body">
    <h4>ITRF (Global) Ltd (UK)</h4>
    <p>ITRF (Global) Ltd is the owner and governance authority of the TalentedStaff.com ecosystem.</p>
    <p>
      It defines the overall framework, operating model, and governance principles under which the ecosystem operates.
    </p>

    <h4>Spectrum IT Hub Ltd (UK)</h4>
    <p>Spectrum IT Hub Ltd is the authorised UK partner, responsible for:</p>
    <ul className="op-bullets">
      <li>UK-side governance and commercial alignment</li>
      <li>Client-side engagement within the ecosystem</li>
      <li>Ensuring engagements operate within the defined operating model</li>
    </ul>
    <p>
      Spectrum IT Hub does not act as a recruitment agency or delivery intermediary, but as the UK governance and
      engagement authority.
    </p>

    <h4>Westgate IT Hub Pvt. Ltd.</h4>
    <p>Westgate IT Hub Pvt. Ltd. is the authorised delivery and operations partner (India).</p>
    <p>
      Within the ecosystem, Westgate IT Hub Pvt. Ltd. acts as the single operational hub and primary point of contact for
      suppliers during onboarding and readiness phases.
    </p>

    <p>Westgate IT Hub Pvt. Ltd. is responsible for:</p>
    <ul className="op-bullets">
      <li>Supplier onboarding and registration</li>
      <li>Readiness coordination and alignment</li>
      <li>Day-to-day operational engagement with suppliers</li>
      <li>Supporting indicative capacity preparation</li>
      <li>Ensuring suppliers understand the engagement model before any client demand is introduced</li>
    </ul>

    <p className="op-muted">
      Suppliers are not required to engage with multiple entities during onboarding or readiness activities.
    </p>
  </div>
</section>


          {/* ENGAGEMENT STRUCTURE */}
          <section className="engagement-section">
            <h2>Engagement Structure</h2>
            <p>Your journey through the TalentedStaff ecosystem</p>

            <div className="engagement-flow">
              <div className="flow-card blue">
                <span className="flow-icon">📝</span>
                <h4>Supplier Registration</h4>
                <p>Initial onboarding phase</p>
              </div>

              <span className="flow-arrow">→</span>

              <div className="flow-card green">
                <span className="flow-icon">🤝</span>
                <h4>Westgate India Hub</h4>
                <p>Coordination & alignment</p>
              </div>

              <span className="flow-arrow">→</span>

              <div className="flow-card purple">
                <span className="flow-icon">🌐</span>
                <h4>TalentedStaff.com</h4>
                <p>Platform ecosystem</p>
              </div>
            </div>
          </section>


          <section className="important-notice">
            <div className="notice-icon">
              🧳
            </div>

            <div className="notice-content">
              <h4>Important Notice</h4>
              <p>
                All commercial terms, governance arrangements, roles, responsibilities,
                and legal details are formally defined through the{" "}
                <strong className="notice-link">Supplier SLA</strong>, which is discussed
                and agreed separately before any capacity is approved or activated.
              </p>
            </div>
          </section>

        </main>
      </div>
      <AppFooter/>
    </>
  );
}
