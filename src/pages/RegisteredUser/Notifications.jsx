import "../../style/RegisteredUser/Notifications.css";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import AppFooter from "../../Components/common/AppFooter"; 


export default function Notifications() {
  return (
    <>
    <AppHeader />

    <div className="company-layout">
      <AppSidebar unlocked active="Notifications" />

    <div className="notifications-page">

      {/* TOP BANNER */}
      <div className="notifications-hero">
        <div className="hero-icon">
          🔔
        </div>

        <div className="hero-text">
          <h1>Notifications</h1>
          <p>Stay updated with important alerts and messages</p>
        </div>
      </div>

      {/* EMPTY STATE CARD */}
      <div className="notifications-card">
        <div className="empty-icon">🔔</div>
        <p>Coming Soon ... </p>
      </div>

    </div>

    </div>
    <AppFooter/>
    </>
  );
}
