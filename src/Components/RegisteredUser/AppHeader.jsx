import "../../style/RegisteredUser/AppHeader.css";

export default function AppHeader() {
  const handleLogout = () => {
    localStorage.removeItem("token");
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
        <div className="header-logo">🏢</div>
        <div>
          <strong>TalentedStaff</strong>
          <small>Supplier Portal</small>
        </div>
      </div>

      {/* RIGHT: LOGOUT */}
      <button className="header-logout" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
