import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IMember } from "@/app/dashboard/members/interfaces/interfaces";
import { getAllMembers, updateMember } from "@/app/dashboard/members/lib/data";

interface IMembersSlice {
	members: IMember[];
	searchMembers: IMember[];
	updated: boolean;
}

const initialState: IMembersSlice = {
	members: [],
	searchMembers: [],
	updated: false,
};

export const fetchMembersByFitnessCenter = createAsyncThunk(
	"members/fetch",
	async (centerId: number) => {
		const response = await getAllMembers(centerId);
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
		membersUpdated: (state, action) => {
			state.updated = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMembersByFitnessCenter.fulfilled, (state, action) => {
			state.members = action.payload;
			state.searchMembers = action.payload;
		});
		builder.addCase(updateMemberInfo.fulfilled, (state, action) => {
			const updatedMembers = state.members.map((member) =>
				member.id === action.payload[0].id ? action.payload[0] : member
			);
			state.searchMembers = updatedMembers;
			state.updated = true;
		});
	},
});

export const { searchMembers, membersUpdated } = membersSlice.actions;

export default membersSlice.reducer;
