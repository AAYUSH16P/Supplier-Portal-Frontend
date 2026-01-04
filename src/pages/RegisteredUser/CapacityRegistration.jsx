import "../../style/RegisteredUser/CapacityRegistration.css";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import { useNavigate } from "react-router-dom";
import AppFooter from "../../Components/common/AppFooter";



export default function CapacityRegistration() {
  const navigate = useNavigate();

  return (
    <>
      <AppHeader />

      <div className="app-shell">
        <AppSidebar unlocked active="Candidates" />

        <main className="capacity-page">
          {/* HERO HEADER */}
          <section className="capacity-hero">
            <h1>Capacity Registration Options</h1>
            <p>
              Select your preferred method to register your candidates
            </p>
          </section>

          {/* CARD 1 */}
          <section className="capacity-card">
            <h2>Purpose of This Page</h2>
            <p>
              Prepare and manage indicative candidate capacity as part of the
              Readiness & Alignment Phase, enabling suppliers to organise,
              validate, and align capacity before any real client demand is
              introduced.
            </p>
          </section>

          {/* CARD 2 */}
          <section className="capacity-card">
            <h2>Important Clarification on Communication:</h2>

            <h3>No Direct Candidate Communication</h3>
            <p>
              The platform does not engage in direct communication with candidates
              and does not operate any direct CV or candidate outreach model. All
              candidate-related communication, consent, and engagement are managed
              exclusively by the employer/supplier. Any candidate information
              captured through this portal is initiated, controlled, and validated
              by the employer as part of readiness activities only.
            </p>

            <h3>No Personal Data at This Stage</h3>
            <p>
              At this stage, no personal data of candidates is collected or
              processed. Only high-level, non-personal, indicative information is
              captured to support readiness and planning. Personal details are
              discussed only if and when confirmed client demand arises.
            </p>

            <div className="info-box">
              This ensures readiness is planned, governed, and demand-led,
              rather than reactive or speculative.
            </div>
          </section>

          {/* CARD 3 */}
          <section className="capacity-card">
            <h2>Minimum Readiness Expectations</h2>
            <p>
              To maintain quality, continuity, and governance, all capacity
              declared at this stage is expected to meet basic readiness
              principles.
            </p>

            <p>
              In general, this means:
            </p>
          </section>



          {/* MINIMUM READINESS EXPECTATIONS */}
          <section className="capacity-card">
            <h2>Minimum Readiness Expectations</h2>

            <p>
              To maintain quality, continuity, and governance, all capacity declared at
              this stage is expected to meet basic readiness principles.
            </p>

            <p>In general, this means:</p>

            <ul className="dot-list">
              <li>
                The individual is currently employed by or formally associated with your
                organisation, with a reasonable and ongoing working relationship that
                supports continuity
              </li>
              <li>
                Availability is realistic, consented, and maintainable
              </li>
              <li>
                Skills and experience are accurately and truthfully represented
              </li>
              <li>
                Capacity reflects genuine, non-speculative engagement, not placeholder or
                future-intent profiles
              </li>
            </ul>

            <p className="muted-text">
              Where exceptions may apply, these are reviewed case by case as part of
              governance and alignment discussions, in line with the Supplier SLA.
            </p>
          </section>

          {/* TWO COLUMN SECTION */}
          <section className="two-column">
            {/* LEFT CARD */}
            <div className="capacity-card">
              <h2>What We Collect (Indicative · Non-Personal · V0.1A)</h2>

              <ul className="check-list">
                <li>Primary role / skill category</li>
                <li>Experience band (e.g. 3–5 yrs, 5–8 yrs)</li>
                <li>Employment status with your organisation</li>
                <li>Indicative availability</li>
                <li>Location band (on-site / near-shore / off-shore)</li>
              </ul>

              <div className="warning-box">
                No CVs · No IDs · No personal contact details · No compliance documents
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="capacity-card">
              <h2>Why We Collect It</h2>

              <ul className="dot-list">
                <li>To understand supplier capability at a high level</li>
                <li>To support continuity and readiness planning</li>
                <li>
                  To enable faster, structured alignment when real client demand arises
                </li>
              </ul>

              <p>At this stage:</p>

              <div className="info-box">
                <p>No information is shared with clients</p>
                <p>No roles or opportunities are allocated</p>
                <p>No capacity is treated as active or approved</p>
              </div>
            </div>
          </section>


          <section className="capacity-options">
            <h2 className="options-title">Choose How to Prepare Capacity</h2>

            <div className="options-grid">
              {/* OPTION 1 */}
              <div className="option-card blue">
                <div className="option-flow blue-bg">
                  <div className="flow-item">📄</div>
                  <span className="arrow">→</span>
                  <div className="flow-item">🔍</div>
                  <span className="arrow">→</span>
                  <div className="flow-item success">✓</div>
                </div>

                <span className="option-tag">◆ Option 1</span>
                <h3>Add Capacity Manually</h3>
                <p className="subtitle">
                  Best for small or selective readiness pools.
                </p>

                <button
                  className="primary-btn blue-btn"
                  onClick={() => navigate("/addCapacityManually")}
                >
                  ➡ Add Capacity Manually
                </button>

                <div className="steps">
                  <p><strong>Step 1:</strong> Enter candidate details manually through the form</p>
                  <p><strong>Step 2:</strong> System investigates and validates the information</p>
                  <p className="success-text"><strong>Step 3:</strong> Admin reviews and approves the capacity</p>
                </div>
              </div>

              {/* OPTION 2 */}
              <div className="option-card green">
                <div className="option-flow green-bg">
                  <div className="flow-item">⬇️</div>
                  <span className="arrow">→</span>
                  <div className="flow-item">📊</div>
                  <span className="arrow">→</span>
                  <div className="flow-item">⬆️</div>
                </div>

                <span className="option-tag">◆ Option 2</span>
                <h3 className="green-text">Bulk Capacity Upload (Excel)</h3>
                <p className="subtitle">
                  Best for larger teams and structured preparation.
                </p>

                <button className="primary-btn green-btn" onClick={() => navigate("/bulkCapacityUpload")}>
                  ➡ Download Template & Upload
                </button>



                <div className="steps">
                  <p><strong>Step 1:</strong> Download the Excel template with pre-defined fields</p>
                  <p><strong>Step 2:</strong> Fill in candidate details in the spreadsheet</p>
                  <p className="success-text"><strong>Step 3:</strong> Upload the completed Excel file to the portal</p>
                </div>
              </div>

              {/* OPTION 3 */}
              <div className="option-card purple">
                <div className="option-flow purple-bg">
                  <div className="flow-item">🔗</div>
                  <span className="arrow">→</span>
                  <div className="flow-item">👥</div>
                  <span className="arrow">→</span>
                  <div className="flow-item success">✓</div>
                </div>

                <span className="option-tag">◆ Option 3</span>
                <h3 className="purple-text">Employer-Initiated Candidate Invite</h3>
                <p className="subtitle">
                  Invite employees to confirm non-personal skill and availability details via a secure link.
                </p>
                <p className="note">No login. No CVs. Employer-controlled.</p>

                <button className="primary-btn purple-btn" onClick={() => navigate("/employerInitiatedInvite")}>
                  ➡ Create Candidate Invite Link
                </button>

                <div className="steps">
                  <p><strong>Step 1:</strong> Generate a unique invitation link for your employees</p>
                  <p><strong>Step 2:</strong> Share the link with employees to self-register their details</p>
                  <p className="success-text"><strong>Step 3:</strong> Review and approve employee-submitted data</p>
                </div>
              </div>
            </div>
          </section>

          <section className="supplier-obligations">
            {/* ORANGE HEADER */}
            <div className="obligation-hero">
              <div className="hero-icon">⚠️</div>
              <div>
                <h2>Supplier Obligations & Status Clarification</h2>
                <p>
                  By preparing capacity on this page, suppliers confirm the following:
                </p>
              </div>
            </div>

            {/* OBLIGATION GRID */}
            <div className="obligation-grid">
              <div className="obligation-card">
                <div className="check-icon">✓</div>
                <div>
                  <h3>Accurate & Realistic Capacity</h3>
                  <p>Declared capacity is accurate, realistic, and consented</p>
                </div>
              </div>

              <div className="obligation-card">
                <div className="check-icon">✓</div>
                <div>
                  <h3>Genuine Working Relationships</h3>
                  <p>Entries represent genuine, maintainable working relationships</p>
                </div>
              </div>

              <div className="obligation-card">
                <div className="check-icon">✓</div>
                <div>
                  <h3>Data Privacy Protection</h3>
                  <p>No restricted, personal, or sensitive data is uploaded</p>
                </div>
              </div>

              <div className="obligation-card">
                <div className="check-icon">✓</div>
                <div>
                  <h3>Coordinated Engagement</h3>
                  <p>
                    All onboarding and readiness engagement is coordinated via
                    Westgate India as the single operational point of contact
                  </p>
                </div>
              </div>
            </div>

            {/* BLUE INFO PANEL */}
            <div className="capacity-info">
              <div className="info-icon">ℹ️</div>
              <div>
                <h3>Capacity Status & Activation</h3>
                <p>
                  All capacity registered at this stage is treated as indicative and
                  not active. It is recorded solely for readiness and alignment
                  purposes and is not approved, activated, or shared for any
                  opportunity. Capacity may be considered further only after the
                  Supplier SLA has been discussed and agreed, confirmed client demand
                  has arisen, and the required governance and alignment checks have
                  been completed.
                </p>
              </div>
            </div>

            {/* FINAL NOTE */}
            <div className="final-note">
              🛡️ This approach ensures supplier participation remains measured,
              transparent, and strictly demand-driven, protecting both suppliers and
              the wider ecosystem.
            </div>
          </section>

        </main>

      </div>
      <AppFooter/>
    </>
  );
}
