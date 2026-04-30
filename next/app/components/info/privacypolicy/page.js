import React from "react";
import styles from "./PrivacyPolicy.module.css";
import Script from "next/script";

// ✅ Metadata for SEO
export const metadata = {
  title: "Privacy Policy – CSENOTES",
  description:
    "Read the Privacy Policy of CSENOTES. We do not collect personal data. Learn about information usage, cookies, third-party services, data security, and transparency.",
  keywords: [
    "CSENOTES Privacy Policy",
    "Data privacy",
    "User information",
    "Cookies",
    "Data security",
  ],
  alternates: {
    canonical: "https://csenotes.com/privacypolicy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Privacy Policy – CSENOTES",
    description:
      "Learn about CSENOTES Privacy Policy. No personal data is collected. Safe and anonymous access for all users.",
    url: "https://csenotes.com/privacypolicy",
    siteName: "CSENOTES",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy – CSENOTES",
    description:
      "CSENOTES Privacy Policy: No personal data collected, anonymous and safe learning environment for everyone.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyContainer}>
      {/* ✅ Structured Data */}
      <Script
        id="privacy-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy – CSENOTES",
          "url": "https://csenotes.com/privacypolicy",
          "description": "CSENOTES does not collect personal data. Learn about information usage, cookies, third-party services, data security, and transparency."
        }
        `}
      </Script>

      {/* Page Header */}
      <header className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Privacy Policy – CSENOTES</h1>
        <p>
          CSENOTES respects your privacy and is committed to providing a safe and open learning environment. 
          This Privacy Policy explains how we handle user information. CSENOTES <strong>does not collect any personal data</strong>, 
          and all resources are freely accessible to everyone.
        </p>
      </header>

      {/* Content Sections */}
      <section className={styles.section}>
        <h2>📝 Information Collection</h2>
        <p>
          We do not require users to submit personal information such as names, emails, or contact details to access our content. 
          All notes, resources, and practice materials are available for free without registration.
        </p>
      </section>

      <section className={styles.section}>
        <h2>💡 Use of Information</h2>
        <p>
          Since we do not collect any personal data, there is no user information stored or used in any way. 
          You can freely browse and use all CSENOTES content without sharing your details.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🍪 Cookies and Tracking</h2>
        <p>
          CSENOTES does not use cookies to track users or store personal information. 
          Our platform is designed for anonymous, secure, and private access.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🔗 Third-Party Services</h2>
        <p>
          Some external links may be present for reference or convenience. 
          CSENOTES is not responsible for the privacy practices of these third-party websites. 
          Please review their policies independently if you choose to visit them.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🔒 Data Security</h2>
        <p>
          Since we do not collect personal data, there is no risk of personal information being compromised. 
          All users can safely access content without any registration or login requirements.
        </p>
      </section>

      <section className={styles.section}>
        <h2>⚖️ Changes to This Policy</h2>
        <p>
          CSENOTES may update this Privacy Policy to reflect improvements to the platform or legal requirements. 
          Any changes will be updated on this page with the latest date.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🔍 Access and Transparency</h2>
        <p>
          Users can freely access all CSENOTES content without providing any personal information. 
          We are committed to transparency, simplicity, and a safe learning experience for everyone.
        </p>
      </section>

      {/* Extra SEO-friendly paragraph */}
      <section className={styles.extraInfo}>
        <h2>Why Privacy Matters</h2>
        <p>
          At CSENOTES, protecting user privacy is a top priority. This policy ensures users understand that they can access learning resources safely and without any tracking, 
          building trust and improving the learning experience.
        </p>
      </section>
    </div>
  );
}