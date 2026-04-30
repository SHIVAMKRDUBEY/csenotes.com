// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./NotesTxtView.module.css";
// /* ================= Main Component ================= */
// const NotesTxtView = ({ notes, topics, notetxtId, topicId }) => {
//   const router = useRouter();

//   const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
//   const [pageStartIndex, setPageStartIndex] = useState(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [fontSize] = useState(16);
//   const topicsPerPage = 5;
//   const topicRefs = useRef([]);

//   useEffect(() => {
//   if (!topicId || topics.length === 0) return;

//   const index = topics.findIndex(
//     (t) => String(t.topicId) === String(topicId)
//   );

//   if (index !== -1) {
//     setSelectedTopicIndex(index);
//     setPageStartIndex(Math.floor(index / topicsPerPage) * topicsPerPage);
//   }
// }, [topicId, topics]);
//   /* ================= Detect Mobile ================= */
//   useEffect(() => {
//     setIsMobile(window.innerWidth < 768);
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ================= Scroll to Active Topic ================= */
//  useEffect(() => {
//   if (typeof window === "undefined") return; // SSR safe
//   if (topics.length === 0 || isMobile) return;

//   const el = topicRefs.current[selectedTopicIndex];
//   if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
// }, [topics, selectedTopicIndex, isMobile]);
// const displayedTopics = topics;

//   const goNext = () => {
//     if (pageStartIndex + topicsPerPage < topics.length) {
//       const newStart = pageStartIndex + topicsPerPage;
//       setPageStartIndex(newStart);
//       setSelectedTopicIndex(newStart);
//     }
//   };

// const fixLinks = (html) => {
//   if (!html) return "";

//   return html.replace(/href="([^"]+)"/g, (match, url) => {
//     // Agar already http/https se start ho
//     if (url.startsWith("http://") || url.startsWith("https://")) {
//       return `href="${url}"`;
//     }

//     // Agar internal route (starts with /)
//     if (url.startsWith("/")) {
//       return `href="${url}"`;
//     }

//     // Agar plain domain (google.com jaisa)
//     return `href="https://${url}"`;
//   });
// };

//   const goPrev = () => {
//     if (pageStartIndex - topicsPerPage >= 0) {
//       const newStart = pageStartIndex - topicsPerPage;
//       setPageStartIndex(newStart);
//       setSelectedTopicIndex(newStart);
//     }
//   };

//   const handleTopicClick = (i) => {
//     setSelectedTopicIndex(i);
//     setPageStartIndex(Math.floor(i / topicsPerPage) * topicsPerPage);
//     if (isMobile) setIsMobileMenuOpen(false);
//    const slug = notes.find(n => n.noteId == notetxtId)?.title
//   .toLowerCase()
//   .replace(/\s+/g, "-");

// router.push(`/notes/${slug}?topicId=${topics[i].topicId}`);
//   };


// const navigateToNote = (noteId) => {
//  const slug = notes.find(n => n.noteId == noteId)?.title
//   ?.toLowerCase()
//   .replace(/\s+/g, "-");

// router.push(`/notes/${slug}`);
// };

//   return (
//     <div className={styles.notestxtWrapper}>
//       {/* ================= Top Notes ================= */}
//       <div className={styles.topNotesScroll} style={{ fontSize }}>
//         <div className={styles.scrollTrack}>
//           {notes.map((note) => (
//             <div
//               key={note.noteId}
//               className={`${styles.scrollNoteText} ${
//                 parseInt(note.noteId) === parseInt(notetxtId) ? styles.active : ""
//               }`}
//               onClick={() => navigateToNote(note.noteId)}
//             >
//               {note.title}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= Mobile Controls ================= */}
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
//             className={`${styles.mobileHalfSidebar} ${
//               isMobileMenuOpen ? styles.open : styles.closed
//             }`}
//           >
//             <h3>Topics</h3>
//             {topics.map((t, i) => (
//               <div
//                 key={t.topicId}
//                 className={`${styles.mobileTopicItem} ${
//                   i === selectedTopicIndex ? styles.active : ""
//                 }`}
//                 onClick={() => handleTopicClick(i)}
//               >
//                 {t.cleanTopicName}
//               </div>
//             ))}
//              <p className={styles.topicEnd}>Topic Ends from here</p>
//           </div>
//           {isMobileMenuOpen && (
//             <div
//               className={styles.mobileSidebarOverlay}
//               onClick={() => setIsMobileMenuOpen(false)}
//             ></div>
//           )}
//         </>
//       )}

//       {/* ================= Main Layout ================= */}
//       <div className={`${styles.contentArea} ${isMobile ? styles.mobileLayout : ""}`}>
//         {!isMobile && (
//           <div className={styles.topicsPanel}>
//             <div className={styles.topicsHeaderRow}>
//               <h3>Topics</h3>
//               <button
//                 className={styles.goBackBtn}
//                 onClick={() => router.push("/notes")}
//               >
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
//                   {t.cleanTopicName}
//                 </li>
//               ))}
//             </ul>
//               <p className={styles.topicEnd}>Topic Ends from here</p>
//           </div>
//         )}

//         <div className={styles.topicContent}>
//           <div className={styles.textControlsRow}>
//             <div className={styles.downloadContainer}>
//  <button
//   className={styles.downloadNotes}
//   onClick={() => 
//   router.push(`/notes/pdf?noteId=${notetxtId}`)}
// >
//   📥 Download All Topics as PDF
// </button>
//             </div>
//           </div>
//           <div className={styles.topicContentInner}>   
//               {displayedTopics.map((topic, index) => {
//   const isVisible =
//     index >= pageStartIndex &&
//     index < pageStartIndex + topicsPerPage;

//   const isActive = index === selectedTopicIndex;
//               return (
//                 <div
//   key={topic.topicId}
//   ref={(el) => (topicRefs.current[index] = el)}
//   className={`${styles.topicItem} ${
//     isActive ? styles.activeTopic : ""
//   }`}
//   style={{
//     fontSize,
//     display: isVisible ? "block" : "none",
//   }}
// >
//                   <div className={styles.topicHeading}>{topic.cleanTopicName}</div>

// <div
//   className={styles.topicHtmlContent}
//   dangerouslySetInnerHTML={{ __html: fixLinks(topic.content) }}
// />
//                 </div>
//               );
//             })}
//           </div>

//           <div className={styles.topicNavButtons}>
//             <div className={styles.bottomLeftControls}>
//   <button
//   className={styles.downloadNotes}
//   onClick={() => router.push(`/notes/pdf?noteId=${notetxtId}`)}
// >
//   📥 Download All Topics as PDF
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
// };

// export default NotesTxtView;





// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "./NotesTxtView.module.css";

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

// export default function NotesTxtView({ notes, topics, notetxtId }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const topicIdFromUrl = searchParams.get("topicId");

//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const topicsPerPage = 5;
//   const topicRefs = useRef([]);

//   const totalPages = Math.ceil(topics.length / topicsPerPage);

//   // Handle topicId from URL
//   useEffect(() => {
//     if (topicIdFromUrl && topics.length > 0) {
//       const idx = topics.findIndex((t) => String(t.topicId) === topicIdFromUrl);
//       if (idx !== -1) {
//         const page = Math.floor(idx / topicsPerPage);
//         setCurrentPage(page);
//         setSelectedTopicIndex(idx);
//       }
//     }
//   }, [topicIdFromUrl, topics]);

//   // Mobile Detection
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto Scroll to Active Topic (Desktop)
//   useEffect(() => {
//     if (!isMobile && topics.length > 0) {
//       const el = topicRefs.current[selectedTopicIndex];
//       el?.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [selectedTopicIndex, isMobile]);

//   const startIndex = currentPage * topicsPerPage;
//   const currentTopics = topics.slice(startIndex, startIndex + topicsPerPage);

//   const currentNoteTitle = notes.find((n) => n.noteId === notetxtId)?.title || "Engineering Notes";

//   const handleTopicClick = (globalIndex) => {
//     setSelectedTopicIndex(globalIndex);
//     const page = Math.floor(globalIndex / topicsPerPage);
//     setCurrentPage(page);

//     if (isMobile) setIsMobileMenuOpen(false);

//     const topicId = topics[globalIndex]?.topicId;
//     const slug = currentNoteTitle.toLowerCase().replace(/\s+/g, "-");

//     if (slug && topicId) {
//       router.push(`/notes/${slug}?topicId=${topicId}`, { scroll: false });
//     }
//   };

//   const goNextPage = () => {
//     if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
//   };

//   const goPrevPage = () => {
//     if (currentPage > 0) setCurrentPage((prev) => prev - 1);
//   };

//   const navigateToNote = (noteId) => {
//     const note = notes.find((n) => n.noteId === noteId);
//     if (note) {
//       const slug = note.title.toLowerCase().replace(/\s+/g, "-");
//       router.push(`/notes/${slug}`);
//     }
//   };

//   return (
//     <div className={styles.notestxtWrapper}>
//       {/* Top Scroll Bar */}
//       <div className={styles.topNotesScroll}>
//         <div className={styles.scrollTrack}>
//           {notes.map((note) => (
//             <div
//               key={note.noteId}
//               className={`${styles.scrollNoteText} ${
//                 parseInt(note.noteId) === parseInt(notetxtId) ? styles.active : ""
//               }`}
//               onClick={() => navigateToNote(note.noteId)}
//             >
//               {note.title}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Menu */}
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
//             <h3>Topics</h3>
//             {topics.map((t, i) => (
//               <div
//                 key={t.topicId}
//                 className={`${styles.mobileTopicItem} ${i === selectedTopicIndex ? styles.active : ""}`}
//                 onClick={() => handleTopicClick(i)}
//               >
//                 {stripHtml(t.cleanTopicName || t.topicName)}
//               </div>
//             ))}
//             <p className={styles.topicEnd}>End of Topics</p>
//           </div>

//           {isMobileMenuOpen && (
//             <div className={styles.mobileSidebarOverlay} onClick={() => setIsMobileMenuOpen(false)} />
//           )}
//         </>
//       )}

//       {/* Main Layout */}
//       <div className={`${styles.contentArea} ${isMobile ? styles.mobileLayout : ""}`}>
//         {/* Desktop Sidebar */}
//         {!isMobile && (
//           <div className={styles.topicsPanel}>
//             <div className={styles.topicsHeaderRow}>
//               <h3>All Topics ({topics.length})</h3>
//               <button className={styles.goBackBtn} onClick={() => router.push("/notes")}>
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
//                   {stripHtml(t.cleanTopicName || t.topicName)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Main Content Area - 5 Topics per Page */}
//         <div className={styles.topicContent}>
//           <div className={styles.textControlsRow}>
//             <button
//               className={styles.downloadNotes}
//               onClick={() => router.push(`/notes/pdf?noteId=${notetxtId}`)}
//             >
//               📥 Download All Topics as PDF
//             </button>
//           </div>

//           <div className={styles.topicContentInner}>
//             {currentTopics.map((topic, localIndex) => {
//               const globalIndex = startIndex + localIndex;
//               const isActive = globalIndex === selectedTopicIndex;

//               return (
//                 <article
//                   key={topic.topicId}
//                   ref={(el) => (topicRefs.current[globalIndex] = el)}
//                   className={`${styles.topicItem} ${isActive ? styles.activeTopic : ""}`}
//                 >
//                   <h2 className={styles.topicHeading}>
//                     {stripHtml(topic.cleanTopicName || topic.topicName)}
//                   </h2>

//                   <div
//                     className={styles.topicHtmlContent}
//                     dangerouslySetInnerHTML={{ __html: fixLinks(topic.content) }}
//                   />
//                 </article>
//               );
//             })}
//           </div>

//           {/* Pagination Controls */}
//           <div className={styles.topicNavButtons}>
//             <div className={styles.bottomLeftControls}>
//               <button
//                 className={styles.downloadNotes}
//                 onClick={() => router.push(`/notes/pdf?noteId=${notetxtId}`)}
//               >
//                 📥 Download All Topics as PDF
//               </button>
//             </div>

//             <div className={styles.bottomRightControls}>
//               <button onClick={goPrevPage} disabled={currentPage === 0}>
//                 ← Previous {topicsPerPage} Topics
//               </button>
//               <span className={styles.pageInfo}>
//                 Page {currentPage + 1} of {totalPages}
//               </span>
//               <button onClick={goNextPage} disabled={currentPage === totalPages - 1}>
//                 Next {topicsPerPage} Topics →
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
import styles from "./NotesTxtView.module.css";
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

//export default function NotesTxtView({ notes, topics, notetxtId }) {
export default function NotesTxtView({ notes, topics, notetxtId, initialTopicIndex = 0 }){
  const router = useRouter();
  const searchParams = useSearchParams();
  //const topicIdFromUrl = searchParams.get("topicId");

  const [currentPage, setCurrentPage] = useState(0);
  //const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(initialTopicIndex || 0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const topicsPerPage = 5;
  const topicRefs = useRef([]);

  const totalPages = Math.ceil(topics.length / topicsPerPage);

  // Handle topicId from URL
  // useEffect(() => {
  //   if (topicIdFromUrl && topics.length > 0) {
  //     const idx = topics.findIndex((t) => String(t.topicId) === topicIdFromUrl);
  //     if (idx !== -1) {
  //       const page = Math.floor(idx / topicsPerPage);
  //       setCurrentPage(page);
  //       setSelectedTopicIndex(idx);
  //     }
  //   }
  // }, [topicIdFromUrl, topics]);

  // Mobile Detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto Scroll to Active Topic (Desktop)
  useEffect(() => {
    if (!isMobile && topics.length > 0) {
      const el = topicRefs.current[selectedTopicIndex];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedTopicIndex, isMobile]);

  const startIndex = currentPage * topicsPerPage;
  const currentTopics = topics.slice(startIndex, startIndex + topicsPerPage);

  const currentNoteTitle = notes.find((n) => n.noteId === notetxtId)?.title || "Engineering Notes";

  const handleTopicClick = (globalIndex) => {
    setSelectedTopicIndex(globalIndex);
    const page = Math.floor(globalIndex / topicsPerPage);
    setCurrentPage(page);

    if (isMobile) setIsMobileMenuOpen(false);

    const topicId = topics[globalIndex]?.topicId;
    const slug = currentNoteTitle.toLowerCase().replace(/\s+/g, "-");

    if (slug && topicId) {
    //  router.push(`/notes/${slug}?topicId=${topicId}`, { scroll: false });
    const topicSlug = createTopicSlug(topics[globalIndex]?.topicName);

router.push(`/notes/${slug}/${topicSlug}`, { scroll: false });
    }
  };

  const goNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const goPrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const navigateToNote = (noteId) => {
    const note = notes.find((n) => n.noteId === noteId);
    if (note) {
      const slug = note.title.toLowerCase().replace(/\s+/g, "-");
      router.push(`/notes/${slug}`);
    }
  };

  return (
    <div className={styles.notestxtWrapper}>
      {/* Top Scroll Bar */}
      <div className={styles.topNotesScroll}>
        <div className={styles.scrollTrack}>
          {notes.map((note) => (
            <div
              key={note.noteId}
              className={`${styles.scrollNoteText} ${
                parseInt(note.noteId) === parseInt(notetxtId) ? styles.active : ""
              }`}
              onClick={() => navigateToNote(note.noteId)}
            >
              {note.title}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
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
            <h3>Topics</h3>
            {topics.map((t, i) => (
              <div
                key={t.topicId}
                className={`${styles.mobileTopicItem} ${i === selectedTopicIndex ? styles.active : ""}`}
                onClick={() => handleTopicClick(i)}
              >
                {stripHtml(t.cleanTopicName || t.topicName)}
              </div>
            ))}
            <p className={styles.topicEnd}>End of Topics</p>
          </div>

          {isMobileMenuOpen && (
            <div className={styles.mobileSidebarOverlay} onClick={() => setIsMobileMenuOpen(false)} />
          )}
        </>
      )}

      {/* Main Layout */}
      <div className={`${styles.contentArea} ${isMobile ? styles.mobileLayout : ""}`}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className={styles.topicsPanel}>
            <div className={styles.topicsHeaderRow}>
              <h3>All Topics ({topics.length})</h3>
              <button className={styles.goBackBtn} onClick={() => router.push("/notes")}>
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
                  {stripHtml(t.cleanTopicName || t.topicName)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content Area - 5 Topics per Page */}
        <div className={styles.topicContent}>
          <div className={styles.textControlsRow}>
            <button
              className={styles.downloadNotes}
              onClick={() => router.push(`/notes/pdf?noteId=${notetxtId}`)}
            >
              📥 Download All Topics as PDF
            </button>
          </div>

          <div className={styles.topicContentInner}>
            {currentTopics.map((topic, localIndex) => {
              const globalIndex = startIndex + localIndex;
              const isActive = globalIndex === selectedTopicIndex;

              return (
                <article
                  key={topic.topicId}
                  ref={(el) => (topicRefs.current[globalIndex] = el)}
                  className={`${styles.topicItem} ${isActive ? styles.activeTopic : ""}`}
                >
                  <h2 className={styles.topicHeading}>
                    {stripHtml(topic.cleanTopicName || topic.topicName)}
                  </h2>

                  <div
                    className={styles.topicHtmlContent}
                    dangerouslySetInnerHTML={{ __html: fixLinks(topic.content) }}
                  />
                </article>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className={styles.topicNavButtons}>
            <div className={styles.bottomLeftControls}>
              <button
                className={styles.downloadNotes}
                onClick={() => router.push(`/notes/pdf?noteId=${notetxtId}`)}
              >
                📥 Download All Topics as PDF
              </button>
            </div>

            <div className={styles.bottomRightControls}>
              <button onClick={goPrevPage} disabled={currentPage === 0}>
                ← Previous {topicsPerPage} Topics
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button onClick={goNextPage} disabled={currentPage === totalPages - 1}>
                Next {topicsPerPage} Topics →
              </button>
            </div>
          </div>
        </div>

        {!isMobile && <div className={styles.rightEmptySpace} />}
      </div>
    </div>
  );
}