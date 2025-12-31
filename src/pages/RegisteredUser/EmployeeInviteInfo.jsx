import "../../style/RegisteredUser/EmployeeInviteInfo.css";

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EmployeeInviteInfo() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const inviteId = searchParams.get("inviteId");
    const companyName = searchParams.get("companyName");
  
    const [confirmed, setConfirmed] = useState(false);
  
    const handleProceed = () => {
      if (!confirmed) return;
  
      navigate(
        `/addCapacityManually?inviteId=${inviteId}&companyName=${companyName}`
      );
    };
  return (
    <>
    <div className="invite-page">
      {/* TOP HEADER */}
      <div className="invite-header">
        <div className="header-card">
          <span className="label">Company Name:</span>
          <strong>{companyName}</strong>
          </div>

        <div className="header-card">
          <span className="label">Company ID:</span>
          <strong>{inviteId}</strong>
          </div>
      </div>

      {/* CONTENT */}
      <div className="invite-content">
  {/* INTRO CARD */}
  <div className="info-card">
    <p className="greeting">
    Dear Talented Staff @ <strong>{companyName}</strong>,
    </p>

    <p>
      You are viewing this page because your employer,{" "}
      <strong>{companyName}</strong>, has asked you to confirm a small
      set of work-related skill and availability details as part of an
      internal readiness and planning exercise.
    </p>

    <div className="highlight-box">
      <strong>This request is:</strong> Initiated and managed by your employer
      & Not a job application
    </div>
  </div>

  {/* IMPORTANT INFORMATION CARD */}
  <div className="info-card bordered">
    <div className="info-header">
      <span className="info-icon">i</span>
      <div>
        <span className="info-line"></span>
        <h3>Important Information (Please Read Carefully)</h3>
      </div>
    </div>

    <p>
      This is not a job application and does not represent a direct engagement
      with Westgate India or TalentedStaff.com.
    </p>

    <p>
      Westgate India acts as an intermediary delivery, coordination, and
      business-promotion partner, supporting employers to present and position
      their internal skills and capacity to potential UK clients as part of a
      governed business engagement model.
    </p>

    <p>
      Any future work or opportunity, if it arises, is always between your
      employer and their client, not with this platform or Westgate India.
    </p>

    {/* PLEASE NOTE BOX */}
    <div className="note-box">
      <strong>Please note:</strong>
      <ul>
        <li>
          This information is collected on behalf of your employer, not for
          direct recruitment
        </li>
        <li>
          It is used to help your employer represent available skills and
          capacity to clients
        </li>
        <li>
          We do not contact employees directly for roles or opportunities
        </li>
        <li>
          We do not store or maintain personal employee profiles for
          recruitment purposes
        </li>
        <li>
          We do not use this information to approach, market to, or contact
          you individually
        </li>
      </ul>
    </div>

    <p>
      Any discussion about opportunities, assignments, or client work (when
      applicable) will always be discussed by your employer, not by this
      platform.
    </p>

    <p>
      If you have questions or concerns, please contact{" "}
      <strong>[Employer Contact / HR / Manager]</strong>.
    </p>
  </div>

  {/* CHECKBOX CONFIRMATION */}
  <div className="confirm-card">
    <div className="confirm-title">
      <span className="shield-icon">🛡️</span>
      <h3>Checkbox Confirmation</h3>
    </div>

    <label className="confirm-checkbox">
      <input type="checkbox" checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)} />
      <span>
        I confirm that I have read and understood the above information, that
        this is not a job application, and that I am submitting this
        information with my employer's knowledge.
      </span>
    </label>
  </div>

  {/* ACTION BUTTON */}
  <button className="proceed-btn"   disabled={!confirmed}
        onClick={handleProceed}>
    Proceed to Form
  </button>
</div>

    </div>
    </>
  );
}
