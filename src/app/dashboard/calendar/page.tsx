"use client";
import { Box } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassesSchedulesByFitnessCenter } from "@/redux/features/classesScheduleSlice";

function Calendar() {
	const [scheduleWithCorrectDataType, setScheduleWithCorrectDataType] =
		useState();
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const schedule: any = useAppSelector(
		(data) => data.classesScheduleReducer.schedule
	);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!schedule.length) {
				dispatch(fetchClassesSchedulesByFitnessCenter(centerId));
			}
		}

		const data = schedule.map((result) => {
			return {
				...result,
				start: new Date("Wed May 22 2024 09:30:00 GMT+0200"),
				end: new Date("Wed May 22 2024 10:30:00 GMT+0200"),
			};
		});
		setScheduleWithCorrectDataType(data);
	}, [currentFitnessCenter, schedule, dispatch]);
	return (
		<Box>
			<h1>Calendar</h1>
			{schedule.length && (
				<Scheduler
					view='week'
					week={{
						weekDays: [0, 1, 2, 3, 4, 5],
						weekStartOn: 1,
						startHour: 7,
						endHour: 22,
						step: 30,
						// cellRenderer: (props: CellProps) => JSX.Element,
						navigation: true,
						disableGoToDay: false,
					}}
					events={scheduleWithCorrectDataType}
					draggable={false}
					hourFormat='24'
				/>
			)}
		</Box>
	);
}

export default Calendar;
// [
// 	{
// 		event_id: 1,
// 		title: "Event 1",
// 		start: new Date("2024/5/22 09:30"),
// 		end: new Date("2024/5/22 10:30"),
// 		color: "red",
// 	},
// ]
