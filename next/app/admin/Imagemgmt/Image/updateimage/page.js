"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";

export default function UpdateImagePage() {
  const { admin, loading: authLoading } = useAuth();

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    uploadType: "",
    companyName: "",
    interviewSubject: "",
    notesSubject: "",
    imageText: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // ✅ FETCH DATA BY ID (WITH TOKEN)
  const handleFetch = async () => {
    if (!id) return alert("Enter ID");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You are not logged in!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${API_BASE_URL}/api/subjectsimage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok) throw new Error(data?.message || "Data not found");

      setFormData({
        uploadType: data.uploadType || "",
        companyName: data.companyName || "",
        interviewSubject: data.interviewSubject || "",
        notesSubject: data.notesSubject || "",
        imageText: data.images?.[0]?.text || "",
      });

      if (data.images && data.images.length > 0) {
        setPreviewImage(
          `${API_BASE_URL}${data.images[0].imagePath.replace(/\\/g, "/")}`
        );
      } else {
        setPreviewImage(null);
      }

      setMessage("✅ Data Loaded Successfully");
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE DATA (WITH TOKEN)
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!id) return alert("Enter ID first");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You are not logged in!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const updateData = new FormData();
      updateData.append("uploadType", formData.uploadType);
      updateData.append("companyName", formData.companyName);
      updateData.append("interviewSubject", formData.interviewSubject);
      updateData.append("notesSubject", formData.notesSubject);
      updateData.append("imageText", formData.imageText);

      if (selectedFile) {
        updateData.append("image", selectedFile);
      }

      const res = await fetch(
        `${API_BASE_URL}/api/subjectsimage/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: updateData,
        }
      );

      let data = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok) throw new Error(data?.message || "Update failed");

      setMessage("✅ Updated Successfully");

      // refresh preview if new image uploaded
      if (selectedFile) {
        setPreviewImage(URL.createObjectURL(selectedFile));
      }

      setSelectedFile(null);
    } catch (err) {
      console.error("Update error:", err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <p>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Update Subject Image</h2>

      {message && (
        <p style={{ color: message.includes("Successfully") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {/* ID Input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="number"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleFetch}>Fetch Data</button>
      </div>

      {/* FORM */}
      {formData.uploadType && (
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div>
            <label>Upload Type:</label><br />
            <input
              type="text"
              value={formData.uploadType}
              onChange={(e) =>
                setFormData({ ...formData, uploadType: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Company Name:</label><br />
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Interview Subject:</label><br />
            <input
              type="text"
              value={formData.interviewSubject}
              onChange={(e) =>
                setFormData({ ...formData, interviewSubject: e.target.value })
              }
            />
          </div>

          <div>
            <label>Notes Subject:</label><br />
            <input
              type="text"
              value={formData.notesSubject}
              onChange={(e) =>
                setFormData({ ...formData, notesSubject: e.target.value })
              }
            />
          </div>

          <div>
            <label>Image Text:</label><br />
            <input
              type="text"
              value={formData.imageText}
              onChange={(e) =>
                setFormData({ ...formData, imageText: e.target.value })
              }
            />
          </div>

          <div>
            <label>New Image (Optional):</label><br />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>

          {previewImage && (
            <div style={{ marginTop: "10px" }}>
              <p>Current Image:</p>
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "200px", border: "1px solid #ccc" }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      )}
    </div>
  );
}
