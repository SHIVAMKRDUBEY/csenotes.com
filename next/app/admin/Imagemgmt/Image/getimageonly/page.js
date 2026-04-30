"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/config";

export default function AllSubjectImagesPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/subjectsimage/images-only`);
      if (!res.ok) throw new Error("Failed to fetch images");

      const data = await res.json();
    //  console.log("Fetched data:", data);  // ✅ Add this

      if (!data || data.length === 0) {
        setMessage("⚠️ No subject images available");
        setImages([]);
      } else {
        // Map objects to full info for display
        const mappedImages = data.map((img, index) => ({
          ...img,
          id: img.id || index,
        }));
        setImages(mappedImages);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setMessage("❌ Unable to load images");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, imgId) => {
    navigator.clipboard.writeText(`${API_BASE_URL}${text}`)
      .then(() => {
        setCopied(imgId);
        setTimeout(() => setCopied(null), 1500);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const styles = {
    page: { maxWidth: "1600px", margin: "0 auto", padding: "2rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    title: { textAlign: "center", fontSize: "2rem", marginBottom: "2rem", color: "#333" },
    imageGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" },
    imageCard: { background: "#f9f9f9", borderRadius: "8px", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", boxShadow: "0 1px 5px rgba(0,0,0,0.1)" },
    imgWrapper: { position: "relative", width: "100%" },
    image: { width: "100%", height: "150px", objectFit: "cover", borderBottom: "1px solid #ddd" },
    overlay: { position: "absolute", bottom: "5px", right: "5px" },
    copyBtn: { background: "rgba(0, 123, 255, 0.9)", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer" },
    imgText: { fontSize: "0.75rem", padding: "0.3rem", textAlign: "center", color: "#333" },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📂 All Subject Images</h1>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {message && <p style={{ textAlign: "center", color: "orange" }}>{message}</p>}

      {images.length > 0 && (
        <div style={styles.imageGrid}>
          {images.map((img) => (
            <div key={img.id} style={styles.imageCard}>
              <div style={styles.imgWrapper}>
                <img src={`${API_BASE_URL}${img.imagePath}`} alt={`image-${img.id}`} style={styles.image} />
                <div style={styles.overlay}>
                  <button style={styles.copyBtn} onClick={() => copyToClipboard(img.imagePath, img.id)}>
                    {copied === img.id ? "✔ Copied" : "Copy URL"}
                  </button>
                </div>
              </div>
              {/* {img.text && <p style={styles.imgText}>{img.text}</p>} */}
              <p style={styles.imgText}>ID: {img.id} {img.text && `- ${img.text}`}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
