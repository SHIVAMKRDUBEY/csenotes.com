
import Link from "next/link";
import API_BASE_URL from "@/app/config";
import styles from "./NotesPreview.module.css";

  const cleanImageUrl = (url) => {

  if (!url) return null;
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
};

export default async function NotesPreview() {
  let notes = [];
  
 try {
  //const res = await fetch(`${API_BASE_URL}/api/txtnotes`, {
    const res = await fetch(`${API_BASE_URL}/api/txtnotes`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch notes");

  const data = await res.json();

  notes = (data || []).map((note) => ({
    ...note,
    imageUrl: cleanImageUrl(note.imageUrl),
  }));
} catch (err) {
  console.error("Error fetching notes:", err);
  notes = [];
}


  return (
    <div className={styles.container}>
  
      <div className={styles.sectionHeader}>
        <h2 className={styles.mainTitle}>
  <span className={styles.titleIcon}>📚</span>
  <span className={styles.gradientText}>
   Free CSE Engineering Notes 
   {/* for B.Tech Students */}
    </span>
</h2>

        <p className={styles.subtitle}>
        
          Handpicked engineering notes, summaries & study materials — learn smarter.  
Specially curated notes, previous year questions, and quick guides for CS & IT students.  
Explore now and take your preparation to the next level!
        </p>
      </div>

      {/* Grid */}
      <div className={styles.notesGrid}>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Link
              key={note.noteId}
            
              href={`/notes/${note.title
  ?.toLowerCase()
  .replace(/\s+/g, "-")}`} 
              className={styles.noteCard}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={styles.cardInner}>
                
                <div className={styles.imageWrapper}>
                  {note.imageUrl ? (
                    <img
                      src={note.imageUrl}
                      alt={note.title || "Study Notes"}
                      className={styles.noteImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      {note.title?.charAt(0)?.toUpperCase() || "📘"}
                    </div>
                  )}
                  <div className={styles.imageOverlay} />
                </div>

            
                <div className={styles.textContent}>
                  <h3 className={styles.noteTitle}>{note.title || "Untitled Notes"}</h3>
                  <div className={styles.noteMeta}>
                    <span className={styles.viewLink}>
                  
                      Explore Notes →
                      </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.noNotes}>No resources available right now...</p>
        )}
      </div>

    
      {notes.length > 0 && (
        <div className={styles.viewAllWrapper}>
          <Link href="/notes" className={styles.viewAllButton}>
            <span className={styles.buttonIcon}>📖</span>
            Explore Full Library
            <span className={styles.buttonArrow}>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}