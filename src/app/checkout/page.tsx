"use client";
import { ThemeProvider } from "@emotion/react";
import Footer from "../ui/layout/Footer";
import theme from "../theme";
import {
	Box,
	Button,
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
	const selectedPriceId = searchParams.get("price_id");
	const selectedPriceType = searchParams.get("type");
	const selectedPriceTitle = searchParams.get("title");
	const selectedPriceAmount = searchParams.get("price");
	const [step, setStep] = useState(0);
	const [userData, setUserData] = useState({});
	const [addressData, setAddressData] = useState({});
	const [customerId, setCustomerId] = useState();
	const stripePromise = loadStripe(
		"pk_test_51PA7ft01f9W7dg0WMsCHiZ5lGyWR7Bj5Xj3KXJSTmoFB9AOAXjcXni7SuxZjx9DyE9cItvOPyTcnTtK8gAfRUvvq00NmxowwmO"
	);
	const handleReturn = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	// const handleSetAddress = async () => {
	// 	setStep(step + 1);
	// 	const res = await fetch("/api/create-stripe-customer", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ ...userData, ...addressData }),
	// 	});
	// 	const id = await res.json();
	// 	setCustomerId(id.customer_id);
	// };

	// const handleSubscription = async (e) => {
	// 	const res = await fetch("/api/create-subscription", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ customerId, priceId: selectedPriceId }),
	// 	});
	// 	// const id = await res.json();
	// };

	const stepperStyle = {
		paddingX: 2,
		paddingY: 1,
		borderRadius: "50%",
		color: "white",
	};

	const renderSteps = () => {
		const steps = [1, 2, 3];

		return steps.map((number, index) => (
			<React.Fragment key={index}>
				<Box
					key={index}
					{...stepperStyle}
					sx={{ background: step === number - 1 ? "#1c2434" : "gray" }}>
					{number}
				</Box>
				{number !== steps.length && <Divider sx={{ width: 80 }} />}
			</React.Fragment>
		));
	};

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
						gap: 4,
					}}>
					<h1>Checkout</h1>
					<Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
						<Button
							onClick={handleReturn}
							variant='outlined'
							disabled={step === 0}>
							Volver
						</Button>
						{renderSteps()}
					</Stack>
					<Grid container spacing={2} sx={{ maxWidth: 900 }}>
						<Grid item xs={12} md={6}>
							<Typography
								component='h2'
								variant='h4'
								sx={{ color: "#333", fontWeight: 900 }}>
								Subscripción {selectedPriceTitle}
							</Typography>
							<Typography>{selectedPriceType}</Typography>
							<Typography variant='h3'>{selectedPriceAmount}€</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							{step === 0 && (
								<CreateAccountForm
									setStep={setStep}
									userData={userData}
									setUserData={setUserData}
								/>
							)}
							{step === 1 && (
								<Paper
									sx={{
										display: "flex",
										flexDirection: "column",
										gap: 3,
										background: "#f5f5f5",
										padding: 4,
									}}>
									<Typography
										component='h2'
										variant='h4'
										sx={{
											color: "#4f4f4f",
											fontWeight: 900,
											textAlign: "center",
										}}>
										Datos de facturación
									</Typography>
									<CheckoutForm userData={userData} />
									{/* <Stack sx={{ marginTop: 2 }}>
										<Button variant='contained' onClick={handleSetAddress}>
											Siguiente
										</Button>
									</Stack> */}
								</Paper>
							)}
							{/* https://docs.stripe.com/billing/subscriptions/build-subscriptions?ui=elements */}
							{step === 2 && customerId && (
								<Paper
									sx={{
										display: "flex",
										flexDirection: "column",
										gap: 3,
										background: "#f5f5f5",
										padding: 4,
									}}>
									<Stack sx={{ gap: 3 }}>
										<Typography
											component='h2'
											variant='h4'
											sx={{
												color: "#4f4f4f",
												fontWeight: 900,
												textAlign: "center",
											}}>
											Pago
										</Typography>
										<Stack sx={{ marginTop: 2 }}>
											<Button variant='contained' onClick={handleSubscription}>
												Subscribirse
											</Button>
										</Stack>
									</Stack>
								</Paper>
							)}
						</Grid>
					</Grid>
				</Stack>
			</Elements>
			<Footer />
		</ThemeProvider>
	);
}
