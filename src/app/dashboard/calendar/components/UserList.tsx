import {
	Accordion,
	AccordionSummary,
	Avatar,
	Box,
	Card,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "@/redux/hooks";
import {
	bookUserToCancellationList,
	cancelBooking,
	cancelUserFromCancellationList,
	cancelUserFromWaitingList,
} from "@/redux/features/classesScheduleSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IUserList {
	type: "BOOKINGS" | "WAITING_LIST" | "CANCELLATIONS";
	title: string;
	userList: any[];
	color: string;
	isCancelled: boolean;
	isOutdated: boolean;
	expanded?: boolean;
}

export default function UserList({
	type,
	title,
	userList,
	color,
	isCancelled,
	isOutdated,
	expanded,
}: IUserList) {
	const dispatch = useAppDispatch();

	const handleDeleteFromList = (user) => {
		if (type === "BOOKINGS") {
			dispatch(bookUserToCancellationList({ bookingData: user }));
			dispatch(cancelBooking({ booking: user }));
		}

		if (type === "WAITING_LIST") {
			dispatch(cancelUserFromWaitingList({ booking: user }));
		}

		if (type === "CANCELLATIONS") {
			dispatch(cancelUserFromCancellationList({ booking: user }));
		}
	};

	return (
		<>
			<Accordion
				elevation={0}
				defaultExpanded={expanded}
				sx={{ background: "rgba(65, 76, 99, .1)", marginY: 2 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					{title}
				</AccordionSummary>
				<Stack
					sx={{
						width: "100%",
						gap: 4,
						flexWrap: "wrap",
						justifyContent: "flex-start",
						flexDirection: "row",
						padding: 2,
					}}>
					{userList.length ? (
						userList.map((user, index: number) => (
							<Card
								key={index}
								sx={{
									paddingY: 2,
									paddingLeft: 2,
									paddingRight: isCancelled || isOutdated ? 2 : 0,
									width: 300,
									background: color,
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
										src={user.member_id.photo}
										sx={{ width: 80, height: 80 }}
									/>
									<Typography sx={{ fontWeight: 700 }}>
										{user.member_id.first_name} {user.member_id.last_name}
									</Typography>
									{!isCancelled && !isOutdated && (
										<Box sx={{ height: "100%", marginTop: -2 }}>
											<IconButton onClick={() => handleDeleteFromList(user)}>
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
								{type === "BOOKINGS" && (
									<Typography sx={{ fontWeight: 700 }}>
										No hay ninguna reserva.
									</Typography>
								)}
								{type === "CANCELLATIONS" && (
									<Typography sx={{ fontWeight: 700 }}>
										No hay ninguna cancelación.
									</Typography>
								)}
								{type === "WAITING_LIST" && (
									<Typography sx={{ fontWeight: 700 }}>
										No hay nadie en lista de espera .
									</Typography>
								)}
							</Stack>
						</Card>
					)}
				</Stack>
			</Accordion>
		</>
	);
}
