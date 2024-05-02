"use client";
import { ThemeProvider } from "@emotion/react";
import Footer from "../ui/layout/Footer";
import theme from "../theme";
import { Container } from "@mui/material";

export default function SignUpPage() {
	return (
		<ThemeProvider theme={theme}>
			<Container component='main'>
				{/* <SignUp path='/sign-up' /> */}
				<Footer />
			</Container>
		</ThemeProvider>
	);
}
