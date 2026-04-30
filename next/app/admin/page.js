"use client";

import { useState, useEffect } from "react";
//import { fetchWithToken } from "./utils/token";
import { fetchWithToken } from "./utils/token";
import API_BASE_URL from "@/app/config";
import styles from "./App.module.css";


export default function DashboardPage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchWithToken(`${API_BASE_URL}/admin/profile`);
        if (res.ok) {
          const data = await res.json();
             //console.log("Profile Data from Backend:", data); // 👈 yaha check karo
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.profileCard}>
<img
  src={
    profile.profileImage
      ? profile.profileImage.startsWith("http")
        ? profile.profileImage
        : `${API_BASE_URL}/api/${profile.profileImage}`
      : "https://www.w3schools.com/howto/img_avatar.png"
  }
  alt="Profile"
  className={styles.profileImage}
/>


  <h2 className={styles.profileTitle}>👤 Admin Profile</h2>

      <div className={styles.profileInfo}>
        <p><strong>Name</strong><span>{profile.name}</span></p>
        <p><strong>Email</strong><span>{profile.email}</span></p>
        <p><strong>Username</strong><span>{profile.username}</span></p>
        <p><strong>Role</strong><span>{profile.role}</span></p>

        {profile.department && (
          <p><strong>Department</strong><span>{profile.department}</span></p>
        )}

        {profile.phone && (
          <p><strong>Phone</strong><span>{profile.phone}</span></p>
        )}
      </div>
    </div>
  );
}
