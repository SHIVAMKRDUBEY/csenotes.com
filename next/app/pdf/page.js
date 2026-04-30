// import Link from "next/link";
// import { page } from "./data/page";
// import styles from "./PdfList.module.css";

// export default function PdfListPage() {
//   const notes = page.filter((p) => p.type === "notes");
//   const interviews = page.filter((p) => p.type === "interview");

//   return (
//     <main className={styles.container}>

//       <h1 className={styles.title}>
//         📚 PDF Library
//       </h1>

//       {/* INTRO TEXT (SSR VISIBLE) */}
//       <p className={styles.description}>
//          Welcome to your complete PDF Learning Library — a collection of structured Notes PDFs and Interview Preparation materials designed for students, developers, and job seekers.
//       </p>

//       {/* NOTES SECTION */}
//       <Section title="📘 Notes PDFs" data={notes} />

//       {/* INTERVIEW SECTION */}
//       <Section title="🧑‍💼 Interview PDFs" data={interviews} />

//       {/* DETAILS TEXT */}
//       <section className={styles.descriptionBox}>
//         <p>
//            Notes PDFs help you understand core Computer Science subjects like Operating Systems, Computer Networks, DBMS, and Programming in a simple and structured way.
//         </p>

//         <p>
//            Interview PDFs include HR questions, technical interview rounds, and real company interview experiences to help you prepare confidently for placements.
//         </p>

//         <p>
//            This platform is designed for fast learning, quick revision, and complete interview preparation — all in one place.
//         </p>
//       </section>

//     </main>
//   );
// }

// /* SSR SAFE COMPONENT */
// function Section({ title, data }) {
//   return (
//     <section className={styles.section}>

//       <h2 className={styles.subtitle}>
//         {title}
//       </h2>

//       <div className={styles.grid}>
//         {data.map((item) => (
//           <Link
//             key={item.id}
//             href={`/pdf/${item.slug}`}
//             className={styles.card}
//           >
//             <div className={styles.cardTitle}>
//               {item.title}
//             </div>

//             <span
//               className={`${styles.badge} ${
//                 item.type === "notes"
//                   ? styles.notes
//                   : styles.interview
//               }`}
//             >
//               {item.type}
//             </span>
//           </Link>
//         ))}
//       </div>

//     </section>
//   );
// }




import Link from "next/link";
import { page } from "./data/data";
import styles from "./PdfList.module.css";

/* ✅ SEO METADATA (Optimized Version) */
export const metadata = {
  title: "Free Handwritten Notes & Interview Questions PDF Library | CSE Study Material",
  description:
    "Download free handwritten notes, interview questions, and placement preparation PDFs for Computer Science Engineering. Covers OS, DBMS, CN, DSA, and coding interviews for exams and job preparation.",

keywords: [
  "csenotes",
  "cse notes pdf",
  "computer science notes",
  "handwritten notes pdf",
  "interview questions pdf",
  "placement preparation",
  "company pyq",
  "btech cse notes",
  "engineering study material",
  "DSA notes",
  "DBMS notes",
  "Operating System notes",
  "Computer Networks notes",
  "TOC notes",
  "software engineering notes",
  "coding interview questions",
  "java interview questions",
  "AWS interview questions",
  "Docker interview questions",
  "microservices interview questions",
  "free pdf download"
],

  openGraph: {
    title: "Free Handwritten Notes & Interview Questions PDF Library",
    description:
      "Download free CSE notes and interview preparation PDFs for exams and placements. Best study material for students and developers.",
    url: "https://csenotes.com/pdf",
    siteName: "CSENOTES",
    type: "website",
    images: [
      {
        url: "https://csenotes.com/og.png",
        width: 1200,
        height: 630,
        alt: "Free CSE Notes & Interview PDFs"
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free CSE Notes & Interview Questions PDF Library",
    description:
      "Download handwritten notes and interview PDFs for Computer Science Engineering subjects and placement preparation.",
    images: ["https://csenotes.com/og.png"],
  },

  alternates: {
    canonical: "https://csenotes.com/pdf",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PdfListPage() {
  const notes = page.filter((p) => p.type === "notes");
  const interviews = page.filter((p) => p.type === "interview");

  return (
    <main className={styles.container}>

      {/* H1 SEO OPTIMIZED */}
      <h1 className={styles.title}>
        📚 Free Computer Science Handwritten Notes & Interview Questions PDF Library
      </h1>

      {/* INTRO (Keyword rich but natural) */}
      <p className={styles.description}>
        Download <strong>free handwritten notes</strong>, <strong>interview questions PDFs</strong>, and <strong>placement preparation material</strong> for Computer Science Engineering.
        Covers subjects like <strong>DSA</strong>, <strong>Operating System</strong>, <strong>DBMS</strong>, and <strong>Computer Networks</strong>.
      </p>

      {/* NOTES SECTION */}
      <Section
        title="📘 Computer Science Notes PDFs (Semester Wise)"
        data={notes}
      />

      {/* INTERVIEW SECTION */}
      <Section
        title="🧑‍💼 Interview Questions PDFs"
        data={interviews}
      />

      {/* EXTRA SEO CONTENT */}
      <section className={styles.descriptionBox}>

        <h2>📌 Why These Notes Are Useful?</h2>
        <p>
          These handwritten notes are simplified for quick revision and exam preparation.
          They help students understand complex Computer Science topics easily.
        </p>

        <h2>💼 Placement Preparation Material</h2>
        <p>
          Interview PDFs include HR questions, technical rounds, coding problems, and real interview experiences from top companies.
        </p>

        <h2>🎯 Ideal For Students & Developers</h2>
        <p>
          Perfect for B.Tech students preparing for semester exams, internships, and software engineering job interviews.
        </p>

      </section>

    </main>
  );
}

/* SSR SAFE COMPONENT */
function Section({ title, data }) {
  return (
    <section className={styles.section}>

      {/* SEO H2 OPTIMIZED */}
      <h2 className={styles.subtitle}>
        {title}
      </h2>

      <div className={styles.grid}>
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/pdf/${item.slug}`}
            className={styles.card}
          >
            <div className={styles.cardTitle}>
              {item.title}
            </div>

            <span
              className={`${styles.badge} ${
                item.type === "notes"
                  ? styles.notes
                  : styles.interview
              }`}
            >
              {item.type === "notes" ? "Notes" : "Interview"}
            </span>
             <div className={styles.exploreText}>
        👆 Click to Explore
      </div>
          </Link>
        ))}
      </div>

    </section>
  );
}