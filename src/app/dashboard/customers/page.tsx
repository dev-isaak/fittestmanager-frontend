"use client";
import isAuth from "@/app/ui/isAuth";
import { Box } from "@mui/material";

function Customers() {
	return (
		<Box>
			<h1>This is the customers view</h1>
		</Box>
	);
}

export default isAuth(Customers);
