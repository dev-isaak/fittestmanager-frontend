import {
	createClassSchedule,
	getAllBookingsByFitnessCenterId,
	getAllBookingsByFitnessCenterIdBetweenTwoDates,
	getAllClassesSchedules,
	getAllClassesSchedulesByClassId,
	getAllClassesSchedulesByFitnessCenterId,
	updateClassSchedule,
} from "@/app/dashboard/calendar/lib/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IClassesScheduleSlice {
	schedule: any[];
	bookings: any[];
	updated: boolean;
	created: boolean;
	loading: boolean;
}

const initialState: IClassesScheduleSlice = {
	schedule: [],
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

export const fetchClassesSchedulesByFitnessCenter = createAsyncThunk(
	"classesSchedulesByFitnessCenter/fetch",
	async (fitnessCenterId: number) => {
		const response = await getAllClassesSchedulesByFitnessCenterId(
			fitnessCenterId
		);
		return response;
	}
);

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

export const updateClassScheduleInfo = createAsyncThunk(
	"classesSchedules/update",
	async ({ classData }: any) => {
		const response = await updateClassSchedule(classData);
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
		builder.addCase(
			fetchClassesSchedulesByFitnessCenter.pending,
			(state, action) => {
				state.loading = true;
			}
		),
			builder.addCase(
				fetchClassesSchedulesByFitnessCenter.fulfilled,
				(state, action) => {
					state.schedule = action.payload;
					state.loading = false;
				}
			),
			builder.addCase(
				fetchClassesSchedulesByFitnessCenter.rejected,
				(state, action) => {
					toast.error(action.error.message);
					state.loading = false;
				}
			);
		builder.addCase(updateClassScheduleInfo.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(updateClassScheduleInfo.fulfilled, (state, action) => {
				const updatedSchedules = state.schedule.map((scheduleData) =>
					scheduleData.schedule_id === action.payload[0].schedule_id
						? action.payload[0]
						: scheduleData
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
	},
});

export const { scheduleCreated, scheduleUpdated } =
	classesScheduleSlice.actions;

export default classesScheduleSlice.reducer;
