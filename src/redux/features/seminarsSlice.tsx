import {
	createSeminar,
	deleteSeminar,
	getAllSeminars,
	updateSeminar,
} from "@/app/dashboard/seminars/lib/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ISeminarsSlice {
	seminars: any;
	updated: boolean;
	created: boolean;
	loading: boolean;
}

const initialState: ISeminarsSlice = {
	seminars: [],
	updated: false,
	created: false,
	loading: false,
};

export const fetchSeminarsByFitnessCenter = createAsyncThunk(
	"seminars/fetch",
	async (centerId: number) => {
		const response = await getAllSeminars(centerId);
		return response;
	}
);

export const createNewSeminar = createAsyncThunk(
	"seminars/create",
	async ({ seminarData, centerId }: any) => {
		const response = await createSeminar(seminarData, centerId);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const updateSeminarInfo = createAsyncThunk(
	"seminars/update",
	async (classData: any) => {
		const response = await updateSeminar(classData);
		return response;
	}
);

export const deleteSeminarById = createAsyncThunk(
	"classes/delete",
	async (seminarId) => {
		const response = await deleteSeminar(seminarId);
		return response;
	}
);
export const seminarsSlice = createSlice({
	name: "seminars",
	initialState,
	reducers: {
		seminarsCreated: (state, action) => {
			state.created = false;
		},
		seminarsUpdated: (state, action) => {
			state.updated = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSeminarsByFitnessCenter.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(
				fetchSeminarsByFitnessCenter.fulfilled,
				(state, action) => {
					state.seminars = action.payload;
					state.loading = false;
				}
			),
			builder.addCase(
				fetchSeminarsByFitnessCenter.rejected,
				(state, action) => {
					toast.error(action.error.message);
					state.loading = false;
				}
			);
		builder.addCase(updateSeminarInfo.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(updateSeminarInfo.fulfilled, (state, action) => {
				const updatedSeminars = state.seminars.map((seminarData) =>
					seminarData.id === action.payload[0].id
						? action.payload[0]
						: seminarData
				);
				state.seminars = updatedSeminars;
				state.updated = true;
				state.loading = false;
				toast.success("Evento / Seminario actualizado.");
			}),
			builder.addCase(updateSeminarInfo.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(createNewSeminar.pending, (state, action) => {
			toast.success("Evento / Seminario creado.");
			state.loading = true;
		});
		builder.addCase(createNewSeminar.fulfilled, (state, action) => {
			state.seminars.push(action.payload[0]);
			state.created = true;
			state.loading = false;
		});
		builder.addCase(createNewSeminar.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
		builder.addCase(deleteSeminarById.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteSeminarById.fulfilled, (state, action) => {
			state.seminars = state.seminars.filter((classData) => {
				return classData.id !== action.payload[0].id;
			});
			toast.success("Seminario eliminada.");

			state.updated = true;
			state.loading = false;
		});
		builder.addCase(deleteSeminarById.rejected, (state, action) => {
			toast.error(action.error.message);
			state.updated = false;
			state.loading = false;
		});
	},
});

export const { seminarsCreated, seminarsUpdated } = seminarsSlice.actions;

export default seminarsSlice.reducer;
