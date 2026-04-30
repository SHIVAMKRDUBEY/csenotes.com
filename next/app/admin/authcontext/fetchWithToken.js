import API_BASE_URL from "@/app/config";

export async function fetchWithToken(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      const refreshRes = await fetch(`${API_BASE_URL}/admin/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
  // console.log("Refresh Status:", refreshRes.status); // 👈 YAHAN BHI
      if (!refreshRes.ok) throw new Error("Refresh failed");

      const refreshData = await refreshRes.json();
      localStorage.setItem("accessToken", refreshData.accessToken);

      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${refreshData.accessToken}`,
        },
      });
    //  console.log("API Status (first call):", res.status); // 👈 YAHAN LAGAO

    } 
    catch (err) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

  }

  return res;
}
