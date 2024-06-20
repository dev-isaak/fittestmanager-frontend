import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	MenuItem,
	Stack,
	TextField,
} from "@mui/material";
import { Formik } from "formik";
import { MuiColorInput } from "mui-color-input";
import { seminarFormValidation } from "../validation/seminarFormValidation";
import {
	createNewSeminar,
	deleteSeminarById,
	updateSeminarInfo,
} from "@/redux/features/seminarsSlice";
import { useEffect, useState } from "react";
import { fetchRoomsByFitnessCenter } from "@/redux/features/roomsSlice";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type SeminarFormType = {
	seminarData?: any;
	formType: "CREATE" | "UPDATE";
	onCloseDialog?: any;
};

export default function SeminarForm({
	seminarData,
	formType,
	onCloseDialog,
}: SeminarFormType) {
	const dispatch = useAppDispatch();
	const [openDialog, setOpenDialog] = useState(false);
	const [repeatText, setRepeatText] = useState("");
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const rooms = useAppSelector((data) => data.roomsReducer.rooms);
	const isLoading = useAppSelector((data) => data.roomsReducer.loading);

	useEffect(() => {
		const centerId = currentCenter.id;
		if (!rooms.length) {
			dispatch(fetchRoomsByFitnessCenter(centerId));
		}
	}, [rooms]);

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleDeleteClass = () => {
		dispatch(deleteSeminarById(seminarData.id));
		setOpenDialog(false);
	};

	return (
		<Formik
			initialValues={{
				seminarId: formType === "UPDATE" ? seminarData.id : "",
				seminarName: formType === "UPDATE" ? seminarData.name : "",
				seminarDescription:
					formType === "UPDATE" ? seminarData.description : "",
				color: formType === "UPDATE" ? seminarData.color?.color : "#ffffff",
				limitCancellationTime:
					formType === "UPDATE" ? seminarData.limit_cancellation_time : "",
				bookingLimitPerDay:
					formType === "UPDATE" ? seminarData.booking_limit_per_day : "",
				minimumPersonsPerClass:
					formType === "UPDATE" ? seminarData.minimum_persons_per_class : "",
				limitTimeForBooking:
					formType === "UPDATE" ? seminarData.limit_time_for_booking : "",
				waitingListType:
					formType === "UPDATE" ? seminarData.waiting_list_type : "",
				calendarOrder: formType === "UPDATE" ? seminarData.calendar_order : "",
				roomId: formType === "UPDATE" ? seminarData.room_id : "",
				date: formType === "UPDATE" ? seminarData.date : "",
				time: formType === "UPDATE" ? `1999-04-12T${seminarData.time}` : "",
			}}
			onSubmit={(formData) => {
				if (formType === "UPDATE") {
					dispatch(updateSeminarInfo(formData));
				}
				if (formType === "CREATE") {
					dispatch(
						createNewSeminar({
							seminarData: formData,
							centerId: currentCenter.id,
						})
					);
				}
			}}
			validate={seminarFormValidation}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<Stack
					component='form'
					onSubmit={handleSubmit}
					gap={2}
					minWidth={400}
					alignItems='center'>
					<TextField
						sx={{ display: "none" }}
						name='seminarId'
						value={formType === "UPDATE" && values.seminarId}
					/>
					{formType === "UPDATE" && (
						<Stack sx={{ width: "100%", alignItems: "end" }}>
							<Button
								onClick={handleClickOpenDialog}
								color='error'
								variant='outlined'
								sx={{ width: "fit-content" }}>
								Eliminar
							</Button>
						</Stack>
					)}
					<Dialog open={openDialog} onClose={handleCloseDialog}>
						<DialogTitle>
							Estás seguro que quieres eliminar este horario?
						</DialogTitle>
						<DialogContent>
							<Box>
								Esta acción no se puede deshacer. <br />
								Si estás seguro que quieres eliminar este horario escribe
								&ldquo; {seminarData?.name} &ldquo;
							</Box>
							<Box sx={{ marginTop: 2 }}>
								<TextField
									value={repeatText}
									variant='filled'
									onChange={(e) => setRepeatText(e.target.value)}></TextField>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog} variant='outlined'>
								Cancelar
							</Button>
							<Button
								onClick={handleDeleteClass}
								color='error'
								variant='contained'
								disabled={seminarData?.name === repeatText ? false : true}>
								Eliminar
							</Button>
						</DialogActions>
					</Dialog>
					<TextField
						fullWidth
						label='Nombre del evento*'
						name='seminarName'
						onChange={handleChange}
						error={Boolean(
							errors.seminarName && touched.seminarName && errors.seminarName
						)}
						helperText={
							errors.seminarName && touched.seminarName && errors.seminarName
						}
						defaultValue={values.seminarName}
					/>
					<TextField
						multiline
						rows={3}
						fullWidth
						label='Descripción'
						name='seminarDescription'
						onChange={handleChange}
						defaultValue={values.seminarDescription}
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<MuiColorInput
								fullWidth
								format='hex'
								label='Color'
								value={values.color ? values.color : ""}
								onChange={(event: any) => {
									setFieldValue("color", event);
								}}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								select
								label='Orden en el calendario'
								value={values.calendarOrder}
								name='calendarOrder'
								onChange={handleChange}
								fullWidth>
								<MenuItem value={0}>0</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</TextField>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<TextField
								select
								label='Límite de reservas por día'
								value={values.bookingLimitPerDay}
								name='bookingLimitPerDay'
								onChange={handleChange}
								helperText='0 = Sin límite'
								fullWidth>
								<MenuItem value={0}>0</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								select
								label='Mínimo de personas por evento'
								value={values.minimumPersonsPerClass}
								name='minimumPersonsPerClass'
								onChange={handleChange}
								helperText='0 = Sin mínimo'
								fullWidth>
								<MenuItem value={0}>0</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</TextField>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<TextField
								label='Tiempo límite para reservar (minutos)'
								defaultValue={values.limitTimeForBooking}
								name='limitTimeForBooking'
								onChange={handleChange}
								helperText='0 = Sin límite'
								fullWidth></TextField>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								label='Tiempo límite para cancelar (minutos)'
								defaultValue={values.limitCancellationTime}
								name='limitCancellationTime'
								onChange={handleChange}
								helperText='0 = Sin límite'
								fullWidth></TextField>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<TextField
								select
								label='Tipo de lista de espera'
								value={values.waitingListType}
								name='waitingListType'
								onChange={handleChange}
								fullWidth>
								<MenuItem value={"auto"}>Apuntar automáticamente</MenuItem>
								<MenuItem value={"send_email"}>
									Enviar correo electrónico
								</MenuItem>
							</TextField>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<TextField
								select
								label='Sala'
								value={values.roomId}
								name='roomId'
								onChange={handleChange}
								fullWidth>
								{rooms.map((room, index) => (
									<MenuItem key={index} value={room.id}>
										{room.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<DatePicker
								onChange={(event) => setFieldValue("date", event)}
								label='Día*'
								name='date'
								value={dayjs(values.date)}
								format='DD/MM/YYYY'
								slotProps={{
									textField: {
										error: Boolean(errors.date && touched.date && errors.date),
										helperText: errors.date && touched.date && errors.date,
									},
								}}
								sx={{ width: "100%" }}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TimePicker
								onChange={(event) => setFieldValue("time", event)}
								ampm={false}
								minutesStep={15}
								label='Hora*'
								value={dayjs(values.time)}
								name='time'
								slotProps={{
									textField: {
										error: Boolean(errors.time && touched.time && errors.time),
										helperText: errors.time && touched.time && errors.time,
									},
								}}
								sx={{ width: "100%" }}
							/>
						</Grid>
					</Grid>
					<Stack flexDirection='row' gap={2} marginTop={4}>
						{isLoading ? (
							<CircularProgress />
						) : (
							<>
								<Button type='submit' variant='contained'>
									{formType === "CREATE" ? "Crear clase" : "Actualizar"}
								</Button>
								{formType === "UPDATE" && (
									<Button onClick={handleCloseButton} variant='outlined'>
										Cerrar
									</Button>
								)}
							</>
						)}
					</Stack>
				</Stack>
			)}
		</Formik>
	);
}
