import PaperBoard from "@/app/dashboard/components/PaperBoard";
import DataTable from "@/app/ui/DataTable";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassesByFitnessCenter } from "@/redux/features/classesSlice";
import Link from "next/link";

export default function ClassesTable() {
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const classes = useAppSelector((data) => data.classesReducer.classes);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!classes.length) {
				dispatch(fetchClassesByFitnessCenter(centerId));
			}
		}
	}, [currentFitnessCenter, dispatch]);
	return (
		<PaperBoard>
			<Typography component='h3' variant='h4'>
				Clases
			</Typography>
			<Box m={2}>
				<Button
					color='primary'
					variant='text'
					component={Link}
					href='/dashboard/classes/create-class'>
					<AddIcon /> Crear clase
				</Button>
			</Box>
			<DataTable
				data={classes}
				type='CLASSES'
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
				onClickOpenDialog
			/>
		</PaperBoard>
	);
}
