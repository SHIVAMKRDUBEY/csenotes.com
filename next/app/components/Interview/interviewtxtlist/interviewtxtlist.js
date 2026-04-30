// import Link from "next/link";
// import API_BASE_URL from "@/app/config";
// import styles from "./InterviewTxtList.module.css";
// import { createSlug } from "@/utils/slug";

// // Server-side fetch for interview subjects
// async function getSubjects() {
//   try {
//     const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
//       cache: "no-store", // SSR me hamesha fresh data
//     });

//     if (!res.ok) return []; 
//     const data = await res.json();
//     return data || [];
//   } catch (err) {
//     console.error("Error fetching subjects:", err);
//     return [];
//   }
// }

// // Main server component
// export default async function InterviewTxtList() {
//   const subjects = await getSubjects();

//   if (!subjects.length) {
//     return (
//       <p style={{ textAlign: "center", marginTop: "50px" }}>
//         No subjects found
//       </p>
//     );
//   }

//   return (
//     <div className={styles["interview-page-wrapper"]}>
//       <div className={styles["interview-container"]}>
//         <div className={styles["page-header"]}>
//           <h1 className={styles["page-title"]}>
//             <span className={styles["title-icon"]}>💼</span>
//             Interview Subjects
//             <span className={styles["subjects-count"]}>({subjects.length})</span>
//           </h1>
//          <p className={styles["page-subtitle"]}>
//   Select any subject to view its questions in detail
// </p>
//         </div>

//         <div className={styles["subjects-grid"]}>
//           {subjects.map((subject) => (
//             <Link
//               key={subject.subjectId}
//   href={`/interview/${createSlug(subject.subjectName)}`}
  
//               className={styles["subject-card"]}
//             >
//               <div className={styles["subject-image-wrapper"]}>
//                 <img
//                   src={
//                     subject.imageUrl ||
//                     "https://via.placeholder.com/300x180/4A6572/FFFFFF?text=Interview"
//                   }
//                   alt={subject.subjectName}
//                   className={styles["subject-image"]}
//                 />
//                 <div className={styles["subject-overlay"]}>
//                   <span className={styles["view-text"]}>View Questions →</span>
//                 </div>
//               </div>

//               <div className={styles["subject-content"]}>
//                 <h3 className={styles["subject-title"]}>
//                   {subject.subjectName}
//                 </h3>
//                 <div className={styles["subject-footer"]}>
//                   <span className={styles["subject-action"]}>Click to explore</span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






// InterviewTxtList.js
import Link from "next/link";
import API_BASE_URL from "@/app/config";
import styles from "./InterviewTxtList.module.css";
import { createSlug } from "@/utils/slug";

async function getSubjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
      next: { revalidate: 3600 },   // Changed from no-store → Better for SEO
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return [];
  }
}

export default async function InterviewTxtList() {
  const subjects = await getSubjects();

  if (!subjects.length) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>No Interview Topics Available</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className={styles["interview-page-wrapper"]}>
      <div className={styles["interview-container"]}>
        
        {/* ✅ Proper H1 - Most Important for SEO */}
        <div className={styles["page-header"]}>
          <h1 className={styles["page-title"]}>
            💼 Technical Interview Questions for CSE & IT Students
            <span className={styles["subjects-count"]}> ({subjects.length})</span>
          </h1>

          {/* ✅ SEO Friendly Descriptive Content (300+ words ki jagah meaningful text) */}
          <div className={styles["page-subtitle"]}>
            <p>
              Prepare for campus placements and technical interviews with real interview questions 
              from top companies. This section contains handpicked interview questions on 
              <strong> Java, Python, DSA, DBMS, Operating System, AWS, Docker, Microservices </strong> 
              and many more subjects.
            </p>
            <p>
              Each subject has detailed questions with answers and explanations. 
              Whether you are a fresher or experienced developer, these questions will help 
              you understand concepts deeply and crack interviews confidently.
            </p>
          </div>
        </div>

        {/* Grid Section */}
        <div className={styles["subjects-grid"]}>
          {subjects.map((subject, index) => (
            <Link
              key={subject.subjectId}
              href={`/interview/${createSlug(subject.subjectName)}`}
              className={styles["subject-card"]}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={styles["subject-image-wrapper"]}>
                <img
                  src={
                    subject.imageUrl ||
                    "https://via.placeholder.com/300x180/4A6572/FFFFFF?text=Interview"
                  }
                  alt={`${subject.subjectName} Interview Questions`}
                  className={styles["subject-image"]}
                  loading="lazy"
                />
                <div className={styles["subject-overlay"]}>
                  <span className={styles["view-text"]}>View Questions →</span>
                </div>
              </div>

              <div className={styles["subject-content"]}>
                <h2 className={styles["subject-title"]}>
                  {subject.subjectName}
                </h2>
                <div className={styles["subject-footer"]}>
                  <span className={styles["subject-action"]}>
                    Explore Interview Questions
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Extra SEO Content at Bottom */}
        <div className={styles["seo-bottom-content"]}>
          <h2>Frequently Asked Interview Topics for B.Tech CSE Students</h2>
          <p>
            Our interview preparation section covers all important subjects asked in 
            companies like TCS, Infosys, Wipro, Accenture, Amazon, Google, and Microsoft. 
            Regular practice of these questions will significantly improve your chances 
            of selection in campus placements and off-campus drives.
          </p>
        </div>

      </div>
    </div>
  );
}