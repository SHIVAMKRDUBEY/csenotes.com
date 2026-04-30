// import Link from "next/link";
// import API_BASE_URL from "@/app/config";
// import styles from "./companyround.module.css";

// // SSR fetch
// async function getRounds(companyId) {
//   try {
//     const res = await fetch(`${API_BASE_URL}/api/company-txt/company/${companyId}/rounds`, {
//       cache: "no-store",
//     });

//     if (!res.ok) return []; // agar API fail ho, empty array return karo

//     const data = await res.json();
//     return data || [];
//   } catch (err) {
//     console.error("Error fetching rounds:", err);
//     return [];
//   }
// }

// export default async function CompanyRound({ companyId }) {
//   if (!companyId) {
//     return <p className={styles["round-error"]}>Error: companyId is missing</p>;
//   }

//   const rounds = await getRounds(companyId);

//   // Always render fallback if empty
//   if (!rounds.length) {
//     return (
//       <div className={styles["round-page-wrapper"]}>
//         <div className={styles["round-container"]}>
//           <div className={styles["round-header"]}>
//             <Link href="/company" className={styles["back-button"]}>
//               ← Back
//             </Link>
//             <h1 className={styles["round-title"]}>📝 Rounds</h1>
//           </div>
//           <p className={styles["round-loading"]}>
//             No rounds found for this company.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles["round-page-wrapper"]}>
//       <div className={styles["round-container"]}>
//         <div className={styles["round-header"]}>
//           <Link href="/company" className={styles["back-button"]}>
//             ← Back
//           </Link>
//           <h1 className={styles["round-title"]}>
//             📝 Rounds
//             <span className={styles["round-count"]}>({rounds.length})</span>
//           </h1>
//           <p className={styles["round-note"]}>
//     ⚠️ Note: These questions are taken from real interview rounds. 
//     The answers provided are based on our understanding and approach. 
//     You are free to answer them in your own way based on your knowledge and perspective.
//   </p>
//         </div>

//         <div className={styles["round-grid"]}>
//           {rounds.map((round) => (
//             <Link
//               key={round.id}
//               href={`/company/${companyId}/round/${round.id}/view`}
          
//               className={styles["round-card"]}
//             >
//               <div className={styles["round-content"]}>
//                 <h3 className={styles["round-name"]}>
//                   {round.name || round.roundName}
//                 </h3>
//                 <div className={styles["round-footer"]}>
//                   <span className={styles["round-action"]}>
//                     Click to view questions →
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





// CompanyRound.js
import Link from "next/link";
import API_BASE_URL from "@/app/config";
import styles from "./companyround.module.css";

async function getRounds(companyId) {
  if (!companyId) return [];

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/company-txt/company/${companyId}/rounds`,
      {
        next: { revalidate: 3600 },   // Better for SEO & performance
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch rounds for company ${companyId}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching rounds:", err);
    return [];
  }
}

export default async function CompanyRound({ companyId }) {
  if (!companyId) {
    return (
      <div className={styles["round-page-wrapper"]}>
        <p className={styles["round-error"]}>Error: Company ID is missing.</p>
      </div>
    );
  }

  const rounds = await getRounds(companyId);

  return (
    <div className={styles["round-page-wrapper"]}>
      <div className={styles["round-container"]}>
        <div className={styles["round-header"]}>
          <Link href="/company" className={styles["back-button"]}>
            ← Back to Companies
          </Link>

          <h1 className={styles["round-title"]}>
            📝 Interview Rounds
            {rounds.length > 0 && (
              <span className={styles["round-count"]}> ({rounds.length})</span>
            )}
          </h1>

          <p className={styles["round-note"]}>
            These are real interview questions asked in previous rounds of this company. 
            Use them to understand patterns and prepare effectively.
          </p>
        </div>

        {rounds.length === 0 ? (
          <div className={styles["round-empty"]}>
            <p>No interview rounds found for this company at the moment.</p>
            <p className={styles["round-empty-sub"]}>
              Please check back later or explore other companies.
            </p>
          </div>
        ) : (
          <div className={styles["round-grid"]}>
            {rounds.map((round, index) => (
              <Link
                key={round.id || index}
                href={`/company/${companyId}/round/${round.id}/view`}
                className={styles["round-card"]}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles["round-content"]}>
                  <h3 className={styles["round-name"]}>
                    {round.name || round.roundName || "Interview Round"}
                  </h3>
                  <div className={styles["round-footer"]}>
                    <span className={styles["round-action"]}>
                      View Questions →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

