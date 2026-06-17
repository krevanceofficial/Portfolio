import Nav from "../../components/sections/landing-page/nav";
import AboutUsSection from "../../components/sections/aboutUs-page/aboutUsSection";
import OurStory from "../../components/sections/aboutUs-page/ourStory";
import TheKraev from "../../components/sections/aboutUs-page/theKraev";
import WhatMakesDifferent from "../../components/sections/aboutUs-page/whatmkDiff";
import Technologies from "../../components/sections/aboutUs-page/technologies";

export default function AboutUsPage() {
	return (
		<main className="min-h-screen">
			<AboutUsSection />
			<OurStory />
			<TheKraev />
			<WhatMakesDifferent />
			<Technologies />
		</main>
	);
}