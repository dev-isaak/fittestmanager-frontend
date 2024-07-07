"use client";
import { ThemeProvider } from "@emotion/react";
import Footer from "../ui/layout/Footer";
import theme from "../theme";
import {
	Box,
	CssBaseline,
	Divider,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CreateAccountForm } from "./forms/CreateAccountForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { CheckoutForm } from "./forms/CheckoutForm";

export default function CheckoutPage() {
	const searchParams = useSearchParams();
	const selectedPriceType = searchParams.get("type");
	const selectedPriceTitle = searchParams.get("title");
	const selectedPriceAmount = searchParams.get("price");
	const [userData, setUserData] = useState({});
	const stripePromise = loadStripe(
		"pk_test_51PA7ft01f9W7dg0WMsCHiZ5lGyWR7Bj5Xj3KXJSTmoFB9AOAXjcXni7SuxZjx9DyE9cItvOPyTcnTtK8gAfRUvvq00NmxowwmO"
	);

	const options: StripeElementsOptions = {
		mode: "subscription",
		amount: 0,
		currency: "eur",
		appearance: {
			theme: "stripe",
		},
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Elements stripe={stripePromise} options={options}>
				<Stack
					component='main'
					alignItems='center'
					justifyContent='center'
					sx={{
						paddingY: 4,
						gap: 4,
					}}>
					<Grid
						container
						spacing={2}
						sx={{
							padding: 4,
							maxWidth: 1000,
							// backgroundRepeat: "no-repeat",
							// backgroundSize: "cover",
							// backgroundImage: "url(/static/images/2150989919.jpg)",
						}}>
						<Grid
							item
							xs={12}
							md={6}
							sx={
								{
									// marginTop: 2,
									// backgroundRepeat: "no-repeat",
									// backgroundSize: "cover",
									// backgroundImage: "url(/static/images/2150989919.jpg)",
								}
							}>
							<Typography component='h2' variant='h4' sx={{ fontWeight: 900 }}>
								Subscripción {selectedPriceTitle}
							</Typography>
							<Typography>{selectedPriceType}</Typography>
							<Typography variant='h3'>{selectedPriceAmount}€</Typography>
							{selectedPriceAmount && selectedPriceType === "anual" && (
								<>
									<Typography variant='h4'>
										{parseInt(selectedPriceAmount) / 12} €/mes
									</Typography>
									<Typography variant='body2'></Typography>
								</>
							)}
							<Typography variant='body2'>
								No se te hará ningún cargo hasta pasados 15 días.
							</Typography>
							<Typography variant='body2'>
								Puedes cancelar en cualquier momento.
							</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<Paper
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: 3,
									background: "#cdcdcdde",
									borderRadius: 5,
									padding: 4,
								}}>
								<Typography
									component='h2'
									variant='h5'
									sx={{
										color: "#4f4f4f",
										fontWeight: 900,
										textAlign: "center",
									}}>
									Crea una cuenta
								</Typography>
								<CreateAccountForm setUserData={setUserData} />

								<Typography
									component='h2'
									variant='h5'
									sx={{
										color: "#4f4f4f",
										fontWeight: 900,
										textAlign: "center",
									}}>
									Datos de facturación
								</Typography>
								<CheckoutForm userData={userData} />
							</Paper>
						</Grid>
					</Grid>
				</Stack>
			</Elements>
			<Footer />
		</ThemeProvider>
	);
}
