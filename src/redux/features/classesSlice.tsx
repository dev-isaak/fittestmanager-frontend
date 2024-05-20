import {
	createClass,
	getAllClasses,
	updateClass,
} from "@/app/dashboard/classes/lib/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IClassesSlice {
	classes: any[];
	updated: boolean;
	created: boolean;
	loading: boolean;
}

const initialState: IClassesSlice = {
	classes: [],
	updated: false,
	created: false,
	loading: false,
};

export const fetchClassesByFitnessCenter = createAsyncThunk(
	"classes/fetch",
	async (centerId: number) => {
		const response = await getAllClasses(centerId);
		return response;
	}
);

export const createNewClass = createAsyncThunk(
	"classes/create",
	async ({ classData, centerId }: any) => {
		const response = await createClass(classData, centerId);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const updateClassInfo = createAsyncThunk(
	"classes/update",
	async (classData: any) => {
		const response = await updateClass(classData);
		return response;
	}
);
export const classesSlice = createSlice({
	name: "classes",
	initialState,
	reducers: {
		classesCreated: (state, action) => {
			state.updated = false;
		},
		classesUpdated: (state, action) => {
			state.created = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchClassesByFitnessCenter.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(
				fetchClassesByFitnessCenter.fulfilled,
				(state, action) => {
					state.classes = action.payload;
					state.loading = false;
				}
			),
			builder.addCase(fetchClassesByFitnessCenter.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(updateClassInfo.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(updateClassInfo.fulfilled, (state, action) => {
				const updatedRooms = state.classes.map((classData) =>
					classData.id === action.payload[0].id ? action.payload[0] : classData
				);
				state.classes = updatedRooms;
				state.updated = true;
				state.loading = false;
				toast.success("Sala actualizada.");
			}),
			builder.addCase(updateClassInfo.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(createNewClass.pending, (state, action) => {
			toast.success("Sala creada.");
			state.loading = true;
		});
		builder.addCase(createNewClass.fulfilled, (state, action) => {
			state.classes.push(action.payload);
			state.created = true;
			state.loading = false;
		});
		builder.addCase(createNewClass.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
	},
});

export const { classesCreated, classesUpdated } = classesSlice.actions;

export default classesSlice.reducer;
