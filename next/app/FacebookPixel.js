"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}