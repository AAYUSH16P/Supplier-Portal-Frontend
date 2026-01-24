import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header02";
import LandingFooter from "../../Components/LandingFooter";
import Sidebar from "../../Components/Sidebar";
import "../../style/LandingPage/RegistrationSuccess.css";

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      
      <div className="layout">
        <Sidebar active="registration" />
        <div className="success-page-wrapper">
            <div className="success-card">
            <div className="success-icon">
                ✓
            </div>

            <h2>Registration Submitted Successfully!</h2>

            <div className="success-content">
                <h4>Thank you for registering with Westgate IT Hub!</h4>

                <p>
                Your supplier registration has been received and is now under
                review by our team. Here's what happens next:
                </p>

                <ol className="success-steps">
                <li>Our team will review your company details and verify the information provided</li>
                <li>You will receive an email notification once your registration is approved</li>
                <li>
                    Upon approval, you'll receive login credentials to access the
                    Supplier Portal. SLA 0.1A will be sent in the email
                </li>
                <li>Sign and send back the SLA</li>
                <li>You can then start uploading candidates and managing your resource pool</li>
                </ol>

                <div className="review-note">
                ⏱ <strong>Review Time:</strong> Most registrations are reviewed within
                5 business days. We’ll contact you via email at{" "}
                <strong>admin@savienolutions.co.uk</strong> if we need additional
                information.
                </div>

                <button
                className="btn-primary"
                onClick={() => navigate("/landingPage")}
                >
                Return to Home
                </button>
            </div>
            </div>
        </div>
      </div>

      <LandingFooter />
    </>
  );
}

