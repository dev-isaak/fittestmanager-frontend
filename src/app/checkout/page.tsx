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
import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

export default function CheckoutPage() {
	const [step, setStep] = useState(0);
	const [userData, setUserData] = useState({});
	const [addressData, setAddressData] = useState({});
	const stripePromise = loadStripe(
		"pk_test_51PA7ft01f9W7dg0WMsCHiZ5lGyWR7Bj5Xj3KXJSTmoFB9AOAXjcXni7SuxZjx9DyE9cItvOPyTcnTtK8gAfRUvvq00NmxowwmO"
	);
	const handleReturn = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	const handleAddress = (e) => {
		console.log(e);
		setAddressData(e.value);
	};

	const handleSetAddress = () => {
		console.log(addressData);
		setStep(step + 1);
	};

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
		currency: "usd",
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
							<Typography component='h2' variant='h4'>
								Subscripción
							</Typography>
							<Typography variant='h3'>0€</Typography>
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
									<Typography component='h2' variant='h4'>
										Datos de facturación
									</Typography>
									<AddressElement
										onChange={handleAddress}
										options={{
											mode: "billing",
											defaultValues: {
												name: userData.customerName
													? `${userData.customerName} ${userData.customerLastname}`
													: "",
												address: {
													line1: addressData?.address
														? addressData.address.line1
														: "",
													country: addressData?.address
														? addressData.address.country
														: "",
												},
											},
											fields: {
												phone: "always",
											},
										}}
									/>
									<Stack sx={{ marginTop: 2 }}>
										<Button variant='contained' onClick={handleSetAddress}>
											Siguiente
										</Button>
									</Stack>
								</Paper>
							)}
							{/* https://docs.stripe.com/billing/subscriptions/build-subscriptions?ui=elements */}
							{step === 2 && (
								<Paper
									sx={{
										display: "flex",
										flexDirection: "column",
										gap: 3,
										background: "#f5f5f5",
										padding: 4,
									}}>
									<Stack sx={{ gap: 3 }}>
										<Typography component='h2' variant='h4'>
											Pago
										</Typography>
										<PaymentElement />
										<Stack sx={{ marginTop: 2 }}>
											<Button variant='contained' onClick={handleAddress}>
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
