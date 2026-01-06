import "../index.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="top-header">
      <button className="back-btn"> Supplier Portal</button>

      <div className="header-center">
  <img
    src="/TSlogoFinal.jpg"
    alt="TalentedStaff"
    className="header-logo-img"
  />
</div>


      <button className="register-btn"   onClick={() => navigate("/registration")}
      >Register Now</button>
    </header>
  );
}
