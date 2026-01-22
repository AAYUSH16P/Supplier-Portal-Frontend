import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../style/LandingPage/Contact.css";
import ContactContent from "./ContactContent";

export default function PublicContact() {
  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar active="contact" />
        <main className="page-content">
          <ContactContent isAuth={false} />
        </main>
      </div>

      <LandingFooter />
    </>
  );
}
