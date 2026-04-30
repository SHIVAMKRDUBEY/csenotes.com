
// import CompanyTxtView from "@/app/components/company/companyview/companyview";

// /* ✅ Dynamic SEO */
// export async function generateMetadata({ params: paramsPromise }) {
//   const params = await paramsPromise;
//   const { companyId, roundId } = params;

//   try {
//     // Server-side fetch for round details
//     const round = await getCompanyRound(companyId, roundId); 
//     const companyName = round?.companyName || `Company ${companyId}`;
//     const roundName = round?.name || `Round ${roundId}`;

//     return {
//       title: `${companyName} - ${roundName} | CSE Notes`,
//       description: `View questions and answers for ${roundName} of ${companyName}`,
//       keywords: ["CSE Notes", "Company Rounds", companyName, roundName],
//       alternates: {
//         canonical: `https://csenotes.com/company/${companyId}/round/${roundId}/view`,
//       },
//       openGraph: {
//         title: `${companyName} - ${roundName} | CSE Notes`,
//         description: `View questions and answers for ${roundName} of ${companyName}`,
//         url: `https://csenotes.com/company/${companyId}/round/${roundId}/view`,
//         siteName: "CSE Notes",
//         type: "article",
//       },
//     };
//   } catch (err) {
//     return {
//       title: "CSE Notes - Company Round",
//       description: "Company rounds and interview questions",
//     };
//   }
// }
// export default async function Page({ params, searchParams }) {
//   const questionId = searchParams?.questionId || null;

//   return (
//     <CompanyTxtView
//       params={params}
//       questionId={questionId}
//     />
//   );
// }


import CompanyTxtView from "@/app/components/company/companyview/companyview";
import API_BASE_URL from "@/app/config";

/* ✅ Dynamic SEO */
export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { companyId, roundId } = params;

  try {
    const round = await getCompanyRound(companyId, roundId);

    const companyName = round?.companyName || `Company ${companyId}`;
    const roundName = round?.name || `Round ${roundId}`;

    return {
      title: `${companyName} - ${roundName} | CSE Notes`,
      description: `View questions and answers for ${roundName} of ${companyName}`,
      openGraph: {
        title: `${companyName} - ${roundName}`,
        description: `Interview preparation content`,
      },
    };
  } catch (err) {
    return {
      title: "Company Round | CSE Notes",
    };
  }
}

export default async function Page({ params, searchParams }) {
  const { companyId, roundId } = await params;
  const questionId = searchParams?.questionId || null;

  // ✅ FETCH REAL DATA FOR H1
  let companyName = `Company ${companyId}`;
  let roundName = `Round ${roundId}`;

  try {
    const round = await getCompanyRound(companyId, roundId);

    companyName = round?.companyName || companyName;
    roundName = round?.name || roundName;
  } catch (err) {
    console.log("H1 fetch error:", err);
  }

  return (
    <main>
      {/* ✅ REAL SEO H1 */}
      <h1>
        {companyName} - {roundName}
      </h1>

      <CompanyTxtView params={{ companyId, roundId }} questionId={questionId} />
    </main>
  );
}