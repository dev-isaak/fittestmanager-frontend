import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import NavBar from "./ui/layout/Navbar";
import { createClient } from "./utils/supabase/server";
import StoreProvider from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fittest Manager",
	description: "Fittest Manager description",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createClient();
	const user = await supabase.auth.getSession();
	const isLoggedIn = user.data.session ? true : false;

	return (
		<html lang='es'>
			<body className={inter.className}>
				<StoreProvider>
					<NavBar isLoggedIn={isLoggedIn} />
					<Box>{children}</Box>
				</StoreProvider>
			</body>
		</html>
	);
}
