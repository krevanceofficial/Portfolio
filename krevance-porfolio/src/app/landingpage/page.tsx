import Nav from "../../components/sections/landing-page/nav"; 
import WhatWeDo from "../../components/sections/landing-page/whatWeDo";
import OurApproach from "../../components/sections/landing-page/ourApproach"; 
import Hero from "../../components/sections/landing-page/hero";
import KraevsWork from "../../components/sections/landing-page/kraevsWork";
import InquirySection from "../../components/sections/landing-page/inquirySection";
import Footer from "../../components/sections/footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen dot">
        <Nav />
        <Hero />
        {/*  About Overview Content */}
        {/* <AboutOverview /> */}
        <KraevsWork />
        <WhatWeDo />
        <OurApproach /> 
        <InquirySection />
    </main>
  );
}
