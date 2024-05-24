import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	MenuItem,
	Paper,
	Stack,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import { Formik } from "formik";
import { classFormValidation } from "../validation/classFormValidation";
import { MuiColorInput } from "mui-color-input";
import { createNewClass, updateClassInfo } from "@/redux/features/classesSlice";
import HoursTable from "./HoursTable";

type RoomFormType = {
	classData?: any;
	formType: "CREATE" | "UPDATE";
	onCloseDialog?: any;
};

export default function ClassForm({
	classData,
	formType,
	onCloseDialog,
}: RoomFormType) {
	const dispatch = useAppDispatch();
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const isLoading = useAppSelector((data) => data.roomsReducer.loading);

	const handleCloseButton = () => {
		onCloseDialog(false);
	};
	return (
		<Formik
			initialValues={{
				classId: formType === "UPDATE" ? classData.id : "",
				className: formType === "UPDATE" ? classData.name : "",
				classDescription: formType === "UPDATE" ? classData.description : "",
				color: formType === "UPDATE" ? classData.color : "#ffffff",
				limitCancellationTime:
					formType === "UPDATE" ? classData.limit_cancellation_time : "",
				bookingLimitPerDay:
					formType === "UPDATE" ? classData.booking_limit_per_day : "",
				minimumPersonsPerClass:
					formType === "UPDATE" ? classData.minimum_persons_per_class : "",
				limitTimeForBooking:
					formType === "UPDATE" ? classData.limit_time_for_booking : "",
				waitingListType:
					formType === "UPDATE" ? classData.waiting_list_type : "",
				calendarOrder: formType === "UPDATE" ? classData.calendar_order : "",
				roomId: formType === "UPDATE" ? classData.room_id : "",
			}}
			onSubmit={(formData) => {
				if (formType === "UPDATE") {
					dispatch(updateClassInfo(formData));
				}
				if (formType === "CREATE") {
					dispatch(
						createNewClass({ classData: formData, centerId: currentCenter.id })
					);
				}
			}}
			validate={classFormValidation}>
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
						name='classId'
						value={formType === "UPDATE" && values.classId}
					/>
					<TextField
						fullWidth
						label='Nombre de la clase*'
						name='className'
						onChange={handleChange}
						error={Boolean(
							errors.className && touched.className && errors.className
						)}
						helperText={
							errors.className && touched.className && errors.className
						}
						defaultValue={values.className}
					/>
					<TextField
						multiline
						rows={3}
						fullWidth
						label='Descripción'
						name='classDescription'
						onChange={handleChange}
						defaultValue={values.classDescription}
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
								label='Mínimo de personas por clase'
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
					<HoursTable
						classId={values.classId}
						eventColor={values.color}
						eventName={values.className}
					/>
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
