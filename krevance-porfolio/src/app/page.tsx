import Nav from "../components/sections/nav";
import Hero from "../components/sections/hero";
import AboutOverview from "../components/sections/aboutOverview";
import WhatWeDo from "../components/sections/whatWeDo";
export default function Home() {
  return (
    <main className="min-h-screen dot">
      <Nav />
      
      {/* Main Content */}
      {/* Hero Content */}
      {/* <Hero /> */}
      {/*  About Overview Content */}
      {/* <AboutOverview /> */}
      <WhatWeDo />
      <div className="mt-24 text-center z-10 flex items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-foreground">Welcome to My Footers</h1>
      </div>
    </main>
  );
}
