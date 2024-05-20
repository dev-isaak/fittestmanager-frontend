"use client";
import PaperBoard from "@/app/dashboard/components/PaperBoard";
import { Typography } from "@mui/material";
import ClassForm from "../components/ClassForm";

export default function CreateClass() {
	return (
		<PaperBoard>
			<Typography component='h1' variant='h3'>
				Crear nueva clase
			</Typography>
			<ClassForm formType='CREATE' />
		</PaperBoard>
	);
}
