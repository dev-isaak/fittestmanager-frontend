"use client";
import isAuth from "@/app/ui/isAuth";
import { Box } from "@mui/material";

function Calendar() {
	return (
		<Box>
			<h1>This is the Calendar view</h1>
		</Box>
	);
}

export default isAuth(Calendar);
