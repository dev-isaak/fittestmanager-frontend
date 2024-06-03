import {
	Avatar,
	Button,
	Card,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import SearchInput from "@/app/ui/SearchInput";
import DataTable from "@/app/ui/DataTable";
import { fetchMembersByStatus } from "@/redux/features/membersSlice";

type EventsFormType = {
	bookingData?: any;
	onCloseDialog: any;
};

export default function BookingsForm({
	bookingData,
	onCloseDialog,
}: EventsFormType) {
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const members = useAppSelector((data) => data.membersReducer.searchMembers);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!members.length) {
				dispatch(fetchMembersByStatus({ centerId, status: "active" }));
			}
		}
	}, [currentFitnessCenter, dispatch]);

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	return (
		<>
			<Stack sx={{ width: "100%", alignItems: "end" }}>
				<Button variant='contained' sx={{ width: "fit-content" }}>
					Cancelar Clase
				</Button>
			</Stack>
			<Divider>Usuarios apuntados</Divider>
			{bookingData.limit_persons - bookingData.bookedPersons === 0 && (
				<Typography variant='h5' color='error'>
					No quedan plazas libres
				</Typography>
			)}
			{bookingData.limit_persons - bookingData.bookedPersons === 1 && (
				<Typography variant='h5' color='warning'>
					{bookingData.limit_persons - bookingData.bookedPersons} plaza libres
				</Typography>
			)}

			{bookingData.limit_persons - bookingData.bookedPersons > 1 && (
				<Typography variant='h5' color='success'>
					{bookingData.limit_persons - bookingData.bookedPersons} plazas libres
				</Typography>
			)}

			<Stack sx={{ width: "100%", gap: 2, flexDirection: "row", padding: 2 }}>
				{bookingData.bookings.length &&
					bookingData.bookings.map((booking, index: number) => {
						if (
							bookingData.event_id === booking.schedule_id &&
							dayjs(bookingData.start).format("HH:mm") ===
								dayjs(booking.hour).format("HH:mm") &&
							dayjs(bookingData.currentDay).format("YYYY-MM-DD") ===
								booking.date
						) {
							return (
								<Card
									key={index}
									sx={{
										padding: 2,
										minWidth: 270,
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
											src={booking.members.photo}
											sx={{ width: 80, height: 80 }}
										/>
										<Typography sx={{ fontWeight: 700 }}>
											{booking.members.first_name} {booking.members.last_name}
										</Typography>
									</Stack>
								</Card>
							);
						}
					})}
			</Stack>
			<Divider>Lista de espera</Divider>
			<Divider>Cancelaciones</Divider>
			<Divider>Apuntar usuario</Divider>

			<SearchInput type='MEMBERS' />
			<Stack
				sx={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "end",
					margin: 2,
				}}>
				<Button variant='contained'>Apuntar invitado</Button>
			</Stack>
			{/* PASAR MEMBERS Y BOOKINGDATA AL DIALOG */}
			<DataTable
				onClickOpenDialog
				data={members}
				type='INVITE_MEMBER'
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
