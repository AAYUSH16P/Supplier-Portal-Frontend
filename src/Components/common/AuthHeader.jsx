import { useNavigate } from "react-router-dom";
import "../../style/RegisteredUser/SupplierLogin.css";

export default function AuthHeader({
  showBack = false,
  backTo = "/login",
  backLabel = "Back",
}) {
  const navigate = useNavigate();

  return (
    <header className="login-header">
      <div className="header-left">
        {showBack ? (
          <button
            className="back-btn"
            onClick={() => navigate(backTo)}
          >
            ← {backLabel}
          </button>
        ) : (
          <button className="back-btn">Supplier Login</button>
        )}
      </div>

      <div className="brand-center">
        <img
          src="/TSlogoFinal.jpg"
          alt="TalentedStaff"
          className="header-logo-img"
        />
      </div>

      <div className="header-spacer" />
    </header>
  );
}
