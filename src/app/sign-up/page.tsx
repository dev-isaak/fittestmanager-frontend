"use client";
import { ThemeProvider } from "@emotion/react";
import Footer from "../ui/layout/Footer";
import theme from "../theme";
import { CssBaseline, Stack } from "@mui/material";
import AuthForm from "../ui/AuthForm";

export default function SignUpPage() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Stack component='main' alignItems='center' sx={{ paddingY: 5 }}>
				<AuthForm formType='sign_up' />
			</Stack>
			<Footer />
		</ThemeProvider>
	);
}
