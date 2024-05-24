import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	Button,
	CircularProgress,
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
	updateSeminarInfo,
} from "@/redux/features/seminarsSlice";
import { useEffect } from "react";
import { fetchRoomsByFitnessCenter } from "@/redux/features/roomsSlice";

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
	return (
		<Formik
			initialValues={{
				seminarId: formType === "UPDATE" ? seminarData.id : "",
				seminarName: formType === "UPDATE" ? seminarData.name : "",
				seminarDescription:
					formType === "UPDATE" ? seminarData.description : "",
				color: formType === "UPDATE" ? seminarData.color : "#ffffff",
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
					<Divider>Horarios</Divider>
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
