import CompanyRound from "@/app/components/company/companyround/companyround";
import API_BASE_URL from "@/app/config";

// Server component page
export default async function Page({ params }) {
  const resolvedParams = await params; // unwrap promise
  const { companyId } = resolvedParams;

  return <CompanyRound companyId={companyId} />;
}

// ✅ Dynamic SEO
export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { companyId } = params;

  let companyName = "Company Rounds";

  try {
    const res = await fetch(`${API_BASE_URL}/api/company-txt/company/${companyId}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      companyName = data.name || companyName;
    }
  } catch (err) {
    console.error("Error fetching company for metadata:", err);
  }

  return {
    title: `${companyName} - Rounds | CSE Notes`,
    description: `Explore all rounds for ${companyName} including questions and details.`,
    keywords: [`${companyName}`, "Company Rounds", "CSE Notes"],
    openGraph: {
      title: `${companyName} - Rounds | CSE Notes`,
      description: `Explore all rounds for ${companyName} including questions and details.`,
      url: `https://csenotes.com/company/${companyId}/rounds`,
      siteName: "CSE Notes",
      type: "website",
    },
    alternates: {
      canonical: `https://csenotes.com/company/${companyId}/rounds`,
    },
  };
}
