"use client";

import {
	Box,
	Divider,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFitnessCenter } from "@/redux/features/fitnessCentersSlice";
import { IFitnessCenter } from "../fitness-centers/interfaces/interfaces";

export default function SelectFitnessCenter() {
	const dispatch = useAppDispatch();
	const [currentCenterId, setCurrentCenterId] = useState(0);
	const fitnessCenters: any = useAppSelector(
		(data) => data.fitnessCentersReducer.centers
	);

	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);

	useEffect(() => {
		if (fitnessCenters.length > 0) {
			setCurrentCenterId(
				currentCenter.id === 0 ? fitnessCenters[0].id : currentCenter.id
			);
		}
	}, [fitnessCenters]);

	const handleFitnessCenterChange = (event: SelectChangeEvent<number>) => {
		const selectedCenterId = event.target.value;
		const currentCenter = fitnessCenters.filter(
			(center: IFitnessCenter) => center.id === selectedCenterId
		)[0];
		dispatch(selectFitnessCenter(currentCenter));
		setCurrentCenterId(currentCenter.id);
	};

	return (
		<>
			<Box margin={2}>
				<Select
					sx={{
						width: "100%",
						paddingX: 2,
						color: "#d0d0d0",
						background: "rgba(65,76,99,1)",
						border: "none",
					}}
					value={currentCenterId ? currentCenterId : ""}
					onChange={handleFitnessCenterChange}>
					{fitnessCenters.map((center: IFitnessCenter) => (
						<MenuItem key={center.id} value={center.id}>
							{center.center_name}
						</MenuItem>
					))}
				</Select>
			</Box>
		</>
	);
}
