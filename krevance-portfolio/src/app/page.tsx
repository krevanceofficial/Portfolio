import Nav from "../components/sections/landing-page/nav";
import Hero from "../components/sections/landing-page/hero";
import AboutOverview from "../components/sections/landing-page/aboutOverview";
import WhatWeDo from "../components/sections/landing-page/whatWeDo";
import KraevsWork from "../components/sections/landing-page/kraevsWork";
import OurApproach from "../components/sections/landing-page/ourApproach";
import InquirySection from "../components/sections/landing-page/inquirySection";
export default function Home() {
  return (
    <main className="min-h-screen dot">
      {/* <Nav /> */}
      
      {/* Main Content */}
      {/* Hero Content */}
      <Hero />
      {/*  About Overview Content */}
      {/* <AboutOverview /> */}
      <KraevsWork />
      <WhatWeDo />
      <OurApproach />
      {/* <InquirySection /> */}
    </main>
  );
}
