import { Stripe } from "stripe";

export async function POST(request) {
	const { priceId } = await request.json();
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	const customer = await stripe.customers.create({
		email: "{{CUSTOMER_EMAIL}}",
		name: "{{CUSTOMER_NAME}}",
		shipping: {
			address: {
				city: "Brothers",
				country: "US",
				line1: "27 Fredrick Ave",
				postal_code: "97712",
				state: "CA",
			},
			name: "{{CUSTOMER_NAME}}",
		},
		address: {
			city: "Brothers",
			country: "US",
			line1: "27 Fredrick Ave",
			postal_code: "97712",
			state: "CA",
		},
	});
}
