import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../style/LandingPage/Contact.css";
import { useNavigate } from "react-router-dom";


const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default function Contact() {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();

  return (
    <>
      {/* HEADER */}
      {isAuth ? <AppHeader /> : <Header />}

      <div className="layout">
        {/* SIDEBAR */}
        {isAuth ? (
          <AppSidebar unlocked active="Contact" />
        ) : (
          <Sidebar active="contact" />
        )}

        <main className="page-content">
          <div className="contact-page">

            {/* TOP STRIP */}
            <div className="contact-top-strip">
              📞 We’re Here to Help
            </div>

            {/* HERO */}
            <section className="contact-hero">
              <div className="contact-hero-icon">✉️</div>
              <div>
                <h1>Contact Us</h1>
                <p>
                  Get in touch with our onboarding team for support and clarification
                </p>
              </div>
            </section>

            {/* GRID */}
            <div className="contact-grid">

              {/* WESTGATE CARD */}
              <section className="contact-card westgate-card">
  {/* HEADER STRIP */}
  <div className="westgate-header">
    <div className="westgate-header-inner">
      <div className="westgate-icon">🏢</div>
      <h3>Westgate India</h3>
    </div>
  </div>

  {/* BODY */}
  <div className="westgate-body">
    <p className="westgate-desc">
      Your primary point of contact for all onboarding and readiness queries
    </p>

    <div className="westgate-info">
      <div className="westgate-info-row">
        <div className="info-icon email">📧</div>
        <div>
          <small>Email</small>
          <strong>onboarding@westgateithub.in</strong>
        </div>
      </div>

      <div className="westgate-info-row">
        <div className="info-icon phone">📞</div>
        <div>
          <small>Phone</small>
          <strong>+91 6366202178</strong>
        </div>
      </div>

      <div className="westgate-info-row">
        <div className="info-icon time">⏰</div>
        <div>
          <small>Operating Hours</small>
          <strong>Monday – Friday, 10:00 AM to 5:00 PM IST</strong>
        </div>
      </div>
    </div>
  </div>
</section>


              {/* HELP CARD */}
              <section className="contact-card needhelp-card">
  {/* HEADER */}
  <div className="needhelp-header">
    <div className="needhelp-header-inner">
      <div className="needhelp-icon">💬</div>
      <h3>Need Help?</h3>
    </div>
  </div>

  {/* BODY */}
  <div className="needhelp-body">
    <p className="needhelp-desc">
      Choose the option that best suits your needs
    </p>

    {/* BOOK MEETING */}
    <div
  className={`needhelp-option blue clickable ${!isAuth ? "disabled" : ""}`}
  onClick={() => {
    if (isAuth) {
      navigate("/meeting");
    } else {
      alert("Please login to book a meeting");
    }
  }}
  
>

      <div className="option-icon blue">📍</div>
      <div>
        <h4>Book a Meeting</h4>
        <p>Schedule a call with our onboarding team</p>
      </div>
    </div>

    {/* EMAIL SUPPORT */}
    <div className="needhelp-option yellow">
      <div className="option-icon yellow">✉️</div>
      <div>
        <h4>Email Support</h4>
        <p>Send us an email for detailed queries</p>
        <button
          className="email-btn"
          onClick={() =>
            (window.location.href =
              "mailto:onboarding@westgateithub.in")
          }
        >
          Send Email
        </button>
      </div>
    </div>

    {/* FAQ */}
    <div
      className="needhelp-option purple clickable"
      onClick={() => navigate(isAuthenticated() ? "/private-faq" : "/public-faq")}
      >
      <div className="option-icon purple">❓</div>
      <div>
        <h4>Check FAQ</h4>
        <p>Find answers to common questions</p>
      </div>
    </div>
  </div>
</section>

            </div>

            {/* FULL WIDTH SECTION */}
            <div className="contact-rest-wrapper">

              <section className="expect-section">
                <h3>What to Expect</h3>

                <div className="expect-cards">
                  <div className="expect-card blue">
                    <div className="expect-icon blue">⏱</div>
                    <h4>Response Time</h4>
                    <p>We aim to respond within 24–48 hours during business days</p>
                  </div>

                  <div className="expect-card green">
                    <div className="expect-icon green">💬</div>
                    <h4>Professional Support</h4>
                    <p>Dedicated team to assist with onboarding queries</p>
                  </div>

                  <div className="expect-card purple">
                    <div className="expect-icon purple">📋</div>
                    <h4>Structured Guidance</h4>
                    <p>Clear communication and alignment support</p>
                  </div>
                </div>
              </section>

              <div className="contact-note">
                <strong>Note:</strong> For urgent matters or escalations, please email
                directly to{" "}
                <a href="mailto:onboarding@westgateithub.in">
                  onboarding@westgateithub.in
                </a>{" "}
                with <strong>"URGENT"</strong> in the subject line.
              </div>
            </div>

            {/* FOOTER ONLY FOR PUBLIC */}
            

          </div>
        </main>
      </div>
      {!isAuth && <LandingFooter />}
    </>
  );
}
