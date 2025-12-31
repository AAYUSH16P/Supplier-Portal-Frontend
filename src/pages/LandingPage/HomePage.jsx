import "../../index.css";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (

<>
    <Header />

    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>Welcome to WestGate</h1>
        <p>
          Connecting skilled IT professionals with UK opportunities through
          trusted supplier partnerships
        </p>
      </header>

      {/* Action Cards */}
      <section className="card-grid">
          <div className="card card-blue">
            <div className="icon-circle blue-bg">👤</div>
            <h3>New Supplier Registration</h3>
            <p>Register your company to join the TalentedStaff supplier network.</p>
            <button className="btn btn-blue" onClick={() => navigate("/onboardingLanding")}>Register Now</button>
            <span>For new suppliers only</span>
          </div>

          <div className="card card-green">
            <div className="icon-circle green-bg">➡️</div>
            <h3>Supplier Portal Login</h3>
            <p>Access your portal to manage candidates and track submissions</p>
            <button className="btn btn-green">Login to Portal</button>
            <span>For registered suppliers</span>
          </div>

          <div className="card card-purple">
            <div className="icon-circle purple-bg">🛡️</div>
            <h3>Admin Portal</h3>
            <p>Review supplier registrations, approve candidates, and manage the platform</p>
            <button className="btn btn-purple">Admin Login</button>
          </div>

          <div className="card card-orange">
            <div className="icon-circle orange-bg">🏢</div>
            <h3>Employee Access</h3>
            <p>Complete your profile using the invitation link from your employer</p>
            <button className="btn btn-orange">Complete Profile</button>
          </div>
        </section>


     {/* About Section */}
<section className="about-wrapper">
  <div className="about-box">
    <h2>About the Platform</h2>

    <p>
      <strong>For Suppliers:</strong> Register your company as a TalentedStaff
      supplier partner. Upload candidate profiles, track approval status, and
      manage your resource pool for UK opportunities.
    </p>

    <p>
      <strong>For Administrators:</strong> Review and approve supplier
      registrations, validate candidate submissions, add candidates directly,
      and maintain platform quality standards.
    </p>

    <p>
      <strong>For Candidates:</strong> When your employer invites you, you will
      receive a secure link to complete your profile for UK project
      opportunities.
    </p>

    <div className="privacy-box">
      🔒 Privacy Notice: TalentedStaff operates on a privacy-first principle.
      We do not collect or store employee personal data. All information is
      provided directly by candidates through secure self-service forms,
      ensuring GDPR compliance and data protection.
    </div>
  </div>
</section>

{/* Features */}
<section className="features">
  <h2>Platform Features</h2>

  <div className="feature-grid">
    <div className="feature-card">
      ✔ <strong>Supplier Registration</strong>
      <span>Easy onboarding for IT service providers</span>
    </div>

    <div className="feature-card">
      ✔ <strong>Candidate Management</strong>
      <span>Upload, track, and manage your resource pool</span>
    </div>

    <div className="feature-card">
      ✔ <strong>Status Tracking</strong>
      <span>Real-time updates on approval status</span>
    </div>

    <div className="feature-card">
      ✔ <strong>GDPR Compliant</strong>
      <span>Privacy-first data handling practices</span>
    </div>
  </div>
</section>


<footer className="app-footer">
  <div className="footer-content">
    <p className="footer-title">
      © 2025 TalentedStaff.com. All Rights reserved
    </p>
    <p className="footer-subtitle">
      Connecting talented IT professionals with opportunities worldwide
    </p>
  </div>
</footer>

    </div>

    </>
  );
}
