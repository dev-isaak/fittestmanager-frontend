import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IMember } from "@/app/dashboard/members/interfaces/interfaces";
import {
	createMember,
	getAllMembers,
	getAllMembersByStatus,
	updateMember,
} from "@/app/dashboard/members/lib/data";
import { toast } from "react-toastify";

interface IMembersSlice {
	members: IMember[];
	activeMembers: IMember[];
	searchMembers: IMember[];
	searchActiveMembers: IMember[];
	updated: boolean;
	created: boolean;
	loading: boolean;
}

const initialState: IMembersSlice = {
	members: [],
	activeMembers: [],
	searchMembers: [],
	searchActiveMembers: [],
	updated: false,
	created: false,
	loading: false,
};

export const fetchMembersByFitnessCenter = createAsyncThunk(
	"members/fetch",
	async (centerId: number) => {
		const response = await getAllMembers(centerId);
		return response;
	}
);

export const fetchMembersByStatus = createAsyncThunk(
	"membersByStatus/fetch",
	async ({ centerId, status }: any) => {
		const response = await getAllMembersByStatus(centerId, status);
		return response;
	}
);

export const updateMemberInfo = createAsyncThunk(
	"members/update",
	async (member: any) => {
		const response = await updateMember(member);
		return response;
	}
);

export const createNewMember = createAsyncThunk(
	"members/create",
	async ({ member, centerId }: any) => {
		const response = await createMember(member, centerId);
		if (response.error) throw new Error(response.error);

		return response;
	}
);

export const membersSlice = createSlice({
	name: "members",
	initialState,
	reducers: {
		searchMembers: (state, action) => {
			const inputText = action.payload.toLowerCase();
			const membersFiltered = state.members.filter(
				(member) =>
					member.first_name.toLowerCase().includes(inputText) ||
					member.last_name.toLowerCase().includes(inputText) ||
					member.email.toLowerCase().includes(inputText)
			);
			state.searchMembers = membersFiltered;
		},
		searchActiveMembers: (state, action) => {
			const inputText = action.payload.toLowerCase();
			const membersFiltered = state.activeMembers.filter(
				(member) =>
					member.first_name.toLowerCase().includes(inputText) ||
					member.last_name.toLowerCase().includes(inputText) ||
					member.email.toLowerCase().includes(inputText)
			);
			state.searchActiveMembers = membersFiltered;
		},
		membersUpdated: (state, action) => {
			state.updated = false;
		},
		memberCreated: (state, action) => {
			state.created = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMembersByStatus.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchMembersByStatus.fulfilled, (state, action) => {
			state.activeMembers = action.payload;
			state.searchActiveMembers = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchMembersByFitnessCenter.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchMembersByFitnessCenter.fulfilled, (state, action) => {
			state.members = action.payload;
			state.searchMembers = action.payload;
			state.loading = false;
		});
		builder.addCase(updateMemberInfo.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateMemberInfo.fulfilled, (state, action) => {
			const updatedMembers = state.members.map((member) =>
				member.id === action.payload[0].id ? action.payload[0] : member
			);
			state.searchMembers = updatedMembers;
			state.updated = true;
			state.loading = false;
		});
		builder.addCase(createNewMember.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(createNewMember.fulfilled, (state, action) => {
			state.searchMembers.push(action.payload);
			state.created = true;
			state.loading = false;
		});
		builder.addCase(createNewMember.rejected, (state, action) => {
			toast.error(action.error.message);
			state.created = false;
			state.loading = false;
		});
	},
});

export const {
	searchMembers,
	membersUpdated,
	memberCreated,
	searchActiveMembers,
} = membersSlice.actions;

export default membersSlice.reducer;
