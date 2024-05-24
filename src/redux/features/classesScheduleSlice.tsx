import {
	createClassSchedule,
	getAllClassesSchedules,
	updateClassSchedule,
} from "@/app/dashboard/calendar/lib/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IClassesScheduleSlice {
	schedule: any[];
	updated: boolean;
	created: boolean;
	loading: boolean;
}

const initialState: IClassesScheduleSlice = {
	schedule: [],
	updated: false,
	created: false,
	loading: false,
};

export const fetchClassesSchedulesByFitnessCenter = createAsyncThunk(
	"classesSchedules/fetch",
	async (classId: number) => {
		const response = await getAllClassesSchedules(classId);
		return response;
	}
);

export const createNewClassSchedule = createAsyncThunk(
	"classesSchedules/create",
	async ({
		classData,
		eventName,
		eventColor,
		classId,
		currentCenterId,
	}: any) => {
		const response = await createClassSchedule(
			classData,
			eventName,
			eventColor,
			classId,
			currentCenterId
		);
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
			toast.success("Horario creado.");
			state.loading = true;
		});
		builder.addCase(createNewClassSchedule.fulfilled, (state, action) => {
			state.schedule.push(action.payload[0]);
			state.created = true;
			state.loading = false;
		});
		builder.addCase(createNewClassSchedule.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
	},
});

export const { scheduleCreated, scheduleUpdated } =
	classesScheduleSlice.actions;

export default classesScheduleSlice.reducer;
