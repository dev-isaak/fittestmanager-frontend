"use client";
import { Box, Button, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

export default function CreateCenter() {
	const [file, setFile] = useState(null);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log(data.get("centerName"), data.get("manager"));
	};

	const handleUploadFile = (newFile: any) => {
		setFile(newFile);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			maxWidth={400}
			sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<TextField
				required
				label='Center Name'
				name='centerName'
				variant='filled'
			/>
			<TextField required label='Manager' name='manager' variant='filled' />
			<MuiFileInput value={file} onChange={handleUploadFile} />
			<Button type='submit' color='primary' variant='contained'>
				Create
			</Button>
		</Box>
	);
}
