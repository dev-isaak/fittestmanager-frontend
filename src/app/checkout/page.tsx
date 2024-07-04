"use client";
import { ThemeProvider } from "@emotion/react";
import Footer from "../ui/layout/Footer";
import theme from "../theme";
import { Box, Button, CssBaseline, Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import { CreateAccountForm } from "./forms/CreateAccountForm";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

export default function CheckoutPage() {
	const [step, setStep] = useState(0);
	const [userData, setUserData] = useState({});
	const stripePromise = loadStripe(
		process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY as string
	);
	const handleReturn = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	const stepperStyle = {
		paddingX: 2,
		paddingY: 1,
		borderRadius: "50%",
		color: "white",
	};

	const renderSteps = () => {
		const steps = [1, 2];

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
						paddingY: 5,
					}}>
					<h1>Checkout</h1>
					<Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
						<Button
							onClick={handleReturn}
							variant='contained'
							disabled={step === 0}>
							Volver
						</Button>
						{renderSteps()}
					</Stack>
					{step === 0 && (
						<CreateAccountForm
							setStep={setStep}
							userData={userData}
							setUserData={setUserData}
						/>
					)}
					{/* https://docs.stripe.com/billing/subscriptions/build-subscriptions?ui=elements */}
					{step === 1 && (
						<form>
							<PaymentElement />
							<Button>Submit</Button>
						</form>
					)}
				</Stack>
			</Elements>
			<Footer />
		</ThemeProvider>
	);
}
