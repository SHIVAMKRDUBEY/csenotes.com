
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

export default function NavbarStatic({ currentPath }) {
  const isActiveLink = (path) => currentPath === path;

  const links = [
    { href: "/notes", label: "📚 Notes" },
    { href: "/company", label: "🏢 Company PYQ" },
    { href: "/interview", label: "💼 Interview" },
    { href: "/pdf", label: "📄 PDF" },
   // { href: "/codingtxt", label: "💻 Coding" },
  ];

  return (
    <>
       <Link href="/" className={styles.logo}>
        csenotes
      </Link> 

      <div className={styles.linksContainer}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActiveLink(link.href) ? styles.active : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
