// import Navbar from "./components/navbar/navbar";
// import Footer from "./homepage/footer/Footer";
// import Providers from "./Providers";
// import AdUnit from "@/app/components/AdUnit";
// import Script from "next/script";
// import FacebookPixel from "./FacebookPixel";
// import "./globals.css";

// export const metadata = {
//   metadataBase: new URL("https://csenotes.com"),

//   title: {
//     default: "CSENOTES – Engineering Notes, Interview Question, Pdf & Company PYQ Question",
//     template: "%s | CSENOTES",
//   },

//   description:
//     "Download free engineering notes, PYQs & placement papers for B.Tech CSE. Get updated study materials for all semesters.",

//   keywords: [
//     "CSE Notes",
//     "Engineering Notes",
//     "Placement Papers",
//     "Previous Year Questions",
//     "Study Material",
//     "Semester Notes",
//   ],

//   authors: [{ name: "CSENOTES Team" }],

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },

//   alternates: {
//     canonical: "https://csenotes.com",
//   },
//   openGraph: {
//   title: "csenotes – Engineering Notes & Interview Questions",
//   description:
//     "Free B.Tech engineering notes, placement papers, PYQs and study materials.",
//   url: "https://csenotes.com",
//   siteName: "csenotes",
//   type: "website",
//   locale: "en_IN",
//   images: [
//     {
//       url: "https://csenotes.com/og.png",
//       width: 1200,
//       height: 630,
//       alt: "csenotes - Engineering Notes",
//         type: "image/png", // 👈 add this
//     },
//   ],
// },

// twitter: {
//   card: "summary_large_image",
//   title: "csenotes – Engineering Notes & Interview Question",
//   description:
//     "Download free engineering notes, PYQs and placement materials for all semesters.",
//   images: ["https://csenotes.com/og.png"],
// },
// };
// export const viewport = {
//   themeColor: "#ffffff",
// };
// export default function RootLayout({ children }) {
//   const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

//   return (
//     <html lang="en">
//       <body className="app-body">

//   {/* Google Analytics Script */}
//   {GA_ID && (
//     <>
//       <Script
//         src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
//         strategy="afterInteractive"
//       />
//       <Script id="google-analytics" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${GA_ID}');
//         `}
//       </Script>
//     </>
//   )}


//   {/* Facebook Pixel Script */}
// <Script id="facebook-pixel" strategy="afterInteractive">
//   {`
//     !function(f,b,e,v,n,t,s)
//     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//     n.queue=[];t=b.createElement(e);t.async=!0;
//     t.src=v;s=b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t,s)}(window, document,'script',
//     'https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}'); 
    
//   `}
// </Script>


// {/* Microsoft Clarity */}
// <Script id="microsoft-clarity" strategy="afterInteractive">
// {`
//   (function(c,l,a,r,i,t,y){
//       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
//       t=l.createElement(r);t.async=1;
//       t.src="https://www.clarity.ms/tag/w9zt45d8h6";
//       y=l.getElementsByTagName(r)[0];
//       y.parentNode.insertBefore(t,y);
//   })(window, document, "clarity", "script", "w9zt45d8h6");
// `}
// </Script>

//   {/* ✅ ADD STRUCTURED DATA HERE */}
//  <Script
//   id="structured-data"
//   type="application/ld+json"
//   strategy="afterInteractive"
// >
// {`
// {
//   "@context": "https://schema.org",
//   "@type": "WebSite",
//   "name": "CSENOTES",
//   "url": "https://csenotes.com",
//   "description": "Free engineering notes, PYQs & placement papers for B.Tech CSE students",
//   "potentialAction": {
//     "@type": "SearchAction",
//     "target": "https://csenotes.com/search?q={search_term_string}",
//     "query-input": "required name=search_term_string"
//   }
// }
// `}
// </Script>

//   <Providers>
//     <FacebookPixel />   {/* ✅ THIS IS MISSING */}
//     <Navbar />

//     <AdUnit slot="3616905249" />

//     <main className="app-main">{children}</main>

//     <Footer />
//   </Providers>

// </body>
//     </html>
//   );
// }




            //  "https://www.instagram.com/yourpage",
            //   "https://www.linkedin.com/company/yourpage",
            //   "https://www.youtube.com/@yourchannel"


import Navbar from "./components/navbar/navbar";
import Footer from "./homepage/footer/Footer";
import Providers from "./Providers";
import AdUnit from "@/app/components/AdUnit";
import Script from "next/script";
import FacebookPixel from "./FacebookPixel";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://csenotes.com"),

  title: {
    default:
      "CSENOTES (CSE Notes) – Notes, Handwritten notes & Interview Question",
    template: "%s | CSENOTES",
  },

  description:
    "CSENOTES (csenotes.com) provides free engineering notes, Handwritten Notes,Interview Question and study material for B.Tech CSE & IT students.",

  keywords: [
    "csenotes",
    "cse notes",
    "Handwritten notes",
    "csenotes.com",
    "engineering notes",
    "btech cse notes",
    "placement papers",
    "previous year questions",
    "study material",
    "semester notes",
  ],

  authors: [{ name: "CSENOTES Team" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://csenotes.com/",
  },

  openGraph: {
    title:
      "CSENOTES (CSE Notes) – Engineering Notes, handwritten notes & Interview Question",
    description:
      "Free B.Tech engineering notes, handwritten notes, Interview Question.",
    url: "https://csenotes.com/",
    siteName: "CSENOTES",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://csenotes.com/og.png",
        width: 1200,
        height: 630,
        alt: "CSENOTES - Engineering Notes",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "CSENOTES (CSE Notes) – Engineering Notes, handwritten notes & Interview Question",
    description:
      "Download free engineering notes, PYQs and placement materials for all semesters.",
    images: ["https://csenotes.com/og.png"],
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="app-body">

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;
              t.src="https://www.clarity.ms/tag/w9zt45d8h6";
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w9zt45d8h6");
          `}
        </Script>

        {/* WebSite Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CSENOTES",
            "url": "https://csenotes.com/",
            "description": "Free engineering notes, handwritten notes & Interview Question for B.Tech CSE & IT students",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://csenotes.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </Script>

        {/* Organization Schema (VERY IMPORTANT) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CSENOTES",
            "url": "https://csenotes.com/",
            "logo": "https://csenotes.com/logo.png",
            "sameAs": [
              "https://www.facebook.com/profile.php?id=615734514228"
            ]
          }
          `}
        </Script>

        <Providers>
          <FacebookPixel />
          <Navbar />

          <AdUnit slot="3616905249" />

          <main className="app-main">{children}</main>

          <Footer />
        </Providers>

      </body>
    </html>
  );
}
