import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import NavBar from "./ui/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fittest Manager",
	description: "Fittest Manager description",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<NavBar />
				<Box>{children}</Box>
			</body>
		</html>
	);
}
