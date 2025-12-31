import "../../style/RegisteredUser/AppSidebar.css";
import { useNavigate } from "react-router-dom";

const MENU = [
  "Home",
  "About TS.com",
  "Operating Model",
  "How It Works",
  "My Details",
  "Candidates",
  "Review Your Candidates",
  "Book a Meeting",
  "FAQ",
  "Contact",
  "Notifications",
];

const ROUTE_MAP = {
  "Home": "/home",
  "About TS.com": "/about-ts",
  "Operating Model": "/operatingModel",
  "How It Works": "/howItWork",
  "My Details": "/detail",
  "Candidates": "/candidate",
  "Review Your Candidates": "/reviewCandidate",
  "Book a Meeting": "/meeting",
  "FAQ": "/faq",
  "Contact": "/contact",

   "Notifications": "/notification", // Route to be added when page is created
};

export default function AppSidebar({ unlocked = false, active = "Home" }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    const path = ROUTE_MAP[item];
    if (path) {
      navigate(path);
    }
  };

  return (
    <aside className="app-sidebar">

      {!unlocked && (
        <div className="nav-warning">
          Navigation Disabled
          <span>Please complete acknowledgement</span>
        </div>
      )}

      <nav>
        {MENU.map((item) => (
          <button
            key={item}
            disabled={!unlocked}
            className={unlocked && item === active ? "active" : ""}
            onClick={() => unlocked && handleClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
