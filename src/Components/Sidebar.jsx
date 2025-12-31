import { Link } from "react-router-dom";

export default function Sidebar({ active }) {
  return (
    <aside className="sidebar">
      <nav>
        <Link
          to="/landingPage"
          className={active === "landingPage" ? "active" : ""}
        >
          🏠 Home
        </Link>

        <Link
          to="/about"
          className={active === "about" ? "active" : ""}
        >
          ℹ️ AboutTS.com
        </Link>

        <Link
          to="/operating"
          className={active === "operating" ? "active" : ""}
        >
          ⚙️ Operating Model
        </Link>

        <Link
          to="/how-it-work"
          className={active === "how-it-works" ? "active" : ""}
        >
          📘 How It Works
        </Link>

        <Link
          to="/registration"
          className={active === "registration" ? "active" : ""}
        >
          📝 Registration
        </Link>

        <Link
          to="/faq"
          className={active === "faq" ? "active" : ""}
        >
          ❓ FAQ
        </Link>

        <Link
          to="/contact"
          className={active === "contact" ? "active" : ""}
        >
          ✉️ Contact
        </Link>
      </nav>

      <div className="sidebar-footer">
        © 2025 TalentedStaff Platform
        <span>Powered by Westgate IT Hub</span>
      </div>
    </aside>
  );
}
