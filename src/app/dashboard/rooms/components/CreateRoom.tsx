"use client";
import { Typography } from "@mui/material";
import RoomsForm from "./RoomsForm";
import PaperBoard from "../../components/PaperBoard";

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
