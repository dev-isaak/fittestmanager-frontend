import { Box, Button, Typography } from "@mui/material";
import PaperBoard from "../../components/PaperBoard";
import DataTable from "@/app/ui/DataTable";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchSeminarsByFitnessCenter } from "@/redux/features/seminarsSlice";

export default function SeminarsTable() {
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const seminars = useAppSelector((data) => data.seminarsReducer.seminars);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!seminars.length) {
				dispatch(fetchSeminarsByFitnessCenter(centerId));
			}
		}
	}, [currentFitnessCenter, dispatch]);
	return (
		<PaperBoard>
			<Typography component='h3' variant='h4'>
				Seminarios / Eventos
			</Typography>
			<Box m={2}>
				<Button
					color='primary'
					variant='text'
					component={Link}
					href='/dashboard/seminars/create-seminar'>
					<AddIcon /> Añadir seminario / evento
				</Button>
			</Box>
			<DataTable
				onClickOpenDialog
				data={seminars}
				type='SEMINARS'
				titleCol={[
					{ name: "Evento", align: "left" },
					{ name: "Sala", align: "left" },
					{ name: "Color", align: "right" },
				]}
				dataCol={[
					{ dbName: "name", align: "left" },
					{ dbName: "room_id", align: "center" },
					{ dbName: "color", align: "right" },
				]}
			/>
		</PaperBoard>
	);
}
