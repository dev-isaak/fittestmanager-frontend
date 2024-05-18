"use client";
import { Box, Typography } from "@mui/material";
import MemberForm from "./MemberForm";

export default function CreateMember() {
	return (
		<Box height='100%'>
			<Typography component='h2' variant='h4'>
				Alta de miembro
			</Typography>
			<MemberForm formType='CREATE' />
		</Box>
	);
}
