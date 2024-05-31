import { Box, Paper, Stack, Typography } from "@mui/material";
import { getUniqueStartTimes, startOfWeek } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchClassesSchedulesByFitnessCenter } from "@/redux/features/classesScheduleSlice";
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
	let firstWeekDay = startOfWeek(new Date(currentDate));

	useEffect(() => {
		const centerId = currentCenter.id;

		if (!eventsSchedule.length)
			dispatch(fetchClassesSchedulesByFitnessCenter(centerId));
		console.log(eventsSchedule);
	}, [eventsSchedule]);

	const uniqueStartTimes = getUniqueStartTimes(eventsSchedule, currentDate);

	const weekDays = [
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
		"Sábado",
		"Domingo",
	];
	let current = new Date(firstWeekDay);

	return (
		<>
			{uniqueStartTimes.map((hour, hourIndex) => (
				<>
					<Box
						key={hourIndex}
						sx={{ background: "lightblue", width: "100%", marginTop: 1 }}>
						<Typography>{hour}</Typography>
					</Box>
					<Stack
						sx={{
							flexDirection: "row",
							gap: 2,
							width: "100%",
							justifyContent: "space-between",
						}}>
						{weekDays.map((day, dayIndex) => {
							const dayEvents = eventsSchedule.filter(
								(event) =>
									getDayIndex(event.week_day) === dayIndex + 2 &&
									dayjs(event.start).format("HH:mm") === hour
							);

							return (
								<Box key={dayIndex} sx={{ width: 150 }}>
									{/* ORDENAR LOS DAY EVENTS POR UN NUEVO CAMPO SORT QUE CONTENGA EL EVENTO */}
									{dayEvents.map((event, eventIndex) => (
										<Paper
											key={eventIndex}
											sx={{
												marginTop: 1,
												padding: 1,
												width: "100%",
												background: event.class_id.color.color,
											}}>
											<Typography sx={{ textAlign: "center", fontWeight: 700 }}>
												{event.title}
											</Typography>
										</Paper>
									))}
								</Box>
							);
						})}
					</Stack>
				</>
			))}
		</>
	);
}

// {eventsSchedule.map((event, index) => {
//   if (dayjs(event.start).format("HH:mm") == hour) {
//     return <Paper>{event.title}</Paper>;
//   }
// })}
