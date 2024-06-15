import {
	Avatar,
	Box,
	Button,
	Card,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import SearchInput from "@/app/ui/SearchInput";
import DataTable from "@/app/ui/DataTable";
import { fetchMembersByStatus } from "@/redux/features/membersSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import {
	cancelBooking,
	fetchBookingsByScheduleId,
	updateScheduleData,
} from "@/redux/features/classesScheduleSlice";
import TextEditor from "./TextEditor";

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
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const activeMembers = useAppSelector(
		(data) => data.membersReducer.searchActiveMembers
	);
	const bookings = useAppSelector(
		(data) => data.classesScheduleReducer.bookings
	);
	const weeklySchedules = useAppSelector(
		(data) => data.classesScheduleReducer.weeklySchedules
	);

	useEffect(() => {
		dispatch(fetchBookingsByScheduleId(bookingData.id));

		checkIfCurrentEventIsOutdated();
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

	const handleCancelUserBooking = (booking) => {
		dispatch(cancelBooking({ booking: booking }));
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
					}}>
					<Typography variant='h4'>
						{currentSchedule.title} -{" "}
						{dayjs(currentSchedule.date_time).format("HH:mm")}
					</Typography>
					<Divider></Divider>
					<Typography variant='h5' sx={{ textAlign: "center" }}>
						{dayjs(currentSchedule.date_time).format("DD/MM/YYYY")}
					</Typography>
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
			<Divider>Usuarios apuntados</Divider>
			{currentSchedule.limit_persons - currentSchedule.total_bookings === 0 && (
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

			{currentSchedule.limit_persons - currentSchedule.total_bookings > 1 && (
				<Typography variant='h5' color='success'>
					{currentSchedule.limit_persons - currentSchedule.total_bookings}{" "}
					plazas libres
				</Typography>
			)}
			<Stack
				sx={{
					width: "100%",
					gap: 4,
					flexWrap: "wrap",
					justifyContent: "flex-start",
					flexDirection: "row",
					padding: 2,
				}}>
				{bookings.length > 0 ? (
					bookings.map((booking, index: number) => (
						<Card
							key={index}
							sx={{
								paddingY: 2,
								paddingLeft: 2,
								paddingRight:
									currentSchedule.is_cancelled || isEventOutdated ? 2 : 0,
								width: 300,
								background: "#414C63",
								color: "#D0D0D0",
								borderRadius: 2,
							}}>
							<Stack
								sx={{
									gap: 2,
									flexDirection: "row",
									justifyContent: "space-between",
								}}>
								<Avatar
									src={booking.member_id.photo}
									sx={{ width: 80, height: 80 }}
								/>
								<Typography sx={{ fontWeight: 700 }}>
									{booking.member_id.first_name} {booking.member_id.last_name}
								</Typography>
								{!currentSchedule.is_cancelled && !isEventOutdated && (
									<Box sx={{ height: "100%", marginTop: -2 }}>
										<IconButton
											onClick={() => handleCancelUserBooking(booking)}>
											<CancelIcon
												sx={{ width: 30, height: 30, color: "#dadada" }}
											/>
										</IconButton>
									</Box>
								)}
							</Stack>
						</Card>
					))
				) : (
					<Card
						sx={{
							padding: 2,
							width: 300,
							background: "#f5f5f5",
							color: "#adadad",
							borderRadius: 2,
						}}>
						<Stack
							sx={{
								gap: 2,
								flexDirection: "row",
								justifyContent: "space-between",
							}}>
							<Typography sx={{ fontWeight: 700 }}>
								No hay nadie apuntado en esta clase
							</Typography>
						</Stack>
					</Card>
				)}
			</Stack>
			<Divider>Lista de espera</Divider>
			<Card
				sx={{
					padding: 2,
					margin: 2,
					width: 300,
					background: "#f5f5f5",
					color: "#adadad",
					borderRadius: 2,
				}}>
				<Stack
					sx={{
						gap: 2,
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<Typography sx={{ fontWeight: 700 }}>
						No hay nadie en lista de espera
					</Typography>
				</Stack>
			</Card>
			<Divider>Cancelaciones</Divider>
			<Card
				sx={{
					padding: 2,
					margin: 2,
					width: 300,
					background: "#f5f5f5",
					color: "#adadad",
					borderRadius: 2,
				}}>
				<Stack
					sx={{
						gap: 2,
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<Typography sx={{ fontWeight: 700 }}>
						No hay ninguna cancelación
					</Typography>
				</Stack>
			</Card>
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
