import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMembersByFitnessCenter } from "@/redux/features/membersSlice";
import SearchInput from "@/app/ui/SearchInput";
import DataTable from "@/app/ui/DataTable";

export default function MembersBoard() {
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const members = useAppSelector((data) => data.membersReducer.searchMembers);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			dispatch(fetchMembersByFitnessCenter(centerId));
		}
	}, [currentFitnessCenter, dispatch]);

	return (
		<>
			<Typography component='h2'>Miembros</Typography>
			<SearchInput type='MEMBERS' />
			<DataTable data={members} />
		</>
	);
}
