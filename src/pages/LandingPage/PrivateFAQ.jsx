import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import "../../style/RegisteredUser/Faq.css";
import { useState } from "react";

const privateFaqList = [
    {
      q: "Who is Westgate IT Hub?",
      a: [
        "Westgate IT Hub Pvt. Ltd. is the India-based organisation that operates and governs the TalentedStaff supplier ecosystem.",
        "Westgate manages supplier onboarding, portal operations, candidate validation, governance, and overall coordination for the TalentedStaff model."
      ]
    },
    {
      q: "What is TalentedStaff?",
      a: [
        "TalentedStaff is a governed talent-sharing model that connects Indian IT companies with UK-based client demand.",
        "As an approved supplier, you can upload profiles of your permanent employees, manage submissions, and participate in a structured engagement model focused on continuity, governance, and long-term collaboration."
      ]
    },
    {
      q: "Who is Spectrum IT Hub?",
      a: [
        "Spectrum IT Hub Ltd. is the UK-based partner that supports TalentedStaff with UK-side governance, client engagement, and market alignment.",
        "Spectrum works closely with Westgate to ensure supplier capabilities align with UK client requirements."
      ]
    },
    {
      q: "Is my employee data safe on this portal?",
      a: [
        "Yes, 100%. TalentedStaff is designed to protect supplier and employee confidentiality.",
        "Personal identifiers such as employee names, personal email IDs, or contact numbers are not exposed.",
        "Each employee profile is assigned a unique internal ID shown to clients, ensuring full confidentiality."
      ]
    },
    {
      q: "How can I upload candidates on the portal?",
      steps: [
        "Go to the Candidates section from the left navigation bar",
        "Inside the Candidates section, choose one of the available upload options",
        "Follow the on-screen steps to complete the upload"
      ],
      footer: "Only approved suppliers can upload and manage candidate profiles."
    },
    {
      q: "What is the “Candidates” section used for?",
      bullets: [
        "Upload new candidate profiles",
        "View all uploaded candidates",
        "Track approval status",
        "Monitor pending, approved, or update-required candidates"
      ],
      footer: "This section is your primary workspace for managing candidate submissions."
    },
    {
      q: "What does “Review Your Candidates” mean?",
      bullets: [
        "Review submitted candidate details",
        "Check validation or approval status",
        "Understand if updates are required"
      ],
      footer: "This helps keep your submissions accurate and up to date."
    },
    {
      q: "What is the “Book a Meeting” option used for?",
      bullets: [
        "Questions about the TalentedStaff model",
        "Clarification on candidate eligibility",
        "Guidance before uploading candidates",
        "Support while using the portal"
      ],
      footer: "This option is optional but available whenever support is needed."
    },
    {
      q: "When should I use the “Contact” page?",
      bullets: [
        "Technical issues",
        "Operational or process-related queries",
        "Clarifications not requiring a meeting"
      ],
      footer: "For detailed discussions, booking a meeting is recommended."
    },
    {
      q: "Why do I see an “SLA Not Signed” message?",
      bullets: [
        "Approved candidates may not be shared with the UK market",
        "Certain platform actions may be restricted"
      ],
      footer:
        "Please review, sign, and return the SLA to activate full participation."
    },
    {
      q: "Can I edit candidate information after uploading?",
      a: [
        "Yes. Candidate information can be updated, subject to governance checks.",
        "Keeping data accurate helps avoid delays in validation or approval."
      ]
    },
    {
      q: "Why is governance and approval required for candidates?",
      bullets: [
        "Data accuracy",
        "Compliance with client expectations",
        "Continuity readiness",
        "Trust between suppliers and clients"
      ],
      footer: "This governed approach protects both suppliers and clients."
    },
    {
      q: "Does uploading candidates guarantee selection or work?",
      bullets: [
        "Client demand",
        "Skill match",
        "Validation outcomes",
        "Governance readiness"
      ],
      footer:
        "Uploading candidates enables access to opportunities but does not guarantee selection."
    },
    {
      q: "How should I use the portal for best results?",
      bullets: [
        "Upload accurate and complete candidate information",
        "Regularly review candidate status",
        "Respond promptly to required updates",
        "Use Book a Meeting or Contact options when needed"
      ],
      footer:
        "Active and compliant suppliers are best positioned within the ecosystem."
    }
  ];


export default function PrivateFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <AppHeader />

      <div className="faq-layout">
        <AppSidebar unlocked active="FAQ" />

        <main className="faq-content">
          <div className="faq-top-strip">❓ Quick Answers to Your Onboarding Questions</div>

          <section className="faq-hero">
            <div className="faq-hero-icon">?</div>
            <div>
              <h1>Frequently Asked Questions</h1>
              <p>Find answers to common questions about the TalentedStaff Supplier Portal</p>
            </div>
          </section>

          <section className="faq-card">
            <div className="faq-list">
              {privateFaqList.map((item, index) => (
                <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    {index + 1}. {item.q}
                    <span>{openIndex === index ? "−" : "+"}</span>
                  </button>

                  {openIndex === index && (
                    <div className="faq-answer">
                      {item.a && item.a.map((text, i) => <p key={i}>{text}</p>)}

                      {item.steps && (
                        <ol className="faq-steps">
                          {item.steps.map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                      )}

                      {item.bullets && (
                        <ul className="faq-bullets">
                          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      )}

                      {item.footer && <p className="faq-footer">{item.footer}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
