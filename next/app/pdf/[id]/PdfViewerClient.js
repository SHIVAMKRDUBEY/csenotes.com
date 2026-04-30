"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./PdfViewer.module.css";

export default function PdfViewerClient({ id, current, page }) {
  const [open, setOpen] = useState(false);
  const router =  useRouter();

  const related = page.filter(
    (p) => p.type === current.type && p.id !== id
  );

  return (
    <div className={styles.container}>

      {/* BACK BUTTON */}
      <button
        className={styles.backBtn}
        onClick={() => router.push("/pdf")}
      >
        ⬅ Back
      </button>

      {/* PDF */}
      <div className={styles.pdfWrapper}>
        <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          className={styles.frame}
        />
        <div className={styles.blockTopRight}></div>
      </div>

      {/* SIDEBAR */}
      <div className={`${styles.right} ${open ? styles.rightOpen : ""}`}>
        <div className={styles.topRow}>
          <h3>
            {current.type === "notes"
              ? "📘 Notes"
              : "🧑‍💼 Interview PDFs"}
          </h3>

          <button onClick={() => router.push("/pdf")}>
            ⬅ Go Back
          </button>
        </div>

        <div className={styles.currentBox}>
          <h4>{current.title}</h4>
          <p>Type: {current.type}</p>
        </div>

        <div className={styles.list}>
          {related.map((item) => (
            <Link
              key={item.id}
              //href={`/pdf/${item.id}`}
              href={`/pdf/${item.slug}`}
              className={styles.card}
              onClick={() => setOpen(false)}
            >
              <h4>{item.title}</h4>
              <p>{item.type}</p>
            </Link>
          ))}
        </div>
      </div>

      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}