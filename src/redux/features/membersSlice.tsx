import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IMember } from "@/app/dashboard/members/interfaces/interfaces";
import { getAllMembers } from "@/app/dashboard/members/lib/data";

interface IMembersSlice {
	members: IMember[];
	searchMembers: IMember[];
}

const initialState: IMembersSlice = {
	members: [],
	searchMembers: [],
};

export const fetchMembersByFitnessCenter = createAsyncThunk(
	"members/fetch",
	async (id: number) => {
		const response = await getAllMembers(id);
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
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMembersByFitnessCenter.fulfilled, (state, action) => {
			state.members = action.payload;
			state.searchMembers = action.payload;
		});
	},
});

export const { searchMembers } = membersSlice.actions;

export default membersSlice.reducer;
