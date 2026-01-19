// import Header from "../../Components/Header02";
// import Sidebar from "../../Components/Sidebar";
// import AppHeader from "../../Components/RegisteredUser/AppHeader";
// import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
// import LandingFooter from "../../Components/LandingFooter";
// import { isAuthenticated } from "../../utils/isAuthenticated";
// import "../../style/RegisteredUser/Faq.css";
// import { useState } from "react";












// export default function FAQ() {
//   const isAuth = isAuthenticated();
//   const [openIndex, setOpenIndex] = useState(null);
//   const faqData = isAuth ?  publicFaqList:faqList;


//   return (
//     <>
//       {isAuth ? <AppHeader /> : <Header />}

//       <div className="faq-layout">
//         {isAuth ? (
//           <AppSidebar unlocked active="FAQ" />
//         ) : (
//           <Sidebar active="faq" />
//         )}

//         <main className="faq-content">
//           {/* TOP STRIP */}
//           <div className="faq-top-strip">
//             ❓ Quick Answers to Your Onboarding Questions
//           </div>

//           {/* HERO */}
//           <section className="faq-hero">
//             <div className="faq-hero-icon">?</div>
//             <div>
//               <h1>Frequently Asked Questions</h1>
//               <p>
//                 Find answers to common questions about the TalentedStaff
//                 Supplier Registration Portal
//               </p>
//             </div>
//           </section>

//           {/* PLACEHOLDER */}
//          {/* FAQ CONTENT */}
//          <section className="faq-card">
//   <div className="faq-list">
//     {faqData.map((item, index) => (
//       <div
//         key={index}
//         className={`faq-item ${openIndex === index ? "open" : ""}`}
//       >
//         <button
//           className="faq-question"
//           onClick={() =>
//             setOpenIndex(openIndex === index ? null : index)
//           }
//         >
//           {index + 1}. {item.q}
//           <span>{openIndex === index ? "−" : "+"}</span>
//         </button>

//         {openIndex === index && (
//           <div className="faq-answer">
//             {item.a &&
//               item.a.map((text, i) => <p key={i}>{text}</p>)}

//             {item.steps && (
//               <ol className="faq-steps">
//                 {item.steps.map((step, i) => (
//                   <li key={i}>{step}</li>
//                 ))}
//               </ol>
//             )}

//             {item.bullets && (
//               <ul className="faq-bullets">
//                 {item.bullets.map((b, i) => (
//                   <li key={i}>{b}</li>
//                 ))}
//               </ul>
//             )}

//             {item.footer && (
//               <p className="faq-footer">{item.footer}</p>
//             )}
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// </section>



//         </main>
//       </div>
//       {!isAuth && <LandingFooter />}

//     </>
//   );
// }
