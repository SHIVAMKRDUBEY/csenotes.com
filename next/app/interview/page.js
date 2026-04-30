import InterviewTxtList from "@/app/components/Interview/interviewtxtlist/interviewtxtlist";

export const metadata = {
  title: "Technical Interview Questions & Pdf for CSE & IT Students | CSENOTES",
  description: "Prepare for campus placements with real technical interview questions on DSA, Java, Python, DBMS, OS, AWS, Docker, Microservices and more. Detailed answers and explanations.",
  keywords: ["interview questions", "technical interview", "CSE interview", "placement preparation", "DSA questions", "DBMS interview"],
  openGraph: {
    title: "Technical Interview Questions for CSE & IT | CSENOTES",
    description: "Real interview questions with answers for B.Tech CSE students. Crack your next placement interview.",
    url: "https://csenotes.com/interview",
    siteName: "CSENOTES",
    type: "website",
  },
  alternates: {
    canonical: "https://csenotes.com/interview",
  },
};

export default function InterviewTxtPage() {
  return <InterviewTxtList />;
}