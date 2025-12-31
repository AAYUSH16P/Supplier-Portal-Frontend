import { useNavigate } from "react-router-dom";

export default function Sidebar({ active }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <nav>
        <a 
          className={active === "landingPage" ? "active" : ""} 
          onClick={() => handleNavigation("/landingPage")}
          style={{ cursor: "pointer" }}
        >
          🏠 Home
        </a>
        <a 
          className={active === "about" ? "active" : ""} 
          onClick={() => handleNavigation("/about")}
          style={{ cursor: "pointer" }}
        >
          ℹ️ AboutTS.com
        </a>
        <a 
          className={active === "operating" ? "active"  : ""} 
          onClick={() => handleNavigation("/operating")}
          style={{ cursor: "pointer" }}
        >
          ⚙️ Operating Model
        </a>
        <a 
          className={active === "how-it-works" ? "active"  : ""} 
          onClick={() => handleNavigation("/how-it-work")}
          style={{ cursor: "pointer" }}
        >
          📘 How It Works
        </a>
        <a 
          className={active === "registration" ? "active"  : ""} 
          onClick={() => handleNavigation("/registration")}
          style={{ cursor: "pointer" }}
        >
          📝 Registration
        </a>
        <a 
          className={active === "faq" ? "active"  : ""} 
          onClick={() => handleNavigation("/faq")}
          style={{ cursor: "pointer" }}
        >
          ❓ FAQ
        </a>
        <a 
          className={active === "contact" ? "active"  : ""} 
          onClick={() => handleNavigation("/contact")}
          style={{ cursor: "pointer" }}
        >
          ✉️ Contact
        </a>
      </nav>

      <div className="sidebar-footer">
        © 2025 TalentedStaff Platform
        <span>Powered by Westgate IT Hub</span>
      </div>
    </aside>
  );
}
