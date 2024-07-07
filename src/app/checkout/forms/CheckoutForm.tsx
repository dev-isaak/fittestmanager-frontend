import { Box, Button, CircularProgress, Stack } from "@mui/material";
import {
	AddressElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
	createStripeCustomer,
	createStripeSubscription,
	signUpNewUser,
} from "../data";
import { toast } from "react-toastify";

export const CheckoutForm = ({ userData }) => {
	const searchParams = useSearchParams();
	const selectedPriceId = searchParams.get("price_id");
	const [addressData, setAddressData] = useState({});
	const [loader, setLoader] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();
		let clientSecret;
		setLoader(true);
		// Create a user in Supabase
		// debugger;
		const { data, error } = await signUpNewUser({
			email: userData.email,
			password: userData.password,
		});

		if (error) {
			toast.error("Ha habido un error creando el usuario");
			console.error(error);
			setLoader(false);
		} else if (!data?.user?.identities?.length) {
			debugger;
			toast.success(
				"El correo proporcionado ya está registrado en nuestra base de datos."
			);
			console.error(
				"El correo proporcionado ya está registrado en nuestra base de datos. "
			);
			setLoader(false);
		} else {
			console.log(data);
			// debugger;
			// Create a customer in stripe
			const customer = await createStripeCustomer({ userData, addressData });

			if (customer && elements && data.user !== null) {
				const { error: submitError } = await elements.submit();
				if (submitError) {
					toast.error("Ha habido un error.");
					console.error(submitError);
					return;
				}

				// Create a subscription in Stripe
				clientSecret = await createStripeSubscription({
					customerId: customer,
					priceId: selectedPriceId,
				});
			}

			if (stripe && elements) {
				// Confirm the Intent using the details collected by the Payment Element
				const { error } = await stripe.confirmSetup({
					elements,
					clientSecret,
					confirmParams: {
						return_url: "http://localhost:3000/sign-in",
					},
				});

				if (error) {
					console.error(error);
					toast.error(
						"Ha habido un error creando la cuenta. Prueba más tarde."
					);
				}
			}
			setLoader(false);
		}
	};

	const handleAddress = (e) => {
		setAddressData(e.value);
	};

	return (
		<Box
			component='form'
			onSubmit={(e) => handleSubmit(e)}
			sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
					},
					fields: {
						phone: "always",
					},
				}}
			/>
			<Stack sx={{ marginTop: 2, alignItems: "center" }}>
				{loader ? (
					<CircularProgress />
				) : (
					<Button
						type='submit'
						variant='contained'
						onClick={handleSubmit}
						fullWidth>
						Siguiente
					</Button>
				)}
			</Stack>
		</Box>
	);
};
