import "../index.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="top-header">
      <button className="back-btn"> Supplier Portal</button>

      <div className="header-center">
        <span className="logo-icon">🏢</span>
        <span className="brand-text">
          TalentedStaff
          <small>Supplier Registration Portal</small>
        </span>
      </div>

      <button className="register-btn"   onClick={() => navigate("/registration")}
      >Register Now</button>
    </header>
  );
}
