import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import LandingFooter from "../../Components/LandingFooter";
import { isAuthenticated } from "../../utils/isAuthenticated";
import "../../style/RegisteredUser/Faq.css";
import { useState } from "react";




const faqList = [
  {
    q: "Who is Westgate?",
    a: [
      "WestGate IT Hub Pvt. Ltd. is an India-based organisation headquartered in Bengaluru.",
      "Westgate operates and governs the TalentedStaff model in India and is responsible for supplier onboarding, candidate validation, operational governance, continuity management, platform administration, and compliance oversight."
    ]
  },
  {
    q: "What is TalentedStaff.com?",
    a: [
      "TalentedStaff.com is a governed talent-sharing platform that connects Indian IT companies with UK-based clients.",
      "Approved Indian IT companies upload profiles of their permanent employees on the platform. UK clients then search, evaluate, and select suitable talent based on their project and skill requirements.",
      "TalentedStaff is not a job portal. It operates as a structured staff-sharing model with SLAs, continuity requirements, and governed engagement workflows."
    ]
  },
  {
    q: "Who is Spectrum IT Hub?",
    a: [
      "Spectrum IT Hub Ltd. is a UK-based organisation that supports UK-side governance, client coordination, and market engagement for TalentedStaff.",
      "Spectrum works closely with Westgate to align UK client demand with Indian supplier capabilities."
    ]
  },
  {
    q: "How are Westgate, Spectrum IT Hub, and TalentedStaff.com connected?",
    bullets: [
      "Westgate manages India-side operations, suppliers, governance, and the TalentedStaff platform",
      "Spectrum IT Hub supports UK-side representation and client engagement",
      "TalentedStaff.com is the single governed platform through which all supplier and candidate activities are executed"
    ],
    footer:
      "Suppliers formally contract with Westgate, while Spectrum supports governance and UK market coordination."
  },
  {
    q: "What is the TalentedStaff supplier model?",
    a: [
      "The TalentedStaff model allows Indian IT companies to supply their permanent employees to UK clients under a governed, SLA-driven framework.",
      "Each engagement follows defined processes for candidate validation, resource reservation, activation, delivery, continuity, and governance, ensuring predictability for suppliers and reliability for clients."
    ]
  },
  {
    q: "Who can register as a supplier on this portal?",
    a: [
      "Only India-registered IT companies employing permanent staff are eligible to register.",
      "Suppliers must meet eligibility, compliance, data accuracy, security, and continuity requirements defined under the TalentedStaff model."
    ]
  },
  {
    q: "What happens after I submit the supplier registration form?",
    steps: [
      "Your company details are reviewed by the admin team",
      "Due diligence and eligibility checks are performed",
      "Approved suppliers receive login credentials by email",
      "Only approved suppliers can upload candidates and participate in opportunities"
    ],
    footer:
      "Registration enables participation in the TalentedStaff ecosystem but does not guarantee immediate opportunities."
  },
  {
    q: "Will I receive login credentials after registration?",
    bullets: [
      "Portal login link",
      "Username",
      "Temporary password"
    ],
    footer: "You will be required to change your password on first login."
  },
  {
    q: "What types of resources are used in TalentedStaff?",
    bullets: [
      "Landed Resource – a validated permanent employee",
      "Banked Resource – a resource reserved for a client under the governed model",
      "Backup Resource – a mandatory 1:1 backup to ensure continuity",
      "Ramp-Up Resource – additional capacity for client expansion"
    ],
    footer:
      "Each resource type has defined eligibility and governance rules."
  },
  {
    q: "What is the continuity and backup requirement?",
    a: [
      "For every Banked Resource, the supplier must maintain one Backup Resource (1:1 model).",
      "The Backup must be ready to take over immediately to ensure zero loss of service days for the client.",
      "Continuity is a core requirement of the TalentedStaff model."
    ]
  },
  {
    q: "What is the Service Level Agreement (SLA)?",
    bullets: [
      "Supplier eligibility and obligations",
      "Continuity, backup, and ramp-up requirements",
      "Governance and compliance standards",
      "Platform usage and engagement rules"
    ],
    footer:
      "All supplier participation and engagements are governed by the SLA and engagement-specific call-off agreements."
  },
  {
    q: "Is there any cost to register on TalentedStaff?",
    a: [
      "There is no subscription fee for the first year of registration on TalentedStaff.",
      "From the second year onward, a platform subscription fee will apply.",
      "The fee is based on the supplier’s employee count range and will be discussed transparently during onboarding."
    ]
  },
  {
    q: "Is my employee data safe if I upload it onto this portal?",
    a: [
      "Yes, 100%. Employee data safety is a core design principle of the TalentedStaff platform.",
      "We do not collect or expose confidential employee information such as employee names, personal email IDs, or contact numbers.",
      "Each employee is assigned a unique internal ID, ensuring personal identity and contact details remain fully protected."
    ]
  }
];


const publicFaqList = [
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




export default function FAQ() {
  const isAuth = isAuthenticated();
  const [openIndex, setOpenIndex] = useState(null);
  const faqData = isAuth ?  publicFaqList:faqList;


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
         {/* FAQ CONTENT */}
         <section className="faq-card">
  <div className="faq-list">
    {faqData.map((item, index) => (
      <div
        key={index}
        className={`faq-item ${openIndex === index ? "open" : ""}`}
      >
        <button
          className="faq-question"
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        >
          {index + 1}. {item.q}
          <span>{openIndex === index ? "−" : "+"}</span>
        </button>

        {openIndex === index && (
          <div className="faq-answer">
            {item.a &&
              item.a.map((text, i) => <p key={i}>{text}</p>)}

            {item.steps && (
              <ol className="faq-steps">
                {item.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            )}

            {item.bullets && (
              <ul className="faq-bullets">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

            {item.footer && (
              <p className="faq-footer">{item.footer}</p>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
</section>



        </main>
      </div>
      {!isAuth && <LandingFooter />}

    </>
  );
}
