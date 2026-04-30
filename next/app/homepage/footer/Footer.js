import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          {/* Brand - Top pe rahega */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>📚</span>
              <strong>csenotes</strong>
            </div>
            <p className={styles.desc}>
              {/* Your ultimate destination for study materials, interview prep, and career resources. */}
              Your complete platform for CSE notes, interview preparation, and company-wise placement questions.
            </p>
            <div className={styles.socials}>
              {/* <a href="https://csenotes.com" target="_blank" rel="noopener noreferrer">📘</a> */}
              <a href="https://twitter.com/SaurabhKum65740" target="_blank" rel="noopener noreferrer">🐦</a>
              <a href="https://saurabh-mehta0177.github.io/Saurabh-portfolio/" target="_blank" rel="noopener noreferrer">💼</a>
              {/* <a href="https://csenotes.com" target="_blank" rel="noopener noreferrer">📷</a> */}
              {/* <a href="https://saurabh-mehta0177.github.io/Saurabh-portfolio/" target="_blank" rel="noopener noreferrer"> 📢</a> */}
            </div>
          </div>
{/* Grid for top 3 columns */}
<div className={styles.grid}>
  <div>
    <h4>Resources</h4>
    <a href="/notes">Engineering Notes</a>
    <a href="/interview">Interview Questions</a>
    <a href="/company">Company PYQs</a>
    {/* <a href="/">Coding</a> */}
  </div>

  <div>
    <h4>Support</h4>
    <a href="/about">About</a>
    <a href="/disclaimer">Disclaimer</a>
    {/* <span className={styles.yellow}>FAQ</span>
    <span className={styles.yellow}>Feedback</span> */}
  </div>

  <div>
    <h4>Legal</h4>
    <a href="/privacypolicy">Privacy Policy</a>
    {/* <span className={styles.yellow}>Terms</span>
    <span className={styles.yellow}>Cookies</span>
    <span className={styles.yellow}>GDPR</span> */}
  </div>
</div>

{/* Separate row for Contact Info */}
<div className={styles.contactSectionMobile}>
  <h4>
    <a href="/contact" className={styles.contactLink}>
      Contact Info
    </a>
  </h4>
  <p>
    <span>📧</span>
    <span className={styles.email}>saurabhmeh968@gmail.com</span>
  </p>
  <p><span>☎️</span> +91-9424687328</p>
  <p><span>📍</span> India</p>
</div>
        </div>
        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p>© {currentYear} <b>csenotes</b>. Built with ❤️ for students.</p>
          <p>© 2026 csenotes.com. All rights reserved.</p>
          <div className={styles.badges}>
            <span>🚀 Fast</span>
            <span>🔒 Secure</span>
            <span>📱 Responsive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}