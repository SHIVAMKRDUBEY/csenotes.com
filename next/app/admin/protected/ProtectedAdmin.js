
"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedAdmin({ children }) {
  const { admin, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.replace("/login");
    }
  }, [admin, loading, router]);

  if (loading) return <p>Checking admin access...</p>;

  return admin ? children : null;
}

