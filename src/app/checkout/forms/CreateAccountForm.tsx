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

export const CreateAccountForm = ({ setStep, userData, setUserData }) => {
	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 3,
				background: "#f5f5f5",
				padding: 4,
			}}>
			<Typography component='h2' variant='h4'>
				Crea una cuenta
			</Typography>
			<Formik
				initialValues={{
					customerName: userData ? userData.customerName : "",
					customerLastname: userData ? userData.customerLastname : "",
					customerEmail: userData ? userData.customerEmail : "",
					password: userData ? userData.password : "",
				}}
				onSubmit={(userData) => {
					setUserData(userData);
					setStep(1);
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
						{/* <Grid container spacing={2}>
							<Grid item xs={12} md={6}> */}
						<TextField
							fullWidth
							label='Nombre'
							name='customerName'
							onChange={handleChange}
							defaultValue={values.customerName}
						/>
						{/* </Grid> */}
						{/* <Grid item xs={12} md={6}> */}
						<TextField
							fullWidth
							label='Apellidos'
							name='customerLastname'
							onChange={handleChange}
							defaultValue={values.customerLastname}
						/>
						{/* </Grid> */}
						{/* <Grid item xs={12} md={6}> */}
						<TextField
							fullWidth
							label='Correo electrónico'
							name='customerEmail'
							onChange={handleChange}
							defaultValue={values.customerEmail}
						/>
						{/* </Grid> */}
						{/* <Grid item xs={12} md={6}> */}
						<TextField
							fullWidth
							label='Repetir correo electrónico'
							name='repeatCustomerEmail'
						/>
						{/* </Grid> */}
						{/* <Grid item xs={12} md={6}> */}
						<TextField
							fullWidth
							label='Contraseña'
							name='password'
							onChange={handleChange}
						/>
						{/* </Grid> */}

						{/* <Grid item xs={12} md={6}> */}
						<TextField
							fullWidth
							label='Repetir contraseña'
							name='repeatPassword'
						/>
						{/* </Grid> */}
						{/* </Grid> */}

						<Button type='submit' variant='contained' fullWidth>
							Crear usuario
						</Button>
					</Stack>
				)}
			</Formik>
		</Paper>
	);
};
