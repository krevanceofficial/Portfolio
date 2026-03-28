import Nav from "../components/nav";
import Hero from "./hero";
export default function Home() {
  return (
    <main className="min-h-screen dot">
      <Nav />
      
      {/* Main Content */}
      <Hero />
      <div className="mt-24 text-center z-10 flex items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-foreground">Welcome to My Project</h1>
      </div>
      <div className="mt-24 text-center z-10 flex items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-foreground">Welcome to My Footers</h1>
      </div>
    </main>
  );
}
