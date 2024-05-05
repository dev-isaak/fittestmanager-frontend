"use client";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function CreateMember() {
	const [gender, setGender] = useState();
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log(data.get("firstName"), data.get("birthDate"));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				maxWidth={400}
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					required
					label='Member First Name'
					name='firstName'
					variant='filled'
				/>
				<TextField
					required
					label='Member Second Name'
					name='secondName'
					variant='filled'
				/>
				<Select required value={gender} label='Gender' variant='filled'>
					<MenuItem value={1}>Male</MenuItem>
					<MenuItem value={2}>Female</MenuItem>
				</Select>
				<TextField required label='Email' name='email' variant='filled' />
				<DatePicker label='Birth Date' name='birthDate' format='DD-MM-YYYY' />
				<TextField required label='Phone' name='phone' variant='filled' />
				<TextField required label='Street' name='street' variant='filled' />
				<TextField
					required
					label='Postal Code'
					name='postalCode'
					variant='filled'
				/>
				<TextField
					required
					label='Fitness Center'
					name='fitnessCenter'
					variant='filled'
				/>
				<TextField required label='Plan' name='plan' variant='filled' />
				<Button type='submit' color='primary' variant='contained'>
					Create
				</Button>
			</Box>
		</LocalizationProvider>
	);
}
