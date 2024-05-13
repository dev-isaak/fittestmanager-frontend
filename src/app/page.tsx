"use client";
import FAQ from "./ui/FAQ";
import Features from "./ui/Features";
import Hero from "./ui/Hero";
import Highlights from "./ui/Highlights";
import Pricing from "./ui/Pricing";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./ui/layout/Footer";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Home() {
	return (
		<Provider store={store()}>
			<ThemeProvider theme={theme}>
				<main>
					<CssBaseline />
					<Hero />
					<Features />
					<Highlights />
					<Pricing />
					<FAQ />
					<Footer />
				</main>
			</ThemeProvider>
		</Provider>
	);
}
