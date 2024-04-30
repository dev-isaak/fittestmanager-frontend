import FAQ from "./ui/FAQ";
import Features from "./ui/Features";
import Hero from "./ui/Hero";
import Highlights from "./ui/Highlights";
import Pricing from "./ui/Pricing";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./ui/layout/Footer";

export default function Home() {
	return (
		<main>
			<CssBaseline />
			<Hero />
			<Features />
			<Highlights />
			<Pricing />
			<FAQ />
			<Footer />
		</main>
	);
}
