import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatMonthYear } from "../lib/utils";
import DisplayWeekDays from "./DisplayWeekDays";
import DisplayEvents from "./DisplayEvents";

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
					width: "100%",
					flexDirection: "row",
					justifyContent: "end",
					gap: 2,
					padding: 2,
				}}>
				<Typography>{formatMonthYear(currentDate)}</Typography>
				<Button onClick={previousWeek} variant='contained'>
					Semana Anterior
				</Button>
				<Button onClick={nextWeek} variant='contained'>
					Semana Siguiente
				</Button>
			</Stack>
			<Stack id='calendar'>
				<DisplayWeekDays currentDate={currentDate} />
				<DisplayEvents currentDate={currentDate} />
			</Stack>
		</Stack>
	);
};

export default Calendar;
