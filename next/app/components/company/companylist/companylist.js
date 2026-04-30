// import Link from "next/link";
// import API_BASE_URL from "@/app/config";
// import styles from "./companylist.module.css";

// async function getCompanies() {
//   const res = await fetch(`${API_BASE_URL}/api/company-txt/companies`, {
//     cache: "no-store", // always fresh data (SSR)
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch companies");
//   }

//   return res.json();
// }

// export default async function CompanyList() {
//   let companies = [];

//   try {
//     companies = await getCompanies();
//   } catch (error) {
//     return <p className={styles["company-error"]}>Error loading companies</p>;
//   }

//   if (!companies.length) {
//     return <p className={styles["company-loading"]}>No companies found</p>;
//   }

//   return (
//     <div className={styles["company-page-wrapper"]}>
//       <div className={styles["company-container"]}>
//         <div className={styles["company-header"]}>
//           <h1 className={styles["company-title"]}>
//             🏢 Companies
//             <span className={styles["company-count"]}>
//               ({companies.length})
//             </span>
//           </h1>
//           <p className={styles["company-subtitle"]}>
//             Click a company to see rounds
//           </p>
//         </div>

//         <div className={styles["company-grid"]}>
//           {companies.map((company) => (
//             <Link
//               key={company.id}
//               href={`/company/${company.id}/rounds`}
//               className={styles["company-card"]}
//             >
//               <div className={styles["company-image-wrapper"]}>
              
//                 <img
//   src={company.logo || "https://via.placeholder.com/300x180/4A6572/FFFFFF?text=No+Logo"}
//   alt={company.name}
//   className={styles["company-image"]}
// />

//                 <div className={styles["company-overlay"]}>
//                   <span className={styles["view-text"]}>
//                     View Rounds →
//                   </span>
//                 </div>
//               </div>

//               <div className={styles["company-content"]}>
//                 <h3 className={styles["company-name"]}>
//                   {company.name}
//                 </h3>
//                 <div className={styles["company-footer"]}>
//                   <span className={styles["company-action"]}>
//                     Click to explore
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// CompanyList.js
import Link from "next/link";
import API_BASE_URL from "@/app/config";
import styles from "./companylist.module.css";

async function getCompanies() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/company-txt/companies`, {
      next: { revalidate: 3600 },   // ISR - Better for SEO than no-store
    });

    if (!res.ok) {
      throw new Error("Failed to fetch companies");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

export default async function CompanyList() {
  const companies = await getCompanies();

  // Error / Empty State
  if (!companies || companies.length === 0) {
    return (
      <div className={styles["company-page-wrapper"]}>
        <div className={styles["company-container"]}>
          <p className={styles["company-error"]}>
            No companies available right now. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["company-page-wrapper"]}>
      <div className={styles["company-container"]}>
        <div className={styles["company-header"]}>
          <h1 className={styles["company-title"]}>
            🏢 Top Tech Companies Interview Questions &amp; PYQs
            <span className={styles["company-count"]}>
              ({companies.length})
            </span>
          </h1>
          
          <p className={styles["company-subtitle"]}>
            Real interview questions asked in top companies. Click on any company to see 
            previous rounds, patterns, and frequently asked questions.
          </p>
        </div>

        <div className={styles["company-grid"]}>
          {companies.map((company, index) => (
            <Link
              key={company.id || company.name}
              href={`/company/${company.id}/rounds`}
              className={styles["company-card"]}
              style={{ animationDelay: `${index * 0.05}s` }}   // Optional smooth animation
            >
              <div className={styles["company-image-wrapper"]}>
                <img
                  src={
                    company.logo 
                      ? company.logo 
                      : "https://via.placeholder.com/300x180/4A6572/FFFFFF?text=No+Logo"
                  }
                  alt={`${company.name} Interview Questions and Rounds`}
                  className={styles["company-image"]}
                  loading="lazy"
                />

                <div className={styles["company-overlay"]}>
                  <span className={styles["view-text"]}>
                    View Rounds →
                  </span>
                </div>
              </div>

              <div className={styles["company-content"]}>
                <h3 className={styles["company-name"]}>
                  {company.name}
                </h3>
                <div className={styles["company-footer"]}>
                  <span className={styles["company-action"]}>
                    Explore Interview Questions
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
