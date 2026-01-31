import "../../style/RegisteredUser/AppHeader.css";
import { useAuth } from "../../context/AuthContext";

export default function AppHeader() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // or your login route
  };

  return (
    <header className="app-header">
      {/* LEFT: ADMIN LABEL */}
      <div className="header-admin">
        Supplier Portal
      </div>

      {/* CENTER */}
      <div className="header-center">
  <img
    src="/TSlogoFinal.jpg"
    alt="TalentedStaff"
    className="header-logo-img"
  />
</div>


      {/* RIGHT: LOGOUT */}
      <button className="header-logout" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
