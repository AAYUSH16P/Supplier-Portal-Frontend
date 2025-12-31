import "../index.css";

export default function Header() {
  return (
    <header className="top-header">
      <button className="back-btn">← Back to Landing</button>

      <div className="header-center">
        <span className="logo-icon">🏢</span>
        <span className="brand-text">
          TalentedStaff
          <small>Supplier Registration Portal</small>
        </span>
      </div>

      <button className="register-btn">Register Now</button>
    </header>
  );
}
