import {
	Box,
	Button,
	Divider,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import SearchInput from "@/app/ui/SearchInput";
import DataTable from "@/app/ui/DataTable";
import { fetchMembersByStatus } from "@/redux/features/membersSlice";
import {
	fetchBookingsByScheduleId,
	fetchCancellationListByScheduleId,
	fetchWaitingListByScheduleId,
	updateScheduleData,
} from "@/redux/features/classesScheduleSlice";
import TextEditor from "./TextEditor";
import UserList from "../UserList";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { fetchCoachesByFitnessCenter } from "@/redux/features/coachesSlice";

type EventsFormType = {
	bookingData?: any;
	onCloseDialog: any;
};

export default function BookingsForm({
	bookingData,
	onCloseDialog,
}: EventsFormType) {
	const dispatch = useAppDispatch();
	const [isEventOutdated, setIsEventOutdated] = useState(false);
	const [currentSchedule, setCurrentSchedule] = useState(bookingData);
	const [editLimit, setEditLimit] = useState(false);
	const [editCoach, setEditCoach] = useState(false);
	const [limitPersonsOnClass, setLimitPersonsOnClass] = useState(
		currentSchedule.limit_persons
	);
	const [coachOnClass, setCoachOnClass] = useState(currentSchedule.coach_id.id);
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const activeMembers = useAppSelector(
		(data) => data.membersReducer.searchActiveMembers
	);
	const bookings = useAppSelector(
		(data) => data.classesScheduleReducer.bookings
	);
	const waitingList = useAppSelector(
		(data) => data.classesScheduleReducer.waitingList
	);
	const cancellationList = useAppSelector(
		(data) => data.classesScheduleReducer.cancellations
	);
	const weeklySchedules = useAppSelector(
		(data) => data.classesScheduleReducer.weeklySchedules
	);
	const coaches = useAppSelector((data) => data.coachesReducer.coaches);

	useEffect(() => {
		dispatch(fetchBookingsByScheduleId(bookingData.id));

		checkIfCurrentEventIsOutdated();

		if (!coaches.length) {
			dispatch(fetchCoachesByFitnessCenter(currentFitnessCenter.id));
		}
	}, []);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!activeMembers.length) {
				dispatch(fetchMembersByStatus({ centerId, status: "active" }));
			}
		}
	}, [currentFitnessCenter]);

	useEffect(() => {
		const schedules = weeklySchedules.filter((schedule) => {
			return schedule.id === bookingData.id;
		});
		setCurrentSchedule(schedules[0]);
	}, [weeklySchedules]);

	useEffect(() => {
		if (currentSchedule) {
			dispatch(fetchWaitingListByScheduleId(currentSchedule.id));
			dispatch(fetchCancellationListByScheduleId(currentSchedule.id));
		}
	}, [currentSchedule]);

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	const checkIfCurrentEventIsOutdated = () => {
		const now = dayjs();
		if (dayjs(bookingData.date_time).isBefore(now)) {
			setIsEventOutdated(true);
		} else {
			setIsEventOutdated(false);
		}
	};

	const handleCancelClass = () => {
		const data = { ...currentSchedule, is_cancelled: true };
		dispatch(updateScheduleData({ bookingData: data }));
	};

	const handleReopenClass = () => {
		const data = { ...currentSchedule, is_cancelled: false };
		dispatch(updateScheduleData({ bookingData: data }));
	};

	const handleUpdateLimitPersonsOnClass = () => {
		const data = { ...currentSchedule, limit_persons: limitPersonsOnClass };
		dispatch(updateScheduleData({ bookingData: data }));
		setEditLimit(false);
	};

	const handleChangeEditLimitPersonsOnClass = (event) => {
		setLimitPersonsOnClass(event.target.value);
	};

	const handleEditCoach = () => {
		const data = { ...currentSchedule, coach_id: coachOnClass };
		dispatch(updateScheduleData({ bookingData: data }));
		setEditCoach(false);
	};

	const handleChangeCoach = (event) => {
		setCoachOnClass(event.target.value);
	};

	const RenderEditLimitPersons = ({ personsLimit }) => {
		return (
			<>
				{!editLimit ? (
					<> {personsLimit}</>
				) : (
					<>
						<TextField
							value={limitPersonsOnClass}
							variant='standard'
							onChange={handleChangeEditLimitPersonsOnClass}
							sx={{
								width: 50,
								marginLeft: 2,
								fontSize: "24px",
							}}
						/>
						<IconButton onClick={handleUpdateLimitPersonsOnClass}>
							<CheckIcon color='success' />
						</IconButton>
					</>
				)}
			</>
		);
	};

	const RenderEditCoach = ({ coach }) => {
		return (
			<>
				{!editCoach ? (
					<Stack>
						{coach.first_name} {coach.last_name}
					</Stack>
				) : (
					<>
						<TextField
							select
							variant='filled'
							label='Coach*'
							value={coachOnClass}
							name='coach'
							onChange={handleChangeCoach}>
							{coaches.map((coach, index) => {
								return (
									<MenuItem key={index} value={coach.id}>
										{coach.first_name} {coach.last_name}
									</MenuItem>
								);
							})}
						</TextField>
						<IconButton onClick={handleEditCoach}>
							<CheckIcon color='success' />
						</IconButton>
					</>
				)}
			</>
		);
	};

	return (
		<>
			{currentSchedule.is_cancelled && (
				<Box
					sx={{
						display: "flex",
						gap: 4,
						alignItems: "center",
						justifyContent: "space-between",
						background: "#ff00003d",
						width: "100%",
						marginBottom: 2,
						padding: 2,
					}}>
					<Typography sx={{ fontWeight: 700 }}>Clase cancelada.</Typography>
					{!isEventOutdated && (
						<Button onClick={handleReopenClass} variant='outlined'>
							Abrir de nuevo
						</Button>
					)}
				</Box>
			)}
			{isEventOutdated && (
				<Box
					sx={{
						display: "flex",
						gap: 4,
						alignItems: "center",
						justifyContent: "space-between",
						background: "#ffa50045",
						width: "100%",
						marginBottom: 2,
						padding: 2,
					}}>
					<Typography sx={{ fontWeight: 700 }}>
						Esta clase ya no está disponible.
					</Typography>
				</Box>
			)}
			<Stack
				sx={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-between",
				}}>
				<Paper
					sx={{
						background: "#f5f5f5",
						color: "#898989",
						padding: 2,
						margin: 2,
						width: 300,
					}}>
					<Typography variant='h4'>
						{currentSchedule.title} -{" "}
						{dayjs(currentSchedule.date_time).format("HH:mm")}
					</Typography>
					<Divider></Divider>
					<Typography variant='h5' sx={{ textAlign: "center" }}>
						{dayjs(currentSchedule.date_time).format("DD/MM/YYYY")}
					</Typography>
					<Stack
						sx={{
							flexDirection: "row",
							alignItems: editCoach ? "end" : "center",
							justifyContent: "left",
							marginTop: 2,
						}}>
						{editCoach ? "" : <strong>Coach: &nbsp;</strong>}
						<RenderEditCoach coach={currentSchedule.coach_id} />
						{!isEventOutdated && !currentSchedule.is_cancelled && (
							<IconButton onClick={() => setEditCoach(!editCoach)}>
								{!editCoach ? <EditIcon /> : <CloseIcon color='error' />}
							</IconButton>
						)}
					</Stack>
				</Paper>
				{!currentSchedule.is_cancelled && !isEventOutdated && (
					<Button
						onClick={handleCancelClass}
						variant='outlined'
						color='error'
						sx={{ width: "fit-content", height: "fit-content" }}>
						Cancelar Clase
					</Button>
				)}
			</Stack>
			<TextEditor
				eventIsOutdated={isEventOutdated}
				eventIsCancelled={currentSchedule.is_cancelled}
				eventData={currentSchedule}
			/>
			{currentSchedule.limit_persons - currentSchedule.total_bookings <= 0 && (
				<Typography variant='h5' color='error'>
					No quedan plazas libres
				</Typography>
			)}
			{currentSchedule.limit_persons - currentSchedule.total_bookings === 1 && (
				<Typography variant='h5' color='warning'>
					{currentSchedule.limit_persons - currentSchedule.total_bookings} plaza
					libre
				</Typography>
			)}
			<Stack sx={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
				{currentSchedule.limit_persons - currentSchedule.total_bookings > 1 && (
					<Typography variant='h5' color='success'>
						{currentSchedule.limit_persons - currentSchedule.total_bookings}{" "}
						plazas libres de
						<RenderEditLimitPersons
							personsLimit={currentSchedule.limit_persons}
						/>
					</Typography>
				)}
				{!isEventOutdated && !currentSchedule.is_cancelled && (
					<IconButton
						aria-label='edit'
						onClick={() => setEditLimit(!editLimit)}>
						{!editLimit ? <EditIcon /> : <CloseIcon color='error' />}
					</IconButton>
				)}
			</Stack>
			<UserList
				type='BOOKINGS'
				title='Usuarios apuntados'
				userList={bookings}
				color='#414C63'
				isCancelled={currentSchedule.is_cancelled}
				isOutdated={isEventOutdated}
				expanded
			/>
			<UserList
				type='WAITING_LIST'
				title='Lista de espera'
				userList={waitingList}
				color='#758097'
				isCancelled={currentSchedule.is_cancelled}
				isOutdated={isEventOutdated}
			/>
			<UserList
				type='CANCELLATIONS'
				title='Cancelaciones'
				userList={cancellationList}
				color='#4e5054'
				isCancelled={currentSchedule.is_cancelled}
				isOutdated={isEventOutdated}
			/>
			{!currentSchedule.is_cancelled && !isEventOutdated && (
				<>
					<Divider>Apuntar usuario</Divider>
					<SearchInput type='ACTIVE_MEMBERS' />
					<DataTable
						onClickOpenDialog
						data={activeMembers}
						type='INVITE_MEMBER'
						bookingData={currentSchedule}
						titleCol={[
							{ name: "Avatar", align: "left" },
							{ name: "Name", align: "left" },
							{ name: "Email", align: "left" },
							{ name: "Status", align: "center" },
						]}
						dataCol={[
							{ dbName: "photo", align: "left" },
							{ dbName: "first_name", align: "left" },
							{ dbName: "email", align: "left" },
							{ dbName: "status", align: "center" },
						]}
					/>
					<Stack
						sx={{
							width: "100%",
							flexDirection: "row",
							justifyContent: "end",
						}}>
						<Button variant='contained'>Apuntar invitado</Button>
					</Stack>
				</>
			)}

			<Stack
				sx={{
					flexDirection: "row",
					justifyContent: "center",
					gap: 2,
					marginTop: 2,
				}}>
				<Button onClick={handleCloseButton} variant='outlined'>
					Cerrar
				</Button>
			</Stack>
		</>
	);
}
