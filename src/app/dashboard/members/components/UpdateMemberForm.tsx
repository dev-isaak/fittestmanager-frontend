import { updateMemberInfo } from "@/redux/features/membersSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	InputLabel,
	MenuItem,
	Select,
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

type UpdateMemberFormType = {
	memberData: any;
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

export default function UpdateMemberForm({ memberData }: UpdateMemberFormType) {
	const [gender, setGender] = useState();
	const [imgURL, setImgURL] = useState("");
	const [selectedState, setSelectedState] = useState([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const country = allCountries.filter(
			(country) => country[1] === memberData.country
		);

		if (country.length > 0) {
			setSelectedState(country[0][2]);
		}
	}, []);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		dispatch(updateMemberInfo(data));
	};
	const memberSinceDate = `${new Date(memberData.created_at).getDate()}-${
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
				value={memberData.user_id}
			/>
			<Box marginBottom={2}>
				<Avatar
					src={imgURL || memberData.photo}
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
			<Divider
				sx={{ width: "100%", marginY: 2, fontSize: "0.8rem" }}
				textAlign='left'>
				Datos de contacto
			</Divider>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Nombre'
						name='firstName'
						defaultValue={memberData.first_name}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Apellidos'
						name='lastName'
						defaultValue={memberData.last_name}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='DNI'
						name='dni'
						defaultValue={memberData.dni}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<DatePicker
						label='Fecha de nacimiento'
						name='birthDate'
						defaultValue={dayjs(memberData.birth_date)}
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
						defaultValue={memberData.phone_number}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Teléfono de emergéncia'
						name='emergencyPhone'
						defaultValue={memberData.emergency_phone}
					/>
				</Grid>
			</Grid>
			<TextField
				fullWidth
				label='Email'
				name='email'
				value={memberData.email}
				disabled
			/>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Select
						label='Género'
						value={gender}
						name='gender'
						defaultValue={memberData.gender}
						onChange={handleGender}
						fullWidth>
						<MenuItem value={"male"}>Hombre</MenuItem>
						<MenuItem value={"female"}>Mujer</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} md={6}></Grid>
			</Grid>
			<Divider
				sx={{ width: "100%", marginY: 2, fontSize: "0.8rem" }}
				textAlign='left'>
				Localización
			</Divider>
			<TextField
				fullWidth
				label='Dirección'
				name='address'
				defaultValue={memberData.address}
			/>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Select
						label='País'
						name='country'
						defaultValue={memberData.country || ""}
						fullWidth
						onChange={handleCountryChange}>
						{allCountries.map((country, index) => (
							<MenuItem key={index} value={country[1]}>
								{country[0]}
							</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid item xs={12} md={6}>
					<Select
						label='Localidad'
						name='town'
						defaultValue={memberData.town || ""}
						fullWidth>
						{selectedState.map((state, index) => (
							<MenuItem key={index} value={state[0]}>
								{state[0]}
							</MenuItem>
						))}
					</Select>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Código Postal'
						name='postalCode'
						defaultValue={memberData.postal_code}
					/>
				</Grid>
				<Grid item xs={12} md={6}></Grid>
			</Grid>
			<Divider
				sx={{ width: "100%", marginY: 2, fontSize: "0.8rem" }}
				textAlign='left'>
				Cuota
			</Divider>

			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Plan'
						name='plan'
						defaultValue={memberData.plan}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label='Status'
						name='status'
						defaultValue={memberData.status}
					/>
				</Grid>
			</Grid>
			<Typography variant='body2'>Miembro desde: {memberSinceDate}</Typography>
			<Button type='submit' variant='contained'>
				Actualizar
			</Button>
		</Stack>
	);
}
