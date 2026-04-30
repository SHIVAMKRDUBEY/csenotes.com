"use client";
import { AuthProvider } from "./admin/authcontext/AuthContext";

//import { AuthProvider } from "@/app/admin/authcontext/AuthContext";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
