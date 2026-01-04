import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import LandingFooter from "../../Components/LandingFooter";
import { isAuthenticated } from "../../utils/isAuthenticated";
import "../../style/RegisteredUser/Faq.css";



export default function FAQ() {
  const isAuth = isAuthenticated();

  return (
    <>
      {isAuth ? <AppHeader /> : <Header />}

      <div className="faq-layout">
        {isAuth ? (
          <AppSidebar unlocked active="FAQ" />
        ) : (
          <Sidebar active="faq" />
        )}

        <main className="faq-content">
          {/* TOP STRIP */}
          <div className="faq-top-strip">
            ❓ Quick Answers to Your Onboarding Questions
          </div>

          {/* HERO */}
          <section className="faq-hero">
            <div className="faq-hero-icon">?</div>
            <div>
              <h1>Frequently Asked Questions</h1>
              <p>
                Find answers to common questions about the TalentedStaff
                Supplier Registration Portal
              </p>
            </div>
          </section>

          {/* PLACEHOLDER */}
          <section className="faq-card">
            <div className="faq-placeholder-icon">?</div>
            <h3>FAQ Content Coming Soon</h3>
            <p>
              We’re currently updating our FAQ section. Please check back later
              or contact us directly for any questions.
            </p>
          </section>

        </main>
      </div>
      {!isAuth && <LandingFooter />}

    </>
  );
}
