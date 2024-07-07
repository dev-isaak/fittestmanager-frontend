import { Stripe } from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { name, phone, address, email } = await request.json();
	const { line1, line2, city, country, postal_code, state } = address;

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	let customer;
	try {
		customer = await stripe.customers.create({
			email,
			name,
			phone,
			address: {
				city,
				country,
				line1,
				line2: line2 ? line2 : "",
				postal_code,
				state,
			},
		});
	} catch (error) {
		console.error(error);
	}

	return NextResponse.json({ customer_id: customer.id });
}
