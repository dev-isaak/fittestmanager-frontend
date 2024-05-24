import { Button, Dialog, DialogTitle, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRoomsByFitnessCenter } from "@/redux/features/roomsSlice";
import { fetchClassesSchedulesByFitnessCenter } from "@/redux/features/classesScheduleSlice";
import DataTable from "@/app/ui/DataTable";
import NewScheduleForm from "./NewScheduleForm";

export default function HoursTable({ classId, eventColor, eventName }: any) {
	const dispatch = useAppDispatch();
	const [openDialog, setOpenDialog] = useState(false);
	const rooms = useAppSelector((data) => data.roomsReducer.rooms);
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const schedule = useAppSelector(
		(data) => data.classesScheduleReducer.schedule
	);
	const scheduleCreated = useAppSelector(
		(data) => data.classesScheduleReducer.created
	);

	useEffect(() => {
		const centerId = currentCenter.id;
		if (!rooms.length) {
			dispatch(fetchRoomsByFitnessCenter(centerId));
		}
	}, [rooms]);

	useEffect(() => {
		setOpenDialog(false);
	}, [scheduleCreated]);

	useEffect(() => {
		dispatch(fetchClassesSchedulesByFitnessCenter(classId));
	}, [dispatch]);

	const handleOpen = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};
	return (
		<>
			<Stack width='100%' flexDirection='row' justifyContent='space-between'>
				<Button variant='contained' onClick={handleOpen}>
					Añadir horario
				</Button>
				<Button disabled variant='outlined' color='error' onClick={handleOpen}>
					Eliminar
				</Button>
			</Stack>
			<DataTable
				data={schedule}
				type='SCHEDULES'
				titleCol={[
					{ name: "Día", align: "left" },
					{ name: "Inicio", align: "left" },
					{ name: "Fin", align: "left" },
					{ name: "Límite personas", align: "right" },
					{ name: "Válido desde", align: "right" },
					{ name: "Válido hasta", align: "right" },
					{ name: "Sala", align: "right" },
					{ name: "Coach", align: "right" },
				]}
				dataCol={[
					{ dbName: "week_day", align: "left" },
					{ dbName: "start", align: "center" },
					{ dbName: "end", align: "center" },
					{ dbName: "limit_persons", align: "right" },
					{ dbName: "since_day", align: "right" },
					{ dbName: "until_day", align: "right" },
					{ dbName: "room_id", align: "right" },
					{ dbName: "coach_id", align: "right" },
				]}
				onClickOpenDialog
			/>
			<Dialog onClose={handleClose} open={openDialog} maxWidth='md' fullWidth>
				<DialogTitle>Añadir nueva hora</DialogTitle>
				<NewScheduleForm
					formType='CREATE'
					eventName={eventName}
					eventColor={eventColor}
					classId={classId}
					currentCenterId={currentCenter.id}
					onCloseDialog={handleClose}
				/>
			</Dialog>
		</>
	);
}
