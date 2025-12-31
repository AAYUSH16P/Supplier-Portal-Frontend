import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import LandingFooter from "../../Components/LandingFooter";
import "../../style/LandingPage/Contact.css";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default function Contact() {
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
              <section className="contact-card blue-card">
                <div className="card-header">
                  <div className="card-icon">🏢</div>
                  <h3>Westgate India</h3>
                </div>

                <p className="card-desc">
                  Your primary point of contact for all onboarding and readiness queries
                </p>

                <div className="info-row">
                  <span>📧</span>
                  <div>
                    <small>Email</small>
                    <strong>onboarding@westgateithub.in</strong>
                  </div>
                </div>

                <div className="info-row">
                  <span>📞</span>
                  <div>
                    <small>Phone</small>
                    <strong>+91 6366202178</strong>
                  </div>
                </div>

                <div className="info-row">
                  <span>⏰</span>
                  <div>
                    <small>Operating Hours</small>
                    <strong>Monday – Friday, 10:00 AM to 5:00 PM IST</strong>
                  </div>
                </div>
              </section>

              {/* HELP CARD */}
              <section className="contact-card green-card">
                <div className="card-header">
                  <div className="card-icon">💬</div>
                  <h3>Need Help?</h3>
                </div>

                <p className="card-desc">
                  Choose the option that best suits your needs
                </p>

                <div className="help-box yellow">
                  <div className="help-icon">📨</div>
                  <div>
                    <h4>Email Support</h4>
                    <p>Send us an email for detailed queries</p>
                    <button className="btn-yellow">Send Email</button>
                  </div>
                </div>

                <div className="help-box purple">
                  <div className="help-icon">❓</div>
                  <div>
                    <h4>Check FAQ</h4>
                    <p>Find answers to common questions</p>
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
            {!isAuth && <LandingFooter />}

          </div>
        </main>
      </div>
    </>
  );
}
