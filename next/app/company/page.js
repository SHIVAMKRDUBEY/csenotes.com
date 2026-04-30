import CompanyList from "@/app/components/company/companylist/companylist";

export default function Page() {
  return <CompanyList />;
}

// ✅ Static SEO for Company List Page
export const metadata = {
  title: "Companies | CSE Notes",
  description: "Explore all companies and their rounds. Prepare for interviews with detailed company information.",
  keywords: ["Companies", "CSE Notes", "Interview Preparation", "Rounds"],
  openGraph: {
    title: "Companies | CSE Notes",
    description: "Explore all companies and their rounds. Prepare for interviews with detailed company information.",
    url: "https://csenotes.com/company",
    siteName: "CSE Notes",
    type: "website",
  },
  alternates: {
    canonical: "https://csenotes.com/company",
  },
};