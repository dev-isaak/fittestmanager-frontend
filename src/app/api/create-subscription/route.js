import { Stripe } from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { customerId, priceId } = await request.json();

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	const subscription = await stripe.subscriptions.create({
		customer: customerId,
		items: [
			{
				price: priceId,
			},
		],
		payment_behavior: "default_incomplete",
		payment_settings: { save_default_payment_method: "on_subscription" },
		expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
		trial_period_days: 15,
	});

	console.log(subscription);

	// if (subscription.pending_setup_intent !== null) {
	// 	res.send({
	// 		type: "setup",
	// 		clientSecret: subscription.pending_setup_intent.client_secret,
	// 	});
	// } else {
	// 	res.send({
	// 		type: "payment",
	// 		clientSecret: subscription.latest_invoice.payment_intent.client_secret,
	// 	});
	// }
	return NextResponse.json({
		// client_secret: subscription.latest_invoice.payment_intent.client_secret,
		client_secret: subscription.pending_setup_intent.client_secret,
	});
}
