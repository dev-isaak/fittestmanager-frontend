import {
	createNewClassSchedule,
	updateClassScheduleInfo,
} from "@/redux/features/classesScheduleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	Button,
	CircularProgress,
	Grid,
	MenuItem,
	Stack,
	TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import dayjs, { Dayjs } from "dayjs";
import { hoursTableValidation } from "../validation/hoursTableValidation";
import { useEffect } from "react";
import { fetchCoachesByFitnessCenter } from "@/redux/features/coachesSlice";

type NewScheduleFormType = {
	eventName?: string;
	eventColor?: string;
	classId?: string;
	currentCenterId?: number;
	formType: "CREATE" | "UPDATE";
	scheduleData?: any;
	onCloseDialog?: any;
};

export default function NewScheduleForm({
	eventName,
	eventColor,
	classId,
	currentCenterId,
	scheduleData,
	onCloseDialog,
	formType,
}: NewScheduleFormType) {
	const dispatch = useAppDispatch();
	const rooms = useAppSelector((data) => data.roomsReducer.rooms);
	const isLoading = useAppSelector(
		(data) => data.classesScheduleReducer.loading
	);
	const coaches = useAppSelector((data) => data.coachesReducer.coaches);
	const currentFitnessCenterId = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter.id
	);
	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	useEffect(() => {
		if (!coaches.length) {
			dispatch(fetchCoachesByFitnessCenter(currentFitnessCenterId));
		}
	}, []);

	return (
		<Formik
			initialValues={{
				scheduleId: formType === "UPDATE" ? scheduleData.event_id : "",
				weekDay: formType === "UPDATE" ? scheduleData.week_day : "",
				roomId: formType === "UPDATE" ? scheduleData.room_id : "",
				sinceHour: formType === "UPDATE" ? scheduleData.start : "",
				toHour: formType === "UPDATE" ? scheduleData.end : "",
				sinceDate: formType === "UPDATE" ? scheduleData.since_day : "",
				toDate: formType === "UPDATE" ? scheduleData.until_day : "",
				coach: formType === "UPDATE" ? scheduleData.coach_id : "",
				limitPersons: formType === "UPDATE" ? scheduleData.limit_persons : "",
			}}
			onSubmit={(formData) => {
				if (formType === "UPDATE") {
					dispatch(
						updateClassScheduleInfo({
							classData: formData,
						})
					);
				}
				if (formType === "CREATE")
					dispatch(
						createNewClassSchedule({
							classData: formData,
							eventName: eventName,
							eventColor: eventColor,
							classId: classId,
							currentCenterId: currentCenterId,
						})
					);
			}}
			validate={hoursTableValidation}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<Stack component='form' onSubmit={handleSubmit} gap={2} p={2}>
					<TextField
						sx={{ display: "none" }}
						name='scheduleId'
						value={formType === "UPDATE" && scheduleData.schedule_id}
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} gap={2}>
							<TextField
								fullWidth
								select
								label='Día*'
								name='weekDay'
								error={Boolean(
									errors.weekDay && touched.weekDay && errors.weekDay
								)}
								helperText={errors.weekDay && touched.weekDay && errors.weekDay}
								value={values.weekDay}
								onChange={handleChange}>
								<MenuItem value='monday'>Lunes</MenuItem>
								<MenuItem value='thuesday'>Martes</MenuItem>
								<MenuItem value='wednesday'>Miércoles</MenuItem>
								<MenuItem value='thursday'>Jueves</MenuItem>
								<MenuItem value='friday'>Viernes</MenuItem>
								<MenuItem value='saturday'>Sábado</MenuItem>
								<MenuItem value='sunday'>Domingo</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								select
								label='Sala*'
								value={values.roomId}
								name='roomId'
								error={Boolean(
									errors.roomId && touched.roomId && errors.roomId
								)}
								helperText={errors.roomId && touched.roomId && errors.roomId}
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
						<Grid item xs={12} md={6}>
							<TimePicker
								onChange={(event) => setFieldValue("sinceHour", event)}
								ampm={false}
								minutesStep={15}
								label='Desde*'
								value={dayjs(values.sinceHour)}
								name='sinceHour'
								slotProps={{
									textField: {
										error: Boolean(
											errors.sinceHour && touched.sinceHour && errors.sinceHour
										),
										helperText:
											errors.sinceHour && touched.sinceHour && errors.sinceHour,
									},
								}}
								sx={{ width: "100%" }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TimePicker
								onChange={(event) => setFieldValue("toHour", event)}
								ampm={false}
								minutesStep={15}
								label='Hasta*'
								name='toHour'
								value={dayjs(values.toHour)}
								slotProps={{
									textField: {
										error: Boolean(
											errors.toHour && touched.toHour && errors.toHour
										),
										helperText:
											errors.toHour && touched.toHour && errors.toHour,
									},
								}}
								sx={{ width: "100%" }}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<DatePicker
								onChange={(event) => setFieldValue("sinceDate", event)}
								label='Desde día*'
								name='sinceDate'
								value={dayjs(values.sinceDate)}
								format='DD/MM/YYYY'
								slotProps={{
									textField: {
										error: Boolean(
											errors.sinceDate && touched.sinceDate && errors.sinceDate
										),
										helperText:
											errors.sinceDate && touched.sinceDate && errors.sinceDate,
									},
								}}
								sx={{ width: "100%" }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								onChange={(event) => setFieldValue("toDate", event)}
								label='Hasta día*'
								name='toDate'
								value={dayjs(values.toDate)}
								format='DD/MM/YYYY'
								slotProps={{
									textField: {
										error: Boolean(
											errors.toDate && touched.toDate && errors.toDate
										),
										helperText:
											errors.toDate && touched.toDate && errors.toDate,
									},
								}}
								sx={{ width: "100%" }}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label='Límite de personas'
								name='limitPersons'
								value={values.limitPersons}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								select
								label='Coach*'
								value={values.coach}
								name='coach'
								onChange={handleChange}
								fullWidth>
								{coaches.map((coach, index) => {
									return (
										<MenuItem key={index} value={coach.id}>
											{coach.first_name} {coach.last_name}
										</MenuItem>
									);
								})}
							</TextField>
						</Grid>
					</Grid>
					<Stack
						flexDirection='row'
						gap={2}
						marginTop={4}
						justifyContent='center'>
						{isLoading ? (
							<CircularProgress />
						) : (
							<>
								<Button type='submit' variant='contained'>
									{formType === "CREATE" ? "Añadir" : "Actualizar"}
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
