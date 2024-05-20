"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchMembersByFitnessCenter } from "@/redux/features/membersSlice";
import PaperBoard from "../components/PaperBoard";
import { Typography } from "@mui/material";
import SearchInput from "@/app/ui/SearchInput";
import DataTable from "@/app/ui/DataTable";

function Members() {
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const members = useAppSelector((data) => data.membersReducer.searchMembers);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!members.length) {
				dispatch(fetchMembersByFitnessCenter(centerId));
			}
		}
	}, [currentFitnessCenter, dispatch]);

	return (
		<PaperBoard>
			<Typography component='h2'>Miembros</Typography>
			<SearchInput type='MEMBERS' />
			<DataTable
				onClickOpenDialog
				data={members}
				type='MEMBERS'
				titleCol={["Avatar", "Name", "Email", "Phone Number", "Plan", "Status"]}
				dataCol={[
					"photo",
					"first_name",
					"email",
					"phone_number",
					"plan",
					"status",
				]}
			/>
		</PaperBoard>
	);
}

export default Members;
