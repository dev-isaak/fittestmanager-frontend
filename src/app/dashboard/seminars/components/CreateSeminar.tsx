"use client";
import PaperBoard from "@/app/dashboard/components/PaperBoard";
import { Typography } from "@mui/material";
import SeminarForm from "./SeminarForm";

export default function CreateSeminar() {
	return (
		<PaperBoard>
			<Typography component='h1' variant='h3'>
				Crear nuevo evento / seminario
			</Typography>
			<SeminarForm formType='CREATE' />
		</PaperBoard>
	);
}
