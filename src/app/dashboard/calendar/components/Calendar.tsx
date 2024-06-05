import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formatMonthYear, startOfWeek } from "../lib/utils";
import DisplayWeekDays from "./DisplayWeekDays";
import DisplayEvents from "./events/DisplayEvents";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBookingsByFitnessCenter } from "@/redux/features/classesScheduleSlice";

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const dispatch = useAppDispatch();
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);

	// This function is beeing used in DisplayEvents component.
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

	const previousWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() - 7);
		setCurrentDate(newDate);
		getWeeklyBookings(newDate, true);
	};

	const nextWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + 7);
		setCurrentDate(newDate);
		getWeeklyBookings(newDate);
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
