import React from "react";
import styles from "./AboutUs.module.css";
import Script from "next/script";

// ✅ Metadata for Next.js
export const metadata = {
  title: "About CSENOTES – Engineering Notes & Placement Prep",
  description:
    "Learn about CSENOTES, an educational platform providing high-quality engineering notes, placement preparation, coding resources, and previous year question papers for CSE and IT students.",
  keywords: [
    "CSENOTES",
    "Engineering Notes",
    "Placement Preparation",
    "CSE Study Material",
    "IT Notes",
    "Previous Year Questions",
  ],
  alternates: {
    canonical: "https://csenotes.com/about",
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
    title: "About CSENOTES – Engineering Notes & Placement Prep",
    description:
      "CSENOTES provides high-quality study materials, placement prep, and coding resources for engineering students.",
    url: "https://csenotes.com/about",
    siteName: "CSENOTES",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About CSENOTES – Engineering Notes & Placement Prep",
    description:
      "Learn more about CSENOTES: Engineering notes, PYQs, placement prep, and coding resources.",
  },
};

export default function AboutUs() {
  return (
    <div className={styles.aboutContainer}>
      {/* ✅ Structured Data for SEO */}
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About CSENOTES",
          "url": "https://csenotes.com/about",
          "description": "CSENOTES is an educational platform providing high-quality engineering notes, placement preparation materials, coding resources, and previous year question papers for CSE and IT students."
        }
        `}
      </Script>

      {/* Page Header */}
      <header className={styles.headerSection}>
        <h1 className={styles.mainTitle}>
          About CSENOTES – Engineering Notes & Placement Preparation
        </h1>
        <p className={styles.intro}>
          CSENOTES is an educational platform designed specifically for engineering students. 
          Our goal is to provide **high-quality notes, subject summaries, interview preparation materials**, 
          and **previous year question papers**. We understand how crucial the right resources are 
          for exams and placements, which is why all materials on CSENOTES are well-organized and reliable.
        </p>
      </header>

      {/* Our Mission */}
      <section className={styles.mission}>
        <h2>🎯 Our Mission</h2>
        <p>
          Our mission is to make education simple, accessible, and effective for engineering students. 
          We aim to help every student **achieve academic success** and **secure their dream job** with ease.
        </p>
      </section>

      {/* Services */}
      <section className={styles.services}>
        <h2>💡 What We Offer</h2>
        <ul>
          <li>📚 Engineering Notes (CSE and IT)</li>
          <li>📝 Placement & Campus Interview Preparation</li>
          <li>📄 Previous Year Question Papers & Practice Questions</li>
          <li>💻 Coding and Technical Resources</li>
          <li>🗝️ Short Summaries & Key Concept Notes</li>
        </ul>
      </section>

      {/* Priorities */}
      <section className={styles.priorities}>
        <h2>⭐ Our Priorities</h2>
        <ul>
          <li>High-quality and accurate content</li>
          <li>Free and easy access for students</li>
          <li>Supporting students’ academic and career success</li>
        </ul>
      </section>

      {/* Connect Section */}
      <section className={styles.connect}>
        <h2>🤝 Connect With Us</h2>
        <p>
          If you have suggestions, questions, or feedback, you can reach out to us via our 
          <a href="/contact"> Contact Page</a>. We are always ready to help students succeed.
        </p>
      </section>

      {/* Extra SEO-friendly Content */}
      <section className={styles.extraInfo}>
        <h2>Why Choose CSENOTES?</h2>
        <p>
          CSENOTES provides structured, concise, and **up-to-date study materials** for engineering students. 
          Our platform is trusted by thousands of students for **efficient learning, exam preparation, and placement readiness**.
        </p>
        <p>
          We focus on **practical learning** and real-world examples to ensure students not only memorize content but also **understand concepts deeply**.
        </p>
      </section>

      <section className={styles.extraInfo}>
        <h2>Join Thousands of Learners</h2>
        <p>
          Whether you are preparing for university exams, competitive exams, or campus placements, CSENOTES provides **everything you need under one roof**. 
          Join our community and take your learning to the next level.
        </p>
      </section>
    </div>
  );
}