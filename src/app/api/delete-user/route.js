import { createClient } from "@supabase/supabase-js";
import { corsHeaders } from "@/_shared/cors";
import { FunctionsHttpError } from "@supabase/supabase-js";

export async function POST(req) {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.SUPABASE_SERVICE_ROLE_KEY
	);

	// Handle preflight requests (OPTIONS)
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		// Invoke the Supabase function
		const { data, error } = await supabase.functions.invoke("deleteUser", {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers":
					"authorization, x-client-info, apikey, content-type",
			},
		});
		console.log(error);
		if (error && error instanceof FunctionsHttpError) {
			const errorMessage = await error.context.json();
			console.log("Function returned an error", errorMessage);
		}

		return new Response(JSON.stringify(data), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 500,
		});
	}
}
