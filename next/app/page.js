import Homepage from "./homepage/Homepage";
import AdUnit from "@/app/components/AdUnit";


export default function Home() {
  return (
    <>
      {/* Desktop Ad */}
      <div className="ad-container ad-desktop">
        <AdUnit slot="3616905249" />
      </div>

      {/* Mobile Ad */}
      <div className="ad-container ad-mobile">
        <AdUnit slot="3616905249" />
      </div>

      <Homepage />

      {/* Bottom Ad */}
      <div className="ad-container ad-mobile">
        <AdUnit slot="5668353516" />
      </div>
    </>
  );
}
