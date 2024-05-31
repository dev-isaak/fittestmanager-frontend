import { Box, Stack } from "@mui/material";
import { formatDate, startOfWeek } from "../lib/utils";

type DisplayWeekDaysType = {
	currentDate: any;
};

export default function DisplayWeekDays({ currentDate }: DisplayWeekDaysType) {
	const weekDays = [
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
		"Sábado",
		"Domingo",
	];

	let firstWeekDay = startOfWeek(new Date(currentDate));
	return (
		<Stack
			sx={{
				flexDirection: "row",
				width: "100%",
				justifyContent: "space-between",
				gap: 2,
			}}>
			{weekDays.map((day, index) => {
				const formattedDate = formatDate(firstWeekDay);
				const dayBox = (
					<Box
						key={index}
						sx={{ background: "lightgray", padding: 2, width: 150 }}>
						{day} {formattedDate}
					</Box>
				);
				firstWeekDay.setDate(firstWeekDay.getDate() + 1); // Incrementar el día
				return dayBox;
			})}
		</Stack>
	);

	// useEffect(() => {
	// 	const centerId = currentCenter.id;

	// 	if (!eventsSchedule.length)
	// 		dispatch(fetchClassesSchedulesByFitnessCenter(centerId));
	// 	console.log(eventsSchedule);
	// }, [eventsSchedule]);

	// return weekDays.map((day, index) => {
	// 	const formattedDate = formatDate(current);
	// 	const currentNumericDate = current.setDate(current.getDate() + 1);
	// 	const currentDay = new Date(currentNumericDate);

	// return (
	// 	<Stack>
	// 		<Box
	// 			key={index}
	// 			sx={{ background: "lightgray", padding: 2, width: 150 }}>
	// 			{day} {formattedDate}
	// 		</Box>

	// 		{eventsSchedule.map((event, index) => {
	// 			const eventStartTime = new Date(event.since_day);
	// 			const eventEndTime = new Date(event.until_day);
	// 			const eventWeekDay = getDayIndex(event.week_day);
	// 			const currentWeekDay = currentDay.getDay();
	// 			const currentTime = currentDay;
	// 			const eventHours = `${dayjs(event.start).format("HH:mm")}-${dayjs(
	// 				event.end
	// 			).format("HH:mm")}`;
	// 			if (
	// 				currentTime > eventStartTime &&
	// 				currentTime < eventEndTime &&
	// 				eventWeekDay === currentWeekDay
	// 			) {
	// 				return (
	// 					<>
	// 						<Paper
	// 							key={index}
	// 							sx={{
	// 								background: event.class_id.color.color,
	// 								padding: 2,
	// 								marginTop: 2,
	// 							}}>
	// 							<Typography sx={{ fontWeight: 700, textAlign: "center" }}>
	// 								{event.title}
	// 							</Typography>
	// 							<p>{eventHours}</p>
	// 						</Paper>
	// 					</>
	// 				);
	// 			}
	// 		})}
	// 	</Stack>
	// );
	// });
}
