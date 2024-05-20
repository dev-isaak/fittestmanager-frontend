"use client";
import { Typography } from "@mui/material";
import PaperBoard from "../../components/PaperBoard";
import RoomsForm from "../components/RoomsForm";

export default function CreateRoom() {
	return (
		<PaperBoard>
			<Typography component='h1' variant='h3'>
				Crear nueva sala
			</Typography>
			<RoomsForm formType='CREATE' />
		</PaperBoard>
	);
}
