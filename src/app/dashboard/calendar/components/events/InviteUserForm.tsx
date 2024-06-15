import {
	bookUserToClass,
	bookUserToWaitingList,
} from "@/redux/features/classesScheduleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	Button,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { inviteUsersValidation } from "./validation/inviteUsersValidation";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";

type InviteUserFormType = {
	userData: any;
	onCloseDialog: any;
	bookingData: any;
};

export default function InviteUserForm({
	userData,
	onCloseDialog,
	bookingData,
}: InviteUserFormType) {
	const dispatch = useAppDispatch();
	const [currentSchedule, setCurrentSchedule] = useState(bookingData);

	const weeklySchedules = useAppSelector(
		(data) => data.classesScheduleReducer.weeklySchedules
	);
	const bookings = useAppSelector(
		(data) => data.classesScheduleReducer.bookings
	);

	useEffect(() => {
		const schedules = weeklySchedules.filter((schedule) => {
			return schedule.id === bookingData.id;
		});
		setCurrentSchedule(schedules[0]);
	}, [weeklySchedules]);

	useEffect(() => {
		console.log(bookings);
	}, [bookings]);

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	const isFullClass = (usersBooked, limit) => {
		return limit - usersBooked <= 0 ? true : false;
	};

	const isUserAlreadyBooked = (userId: number) => {
		return bookings.some((booking) => booking.member_id.id === userId);
	};

	return (
		<Formik
			initialValues={{
				date: dayjs(bookingData.currentDay).format(),
				hour: dayjs(bookingData.start).format(),
				fitnessCenterId: bookingData.fitness_center_id,
				scheduleId: bookingData.id,
				userId: userData.id,
				bookedPersons: bookingData.total_bookings,
				limitPersons: bookingData.limit_persons,
			}}
			validate={inviteUsersValidation}
			onSubmit={(formData) => {
				if (
					isFullClass(
						currentSchedule.total_bookings,
						currentSchedule.limit_persons
					) &&
					!isUserAlreadyBooked(formData.userId)
				) {
					dispatch(bookUserToWaitingList({ bookingData: formData }));
				} else if (isUserAlreadyBooked(formData.userId)) {
					toast.info("El usuario ya está apuntado en esta clase.");
				} else {
					dispatch(bookUserToClass({ bookingData: formData }));
				}
			}}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<Stack component='form' onSubmit={handleSubmit} gap={2} p={2}>
					<Typography variant='h5'>
						Apuntar {userData.first_name} {userData.last_name}?
					</Typography>
					<Stack
						sx={{
							border: "1px solid #333",
							width: "fit-content",
							padding: 2,
							borderRadius: 2,
							gap: 2,
						}}>
						<Typography>
							<strong>Día: </strong>
							{dayjs(bookingData.date_time).format("DD-MM-YYYY")}
						</Typography>
						<Typography>
							<strong>Hora: </strong>
							{dayjs(bookingData.date_time).format("HH:mm")}
						</Typography>
					</Stack>
					<RadioGroup
						defaultValue='useCredit'
						name='usesCredit'
						sx={{ width: "fit-content" }}>
						<FormControlLabel
							value='useCredit'
							control={<Radio />}
							label='Gasta crédito'
						/>
						<FormControlLabel
							value='dontUseCredit'
							control={<Radio />}
							label='No gasta crédito'
						/>
					</RadioGroup>
					<Stack
						sx={{ flexDirection: "row", justifyContent: "center", gap: 2 }}>
						<Button type='submit' variant='contained'>
							Apuntar usuario
						</Button>
						<Button onClick={handleCloseButton} variant='outlined'>
							Cerrar
						</Button>
					</Stack>
				</Stack>
			)}
		</Formik>
	);
}
