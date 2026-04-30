"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/config";

export default function GetAllImages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    //fetch("http://localhost:8086/api/subjectsimage")
      fetch(`${API_BASE_URL}/api/subjectsimage`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (text, imgId) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(imgId);
        setTimeout(() => setCopied(null), 1500);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "5rem", fontSize: "1.5rem" }}>Loading...</h2>;

  // Flatten all images with their ID info
  const allImages = data.flatMap(item =>
    item.images?.map(img => ({
      ...img,
      parentId: item.id,
      uploadType: item.uploadType,
      interviewSubject: item.interviewSubject,
      notesSubject: item.notesSubject,
      companyName: item.companyName,
    })) || []
  );

  const styles = {
    page: {
      padding: "2rem",
      maxWidth: "1600px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "2.2rem",
      marginBottom: "2rem",
      color: "#333",
    },
    imageGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)", // 5 images per row
      gap: "1rem",
    },
    imageCard: {
      background: "#f9f9f9",
      borderRadius: "8px",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
    },
    imgWrapper: { position: "relative", width: "100%", flexGrow: 1 },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      display: "block",
      borderBottom: "1px solid #ddd",
    },
    overlay: { position: "absolute", bottom: "5px", right: "5px" },
    copyBtn: {
      background: "rgba(0, 123, 255, 0.9)",
      color: "#fff",
      border: "none",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "0.8rem",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    imgText: {
      fontSize: "0.75rem",
      padding: "0.3rem",
      textAlign: "center",
      color: "#333",
    },
    imgInfo: {
      fontSize: "0.65rem",
      textAlign: "center",
      color: "#555",
      marginBottom: "2px",
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📂 All Subject Images</h1>

      <div style={styles.imageGrid}>
        {allImages.map((img) => (
          <div key={img.id} style={styles.imageCard}>
            <div style={styles.imgWrapper}>
              {/* <img
                src={`http://localhost:8086${img.imagePath}`}
                alt={img.imageName}
                style={styles.image}
              /> */}
              <img
  src={`${API_BASE_URL}${img.imagePath}`}
  alt={img.imageName}
  style={styles.image}
/>
              <div style={styles.overlay}>
                <button
                  style={styles.copyBtn}
                  //onClick={() => copyToClipboard(`http://localhost:8086${img.imagePath}`, img.id)}
                  onClick={() => copyToClipboard(`${API_BASE_URL}${img.imagePath}`, img.id)}
                >
                  {copied === img.id ? "✔ Copied" : "Copy URL"}
                </button>
              </div>
            </div>
            <p style={styles.imgText}>{img.text}</p>
            <p style={styles.imgInfo}>ID: {img.parentId} | {img.uploadType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
