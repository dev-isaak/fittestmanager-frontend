import {
	createRoom,
	deleteRoom,
	getAllRooms,
	updateRoom,
} from "@/app/dashboard/rooms/lib/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IRoomsSlice {
	rooms: any[];
	updated: boolean;
	created: boolean;
	deleted: boolean;
	loading: boolean;
}

const initialState: IRoomsSlice = {
	rooms: [],
	updated: false,
	created: false,
	deleted: false,
	loading: false,
};

export const fetchRoomsByFitnessCenter = createAsyncThunk(
	"rooms/fetch",
	async (centerId: number) => {
		const response = await getAllRooms(centerId);
		return response;
	}
);

export const createNewRoom = createAsyncThunk(
	"rooms/create",
	async ({ room, centerId }: any) => {
		const response = await createRoom(room, centerId);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const updateRoomInfo = createAsyncThunk(
	"rooms/update",
	async (room: any) => {
		const response = await updateRoom(room);
		return response;
	}
);

export const deleteRoomInfo = createAsyncThunk(
	"rooms/delete",
	async (roomId: number) => {
		const response = await deleteRoom(roomId);
		return response;
	}
);

export const roomsSlice = createSlice({
	name: "rooms",
	initialState,
	reducers: {
		roomsUpdated: (state, action) => {
			state.updated = false;
		},
		roomsCreated: (state, action) => {
			state.created = false;
		},
		roomsDeleted: (state, action) => {
			state.deleted = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRoomsByFitnessCenter.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(fetchRoomsByFitnessCenter.fulfilled, (state, action) => {
				state.rooms = action.payload;
				state.loading = false;
			}),
			builder.addCase(fetchRoomsByFitnessCenter.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(updateRoomInfo.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(updateRoomInfo.fulfilled, (state, action) => {
				const updatedRooms = state.rooms.map((room) =>
					room.id === action.payload[0].id ? action.payload[0] : room
				);
				state.rooms = updatedRooms;
				state.updated = true;
				state.loading = false;
				toast.success("Sala actualizada.");
			}),
			builder.addCase(updateRoomInfo.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
			});
		builder.addCase(createNewRoom.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(createNewRoom.fulfilled, (state, action) => {
			debugger;
			state.rooms.push(action.payload);
			toast.success("Sala creada.");
			state.created = true;
			state.loading = false;
		});
		builder.addCase(createNewRoom.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
		builder.addCase(deleteRoomInfo.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteRoomInfo.fulfilled, (state, action) => {
			state.rooms = state.rooms.filter((roomData) => {
				return roomData.id !== action.payload[0].id;
			});
			toast.success("Sala eliminada con éxito.");
			state.deleted = true;
			state.loading = false;
		});
		builder.addCase(deleteRoomInfo.rejected, (state, action) => {
			toast.error(action.error.message);
			state.deleted = false;
			state.loading = false;
		});
	},
});

export const { roomsCreated, roomsUpdated, roomsDeleted } = roomsSlice.actions;

export default roomsSlice.reducer;
