import { Box, Button, Stack } from "@mui/material";
import {
	AddressElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createStripeCustomer, createStripeSubscription } from "../data";

export const CheckoutForm = ({ userData }) => {
	const searchParams = useSearchParams();
	const selectedPriceId = searchParams.get("price_id");
	const [addressData, setAddressData] = useState({});
	const [customerId, setCustomerId] = useState();
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();
		let clientSecret;
		const customer = await createStripeCustomer({ userData, addressData });
		setCustomerId(customer);

		if (customer && elements) {
			const { error: submitError } = await elements.submit();
			if (submitError) {
				console.error(submitError);
				return;
			}
			clientSecret = await createStripeSubscription({
				customerId: customer,
				priceId: selectedPriceId,
			});
		}

		// ---------------------------------------------------------
		if (stripe && elements) {
			// Confirm the Intent using the details collected by the Payment Element
			const { error } = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: "http://localhost:3000/sign-in",
				},
			});

			console.log(error);

			// if (!error) {
			// 	router.push("/sign-in");
			// }
		}
	};

	const handleAddress = (e) => {
		setAddressData(e.value);
	};

	return (
		<Box component='form' onSubmit={(e) => handleSubmit(e)}>
			<PaymentElement
				options={{
					layout: {
						type: "tabs",
						defaultCollapsed: false,
					},
				}}
			/>
			<AddressElement
				onChange={(e) => handleAddress(e)}
				options={{
					mode: "billing",
					defaultValues: {
						name: userData.customerName
							? `${userData.customerName} ${userData.customerLastname}`
							: "",
						// address: {
						// 	line1: addressData?.address ? addressData.address.line1 : "",
						// 	country: addressData?.address ? addressData.address.country : "",
						// },
					},
					fields: {
						phone: "always",
					},
				}}
			/>
			<Stack sx={{ marginTop: 2 }}>
				<Button type='submit' variant='contained' onClick={handleSubmit}>
					Siguiente
				</Button>
			</Stack>
		</Box>
	);
};
