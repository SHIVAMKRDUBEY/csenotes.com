"use client";

import { useState, useEffect } from "react";
import { fetchWithToken } from "../utils/token";
import API_BASE_URL from "@/app/config";

export default function UpdateProfileForm() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Fetch profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetchWithToken(
          `${API_BASE_URL}/admin/profile`
        );

        if (!res.ok) {
          setMessage("Failed to fetch profile");
          return;
        }

        const data = await res.json();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          profileImage: data.profileImage || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("Network error");
      }
    }

    fetchProfile();
  }, []);

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetchWithToken(
        `${API_BASE_URL}/admin/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
            profileImage: profile.profileImage,
          }),
        }
      );

      if (!res.ok) {
        setMessage("Failed to update profile");
        return;
      }
      const data = await res.json();
setMessage(data.message || "Profile updated successfully!");

    } catch (err) {
      console.error(err);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Update Profile</h2>
      {/* 🔹 Image Preview (optional) */}
      {profile.profileImage && (
        <img
          src={`${API_BASE_URL}/uploads/${profile.profileImage}`}
          alt="Profile"
          width={100}
          style={{ borderRadius: "50%", marginBottom: "10px" }}
        />
      )} 
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Profile Image (filename):</label>
          <input
            type="text"
            value={profile.profileImage}
            onChange={(e) =>
              setProfile({
                ...profile,
                profileImage: e.target.value,
              })
            }
            placeholder="newimage.png"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "20px", padding: "10px", width: "100%" }}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}