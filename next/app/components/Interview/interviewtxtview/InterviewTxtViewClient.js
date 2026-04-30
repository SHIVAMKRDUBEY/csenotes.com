// "use client";

// import { useEffect, useState, useRef, useLayoutEffect } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./InterviewTxtView.module.css";
// import { createSlug } from "@/utils/slug";

// // Helpers
// const stripHtml = (html) => {
//   if (!html) return "";
//   return html.replace(/<[^>]*>/g, "").trim();
// };
// // ===================== FIX LINKS HELPER =====================
// const fixLinks = (html) => {
//   if (!html) return "";

//   return html.replace(/href="([^"]+)"/g, (match, url) => {
//     if (url.startsWith("http://") || url.startsWith("https://")) {
//       return `href="${url}"`;
//     }
//     if (url.startsWith("/")) {
//       return `href="${url}"`;
//     }
//     return `href="http://${url}"`; // current tab me khulega
//   });
// };
// // ===================== PARSE CONTENT =====================
// function parseContentWithVideos(content) {
//   if (!content) return null;
//   const fixedContent = fixLinks(content); // fix links first
//   return <div dangerouslySetInnerHTML={{ __html: fixedContent }} />;
// }
// export default function InterviewTxtViewClient({ interviews, topics, txtId, questionId }) {
//   const router = useRouter();
// const navigateToInterview = (subjectId) => {
//   const slug = createSlug(
//     interviews.find(i => i.subjectId == subjectId)?.subjectName
//   );

//   router.push(`/interview/${slug}`);
// };

//   const [selectedTopicIndex, setSelectedTopicIndex] = useState(() => {
//   if (questionId) {
//     const idx = topics.findIndex((t) => t.topicId === questionId);
//     return idx >= 0 ? idx : 0;
//   }
//   return 0;
// });

//   const [pageStartIndex, setPageStartIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const topicsPerPage = 10;
//   const topicRefs = useRef([]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useLayoutEffect(() => {
//   if (!isMobile && topics.length > 0) {
//     const el = topicRefs.current[selectedTopicIndex];
//     el?.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// }, [selectedTopicIndex, isMobile, topics]);

// const displayedTopics = topics;

//   const goNext = () => {
//     if (pageStartIndex + topicsPerPage < topics.length) {
//       const newStart = pageStartIndex + topicsPerPage;
//       setPageStartIndex(newStart);
//       setSelectedTopicIndex(newStart);
//     }
//   };

//   const goPrev = () => {
//     if (pageStartIndex - topicsPerPage >= 0) {
//       const newStart = pageStartIndex - topicsPerPage;
//       setPageStartIndex(newStart);
//       setSelectedTopicIndex(newStart);
//     }
//   };
//   const handleTopicClick = (i) => {
//   setSelectedTopicIndex(i);
//   setPageStartIndex(Math.floor(i / topicsPerPage) * topicsPerPage);
//   if (isMobile) setIsMobileMenuOpen(false);

//   const topicId = topics[i].topicId;
//  const slug = createSlug(
//   interviews.find(i => i.subjectId == txtId)?.subjectName
// );

// router.push(`/interview/${slug}?questionId=${topicId}`);
// };

//   return (
//     <div className={styles.interviewtxtWrapper}>
//       {/* Top scrolling subjects - same style as Notes */}
//       <div className={styles.topNotesScroll}>
//         <div className={styles.scrollTrack}>
//           {interviews.map((s) => (
//             <div
//               key={s.subjectId}
//               className={`${styles.scrollNoteText} ${s.subjectId === txtId ? styles.active : ""}`}
//               onClick={() => navigateToInterview(s.subjectId)}
//             >
//               {s.subjectName}
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Mobile hamburger + sidebar */}
//       {isMobile && (
//         <>
//           <div className={styles.mobileLeftControls}>
//             <button
//               className={styles.mobileHamburgerBtn}
//               onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             >
//               ☰
//             </button>
//           </div>

//           <div
//             className={`${styles.mobileHalfSidebar} ${isMobileMenuOpen ? styles.open : styles.closed}`}
//           >
//             <h3>Topics</h3>
//             {topics.map((t, i) => (
//               <div
//                 key={t.topicId}
//                 className={`${styles.mobileTopicItem} ${i === selectedTopicIndex ? styles.active : ""}`}
//                 onClick={() => handleTopicClick(i)}
//               >
//                 {stripHtml(t.questionText)}
//               </div>
//             ))}
//              <p className={styles.topicEnd}>Question Ends from here</p>
//           </div>
//           {isMobileMenuOpen && (
//             <div className={styles.mobileSidebarOverlay} onClick={() => setIsMobileMenuOpen(false)} />
//           )}
//         </>
//       )}
//       {/* Main layout */}
//       <div className={`${styles.contentArea} ${isMobile ? styles.mobileLayout : ""}`}>
//         {/* Desktop sidebar */}
//         {!isMobile && (
//           <div className={styles.topicsPanel}>
//             <div className={styles.topicsHeaderRow}>
//               <h3>Topics</h3>
//               <button className={styles.goBackBtn} onClick={() => router.push("/interview")}>
//                 ⬅ Go Back
//               </button>
//             </div>
//             <ul>
//               {topics.map((t, i) => (
//                 <li
//                   key={t.topicId}
//                   className={i === selectedTopicIndex ? styles.active : ""}
//                   onClick={() => handleTopicClick(i)}
//                 >
//                   {stripHtml(t.questionText)}
//                 </li>
                
//               ))}
//                <p className={styles.topicEnd}>Questions Ends from here</p>
//             </ul>
//           </div>
//         )}

//         {/* Main content area */}
//         <div className={styles.topicContent}>
//           <div className={styles.textControlsRow}>
//             <div className={styles.downloadContainer}>
//               <div className={styles.downloadContainer}>
// <button
//   className={styles.downloadNotes}
//   onClick={() => router.push(`/interview/pdf?txtId=${txtId}`)}
// >
//   📥 View/Download PDF
// </button>
// </div>
//             </div>
//           </div>

//           <div className={styles.topicContentInner}>
//               {displayedTopics.map((t, index) => {
//   const isVisible =
//     index >= pageStartIndex &&
//     index < pageStartIndex + topicsPerPage;

//   const isActive = index === selectedTopicIndex;
//               return (
//                 <div
//   key={t.topicId}
//   ref={(el) => (topicRefs.current[index] = el)}
//   className={`${styles.topicItem} ${isActive ? styles.activeTopic : ""}`}
//   style={{
//     display: isVisible ? "block" : "none",
//   }}
// >
//                   <div className={styles.topicHeading}>{stripHtml(t.questionText)}</div>

//                   <div className={styles.topicHtmlContent}>
//                     {parseContentWithVideos(t.content)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className={styles.topicNavButtons}>
//             <div className={styles.bottomLeftControls}>
        
// <button
//   className={styles.downloadNotes}
//   onClick={() => router.push(`/interview/pdf?txtId=${txtId}`)}
// >
//   📥 View/Download PDF
// </button>
//             </div>

//             <div className={styles.bottomRightControls}>
//               <button onClick={goPrev} disabled={pageStartIndex === 0}>
//                 ⬅ Previous
//               </button>
//               <button
//                 onClick={goNext}
//                 disabled={pageStartIndex + topicsPerPage >= topics.length}
//               >
//                 Next ➡
//               </button>
//             </div>
//           </div>
//         </div>

//         {!isMobile && <div className={styles.rightEmptySpace}></div>}
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "./InterviewTxtView.module.css";
// import { createSlug } from "@/utils/slug";

// // ===================== HELPERS =====================
// const stripHtml = (html) => {
//   if (!html) return "";
//   return html.replace(/<[^>]*>/g, "").trim();
// };

// const fixLinks = (html) => {
//   if (!html) return "";
//   return html.replace(/href="([^"]+)"/g, (match, url) => {
//     if (/^https?:\/\//i.test(url)) return `href="${url}"`;
//     if (url.startsWith("/")) return `href="${url}"`;
//     return `href="https://${url}"`;
//   });
// };

// const parseContent = (content) => {
//   if (!content) return <p>No detailed answer available for this question.</p>;
//   const fixed = fixLinks(content);
//   return <div dangerouslySetInnerHTML={{ __html: fixed }} />;
// };

// export default function InterviewTxtViewClient({
//   interviews,
//   topics,
//   txtId,
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const questionIdFromUrl = searchParams.get("questionId");

//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const topicsPerPage = 10;
//   const topicRefs = useRef([]);

//   const totalPages = Math.ceil(topics.length / topicsPerPage);

//   // Set initial page & selected question from URL
//   useEffect(() => {
//     if (questionIdFromUrl && topics.length > 0) {
//       const idx = topics.findIndex((t) => String(t.topicId) === questionIdFromUrl);
//       if (idx >= 0) {
//         const page = Math.floor(idx / topicsPerPage);
//         setCurrentPage(page);
//         setSelectedTopicIndex(idx);
//       }
//     }
//   }, [questionIdFromUrl, topics]);

//   // Mobile check
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto scroll to active question
//   useEffect(() => {
//     if (!isMobile && topics.length > 0) {
//       const el = topicRefs.current[selectedTopicIndex];
//       el?.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [selectedTopicIndex, isMobile]);

//   const startIndex = currentPage * topicsPerPage;
//   const currentTopics = topics.slice(startIndex, startIndex + topicsPerPage);

//   const handleTopicClick = (globalIndex) => {
//     setSelectedTopicIndex(globalIndex);
//     const page = Math.floor(globalIndex / topicsPerPage);
//     setCurrentPage(page);

//     if (isMobile) setIsMobileMenuOpen(false);

//     const topicId = topics[globalIndex]?.topicId;
//     const subject = interviews.find((i) => i.subjectId === txtId);
//     const slug = subject ? createSlug(subject.subjectName) : "";

//     if (slug && topicId) {
//       router.push(`/interview/${slug}?questionId=${topicId}`, { scroll: false });
//     }
//   };

//   const goNextPage = () => {
//     if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
//   };

//   const goPrevPage = () => {
//     if (currentPage > 0) setCurrentPage((prev) => prev - 1);
//   };

//   const currentSubjectName = interviews.find((i) => i.subjectId === txtId)?.subjectName || "Interview";

//   return (
//     <div className={styles.interviewtxtWrapper}>
//       {/* Top Scrolling Subjects */}
//       <div className={styles.topNotesScroll}>
//         <div className={styles.scrollTrack}>
//           {interviews.map((subject) => (
//             <div
//               key={subject.subjectId}
//               className={`${styles.scrollNoteText} ${subject.subjectId === txtId ? styles.active : ""}`}
//               onClick={() => router.push(`/interview/${createSlug(subject.subjectName)}`)}
//             >
//               {subject.subjectName}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Hamburger Menu */}
//       {isMobile && (
//         <>
//           <div className={styles.mobileLeftControls}>
//             <button
//               className={styles.mobileHamburgerBtn}
//               onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             >
//               ☰ Topics
//             </button>
//           </div>

//           <div className={`${styles.mobileHalfSidebar} ${isMobileMenuOpen ? styles.open : styles.closed}`}>
//             <h3>All Topics</h3>
//             {topics.map((t, i) => (
//               <div
//                 key={t.topicId}
//                 className={`${styles.mobileTopicItem} ${i === selectedTopicIndex ? styles.active : ""}`}
//                 onClick={() => handleTopicClick(i)}
//               >
//                 {stripHtml(t.questionText)}
//               </div>
//             ))}
//             <p className={styles.topicEnd}>End of Questions</p>
//           </div>

//           {isMobileMenuOpen && (
//             <div className={styles.mobileSidebarOverlay} onClick={() => setIsMobileMenuOpen(false)} />
//           )}
//         </>
//       )}

//       {/* Main Content Area */}
//       <div className={`${styles.contentArea} ${isMobile ? styles.mobileLayout : ""}`}>
//         {/* Desktop Sidebar */}
//         {!isMobile && (
//           <div className={styles.topicsPanel}>
//             <div className={styles.topicsHeaderRow}>
//               <h3>Topics ({topics.length})</h3>
//               <button className={styles.goBackBtn} onClick={() => router.push("/interview")}>
//                 ⬅ Go Back
//               </button>
//             </div>
//             <ul>
//               {topics.map((t, i) => (
//                 <li
//                   key={t.topicId}
//                   className={i === selectedTopicIndex ? styles.active : ""}
//                   onClick={() => handleTopicClick(i)}
//                 >
//                   {stripHtml(t.questionText)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Main Questions Section */}
//         <div className={styles.topicContent}>
//           {/* SEO Friendly Heading + Intro */}
//           <div className={styles.seoIntro}>
//             <h1>
//               {currentSubjectName} Interview Questions with Answers - {topics.length} Questions
//             </h1>
//             <p>
//               Comprehensive list of real <strong>{currentSubjectName}</strong> interview questions 
//               asked in campus placements and technical interviews. 
//               These questions are curated from previous company rounds and will help you 
//               understand important concepts and improve your problem-solving skills.
//             </p>
//                 <button
//                 className={styles.downloadNotes}
//                 onClick={() => router.push(`/interview/pdf?txtId=${txtId}`)}
//               >
//                 📥 View / Download PDF
//               </button>
//           </div>

//           {/* Questions Display - 10 at a time */}
//           <div className={styles.topicContentInner}>
//             {currentTopics.map((t, localIndex) => {
//               const globalIndex = startIndex + localIndex;
//               const isActive = globalIndex === selectedTopicIndex;

//               return (
//                 <article
//                   key={t.topicId}
//                   ref={(el) => (topicRefs.current[globalIndex] = el)}
//                   className={`${styles.topicItem} ${isActive ? styles.activeTopic : ""}`}
//                 >
//                   <h2 className={styles.topicHeading}>
//                     {stripHtml(t.questionText)}
//                   </h2>
//                   <div className={styles.topicHtmlContent}>
//                     {parseContent(t.content)}
//                   </div>
//                 </article>
//               );
//             })}
//           </div>

//           {/* Pagination Controls */}
//           <div className={styles.topicNavButtons}>
//             <div className={styles.bottomLeftControls}>
//               <button
//                 className={styles.downloadNotes}
//                 onClick={() => router.push(`/interview/pdf?txtId=${txtId}`)}
//               >
//                 📥 View / Download PDF
//               </button>
//             </div>

//             <div className={styles.bottomRightControls}>
//               <button onClick={goPrevPage} disabled={currentPage === 0}>
//                 ← Previous {topicsPerPage} Questions
//               </button>
//               <span className={styles.pageInfo}>
//                 Page {currentPage + 1} of {totalPages}
//               </span>
//               <button onClick={goNextPage} disabled={currentPage === totalPages - 1}>
//                 Next {topicsPerPage} Questions →
//               </button>
//             </div>
//           </div>
//         </div>

//         {!isMobile && <div className={styles.rightEmptySpace} />}
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./InterviewTxtView.module.css";
import { createSlug } from "@/utils/slug";
import { createTopicSlug } from "@/utils/slug";

// ===================== HELPERS =====================
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

const fixLinks = (html) => {
  if (!html) return "";
  return html.replace(/href="([^"]+)"/g, (match, url) => {
    if (/^https?:\/\//i.test(url)) return `href="${url}"`;
    if (url.startsWith("/")) return `href="${url}"`;
    return `href="https://${url}"`;
  });
};

const parseContent = (content) => {
  if (!content) return <p>No detailed answer available for this question.</p>;
  const fixed = fixLinks(content);
  return <div dangerouslySetInnerHTML={{ __html: fixed }} />;
};

export default function InterviewTxtViewClient({
  interviews,
  topics,
  txtId,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  //const questionIdFromUrl = searchParams.get("questionId");

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const topicsPerPage = 10;
  const topicRefs = useRef([]);

  const totalPages = Math.ceil(topics.length / topicsPerPage);

  // Set initial page & selected question from URL
  // useEffect(() => {
  //   if (questionIdFromUrl && topics.length > 0) {
  //     const idx = topics.findIndex((t) => String(t.topicId) === questionIdFromUrl);
  //     if (idx >= 0) {
  //       const page = Math.floor(idx / topicsPerPage);
  //       setCurrentPage(page);
  //       setSelectedTopicIndex(idx);
  //     }
  //   }
  // }, [questionIdFromUrl, topics]);
  useEffect(() => {
  if (topics.length > 0) {
    const lastSlug = window.location.pathname.split("/").pop();

    const idx = topics.findIndex((t) => t.slug === lastSlug);

    if (idx !== -1) {
      setSelectedTopicIndex(idx);
      setCurrentPage(Math.floor(idx / topicsPerPage));
    }
  }
}, [topics]);

  // Mobile check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll to active question
  useEffect(() => {
    if (!isMobile && topics.length > 0) {
      const el = topicRefs.current[selectedTopicIndex];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedTopicIndex, isMobile]);

  const startIndex = currentPage * topicsPerPage;
  const currentTopics = topics.slice(startIndex, startIndex + topicsPerPage);

  const handleTopicClick = (globalIndex) => {
    setSelectedTopicIndex(globalIndex);
    const page = Math.floor(globalIndex / topicsPerPage);
    setCurrentPage(page);

    if (isMobile) setIsMobileMenuOpen(false);

    const topicId = topics[globalIndex]?.topicId;
    const subject = interviews.find((i) => i.subjectId === txtId);
    const slug = subject ? createSlug(subject.subjectName) : "";

    if (slug && topicId) {
      //router.push(`/interview/${slug}?questionId=${topicId}`, { scroll: false });
      const topicSlug = createTopicSlug(topics[globalIndex]?.questionText);

router.push(`/interview/${slug}/${topicSlug}`, { scroll: false });
    }
  };

  const goNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const goPrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const currentSubjectName = interviews.find((i) => i.subjectId === txtId)?.subjectName || "Interview";

  return (
    <div className={styles.interviewtxtWrapper}>
      {/* Top Scrolling Subjects */}
      <div className={styles.topNotesScroll}>
        <div className={styles.scrollTrack}>
          {interviews.map((subject) => (
            <div
              key={subject.subjectId}
              className={`${styles.scrollNoteText} ${subject.subjectId === txtId ? styles.active : ""}`}
              onClick={() => router.push(`/interview/${createSlug(subject.subjectName)}`)}
            >
              {subject.subjectName}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      {isMobile && (
        <>
          <div className={styles.mobileLeftControls}>
            <button
              className={styles.mobileHamburgerBtn}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              ☰ Topics
            </button>
          </div>

          <div className={`${styles.mobileHalfSidebar} ${isMobileMenuOpen ? styles.open : styles.closed}`}>
            <h3>All Topics</h3>
            {topics.map((t, i) => (
              <div
                key={t.topicId}
                className={`${styles.mobileTopicItem} ${i === selectedTopicIndex ? styles.active : ""}`}
                onClick={() => handleTopicClick(i)}
              >
                {stripHtml(t.questionText)}
              </div>
            ))}
            <p className={styles.topicEnd}>End of Questions</p>
          </div>

          {isMobileMenuOpen && (
            <div className={styles.mobileSidebarOverlay} onClick={() => setIsMobileMenuOpen(false)} />
          )}
        </>
      )}

      {/* Main Content Area */}
      <div className={`${styles.contentArea} ${isMobile ? styles.mobileLayout : ""}`}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className={styles.topicsPanel}>
            <div className={styles.topicsHeaderRow}>
              <h3>Topics ({topics.length})</h3>
              <button className={styles.goBackBtn} onClick={() => router.push("/interview")}>
                ⬅ Go Back
              </button>
            </div>
            <ul>
              {topics.map((t, i) => (
                <li
                  key={t.topicId}
                  className={i === selectedTopicIndex ? styles.active : ""}
                  onClick={() => handleTopicClick(i)}
                >
                  {stripHtml(t.questionText)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Questions Section */}
        <div className={styles.topicContent}>
          {/* SEO Friendly Heading + Intro */}
          <div className={styles.seoIntro}>
            <h1>
              {currentSubjectName} Interview Questions with Answers - {topics.length} Questions
            </h1>
            <p>
              Comprehensive list of real <strong>{currentSubjectName}</strong> interview questions 
              asked in campus placements and technical interviews. 
              These questions are curated from previous company rounds and will help you 
              understand important concepts and improve your problem-solving skills.
            </p>
                <button
                className={styles.downloadNotes}
                onClick={() => router.push(`/interview/pdf?txtId=${txtId}`)}
              >
                📥 View / Download PDF
              </button>
          </div>

          {/* Questions Display - 10 at a time */}
          <div className={styles.topicContentInner}>
            {currentTopics.map((t, localIndex) => {
              const globalIndex = startIndex + localIndex;
              const isActive = globalIndex === selectedTopicIndex;

              return (
                <article
                  key={t.topicId}
                  ref={(el) => (topicRefs.current[globalIndex] = el)}
                  className={`${styles.topicItem} ${isActive ? styles.activeTopic : ""}`}
                >
                  <h2 className={styles.topicHeading}>
                    {stripHtml(t.questionText)}
                  </h2>
                  <div className={styles.topicHtmlContent}>
                    {parseContent(t.content)}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className={styles.topicNavButtons}>
            <div className={styles.bottomLeftControls}>
              <button
                className={styles.downloadNotes}
                onClick={() => router.push(`/interview/pdf?txtId=${txtId}`)}
              >
                📥 View / Download PDF
              </button>
            </div>

            <div className={styles.bottomRightControls}>
              <button onClick={goPrevPage} disabled={currentPage === 0}>
                ← Previous {topicsPerPage} Questions
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button onClick={goNextPage} disabled={currentPage === totalPages - 1}>
                Next {topicsPerPage} Questions →
              </button>
            </div>
          </div>
        </div>

        {!isMobile && <div className={styles.rightEmptySpace} />}
      </div>
    </div>
  );
}