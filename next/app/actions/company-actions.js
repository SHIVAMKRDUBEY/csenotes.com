// app/actions/company-actions.js
"use server";

import { unstable_cache } from "next/cache";
import API_BASE_URL from "@/app/config";

// Cache data for 5 minutes
const CACHE_DURATION = 300;

export async function getAllCompanies() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/company-txt/companies`, {
      next: { revalidate: CACHE_DURATION }
    });
    if (!res.ok) throw new Error("Failed to fetch companies");
    return await res.json();
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

export async function getCompanyQuestions(companyId, roundId) {
  if (!companyId || !roundId) return [];
  
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/company-txt/company/${companyId}/round/${roundId}/questions`,
      {
        next: { revalidate: CACHE_DURATION }
      }
    );
    if (!res.ok) throw new Error("Failed to fetch questions");
    return await res.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export async function getCompanyData(companyId) {
  if (!companyId) return null;
  
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/company-txt/company/${companyId}`,
      {
        next: { revalidate: CACHE_DURATION }
      }
    );
    if (!res.ok) throw new Error("Failed to fetch company data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching company data:", error);
    return null;
  }
}