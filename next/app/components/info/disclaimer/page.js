import React from "react";
import styles from "./Disclaimer.module.css";
import Script from "next/script";

// ✅ Metadata for SEO
export const metadata = {
  title: "Disclaimer – CSENOTES",
  description:
    "Read the Disclaimer for CSENOTES. All content is for educational purposes. Learn about content accuracy, liability, external links, and acceptance.",
  keywords: [
    "CSENOTES Disclaimer",
    "Educational content",
    "Content accuracy",
    "Liability",
    "External links",
  ],
  alternates: {
    canonical: "https://csenotes.com/disclaimer",
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
    title: "Disclaimer – CSENOTES",
    description:
      "Read the Disclaimer for CSENOTES. All content is for educational purposes. Learn about content accuracy, liability, external links, and acceptance.",
    url: "https://csenotes.com/disclaimer",
    siteName: "CSENOTES",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer – CSENOTES",
    description:
      "All content on CSENOTES is for educational purposes only. Read our disclaimer for more information.",
  },
};

export default function Disclaimer() {
  return (
    <div className={styles.disclaimerContainer}>
      {/* ✅ Structured Data */}
      <Script
        id="disclaimer-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Disclaimer – CSENOTES",
          "url": "https://csenotes.com/disclaimer",
          "description": "All content on CSENOTES is for educational purposes only. Learn about content accuracy, liability, external links, and acceptance."
        }
        `}
      </Script>

      {/* Page Header */}
      <header className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Disclaimer – CSENOTES</h1>
        <p>
          All content on CSENOTES is provided for{" "}
          <strong>educational and informational purposes</strong> only. 
          While we strive to offer accurate, up-to-date, and helpful resources, 
          we do not guarantee the completeness or correctness of any materials.
        </p>
      </header>

      {/* Content Sections */}
      <section className={styles.section}>
        <h2>📌 Content Accuracy</h2>
        <p>
          We make every effort to ensure that our notes, interview guides, and previous year question papers are accurate and current. 
          However, the usefulness or results from using these materials cannot be guaranteed.
        </p>
      </section>

      <section className={styles.section}>
        <h2>⚠️ Liability</h2>
        <p>
          CSENOTES is not responsible for any direct or indirect losses, damages, or consequences arising from the use of the website or its resources. 
          Users are advised to apply their own judgment and verify information independently.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🔗 External Links</h2>
        <p>
          Our website may include links to third-party websites for convenience. 
          These links do not imply endorsement, and CSENOTES is not responsible for the content, accuracy, or policies of external sites.
        </p>
      </section>

      <section className={styles.section}>
        <h2>✅ Acceptance</h2>
        <p>
          By using CSENOTES, you agree to this disclaimer and acknowledge that all content is provided at your own risk. 
          Users should utilize the information responsibly.
        </p>
      </section>

      {/* Extra SEO-friendly paragraph */}
      <section className={styles.extraInfo}>
        <h2>Why This Disclaimer Matters</h2>
        <p>
          This disclaimer helps users understand the purpose of CSENOTES content, ensures transparency regarding the accuracy of our materials, 
          and clarifies liability. It is important to read and acknowledge this information before relying on our study materials.
        </p>
      </section>
    </div>
  );
}