import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SearchInput from "@/app/ui/SearchInput";
import DataTable from "@/app/ui/DataTable";
import { fetchCoachesByFitnessCenter } from "@/redux/features/coachesSlice";
import PaperBoard from "../../components/PaperBoard";

export default function CoachesBoard() {
	const dispatch = useAppDispatch();
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const coaches = useAppSelector((data) => data.coachesReducer.searchCoaches);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			// Añadir condicional para que solo haga dispatch cuando se cambia de fitnessCenter, pero no esten los datos anteriores guardados en redux
			dispatch(fetchCoachesByFitnessCenter(centerId));
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
				titleCol={["Avatar", "Name", "Email", "Phone Number", "Status"]}
				dataCol={["photo", "first_name", "email", "phone_number", ""]}
			/>
		</PaperBoard>
	);
}
