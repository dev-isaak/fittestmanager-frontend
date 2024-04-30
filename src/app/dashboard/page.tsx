"use client";
import { Box } from "@mui/material";
import isAuth from "../ui/isAuth";

const Admin = () => {
	return (
		<Box>
			<h1>This is admin</h1>
		</Box>
	);
};

export default isAuth(Admin);
