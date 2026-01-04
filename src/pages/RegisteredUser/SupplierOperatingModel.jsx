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
          <section className="operating-grid">
            {/* WHO WE ARE */}
            <div className="op-card">
              <div className="op-card-header blue">
                <span className="op-icon blue">🏢</span>
                <h3>Who We Are</h3>
              </div>

              <p>
                Westgate India is a business registered in India and operates as an
                <strong> authorised and licensed delivery partner</strong> for
                Spectrum IT Hub Ltd (UK) and the TalentedStaff.com ecosystem.
              </p>

              <p>
                Within this ecosystem, Westgate India acts as the
                <strong> single operational hub and primary point of contact</strong>
                for supplier onboarding, readiness coordination, and operational
                alignment.
              </p>

              <div className="partner-box">
                <span>Authorized Partner</span>
                <strong>Spectrum IT Hub Ltd (UK)</strong>
              </div>
            </div>

            {/* WHAT WE DO */}
            <div className="op-card">
              <div className="op-card-header green">
                <span className="op-icon green">✅</span>
                <h3>What We Do</h3>
              </div>

              <p>
                At this stage, Westgate India supports registered suppliers through
                structured onboarding and readiness activities, ahead of any wider platform access or client demand.
              </p>

              <ul className="check-list">
                <li>Coordinating all onboarding interactions</li>
                <li>Acting as the day-to-day engagement point</li>
                <li>Supporting indicative capacity preparation</li>
                <li>Ensuring model clarity before demand introduction</li>
              </ul>
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
