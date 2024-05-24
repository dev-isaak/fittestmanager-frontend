import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	MenuItem,
	Stack,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { allCountries } from "country-region-data";
import { toast } from "react-toastify";
import {
	coachesCreated,
	createNewCoach,
	updateCoachInfo,
} from "@/redux/features/coachesSlice";
import { Formik } from "formik";
import { coachFormValidation } from "../validation/coachFormValidation";

type CoachFormType = {
	coachData?: any;
	formType: "CREATE" | "UPDATE";
	onCloseDialog?: any;
};

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function CoachForm({
	coachData,
	formType,
	onCloseDialog,
}: CoachFormType) {
	const [imgURL, setImgURL] = useState("");
	const [selectedState, setSelectedState] = useState([]);
	const created = useAppSelector((data) => data.coachesReducer.created);
	const isLoading = useAppSelector((data) => data.coachesReducer.loading);
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (formType === "UPDATE") {
			const country = allCountries.filter(
				(country) => country[1] === coachData.country
			);

			if (country.length > 0) {
				setSelectedState(country[0][2]);
			}
		}
	}, []);

	useEffect(() => {
		if (created) {
			toast.success("Usuario creado.");
			dispatch(coachesCreated(""));
		}
	}, [created, dispatch]);

	const memberSinceDate =
		coachData &&
		`${new Date(coachData.created_at).getDate()}-${
			new Date(coachData.created_at).getMonth() + 1
		}-${new Date(coachData.created_at).getFullYear()}`;

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	return (
		<Formik
			initialValues={{
				userId: formType === "UPDATE" && coachData.user_id,
				avatar: formType === "UPDATE" ? coachData.avatar : "",
				firstName: formType === "UPDATE" ? coachData.first_name : "",
				lastName: formType === "UPDATE" ? coachData.last_name : "",
				dni: formType === "UPDATE" ? coachData.dni : "",
				birthDate:
					formType === "UPDATE"
						? dayjs(coachData.birth_date ? coachData.birth_date : "")
						: undefined,
				phone: formType === "UPDATE" ? coachData.phone_number : "",
				email: formType === "UPDATE" ? coachData.email : "",
				gender: formType === "UPDATE" ? coachData.gender : "",
				address: formType === "UPDATE" ? coachData.address : "",
				country: formType === "UPDATE" ? coachData.country : "",
				town: formType === "UPDATE" ? coachData.town : "",
				postalCode: formType === "UPDATE" ? coachData.postal_code : "",
				status: formType === "UPDATE" ? coachData.status : "",
				coachRole: formType === "UPDATE" ? coachData.role : "",
			}}
			onSubmit={(formData, { resetForm }) => {
				if (formType === "UPDATE") dispatch(updateCoachInfo(formData));
				if (formType === "CREATE")
					dispatch(
						createNewCoach({ coach: formData, centerId: currentCenter.id })
					);
				resetForm();
			}}
			validate={coachFormValidation}>
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
					minWidth={400}
					alignItems='center'>
					<TextField
						sx={{ display: "none" }}
						name='userId'
						value={formType === "UPDATE" && coachData.user_id}
					/>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						marginBottom={2}>
						<Avatar
							src={imgURL || (formType === "UPDATE" && coachData.photo)}
							sx={{
								width: 150,
								height: 150,
								marginBottom: 2,
							}}
						/>
						<Button
							component='label'
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}>
							Upload avatar
							<VisuallyHiddenInput
								name='avatar'
								onChange={(event: any) => {
									const file = event.target.files[0];
									setFieldValue("avatar", file);
									if (!file) return;

									const localImageURL = URL.createObjectURL(file);
									setImgURL(localImageURL);
								}}
								type='file'
							/>
						</Button>
					</Box>
					<Divider>Datos de contacto</Divider>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Nombre'
								name='firstName'
								onChange={handleChange}
								error={Boolean(
									errors.firstName && touched.firstName && errors.firstName
								)}
								helperText={
									errors.firstName && touched.firstName && errors.firstName
								}
								defaultValue={values.firstName}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Apellidos'
								name='lastName'
								onChange={handleChange}
								error={Boolean(
									errors.lastName && touched.lastName && errors.lastName
								)}
								helperText={
									errors.lastName && touched.lastName && errors.lastName
								}
								defaultValue={values.lastName}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='DNI'
								name='dni'
								onChange={handleChange}
								defaultValue={values.dni}
								error={errors.dni && touched.dni && errors.dni}
								helperText={errors.dni && touched.dni && errors.dni}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								sx={{ width: "100%" }}
								label='Fecha de nacimiento'
								name='birthDate'
								onChange={(date) => setFieldValue("birthDate", date)}
								value={values.birthDate}
								format='MM-DD-YYYY'
								defaultValue={values.birthDate}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Teléfono'
								name='phone'
								onChange={handleChange}
								defaultValue={values.phone}
							/>
						</Grid>
						<Grid item xs={12} md={6}></Grid>
					</Grid>
					<TextField
						fullWidth
						label='Email'
						name='email'
						defaultValue={values.email}
						onChange={handleChange}
						error={errors.email && touched.email && errors.email}
						helperText={errors.email && touched.email && errors.email}
						disabled={formType === "UPDATE" ? true : false}
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								select
								label='Género'
								value={values.gender}
								name='gender'
								onChange={handleChange}
								fullWidth>
								<MenuItem value={"male"}>Hombre</MenuItem>
								<MenuItem value={"female"}>Mujer</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} md={6}></Grid>
					</Grid>
					<Divider>Localización</Divider>
					<TextField
						fullWidth
						label='Dirección'
						name='address'
						onChange={handleChange}
						defaultValue={values.address}
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								select
								label='País'
								name='country'
								value={values.country}
								fullWidth
								onChange={(event) => {
									const selectedCountryCode = event.target.value;
									setFieldValue("country", selectedCountryCode);

									const country = allCountries.filter(
										(country) => country[1] === selectedCountryCode
									);
									setSelectedState(country[0][2]);
								}}>
								{allCountries.map((country, index) => (
									<MenuItem key={index} value={country[1]}>
										{country[0]}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								select
								label='Localidad'
								name='town'
								onChange={handleChange}
								value={values.town}
								fullWidth>
								{selectedState.map((state, index) => (
									<MenuItem key={index} value={state[0]}>
										{state[0]}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Código Postal'
								name='postalCode'
								onChange={handleChange}
								defaultValue={values.postalCode}
							/>
						</Grid>
						<Grid item xs={12} md={6}></Grid>
					</Grid>
					<Divider>Cuota</Divider>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Status'
								name='status'
								onChange={handleChange}
								defaultValue={values.status}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}></Grid>
					<Divider>Otros</Divider>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								select
								fullWidth
								label='Rol'
								name='coachRole'
								onChange={handleChange}
								defaultValue={values.coachRole}>
								<MenuItem value='manager'>Manager</MenuItem>
								<MenuItem value='coach'>Coach</MenuItem>
							</TextField>
						</Grid>
					</Grid>
					{formType === "UPDATE" && (
						<Typography variant='body2'>
							Miembro desde: {memberSinceDate}
						</Typography>
					)}
					<Stack flexDirection='row' gap={2} marginTop={4}>
						{isLoading ? (
							<CircularProgress />
						) : (
							<>
								<Button type='submit' variant='contained'>
									{formType === "CREATE" ? "Crear nuevo coach" : "Actualizar"}
								</Button>
								{formType === "UPDATE" && (
									<Button onClick={handleCloseButton} variant='outlined'>
										Cerrar
									</Button>
								)}
							</>
						)}
					</Stack>
				</Stack>
			)}
		</Formik>
	);
}
