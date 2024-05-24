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
				titleCol={[
					{ name: "Avatar", align: "left" },
					{ name: "Name", align: "left" },
					{ name: "Email", align: "left" },
					{ name: "Phone Number", align: "left" },
					{ name: "Plan", align: "left" },
					{ name: "Status", align: "center" },
				]}
				dataCol={[
					{ dbName: "photo", align: "left" },
					{ dbName: "first_name", align: "left" },
					{ dbName: "email", align: "left" },
					{ dbName: "phone_number", align: "left" },
					{ dbName: "plan", align: "left" },
					{ dbName: "status", align: "center" },
				]}
			/>
		</PaperBoard>
	);
}

export default Members;
