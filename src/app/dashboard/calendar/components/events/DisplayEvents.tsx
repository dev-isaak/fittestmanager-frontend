import { Box, Paper, Stack, Typography } from "@mui/material";
import {
	getBooking,
	getTotalBookings,
	getUniqueStartTimes,
	startOfWeek,
} from "../../lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {
	fetchBookingsByFitnessCenter,
	fetchClassesSchedulesByFitnessCenter,
} from "@/redux/features/classesScheduleSlice";
import dayjs from "dayjs";
import { getDayIndex } from "../../../classes/lib/utils";
import DialogForm from "@/app/ui/DialogForm";

export default function DisplayEvents({ currentDate }) {
	const [openDialog, setOpenDialog] = useState(false);
	const [eventData, setEventData] = useState({});

	const bookingsList = useAppSelector(
		(data) => data.classesScheduleReducer.bookings
	);

	const dispatch = useAppDispatch();
	const eventsSchedule = useAppSelector(
		(data) => data.classesScheduleReducer.schedule
	);
	const uniqueStartTimes = getUniqueStartTimes(eventsSchedule, currentDate);
	let firstWeekDay = startOfWeek(new Date(currentDate));
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const centerId = currentCenter.id;

	// This function is beeing used in Calendar component.
	const getWeeklyBookings = (
		startDate: Date,
		getPreviousDates: boolean = false
	) => {
		const startWeek = startOfWeek(new Date(startDate));
		const endWeek = new Date(startWeek);
		getPreviousDates
			? endWeek.setDate(startWeek.getDate() - 7)
			: endWeek.setDate(startWeek.getDate() + 7);

		dispatch(
			fetchBookingsByFitnessCenter({
				fitnessCenterId: currentCenter.id,
				startDate: startWeek,
				endDate: new Date(endWeek),
			})
		);
	};

	useEffect(() => {
		if (!bookingsList.length) {
			getWeeklyBookings(currentDate);
		}
	}, [bookingsList]);

	useEffect(() => {
		if (!eventsSchedule.length)
			dispatch(fetchClassesSchedulesByFitnessCenter(centerId));
	}, [eventsSchedule, currentCenter]);

	const handleOpenDialog = (data: any, currentDay, bookedPersons) => {
		setOpenDialog(true);
		setEventData({ ...data, currentDay, bookedPersons });
	};

	return (
		<Stack>
			{uniqueStartTimes.map((hour, hourIndex) => (
				<Stack key={hourIndex}>
					<Box
						sx={{
							background: "#8e95c24a",
							marginTop: 1,
							paddingLeft: 1,
						}}>
						<Typography sx={{ letterSpacing: ".1rem", fontSize: "1.1rem" }}>
							{hour}
						</Typography>
					</Box>
					<Stack
						sx={{
							flexDirection: "row",
							gap: 2,
							width: "100%",
							justifyContent: "space-between",
						}}>
						{/* 7 is de number of weekdays (Monday to Sunday) */}
						{Array.from({ length: 7 }).map((day, index) => {
							let currentDay = dayjs(firstWeekDay).add(index, "day");
							const dayEvents = eventsSchedule.filter(
								(event) =>
									getDayIndex(event.week_day) === index + 2 &&
									dayjs(event.start).format("HH:mm") === hour
							);

							return (
								<Box key={index} sx={{ minWidth: 150 }}>
									{/* ORDENAR LOS DAY EVENTS POR UN NUEVO CAMPO SORT QUE CONTENGA EL EVENTO */}
									{dayEvents.map((event, eventIndex) => {
										const bookedPersons = getTotalBookings(
											bookingsList,
											event,
											currentDay
										);
										return (
											<Paper
												onClick={() =>
													handleOpenDialog(event, currentDay, bookedPersons)
												}
												key={eventIndex}
												sx={{
													"&:hover": {
														cursor: "pointer",
													},
													marginTop: 1,
													padding: 1,
													width: "100%",
													background: event.class_id.color.color,
												}}>
												{event.is_cancelled && <Box>Evento cancelado</Box>}
												<Typography
													sx={{ textAlign: "center", fontWeight: 700 }}>
													{event.title}
												</Typography>
												<Typography sx={{ textAlign: "center" }}>
													{bookedPersons} de {event.limit_persons}
												</Typography>
											</Paper>
										);
									})}
								</Box>
							);
						})}
					</Stack>
				</Stack>
			))}
			<DialogForm
				type='EVENTS'
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				formData={eventData}
			/>
		</Stack>
	);
}
