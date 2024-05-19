"use client";
import { Box, Typography } from "@mui/material";
import MemberForm from "./MemberForm";
import PaperBoard from "../../components/PaperBoard";

export default function CreateMember() {
	return (
		<PaperBoard>
			<Typography component='h2' variant='h4'>
				Alta de miembro
			</Typography>
			<MemberForm formType='CREATE' />
		</PaperBoard>
	);
}
