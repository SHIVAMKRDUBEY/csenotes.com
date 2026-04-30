import styles from "./ContactUs.module.css";
import Script from "next/script";

export const metadata = {
  title: "Contact Us - CSE Notes | Get in Touch",
  description:
    "Contact CSE Notes for queries, feedback, or support. Reach out to us for engineering notes, interview preparation, and study materials.",
};

//import Contact from "../components/info/contact/contact";

// export default function ContactPage() {
//   return <Contact />;
// }

export default async function ContactPage() {
  return (
    <div className={styles.contactContainer}>
      <h1>Contact CSENOTES</h1>
      <div className={styles.contactContent}>
        {/* Side Info Box */}
        <div className={styles.contactInfoBox}>
          <h2>Why Contact Us?</h2>
          <p>You can contact us for various purposes:</p>
          <ul>
            <li>💡 Questions or feedback about our content</li>
            <li>🖥️ Website development or portfolio inquiries</li>
            <li>📢 Advertisement, sponsorships, or partnerships</li>
          </ul>
          <p>Please fill out the form and we will respond as soon as possible.</p>
          <p>
            Need to get in touch with us? No problem! We’re always here to help.
            Just send us a message anytime, and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <form
          className={styles.contactForm}
          method="POST"
          action="/contact"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Your Mobile Number"
            required
          />
          <textarea
            name="message"
            placeholder="Type your message here..."
            rows={6}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Other Contact Details */}
      <section className={styles.contactExtra}>
        <h2>Other Ways to Contact Us</h2>
        <p>Email: <strong>saurabhmeh968@gmail.com</strong></p>
        <p>Phone: <strong>+91-9424687328</strong></p>
        <p>
          You can also reach out via our{" "}
        
          <a href="https://saurabh-mehta0177.github.io/Saurabh-portfolio/">
  website/portfolio
</a>
          {" "}
          for business or development inquiries.
        </p>
      </section>
      <Script id="contact-structured-data" type="application/ld+json" strategy="afterInteractive">
{`
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact CSENOTES",
    "url": "https://csenotes.com/contact",
    "description": "Reach out to CSENOTES for feedback, questions, or partnerships via contact form, email, or phone."
  }
`}
</Script>
    </div>
  );
}
