import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

type PaperBoardType = {
	children: ReactNode;
};

export default function PaperBoard({ children }: PaperBoardType) {
	return (
		<Box component={Paper} p={4} sx={{ boxShadow: "4px 4px 10px #dfdfdf" }}>
			{children}
		</Box>
	);
}
