// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./companyview.module.css";

// const QUESTIONS_PER_PAGE = 5;

// export default function CompanyTxtViewClient({
//   companyId,
//   roundId,
//   questionId = null,
//   initialTopics = [],
//   initialCompanies = [],
// }) {
//   const router = useRouter();

//   const [topics] = useState(initialTopics);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(() => {
//     const allQuestions = initialTopics.flatMap((t) => t.questions);

//     if (!allQuestions.length) return 0;

//     if (questionId !== null) {
//       const idx = allQuestions.findIndex(
//         (q) => String(q.id || q.questionId) === String(questionId)
//       );
//       return idx >= 0 ? idx : 0;
//     }

//     return 0;
//   });

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [companies] = useState(initialCompanies);
//   const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(
//     initialCompanies.findIndex((c) => c.id === companyId) || 0
//   );

//   const allQuestions = topics.flatMap((t) => t.questions);
//   const currentQuestions = allQuestions; 
//   useEffect(() => {
//   if (!isMobile && allQuestions.length > 0) {
//     const el = document.querySelector(`#question-${selectedQuestionIndex}`);
//     el?.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// }, [selectedQuestionIndex, isMobile, allQuestions]);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();

//     const handleResize = () => {
//       checkMobile();
//       if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const goNext = () => {
//     if (selectedQuestionIndex + QUESTIONS_PER_PAGE < allQuestions.length) {
//       setSelectedQuestionIndex((prev) => prev + QUESTIONS_PER_PAGE);
//     }
//   };

//   const goPrev = () => {
//     if (selectedQuestionIndex - QUESTIONS_PER_PAGE >= 0) {
//       setSelectedQuestionIndex((prev) => prev - QUESTIONS_PER_PAGE);
//     }
//   };

//   const getPlainText = (html) => {
//     return html ? html.replace(/<[^>]+>/g, "") : "";
//   };




//   const fixLinks = (html) => {
//   if (!html) return "";

//   return html.replace(/href="([^"]+)"/g, (match, url) => {
//     // अगर पहले से http/https है
//     if (/^https?:\/\//i.test(url)) return `href="${url}"`;

//     // अगर internal link है (जैसे /about)
//     if (url.startsWith("/")) return `href="${url}"`;

//     // अगर बस domain है (जैसे google.com)
//     return `href="https://${url}"`;
//   });
// };

//   const handleCompanyChange = (companyId) => {
//     router.push(`/company/${companyId}/rounds`);
//   };

//   return (
//     <div className={styles["companytxt-wrapper"]}>
//       {/* Mobile Sidebar */}
//       {isMobile && (
//         <>
//           <div className={styles["mobile-left-controls"]}>
//             <button
//               className={styles["mobile-hamburger-btn"]}
//               onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             >
//               ☰
//             </button>
//           </div>

//           <div
//             className={`${styles["mobile-half-sidebar"]} ${
//               isMobileMenuOpen ? styles["open"] : styles["closed"]
//             }`}
//           >
//             <h3>Questions</h3>
//             {allQuestions.map((q, i) => (
//               <button
//                 key={q.id ?? i}
//                 className={`${styles["mobile-topic-item"]} ${
//                   i === selectedQuestionIndex ? styles["active"] : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedQuestionIndex(i);
//                   const id = q.id || q.questionId;
//                   router.push(
//                     `/company/${companyId}/round/${roundId}/view?questionId=${id}`
//                   );
//                   setIsMobileMenuOpen(false);
//                 }} 
//               >
//                 {getPlainText(q.questionText).length > 50
//                   ? getPlainText(q.questionText).slice(0, 50) + "..."
//                   : getPlainText(q.questionText)}
//               </button>
//             ))}
//               <p className={styles.topicEnd}>Questions Ends from here</p>
//           </div>
//           {isMobileMenuOpen && (
//             <div
//               className={styles["mobile-sidebar-overlay"]}
//               onClick={() => setIsMobileMenuOpen(false)}
//             />
//           )}
//         </>
//       )}

//       {/* Desktop Company Switcher */}
//       {!isMobile && companies.length > 0 && (
//         <div className={styles["top-notes-scroll"]}>
//           <div className={styles["scroll-track"]}>
//             {companies.map((company, i) => (
//               <button
//                 key={company.id}
//                 className={`${styles["scroll-note-text"]} ${
//                   i === selectedCompanyIndex ? styles["active"] : ""
//                 }`}
//                 onClick={() => handleCompanyChange(company.id)}
//               >
//                 {company.name.length > 20
//                   ? company.name.slice(0, 20) + "..."
//                   : company.name}
//               </button>             
//             ))}         
//           </div>        
//         </div>      
//       )}

//       {/* Main Content */}
//       <div
//         className={`${styles["content-area"]} ${
//           isMobile ? styles["mobile-layout"] : ""
//         }`}
//       >
//         {/* Desktop Sidebar */}
//         {!isMobile && (
//           <nav className={styles["topics-panel"]}>
//             <div className={styles["topics-header-row"]}>
//               <h3>Questions</h3>
//               <button
//                 className={styles["go-back-btn"]}
//                 onClick={() => router.back()}
//               >
//                 ⬅ Go Back
//               </button>
//             </div>
//             <ul>
//               {allQuestions.map((q, i) => (
//                 <li key={q.id ?? i}>
//                   <button
//                     className={i === selectedQuestionIndex ? styles["active"] : ""}
//                     onClick={() => {
//                       setSelectedQuestionIndex(i);
//                       const id = q.id || q.questionId;
//                       router.push(
//                         `/company/${companyId}/round/${roundId}/view?questionId=${id}`
//                       );
//                     }}                   
//                   >                   
//                     {getPlainText(q.questionText).length > 50
//                       ? getPlainText(q.questionText).slice(0, 50) + "..."
//                       : getPlainText(q.questionText)}
//                   </button>                 
//                 </li>
//               ))}
//                 <p className={styles.topicEnd}>Questions Ends from here</p>
//             </ul>
//           </nav>
//         )}

//         {/* Questions Content */}
//         <main className={styles["topic-content"]}>
//           <div className={styles["text-controls-row"]}></div>

//           <div className={styles["topic-content-inner"]}>
//             {currentQuestions.length > 0 ? (
//               currentQuestions.map((q, idx) => {
//                 const isVisible =
//                   idx >= selectedQuestionIndex &&
//                   idx < selectedQuestionIndex + QUESTIONS_PER_PAGE;

//                 return (
//                   <article
//                     key={q.id ?? idx}
//                     id={`question-${idx}`}
//                     className={`${idx === selectedQuestionIndex ? styles["active-topic"] : ""}`}
//                     style={{
//                       display: isVisible ? "block" : "none",
//                     }}
//                   >
//                     <h2 className={styles["topic-heading"]}>
//                       {getPlainText(q.questionText)}
//                     </h2>

//                     {/* <div
//                       className={styles["topic-html-content"]}
//                       dangerouslySetInnerHTML={{
//                         __html: q.answer || "<p>No answer available</p>",
//                       }}
//                     /> */}

// <div
//   className={styles["topic-html-content"]}
//   dangerouslySetInnerHTML={{
//     __html: q.answer ? fixLinks(q.answer) : "<p>No answer available</p>",
//   }}
// />

//                   </article>
//                 );
//               })
//             ) : (
//               <p>No questions found</p>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className={styles["topic-nav-buttons"]}>
//             <div className={styles["bottom-right-controls"]}>
//               <button onClick={goPrev} disabled={selectedQuestionIndex === 0}>
//                 ⬅ Previous
//               </button>
//               <button
//                 onClick={goNext}
//                 disabled={
//                   selectedQuestionIndex + QUESTIONS_PER_PAGE >= allQuestions.length
//                 }
//               >
//                 Next ➡
//               </button>
//             </div>
//           </div>
//         </main>

//         {!isMobile && <div className={styles["right-empty-space"]} />}
//       </div>
//     </div>
//   );
// }





// app/company/[companyId]/round/[roundId]/view/CompanyTxtViewClient.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./companyview.module.css";

const QUESTIONS_PER_PAGE = 5;

export default function CompanyTxtViewClient({
  companyId,
  roundId,
  initialTopics = [],
  initialCompanies = [],
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const questionIdFromUrl = searchParams.get("questionId");

  const [topics] = useState(initialTopics);
  const [companies] = useState(initialCompanies);

  const allQuestions = topics.flatMap((t) => t.questions || []);

  // Set initial question index from URL
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(() => {
    if (!allQuestions.length) return 0;

    if (questionIdFromUrl) {
      const idx = allQuestions.findIndex(
        (q) => String(q.id || q.questionId) === questionIdFromUrl
      );
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Auto scroll to active question (Desktop)
  useEffect(() => {
    if (!isMobile && allQuestions.length > 0) {
      const element = document.getElementById(`question-${selectedQuestionIndex}`);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedQuestionIndex, isMobile]);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goNext = () => {
    if (selectedQuestionIndex + QUESTIONS_PER_PAGE < allQuestions.length) {
      setSelectedQuestionIndex((prev) => prev + QUESTIONS_PER_PAGE);
    }
  };

  const goPrev = () => {
    if (selectedQuestionIndex - QUESTIONS_PER_PAGE >= 0) {
      setSelectedQuestionIndex((prev) => prev - QUESTIONS_PER_PAGE);
    }
  };

  const getPlainText = (html) => {
    return html ? html.replace(/<[^>]+>/g, "").trim() : "";
  };

  const fixLinks = (html) => {
    if (!html) return "";
    return html.replace(/href="([^"]+)"/g, (match, url) => {
      if (/^https?:\/\//i.test(url)) return `href="${url}"`;
      if (url.startsWith("/")) return `href="${url}"`;
      return `href="https://${url}"`;
    });
  };

  const handleCompanyChange = (newCompanyId) => {
    router.push(`/company/${newCompanyId}/rounds`);
  };

  const handleQuestionClick = (index, question) => {
    setSelectedQuestionIndex(index);
    const qId = question.id || question.questionId;
    router.push(
      `/company/${companyId}/round/${roundId}/view?questionId=${qId}`,
      { scroll: false }
    );
  };

  return (
    <div className={styles["companytxt-wrapper"]}>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <>
          <div className={styles["mobile-left-controls"]}>
            <button
              className={styles["mobile-hamburger-btn"]}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰ Questions
            </button>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`${styles["mobile-half-sidebar"]} ${
              isMobileMenuOpen ? styles["open"] : styles["closed"]
            }`}
          >
            <h3>All Questions</h3>
            {allQuestions.map((q, i) => (
              <button
                key={q.id ?? i}
                className={`${styles["mobile-topic-item"]} ${
                  i === selectedQuestionIndex ? styles["active"] : ""
                }`}
                onClick={() => handleQuestionClick(i, q)}
              >
                {getPlainText(q.questionText).length > 60
                  ? getPlainText(q.questionText).slice(0, 60) + "..."
                  : getPlainText(q.questionText)}
              </button>
            ))}
            <p className={styles.topicEnd}>End of Questions</p>
          </div>

          {isMobileMenuOpen && (
            <div
              className={styles["mobile-sidebar-overlay"]}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </>
      )}

      {/* Desktop Company Switcher */}
      {!isMobile && companies.length > 0 && (
        <div className={styles["top-notes-scroll"]}>
          <div className={styles["scroll-track"]}>
            {companies.map((company) => (
              <button
                key={company.id}
                className={`${styles["scroll-note-text"]} ${
                  company.id === companyId ? styles["active"] : ""
                }`}
                onClick={() => handleCompanyChange(company.id)}
              >
                {company.name?.length > 22
                  ? company.name.slice(0, 22) + "..."
                  : company.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`${styles["content-area"]} ${isMobile ? styles["mobile-layout"] : ""}`}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <nav className={styles["topics-panel"]}>
            <div className={styles["topics-header-row"]}>
              <h3>Questions List</h3>
              <button className={styles["go-back-btn"]} onClick={() => router.back()}>
                ⬅ Back
              </button>
            </div>
            <ul>
              {allQuestions.map((q, i) => (
                <li key={q.id ?? i}>
                  <button
                    className={i === selectedQuestionIndex ? styles["active"] : ""}
                    onClick={() => handleQuestionClick(i, q)}
                  >
                    {getPlainText(q.questionText).length > 55
                      ? getPlainText(q.questionText).slice(0, 55) + "..."
                      : getPlainText(q.questionText)}
                  </button>
                </li>
              ))}
              <p className={styles.topicEnd}>End of Questions</p>
            </ul>
          </nav>
        )}

        {/* Questions Display Area */}
        <main className={styles["topic-content"]}>
          <div className={styles["topic-content-inner"]}>
            {allQuestions.length > 0 ? (
              allQuestions.map((q, idx) => {
                const isVisible =
                  idx >= selectedQuestionIndex &&
                  idx < selectedQuestionIndex + QUESTIONS_PER_PAGE;

                return (
                  <article
                    key={q.id ?? idx}
                    id={`question-${idx}`}
                    className={idx === selectedQuestionIndex ? styles["active-topic"] : ""}
                    style={{ display: isVisible ? "block" : "none" }}
                  >
                    <h2 className={styles["topic-heading"]}>
                      {getPlainText(q.questionText)}
                    </h2>

                    <div
                      className={styles["topic-html-content"]}
                      dangerouslySetInnerHTML={{
                        __html: fixLinks(q.answer || "<p>No answer available</p>"),
                      }}
                    />
                  </article>
                );
              })
            ) : (
              <p>No questions available for this round.</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className={styles["topic-nav-buttons"]}>
            <div className={styles["bottom-right-controls"]}>
              <button onClick={goPrev} disabled={selectedQuestionIndex === 0}>
                ⬅ Previous
              </button>
              <button
                onClick={goNext}
                disabled={selectedQuestionIndex + QUESTIONS_PER_PAGE >= allQuestions.length}
              >
                Next ➡
              </button>
            </div>
          </div>
        </main>

        {!isMobile && <div className={styles["right-empty-space"]} />}
      </div>
    </div>
  );
}
