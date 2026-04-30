// "use client";

// import { useState } from "react";
// import { useAuth } from "@/app/admin/authcontext/AuthContext";
// import API_BASE_URL from "@/app/config";
// //import { clear } from "node:console";
// //const API_URL = "http://localhost:8086"; // Backend URL

// export default function CreateNotePage() {
//   const { admin, loading } = useAuth(); // Admin और token context से
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [message, setMessage] = useState("");

//   if (loading) return <p>Loading...</p>;

//   if (!admin) return <p>आपको admin login होना जरूरी है।</p>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     // Token check
//     const token = admin.token || localStorage.getItem("accessToken");
//     if (!token) {
//       setMessage("आप logged in नहीं हैं!");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/txtnotes`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title, content, imageUrl }),
//       });

//       let data = null;
//       try {
//         data = await res.json();
//       } catch (_) {}

//       if (!res.ok) throw new Error(data?.message || "Note create failed");

//       setMessage("✅ Note सफलतापूर्वक बनाया गया!");
//       setTitle("");
//       setContent("");
//       setImageUrl("");
//      // console.log("Created note:", data);
//     } catch (err) {
//       console.error("Create note error:", err);
//       setMessage(err.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "0 auto",
//         padding: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "10px",
//       }}
//     >
//       <h2>Create a Note</h2>
//       {message && (
//         <p style={{ color: message.includes("सफल") ? "green" : "red" }}>
//           {message}
//         </p>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             style={{ width: "100%", padding: "5px" }}
//           />
//         </div>

//         <div style={{ marginBottom: "10px" }}>
//           <label>Content:</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//             style={{ width: "100%", padding: "5px" }}
//           />
//         </div>

//         <div style={{ marginBottom: "10px" }}>
//           <label>Image URL (optional):</label>
//           <input
//             type="text"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             style={{ width: "100%", padding: "5px" }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{ padding: "10px 20px", cursor: "pointer" }}
//         >
//           Create Note
//         </button>
//       </form>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//import { clear } from "node:console";
//const API_URL = "http://localhost:8086"; // Backend URL

export default function CreateNotePage() {
  const { admin, loading } = useAuth(); // Admin और token context से
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  if (loading) return <p>Loading...</p>;

  if (!admin) return <p>आपको admin login होना जरूरी है।</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Token check
    const token = admin.token || localStorage.getItem("accessToken");
    if (!token) {
      setMessage("आप logged in नहीं हैं!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/txtnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok) throw new Error(data?.message || "Note create failed");

      setMessage("✅ Note सफलतापूर्वक बनाया गया!");
      setTitle("");
      setContent("");
      setImageUrl("");
     // console.log("Created note:", data);
    } catch (err) {
      console.error("Create note error:", err);
      setMessage(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Create a Note</h2>
      {message && (
        <p style={{ color: message.includes("सफल") ? "green" : "red" }}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Create Note
        </button>
      </form>
    </div>
  );
}
