import { Box, Paper, Stack, Typography } from "@mui/material";
import { getUniqueStartTimes, startOfWeek } from "../../lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { fetchSchedulesBetweenTwoDates } from "@/redux/features/classesScheduleSlice";
import dayjs from "dayjs";
import DialogForm from "@/app/ui/DialogForm";

export default function DisplayEvents({ currentDate }) {
	const [openDialog, setOpenDialog] = useState(false);
	const [eventData, setEventData] = useState({});

	const dispatch = useAppDispatch();
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const centerId = currentCenter.id;
	const schedules = useAppSelector(
		(data) => data.classesScheduleReducer.weeklySchedules
	);
	const uniqueStartTimes = getUniqueStartTimes(schedules, currentDate);

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
			fetchSchedulesBetweenTwoDates({
				fitnessCenterId: centerId,
				startDate: startWeek,
				endDate: new Date(endWeek),
			})
		);
	};

	useEffect(() => {
		getWeeklyBookings(currentDate);
	}, [currentCenter, currentDate]);

	const handleOpenDialog = (data: any) => {
		setOpenDialog(true);
		setEventData({ ...data });
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
							const dayEvents = schedules.filter(
								(event) =>
									dayjs(event.date_time).day() + 1 === index + 2 &&
									dayjs(event.date_time).format("HH:mm") === hour
							);

							return (
								<Box key={index} sx={{ minWidth: 150 }}>
									{/* ORDENAR LOS DAY EVENTS POR UN NUEVO CAMPO SORT QUE CONTENGA EL EVENTO */}
									{dayEvents.map((event, eventIndex) => {
										return (
											<Paper
												onClick={() => handleOpenDialog(event)}
												key={eventIndex}
												sx={{
													"&:hover": {
														cursor: "pointer",
													},
													marginTop: 1,
													padding: 1,
													width: 150,
													height: 85,
													background: event.is_cancelled
														? "#d8d8d836"
														: event.class_id.color.color,
													position: "relative",
												}}>
												{event.is_cancelled && (
													<Box
														sx={{
															position: "absolute",
															background: "#efcaca",
															paddingY: 1,
															marginLeft: -1,
															textAlign: "center",
															bottom: 10,
															width: "100%",
														}}>
														Clase cancelada
													</Box>
												)}
												<Typography
													sx={{ textAlign: "center", fontWeight: 700 }}>
													{event.title}
												</Typography>
												<Typography sx={{ textAlign: "center" }}>
													{event.total_bookings} de {event.limit_persons}
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
