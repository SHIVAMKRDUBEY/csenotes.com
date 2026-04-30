
import Link from "next/link";
import API_BASE_URL from "@/app/config";
import styles from "./CompanyPreview.module.css";

const cleanLogoUrl = (url) => {
  if (!url) return null;
  const cleaned = url.replace(/^['"]+|['"]+$/g, "").trim();
  if (cleaned.startsWith("http")) return cleaned;
  return `${API_BASE_URL}${cleaned.startsWith("/") ? "" : "/"}${cleaned}`;
};

export default async function CompanyPage() {
  let companies = [];

  try {
    // const res = await fetch(`${API_BASE_URL}/api/company-txt/companies`, {
     const res = await fetch(`${API_BASE_URL}/api/company-txt/companies`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch companies");

    companies = await res.json();
  } catch (err) {
    console.error("Error fetching companies:", err);
    companies = [];
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
  <h2 className={styles.mainTitle}>
    <span className={styles.titleIcon}>🏢</span>
 Top Tech Companies Interview Questions & PYQs
  </h2>
<p className={styles.subtitle}>
  Get interview-ready with a comprehensive set of real questions asked by top-tier tech companies. 
  Understand each concept, practice problem-solving strategies, and gain the confidence to succeed in any technical interview scenario.
</p>
</div>


      <div className={styles.grid}>
        {companies.length > 0 ? (
          companies.map((company, index) => {
            const logoSrc = cleanLogoUrl(company.logo);

            return (
              <Link
                key={company.id || company.name}
                href={`/company/${company.id}/rounds`}
                className={styles.card}
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className={styles.cardInner}>
                  <div className={styles.logoContainer}>
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={`${company.name} logo`}
                        className={styles.companyLogo}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.placeholderLogo}>
                        {company.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div className={styles.logoOverlay} />
                  </div>

                  <div className={styles.cardText}>
                    <h3 className={styles.companyName}>{company.name || "Unknown Company"}</h3>
                
                    <span className={styles.viewLink}>See Questions →</span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className={styles.noCompanies}>
            No company data available right now...
          </p>
        )}
      </div>

      {companies.length > 0 && (
        <div className={styles.viewAllWrapper}>
          <Link href="/company" className={styles.viewAllButton}>
            <span className={styles.buttonIcon}>🔥</span>
            Explore All Companies
            <span className={styles.buttonArrow}>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}