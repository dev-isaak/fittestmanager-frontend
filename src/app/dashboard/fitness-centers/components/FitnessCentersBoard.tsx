"use client";
import { useEffect, useState } from "react";
import { getAllFitnessCenters } from "../lib/data";
import Box from "@mui/material/Box";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";

export default function FitnessCentersBoard() {
	const [fitnessCenters, setFitnessCenters] = useState([]);

	const fetchFitnessCenters = async () => {
		const centers: any = await getAllFitnessCenters();
		setFitnessCenters(centers);
	};

	useEffect(() => {
		fetchFitnessCenters();
	}, []);
	return (
		<>
			<Box>
				<h2>Board Fitness Centers</h2>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Center Name</TableCell>
								<TableCell>Manager</TableCell>
								<TableCell>Email</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{fitnessCenters.map((center: any) => (
								<TableRow key={center.id}>
									<TableCell>{center.center_name}</TableCell>
									<TableCell>{center.first_name}</TableCell>
									<TableCell>{center.email}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
