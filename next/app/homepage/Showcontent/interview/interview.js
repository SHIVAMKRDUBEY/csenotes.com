
import Link from "next/link";
import API_BASE_URL from "@/app/config";
import styles from "./InterviewPreview.module.css";

const cleanImageUrl = (url) => {
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
};

export default async function InterviewPage() {
  let subjects = [];

  try {
  //  const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
   const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch interview subjects");

    const data = await res.json();
    subjects = (data || []).map((subject) => ({
      ...subject,
      imageUrl: cleanImageUrl(subject.imageUrl),
    }));
  } catch (err) {
    console.error("Error fetching subjects:", err);
    subjects = [];
  }

  return (
    <div className={styles.container}>
     <div className={styles.sectionHeader}>
  <h2 className={styles.mainTitle}>
    <span className={styles.titleIcon}>💼</span>
    <span className={styles.mainTitleText}> 
     Technical Interview Questions for CSE & IT Students
      </span>
  </h2>
 <p className={styles.subtitle}>
  Prepare confidently for your next tech interview with handpicked questions, detailed answers, and proven tips
</p>
</div>
      <div className={styles.grid}>
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <Link
              key={subject.subjectId}
             
             href={`/interview/${subject.subjectName
  ?.toLowerCase()
  .replace(/\s+/g, "-")}`}
              className={styles.card}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                  {subject.imageUrl ? (
                    <img
                      src={subject.imageUrl}
                      alt={subject.subjectName}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      {subject.subjectName
                        ?.split(" ")
                        .map((w) => w[0])
                        .join("") || "ITW"}
                    </div>
                  )}
                  <div className={styles.imageOverlay} />
                </div>

                <div className={styles.textContent}>
                  <h3 className={styles.cardTitle}>{subject.subjectName || "Unknown Topic"}</h3>
                
                  <span className={styles.viewLink}>
                
                    Start Interview Prep →
                    </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.noItems}>
            No interview topics available right now...
          </p>
        )}
      </div>

      {subjects.length > 0 && (
        <div className={styles.viewAllWrapper}>
          <Link href="/interview" className={styles.viewAllButton}>
            <span className={styles.buttonIcon}>🚀</span>
            Explore All Interview Topics
            <span className={styles.buttonArrow}>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}