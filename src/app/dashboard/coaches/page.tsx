"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchCoachesByFitnessCenter } from "@/redux/features/coachesSlice";
import PaperBoard from "../components/PaperBoard";
import { Typography } from "@mui/material";
import SearchInput from "@/app/ui/SearchInput";
import DataTable from "@/app/ui/DataTable";

function Coaches() {
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const coaches = useAppSelector((data) => data.coachesReducer.searchCoaches);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!coaches.length) {
				dispatch(fetchCoachesByFitnessCenter(centerId));
			}
		}
	}, [currentFitnessCenter, dispatch]);

	return (
		<PaperBoard>
			<Typography component='h2'>Coaches</Typography>
			<SearchInput type='COACHES' />
			<DataTable
				onClickOpenDialog
				data={coaches}
				type='COACHES'
				titleCol={[
					{ name: "Avatar", align: "left" },
					{ name: "Name", align: "left" },
					{ name: "Email", align: "left" },
					{ name: "Phone Number", align: "left" },
				]}
				dataCol={[
					{ dbName: "photo", align: "left" },
					{ dbName: "first_name", align: "left" },
					{ dbName: "email", align: "left" },
					{ dbName: "phone_number", align: "left" },
				]}
			/>
		</PaperBoard>
	);
}

export default Coaches;
