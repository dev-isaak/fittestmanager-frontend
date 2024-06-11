import { bookUserToClass } from "@/redux/features/classesScheduleSlice";
import { useAppDispatch } from "@/redux/hooks";
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
import { useEffect } from "react";
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

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	useEffect(() => {
		console.log(bookingData);
	}, []);

	const isFullClass = (usersBooked, limit) => {
		return limit - usersBooked <= 0 ? true : false;
	};

	return (
		<Formik
			initialValues={{
				date: dayjs(bookingData.currentDay).format(),
				hour: dayjs(bookingData.start).format(),
				fitnessCenterId: bookingData.fitness_center_id,
				scheduleId: bookingData.id,
				userId: userData.id,
				bookedPersons: bookingData.bookedPersons,
				limitPersons: bookingData.limit_persons,
			}}
			validate={inviteUsersValidation}
			onSubmit={(formData) => {
				if (isFullClass(formData.bookedPersons, formData.limitPersons)) {
					toast.info(
						"La clase está llena. Se te ha añadido a la lista de espera."
					);
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
