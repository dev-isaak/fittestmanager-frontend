import {
	createCoach,
	getAllCoaches,
	updateCoach,
} from "@/app/dashboard/coaches/lib/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ICoachesSlice {
	coaches: any[];
	searchCoaches: any[];
	updated: boolean;
	created: boolean;
	loading: boolean;
}

const initialState: ICoachesSlice = {
	coaches: [],
	searchCoaches: [],
	updated: false,
	created: false,
	loading: false,
};

export const fetchCoachesByFitnessCenter = createAsyncThunk(
	"coaches/fetch",
	async (centerId: number) => {
		const response = await getAllCoaches(centerId);
		return response;
	}
);

export const updateCoachInfo = createAsyncThunk(
	"coaches/update",
	async (coach: any) => {
		const response = await updateCoach(coach);
		return response;
	}
);

export const createNewCoach = createAsyncThunk(
	"coaches/create",
	async ({ coach, centerId }: any) => {
		const response = await createCoach(coach, centerId);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const coachesSlice = createSlice({
	name: "coaches",
	initialState,
	reducers: {
		searchCoaches: (state, action) => {
			const inputText = action.payload.toLowerCase();
			const coachesFiltered = state.coaches.filter(
				(coach) =>
					coach.first_name.toLowerCase().includes(inputText) ||
					coach.last_name.toLowerCase().includes(inputText) ||
					coach.email.toLowerCase().includes(inputText)
			);
			state.searchCoaches = coachesFiltered;
		},
		coachesUpdated: (state, action) => {
			state.updated = false;
		},
		coachesCreated: (state, action) => {
			state.created = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCoachesByFitnessCenter.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchCoachesByFitnessCenter.fulfilled, (state, action) => {
			state.coaches = action.payload;
			state.searchCoaches = action.payload;
			state.loading = false;
		});
		builder.addCase(updateCoachInfo.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateCoachInfo.fulfilled, (state, action) => {
			const updatedCoaches = state.coaches.map((coach) =>
				coach.id === action.payload[0].id ? action.payload[0] : coach
			);
			state.searchCoaches = updatedCoaches;
			state.updated = true;
			state.loading = false;
		});
		builder.addCase(updateCoachInfo.rejected, (state, action) => {
			toast.error("Error");
			state.loading = false;
		});
		builder.addCase(createNewCoach.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(createNewCoach.fulfilled, (state, action) => {
			state.created = true;
			state.loading = false;
		});
		builder.addCase(createNewCoach.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
	},
});

export const { searchCoaches, coachesUpdated, coachesCreated } =
	coachesSlice.actions;
export default coachesSlice.reducer;
