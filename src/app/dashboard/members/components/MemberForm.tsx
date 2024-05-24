import {
	createNewMember,
	memberCreated,
	updateMemberInfo,
} from "@/redux/features/membersSlice";
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
import { Formik } from "formik";
import { memberFormValidation } from "@/app/dashboard/members/validation/memberFormValidation";

type MemberFormType = {
	memberData?: any;
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

export default function MemberForm({
	memberData,
	formType,
	onCloseDialog,
}: MemberFormType) {
	const [imgURL, setImgURL] = useState("");
	const [selectedState, setSelectedState] = useState([]);
	const created = useAppSelector((data) => data.membersReducer.created);
	const isLoading = useAppSelector((data) => data.membersReducer.loading);
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (formType === "UPDATE") {
			const country = allCountries.filter(
				(country) => country[1] === memberData.country
			);

			if (country.length > 0) {
				setSelectedState(country[0][2]);
			}
		}
	}, []);

	useEffect(() => {
		if (created) {
			toast.success("Usuario creado.");
			dispatch(memberCreated(""));
		}
	}, [created]);

	const memberSinceDate =
		memberData &&
		`${new Date(memberData.created_at).getDate()}-${
			new Date(memberData.created_at).getMonth() + 1
		}-${new Date(memberData.created_at).getFullYear()}`;

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	return (
		<Formik
			initialValues={{
				userId: formType === "UPDATE" && memberData.user_id,
				avatar: formType === "UPDATE" ? memberData.avatar : "",
				firstName: formType === "UPDATE" ? memberData.first_name : "",
				lastName: formType === "UPDATE" ? memberData.last_name : "",
				dni: formType === "UPDATE" ? memberData.dni : "",
				birthDate:
					formType === "UPDATE"
						? dayjs(memberData.birth_date ? memberData.birth_date : "")
						: undefined,
				phone: formType === "UPDATE" ? memberData.phone_number : "",
				emergencyPhone: formType === "UPDATE" ? memberData.emergency_phone : "",
				email: formType === "UPDATE" ? memberData.email : "",
				gender: formType === "UPDATE" ? memberData.gender : "",
				address: formType === "UPDATE" ? memberData.address : "",
				country: formType === "UPDATE" ? memberData.country : "",
				town: formType === "UPDATE" ? memberData.town : "",
				postalCode: formType === "UPDATE" ? memberData.postal_code : "",
				status: formType === "UPDATE" ? memberData.status : "",
				plan: formType === "UPDATE" ? memberData.plan : "",
			}}
			onSubmit={(formData, actions) => {
				if (formType === "UPDATE") dispatch(updateMemberInfo(formData));
				if (formType === "CREATE")
					dispatch(
						createNewMember({ member: formData, centerId: currentCenter.id })
					);
			}}
			validate={memberFormValidation}>
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
						value={formType === "UPDATE" && memberData.user_id}
					/>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						marginBottom={2}>
						<Avatar
							src={imgURL || (formType === "UPDATE" && memberData.photo)}
							sx={{
								width: 150,
								height: 150,
								marginBottom: 2,
								border: "1px solid lightgray",
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
								error={Boolean(errors.dni && touched.dni && errors.dni)}
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
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Teléfono de emergéncia'
								name='emergencyPhone'
								onChange={handleChange}
								defaultValue={values.emergencyPhone}
							/>
						</Grid>
					</Grid>
					<TextField
						fullWidth
						label='Email'
						name='email'
						defaultValue={values.email}
						onChange={handleChange}
						error={Boolean(errors.email && touched.email && errors.email)}
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
								label='Plan'
								name='plan'
								onChange={handleChange}
								defaultValue={values.plan}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								select
								fullWidth
								label='Status'
								name='status'
								onChange={handleChange}
								defaultValue={values.status}>
								<MenuItem value='active'>Activo</MenuItem>
								<MenuItem value='paused'>Pausado</MenuItem>
								<MenuItem value='canceled'>Cancelado</MenuItem>
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
									{formType === "CREATE" ? "Crear nuevo miembro" : "Actualizar"}
								</Button>
								{formType === "UPDATE" && (
									<Button
										onClick={handleCloseButton}
										variant='outlined'
										color='error'>
										Cancelar
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
