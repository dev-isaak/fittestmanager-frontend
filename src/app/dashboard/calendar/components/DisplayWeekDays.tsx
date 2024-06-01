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
						sx={{ background: "lightgray", paddingX: 2, width: 150 }}>
						{day} {formattedDate}
					</Box>
				);
				firstWeekDay.setDate(firstWeekDay.getDate() + 1);
				return dayBox;
			})}
		</Stack>
	);
}
