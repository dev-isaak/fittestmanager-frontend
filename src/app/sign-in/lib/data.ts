import { createClient } from "@/app/utils/supabase/client";

type loginDataType = {
	email: any;
	password: any;
};

export default async function login({ email, password }: loginDataType) {
	const url = "http://localhost:3000/api/auth/login";
	try {
		const loginData = {
			email: email,
			password: password,
		};
		const req = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		});
		console.log(req)
		const res = await req.json();

		if(res.error) throw new Error(res.message)

		document.cookie = `token=${res.token}; path=/`

		return res;
	} catch (error: any) {
		console.error(error);
		return (error)
	}
}

export const getMyUser = async() => {
  const supabase = createClient()

	const { data: { user } } = await supabase.auth.getUser()
	return user
}