import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnFitnessCenters } from "../../app/dashboard/fitness-centers/lib/data";
import { IFitnessCenter } from "@/app/dashboard/fitness-centers/interfaces/interfaces";

interface IFitnessCenterSlice {
	centers: IFitnessCenter[];
	currentFitnessCenter: IFitnessCenter;
	changed: boolean;
}

const initialState: IFitnessCenterSlice = {
	centers: [],
	currentFitnessCenter: {
		avatar: "",
		id: 0,
		center_name: "",
		manager_id: "",
	},
	changed: false,
};

export const fetchOwnFitnessCenters = createAsyncThunk(
	"fitnessCenters/fetch",
	async (thunkAPI) => {
		const response = await getOwnFitnessCenters();
		return response;
	}
);

export const fitnessCentersSlice = createSlice({
	name: "fitnessCenters",
	initialState,
	reducers: {
		selectFitnessCenter: (state, action) => {
			state.currentFitnessCenter = action.payload;
		},
		changeFitnessCenter: (state, action) => {
			state.changed = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOwnFitnessCenters.fulfilled, (state, action) => {
			state.centers = action.payload;
			// state.currentFitnessCenter = action.payload[0];
		});
	},
});

export const { selectFitnessCenter, changeFitnessCenter } =
	fitnessCentersSlice.actions;

export default fitnessCentersSlice.reducer;
