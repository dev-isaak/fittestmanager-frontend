"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Footer from "../ui/layout/Footer";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { toast } from "react-toastify";
import AlertMessage from "../ui/AlertMessage";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { CircularProgress, Stack } from "@mui/material";
import { useState } from "react";

export default function SignIn() {
	const router = useRouter();
	const supabase = createClient();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		const data = new FormData(event.currentTarget);
		const userCredentials = {
			email: data.get("email") as string,
			password: data.get("password") as string,
		};
		const { error } = await supabase.auth.signInWithPassword(userCredentials);
		if (error) {
			toast.error(error.message);
			setLoading(false);
			throw new Error(error.message);
		}
		router.push("/dashboard");
		setLoading(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AlertMessage />
			<Stack component='main' alignItems='center' sx={{ paddingY: 5 }}>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1, width: { xs: 350, sm: 450 } }}
					boxShadow='0px 0px 5px #e6e4e4'
					borderRadius={2}
					padding={2}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					{loading ? (
						<CircularProgress />
					) : (
						<Button
							color='primary'
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Entrar
						</Button>
					)}
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='/sign-up' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Stack>
			<Footer />
		</ThemeProvider>
	);
}
