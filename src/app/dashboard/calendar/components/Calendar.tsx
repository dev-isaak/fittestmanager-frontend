import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatMonthYear } from "../lib/utils";
import DisplayWeekDays from "./DisplayWeekDays";
import DisplayEvents from "./events/DisplayEvents";

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	const previousWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() - 7);
		setCurrentDate(newDate);
	};

	const nextWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + 7);
		setCurrentDate(newDate);
	};

	return (
		<Stack>
			<Stack
				sx={{
					width: "1145px",
					flexDirection: "row",
					justifyContent: "end",
					gap: 2,
					paddingLeft: 2,
					paddingY: 2,
				}}>
				<Typography variant='h5' sx={{ paddingRight: 2 }}>
					{formatMonthYear(currentDate)}
				</Typography>
				<Button onClick={previousWeek} variant='contained'>
					{"<"}
				</Button>
				<Button onClick={nextWeek} variant='contained'>
					{">"}
				</Button>
			</Stack>
			<Stack id='calendar' sx={{ width: "fit-content" }}>
				<DisplayWeekDays currentDate={currentDate} />
				<DisplayEvents currentDate={currentDate} />
			</Stack>
		</Stack>
	);
};

export default Calendar;
