import {
	bookAClass,
	createClassSchedule,
	getAllBookingsByFitnessCenterIdBetweenTwoDates,
	getAllBookingsBySchedule,
	getAllClassesSchedulesByClassId,
	getAllClassesSchedulesByFitnessCenterId,
	getAllSchedulesBetweenTwoDates,
	updateABooking,
	updateClassSchedule,
	updateSchedule,
	userCancelsBooking,
} from "@/app/dashboard/calendar/lib/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IClassesScheduleSlice {
	schedule: any[];
	weeklySchedules: any[];
	bookings: any[];
	updated: boolean;
	created: boolean;
	loading: boolean;
}

const initialState: IClassesScheduleSlice = {
	schedule: [],
	weeklySchedules: [],
	bookings: [],
	updated: false,
	created: false,
	loading: false,
};

export const fetchClassesSchedulesByClass = createAsyncThunk(
	"classesSchedulesByClass/fetch",
	async (classId: number) => {
		const response = await getAllClassesSchedulesByClassId(classId);
		return response;
	}
);

export const fetchSchedulesBetweenTwoDates = createAsyncThunk(
	"schedulesBetweenTwoDates/fetch",
	async ({ fitnessCenterId, startDate, endDate }: any) => {
		const response = await getAllSchedulesBetweenTwoDates(
			fitnessCenterId,
			startDate,
			endDate
		);
		return response;
	}
);

// export const fetchClassesSchedulesByFitnessCenter = createAsyncThunk(
// 	"classesSchedulesByFitnessCenter/fetch",
// 	async (fitnessCenterId: number) => {
// 		const response = await getAllClassesSchedulesByFitnessCenterId(
// 			fitnessCenterId
// 		);
// 		return response;
// 	}
// );

export const createNewClassSchedule = createAsyncThunk(
	"classesSchedules/create",
	async ({ classData, eventName, classId, currentCenterId }: any) => {
		const response = await createClassSchedule(
			classData,
			eventName,
			classId,
			currentCenterId
		);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const fetchBookingsByScheduleId = createAsyncThunk(
	"bookingsByScheduleId/fetch",
	async (scheduleId: number) => {
		const response = await getAllBookingsBySchedule(scheduleId);
		return response;
	}
);

export const fetchBookingsByFitnessCenter = createAsyncThunk(
	"bookingsByFitnessCenterId/fetch",
	async ({ fitnessCenterId, startDate, endDate }: any) => {
		const response = await getAllBookingsByFitnessCenterIdBetweenTwoDates(
			fitnessCenterId,
			startDate,
			endDate
		);
		return response;
	}
);

export const updateScheduleData = createAsyncThunk(
	"updateSchedule/update",
	async ({ bookingData }: any) => {
		const response = await updateSchedule(bookingData);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const bookUserToClass = createAsyncThunk(
	"bookClass/create",
	async ({ bookingData }: any) => {
		const response = await bookAClass(bookingData);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const updateBookingClass = createAsyncThunk(
	"updatebookClass/update",
	async ({ bookingData }: any) => {
		const response = await updateABooking(bookingData);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const updateClassScheduleInfo = createAsyncThunk(
	"classesSchedules/update",
	async ({ classData }: any) => {
		const response = await updateClassSchedule(classData);
		return response;
	}
);

export const cancelBooking = createAsyncThunk(
	"bookings/delete",
	async ({ booking }: any) => {
		const response = await userCancelsBooking(booking);
		return response;
	}
);
export const classesScheduleSlice = createSlice({
	name: "classesSchedules",
	initialState,
	reducers: {
		scheduleCreated: (state, action) => {
			state.created = false;
		},
		scheduleUpdated: (state, action) => {
			state.updated = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBookingsByScheduleId.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(fetchBookingsByScheduleId.fulfilled, (state, action) => {
				state.bookings = action.payload;
				state.loading = false;
			}),
			builder.addCase(fetchBookingsByScheduleId.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(fetchClassesSchedulesByClass.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(
				fetchClassesSchedulesByClass.fulfilled,
				(state, action) => {
					state.schedule = action.payload;
					state.loading = false;
				}
			),
			builder.addCase(
				fetchClassesSchedulesByClass.rejected,
				(state, action) => {
					toast.error(action.error.message);
					state.loading = false;
				}
			);
		builder.addCase(fetchSchedulesBetweenTwoDates.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(
				fetchSchedulesBetweenTwoDates.fulfilled,
				(state, action) => {
					state.weeklySchedules = action.payload;
					state.loading = false;
				}
			),
			builder.addCase(
				fetchSchedulesBetweenTwoDates.rejected,
				(state, action) => {
					toast.error(action.error.message);
					state.loading = false;
				}
			);
		builder.addCase(updateScheduleData.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(updateScheduleData.fulfilled, (state, action) => {
				const updatedSchedules = state.weeklySchedules.map((bookingData) =>
					bookingData.id === action.payload[0].id
						? action.payload[0]
						: bookingData
				);

				state.weeklySchedules = updatedSchedules;
				state.updated = true;
				state.loading = false;
				toast.success("Horario actualizado.");
			}),
			builder.addCase(updateScheduleData.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(updateClassScheduleInfo.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(updateClassScheduleInfo.fulfilled, (state, action) => {
				const updatedSchedules = state.schedule.map((bookingData) =>
					bookingData.id === action.payload[0].id
						? action.payload[0]
						: bookingData
				);
				state.schedule = updatedSchedules;
				state.updated = true;
				state.loading = false;
				toast.success("Horario actualizado.");
			}),
			builder.addCase(updateClassScheduleInfo.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(createNewClassSchedule.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(createNewClassSchedule.fulfilled, (state, action) => {
			state.schedule.push(action.payload[0]);
			state.created = true;
			state.loading = false;
			toast.success("Horario creado.");
		});
		builder.addCase(createNewClassSchedule.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
		builder.addCase(fetchBookingsByFitnessCenter.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(
				fetchBookingsByFitnessCenter.fulfilled,
				(state, action) => {
					state.bookings = action.payload;
					state.loading = false;
				}
			),
			builder.addCase(
				fetchBookingsByFitnessCenter.rejected,
				(state, action) => {
					toast.error(action.error.message);
					state.loading = false;
				}
			);
		builder.addCase(bookUserToClass.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(bookUserToClass.fulfilled, (state, action) => {
			state.bookings.push(action.payload[0]);

			state.weeklySchedules = state.weeklySchedules.map((scheduleData) => {
				if (scheduleData.id === action.payload[0].schedule_id) {
					return {
						...scheduleData,
						total_bookings: scheduleData.total_bookings + 1,
					};
				}

				return scheduleData;
			});

			state.created = true;
			state.loading = false;
			toast.success("Usuario apuntado.");
		});

		builder.addCase(bookUserToClass.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
		builder.addCase(updateBookingClass.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateBookingClass.fulfilled, (state, action) => {
			const updatedSchedules = state.bookings.map((bookingData) =>
				bookingData.id === action.payload[0].id
					? action.payload[0]
					: bookingData
			);
			state.bookings = updatedSchedules;
			state.updated = true;
			state.loading = false;
			if (action.payload[0].is_cancelled) {
				toast.success("Clase cancelada.");
			} else if (!action.payload[0].is_cancelled) {
				toast.success("Clase abierta de nuevo.");
			}
		});
		builder.addCase(updateBookingClass.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
		builder.addCase(cancelBooking.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(cancelBooking.fulfilled, (state, action) => {
			const updatedBookings = state.bookings.filter((bookingData) => {
				return bookingData.id !== action.payload[0].id;
			});
			state.bookings = updatedBookings;

			state.weeklySchedules = state.weeklySchedules.map((scheduleData) => {
				if (scheduleData.id === action.payload[0].schedule_id) {
					return {
						...scheduleData,
						total_bookings: scheduleData.total_bookings - 1,
					};
				}
				return scheduleData;
			});

			state.updated = true;
			state.loading = false;
		});
		builder.addCase(cancelBooking.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
	},
});

export const { scheduleCreated, scheduleUpdated } =
	classesScheduleSlice.actions;

export default classesScheduleSlice.reducer;
