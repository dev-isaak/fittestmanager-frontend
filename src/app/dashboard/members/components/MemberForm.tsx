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
	const [gender, setGender] = useState();
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

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		if (formType === "UPDATE") dispatch(updateMemberInfo(data));
		if (formType === "CREATE")
			dispatch(createNewMember({ member: data, centerId: currentCenter.id }));
	};

	const memberSinceDate =
		memberData &&
		`${new Date(memberData.created_at).getDate()}-${
			new Date(memberData.created_at).getMonth() + 1
		}-${new Date(memberData.created_at).getFullYear()}`;

	const handleGender = (event) => {
		setGender(event.target.value);
	};

	const handleAvatarChange = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const localImageURL = URL.createObjectURL(file);
		setImgURL(localImageURL);
	};

	const handleCountryChange = (event) => {
		const selectedCountryCode = event.target.value;

		const country = allCountries.filter(
			(country) => country[1] === selectedCountryCode
		);
		setSelectedState(country[0][2]);
	};

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	return (
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
						onChange={handleAvatarChange}
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
						defaultValue={formType === "UPDATE" ? memberData.first_name : ""}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Apellidos'
						name='lastName'
						defaultValue={formType === "UPDATE" ? memberData.last_name : ""}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='DNI'
						name='dni'
						defaultValue={formType === "UPDATE" ? memberData.dni : ""}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<DatePicker
						sx={{ width: "100%" }}
						label='Fecha de nacimiento'
						name='birthDate'
						defaultValue={
							formType === "UPDATE"
								? dayjs(memberData.birth_date ? memberData.birth_date : "")
								: undefined
						}
						format='MM-DD-YYYY'
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Teléfono'
						name='phone'
						defaultValue={formType === "UPDATE" ? memberData.phone_number : ""}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Teléfono de emergéncia'
						name='emergencyPhone'
						defaultValue={
							formType === "UPDATE" ? memberData.emergency_phone : ""
						}
					/>
				</Grid>
			</Grid>
			<TextField
				fullWidth
				label='Email'
				name='email'
				defaultValue={formType === "UPDATE" ? memberData.email : ""}
				disabled={formType === "UPDATE" ? true : false}
			/>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						select
						label='Género'
						value={gender}
						name='gender'
						defaultValue={formType === "UPDATE" ? memberData.gender : ""}
						onChange={handleGender}
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
				defaultValue={formType === "UPDATE" ? memberData.address : ""}
			/>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						select
						label='País'
						name='country'
						defaultValue={formType === "UPDATE" ? memberData.country : ""}
						fullWidth
						onChange={handleCountryChange}>
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
						defaultValue={formType === "UPDATE" ? memberData.town : ""}
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
						defaultValue={formType === "UPDATE" ? memberData.postal_code : ""}
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
						defaultValue={formType === "UPDATE" ? memberData.plan : ""}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Status'
						name='status'
						defaultValue={formType === "UPDATE" ? memberData.status : ""}
					/>
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
	);
}
