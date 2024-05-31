"use client";
import { Box, LinearProgress, Paper, Stack, styled } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassesSchedulesByFitnessCenter } from "@/redux/features/classesScheduleSlice";
import { getCorrectDateFromDB, getDayIndex } from "../classes/lib/utils";
import Calendar from "./components/Calendar";

function CalendarPage() {
	// const [scheduleWithCorrectDataType, setScheduleWithCorrectDataType] =
	// 	useState([]);
	// const dispatch = useAppDispatch();
	// const currentFitnessCenter = useAppSelector(
	// 	(data) => data.fitnessCentersReducer.currentFitnessCenter
	// );
	// const schedule: any = useAppSelector(
	// 	(data) => data.classesScheduleReducer.schedule
	// );

	// useEffect(() => {
	// 	if (currentFitnessCenter.id !== 0) {
	// 		const centerId = currentFitnessCenter.id;
	// 		if (!schedule.length) {
	// 			dispatch(fetchClassesSchedulesByFitnessCenter(centerId));
	// 		}
	// 	}

	// 	const data = schedule.map((result) => {
	// 		const eventsArray = [];
	// 		const startingDate = new Date(result.since_day);
	// 		const endingDate = new Date(result.until_day);
	// 		const weekDay = getDayIndex(result.week_day);

	// 		let currentDate = new Date(startingDate);

	// 		while (endingDate >= currentDate) {
	// 			if (currentDate.getDay() === weekDay) {
	// 				eventsArray.push({
	// 					event_id: result.event_id,
	// 					title: result.title,
	// 					color: result.class_id.color.color,
	// 					start: new Date(
	// 						getCorrectDateFromDB(new Date(currentDate), result.start)
	// 					),
	// 					end: new Date(
	// 						getCorrectDateFromDB(new Date(currentDate), result.end)
	// 					),
	// 				});
	// 			}
	// 			currentDate.setDate(currentDate.getDate() + 1);
	// 		}

	// 		return eventsArray;
	// 	});

	// 	setScheduleWithCorrectDataType(data.flat());
	// }, [currentFitnessCenter, schedule]);

	return (
		<Box>
			<h1>Calendar</h1>
			<Calendar />
			{/* {schedule.length ? (
				<Scheduler
					view='week'
					week={{
						weekDays: [0, 1, 2, 3, 4, 5, 6],
						weekStartOn: 1,
						startHour: 7,
						endHour: 22,
						step: 30,
						// cellRenderer: (props: CellProps) => JSX.Element,
						navigation: true,
						disableGoToDay: false,
						cellRenderer: ({ ...props }) => {
							return <div style={{ background: "pink" }}></div>;
						},
					}}
					events={scheduleWithCorrectDataType}
					draggable={false}
					hourFormat='24'
					eventRenderer={({ event, ...props }) => {
						return (
							<div
								style={{
									width: "100%",
									background: event.color,
									textAlign: "center",
									fontWeight: 700,
									height: "fit-content",
								}}>
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									{event.title}
									<br />5 de
									{schedule.map((events) => {
										console.log(events);
										if (event.event_id === events.event_id) {
											return events.limit_persons;
										}
									})}
								</Box>
							</div>
						);
					}}
				/>
			) : null} */}
		</Box>
	);
}

export default CalendarPage;
