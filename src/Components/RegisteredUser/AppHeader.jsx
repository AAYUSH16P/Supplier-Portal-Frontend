import "../../style/RegisteredUser/AppHeader.css";

export default function AppHeader() {
  return (
    <header className="app-header">
      <button className="header-back">← Back</button>

      <div className="header-center">
        <div className="header-logo">🏢</div>
        <div>
          <strong>TalentedStaff</strong>
          <small>Supplier Portal</small>
        </div>
      </div>

      <button className="header-link">Go back to card page</button>
    </header>
  );
}
