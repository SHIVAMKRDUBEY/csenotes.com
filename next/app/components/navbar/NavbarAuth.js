"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
//import { useAuth } from "@/app/admin/authcontext/AuthContext";
import { useAuth } from "../../admin/authcontext/AuthContext";

import styles from "./navbar.module.css";

export default function NavbarAuth() {
  const { admin, logoutAdmin, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return null;

  if (!admin) {
    return (
      <Link href="/login" className={styles.login}>
        🔐 Login
      </Link>
    );
  }

  return (
    <div
      className={styles.profile}
      onMouseLeave={() => setDropdownOpen(false)}
    >
 <Image
  src={
    admin.profileImage
      ? admin.profileImage.startsWith("http")
        ? admin.profileImage
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${admin.profileImage}`
      : "/default-avatar.png"
  }
  alt={`${admin.name} Profile`}
  width={40}
  height={40}
  className={styles.profilePic}
  onMouseEnter={() => setDropdownOpen(true)}
/>
      <div className={styles.adminName}>{admin.name}</div>

      {dropdownOpen && (
        <div className={styles.dropdownMenu} role="menu">
          <ul>
            <li>
              <Link href="/admin" role="menuitem">
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/update-profile" role="menuitem">
                👤 Update Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutAdmin}
                className={styles.logout}
                role="menuitem"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
