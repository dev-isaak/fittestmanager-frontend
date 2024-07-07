import { createClient } from "@/app/utils/supabase/client";

export const createStripeCustomer = async ({ userData, addressData }) => {
  try {
    const res = await fetch("/api/create-stripe-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData, ...addressData }),
    });
    const { customer_id } = await res.json();
    return customer_id
  } catch (e) {
    console.error(e)
  }
}

export const createStripeSubscription = async ({ customerId, priceId }) => {
  try {
    const res = await fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        priceId,
      }),
    });
    const { client_secret } = await res.json();

    return client_secret
  } catch (e) {
    console.error(e)
  }
}

export async function signUpNewUser({ email, password }) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options: {
    //   emailRedirectTo: 'https://example.com/welcome',
    // },
  })
  return { data, error }
}