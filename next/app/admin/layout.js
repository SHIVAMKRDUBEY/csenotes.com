
"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminDashboard.module.css";
import { AuthProvider, AuthContext } from "./authcontext/AuthContext";
import ProtectedAdmin from "./protected/ProtectedAdmin";

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}

// Separate component to avoid nesting issues
function AdminLayoutContent({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logoutAdmin } = useContext(AuthContext);


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const isActiveRoute = (path) => pathname === path;

  return (
    <ProtectedAdmin>
      {/* Mobile Menu Toggle */}
      <button
        className={`${styles.menuToggle} ${isSidebarOpen ? styles.active : ""}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.active : ""}`}
        onClick={closeSidebar}
      ></div>

      <div className={styles.dashboard}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}>
          <div className={styles.profileName}>Admin</div>

          <ul className={styles.navMenu}>
            <li>
              <Link href="/admin" className={isActiveRoute("/admin") ? styles.active : ""} onClick={closeSidebar}>
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/update-profile" className={isActiveRoute("/admin/update-profile") ? styles.active : ""} onClick={closeSidebar}>
                👤 Update Profile
              </Link>
            </li>
            <li>
              <Link href="/admin/companymgmt" className={isActiveRoute("/admin/companymgmt") ? styles.active : ""} onClick={closeSidebar}>
                🏢 Company Management
              </Link>
            </li>
            <li>
              <Link href="/admin/Notesmgmt" className={isActiveRoute("/admin/Notesmgmt") ? styles.active : ""} onClick={closeSidebar}>
                📚 Notes Management
              </Link>
            </li>
            <li>
              <Link href="/admin/Interviewmgmt" className={isActiveRoute("/admin/Interviewmgmt") ? styles.active : ""} onClick={closeSidebar}>
                💼 Interview Management
              </Link>
            </li>
              <li>
              <Link href="/admin/Imagemgmt" className={isActiveRoute("/admin/Imagemgmt") ? styles.active : ""} onClick={closeSidebar}>
                🍔 Image Management
              </Link>
            </li>
            <li>
              <Link href="/admin/contentsmgmt" className={isActiveRoute("/admin/contentsmgmt") ? styles.active : ""} onClick={closeSidebar}>
                📢 Content Management
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
        </aside>

        {/* Main Content */}
        <main className={styles.content}>{children}</main>
      </div>
    </ProtectedAdmin>
  );
}
