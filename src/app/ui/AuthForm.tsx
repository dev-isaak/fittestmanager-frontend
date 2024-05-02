import { createClient } from "@/app/utils/supabase/client";
import { Box } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

type AuthFormType = {
	formType: "sign_up" | "sign_in";
};

export default function AuthForm({ formType }: AuthFormType) {
	const supabase = createClient();
	return (
		<Box
			sx={{ mt: 1, width: { xs: 350, sm: 450 } }}
			boxShadow='0px 0px 5px #e6e4e4'
			borderRadius={2}
			padding={2}>
			<Auth
				view={formType}
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				providers={["google"]}
				localization={{
					variables: {
						sign_up: {
							email_label: "Correo electrónico",
							email_input_placeholder: "Tú correo electrónico",
							password_label: "Contraseña",
							password_input_placeholder: "Tú contraseña",
							button_label: "Regístrate",
							link_text: "No tienes una cuenta? Regístrate",
							confirmation_text:
								"Revisa tú correo para el correo de confirmación.",
						},
						sign_in: {
							email_label: "Correo electrónico",
							email_input_placeholder: "Tú correo electrónico",
							password_label: "Contraseña",
							password_input_placeholder: "Tú contraseña",
							button_label: "Entra",
							link_text: "Ya tienes una cuenta? Entra",
						},
					},
				}}
			/>
		</Box>
	);
}
