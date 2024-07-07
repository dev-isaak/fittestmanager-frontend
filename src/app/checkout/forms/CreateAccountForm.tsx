"use client";
import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import { createAccountFormValidation } from "../validation/createAccountFormValidation";

export const CreateAccountForm = ({ setUserData }) => {
	const handleFormChange = (event) => {
		const { name, value } = event.target;

		if (name === "customerEmail") {
			setUserData((prevState) => ({
				...prevState,
				email: value,
			}));
		}
		if (name === "password") {
			setUserData((prevState) => ({
				...prevState,
				password: value,
			}));
		}
	};

	return (
		<Formik
			initialValues={{
				customerEmail: "",
				password: "",
			}}
			onSubmit={(userData) => {
				// setUserData(userData);
				// setStep(1);
			}}
			validate={createAccountFormValidation}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<Stack
					component='form'
					onSubmit={handleSubmit}
					gap={2}
					alignItems='center'>
					<TextField
						sx={{ borderRadius: 2 }}
						size='small'
						fullWidth
						label='Correo electrónico'
						name='customerEmail'
						onChange={handleFormChange}
						defaultValue={values.customerEmail}
					/>
					<TextField
						sx={{ borderRadius: 2 }}
						size='small'
						fullWidth
						label='Repetir correo electrónico'
						name='repeatCustomerEmail'
					/>
					<TextField
						sx={{ borderRadius: 2 }}
						size='small'
						type='password'
						fullWidth
						label='Contraseña'
						name='password'
						onChange={handleFormChange}
					/>
					<TextField
						sx={{ borderRadius: 2 }}
						size='small'
						type='password'
						fullWidth
						label='Repetir contraseña'
						name='repeatPassword'
					/>
					{/* <Button type='submit' variant='contained' fullWidth>
							Crear usuario
						</Button> */}
				</Stack>
			)}
		</Formik>
	);
};
