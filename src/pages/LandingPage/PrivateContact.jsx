import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/LandingPage/Contact.css";
import ContactContent from "./ContactContent";

export default function PrivateContact() {
  return (
    <>
      <AppHeader />

      <div className="layout">
        <AppSidebar unlocked active="Contact" />
        <main className="page-content">
          <ContactContent isAuth={true} />
        </main>
      </div>
    </>
  );
}
