"use client";
import { Grid, Stack } from "@mui/material";
import MyRooms from "./components/MyRooms";
import ClassesTable from "../classes/components/ClassesTable";
import SeminarsTable from "../seminars/components/SeminarsTable";

function RoomsPage() {
	return (
		<Stack gap={2}>
			<MyRooms />
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<ClassesTable />
				</Grid>
				<Grid item xs={12} md={6}>
					<SeminarsTable />
				</Grid>
			</Grid>
		</Stack>
	);
}

export default RoomsPage;
