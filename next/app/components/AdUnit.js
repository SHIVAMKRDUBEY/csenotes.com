"use client";

import { useEffect, useRef, useState } from "react";

export default function AdUnit({ slot, height = 250, onAdVisible }) {
  const adRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!adRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      const timer = setTimeout(() => {
        if (adRef.current && adRef.current.innerHTML.trim() !== "") {
          setIsVisible(true);
          if (onAdVisible) onAdVisible(true);
        }
      }, 1500);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Adsense error:", err);
    }
  }, [slot, onAdVisible]);

  if (!isVisible) return null;

  return (
    <div style={{ minHeight: height, margin: "20px 0" }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-33820882706"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
