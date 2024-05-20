"use client";
import { Typography } from "@mui/material";
import PaperBoard from "../../components/PaperBoard";
import CoachForm from "../components/CoachForm";

export default function CreateCoach() {
	return (
		<PaperBoard>
			<Typography component='h2' variant='h4'>
				Alta de coach
			</Typography>
			<CoachForm formType='CREATE' />
		</PaperBoard>
	);
}
