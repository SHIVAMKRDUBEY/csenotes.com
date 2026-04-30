
// app/components/navbar/Navbar.js
import NavbarStatic from "./NavbarStatic";
import NavbarAuth from "./NavbarAuth";
import styles from "./navbar.module.css";

export default function Navbar({ currentPath }) {
  const isActiveLink = (path) => currentPath === path;

  return (
    <nav className={styles.navbar} aria-label="Main Navigation">
      <div className={styles.topRow}>
        {/* Logo + Static Links */}
        <NavbarStatic currentPath={currentPath} />

        {/* Auth: Login/Profile */}
        <NavbarAuth />
      </div>

      {/* Mobile Links */}
      <ul className={styles.mobileLinks} aria-label="Mobile Navigation">
        {[
          { href: "/notes", label: "📚 Notes" },
          { href: "/interview", label: "💼 Interview" },
          { href: "/pdf", label: "📄 PDF" },
         // { href: "/codingtxt", label: "💻 Coding" },
        ].map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={isActiveLink(link.href) ? styles.active : ""}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
