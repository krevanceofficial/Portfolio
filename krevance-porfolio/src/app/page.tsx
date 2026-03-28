import Nav from "../components/nav";
import Hero from "./hero";
import AboutOverview from "./aboutOverview";
export default function Home() {
  return (
    <main className="min-h-screen dot">
      <Nav />
      
      {/* Main Content */}
      {/* Hero Content */}
      <Hero />
      {/*  About Overview Content */}
      <AboutOverview />
      <div className="mt-24 text-center z-10 flex items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-foreground">Welcome to My Footers</h1>
      </div>
    </main>
  );
}
