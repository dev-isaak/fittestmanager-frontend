import { Box, Paper, Stack, Typography } from "@mui/material";
import {
	getTotalBookings,
	getUniqueStartTimes,
	startOfWeek,
} from "../lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import {
	fetchBookingsByFitnessCenter,
	fetchClassesSchedulesByFitnessCenter,
} from "@/redux/features/classesScheduleSlice";
import dayjs from "dayjs";
import { getDayIndex } from "../../classes/lib/utils";

export default function DisplayEvents({ currentDate }) {
	const dispatch = useAppDispatch();
	const eventsSchedule = useAppSelector(
		(data) => data.classesScheduleReducer.schedule
	);
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const centerId = currentCenter.id;
	const bookingsList = useAppSelector(
		(data) => data.classesScheduleReducer.bookings
	);

	useEffect(() => {
		if (!eventsSchedule.length)
			dispatch(fetchClassesSchedulesByFitnessCenter(centerId));
	}, [eventsSchedule]);

	useEffect(() => {
		if (!bookingsList.length) dispatch(fetchBookingsByFitnessCenter(centerId));
		console.log(bookingsList);
	}, [bookingsList]);

	const uniqueStartTimes = getUniqueStartTimes(eventsSchedule, currentDate);
	let firstWeekDay = startOfWeek(new Date(currentDate));

	return (
		<>
			{uniqueStartTimes.map((hour, hourIndex) => (
				<Box key={hourIndex}>
					<Box sx={{ background: "lightblue", width: "100%", marginTop: 1 }}>
						<Typography>{hour}</Typography>
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
								<Box key={index} sx={{ width: 150 }}>
									{/* ORDENAR LOS DAY EVENTS POR UN NUEVO CAMPO SORT QUE CONTENGA EL EVENTO */}
									{dayEvents.map((event, eventIndex) => {
										const bookedPersons = getTotalBookings(
											bookingsList,
											event,
											currentDay
										);

										return (
											<Paper
												key={eventIndex}
												sx={{
													marginTop: 1,
													padding: 1,
													width: "100%",
													background: event.class_id.color.color,
												}}>
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
				</Box>
			))}
		</>
	);
}
