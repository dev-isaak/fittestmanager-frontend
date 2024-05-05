"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getAllMembers } from "./lib/data";
import TabMenu from "@/app/ui/layout/TabMenu";
import MembersBoard from "./components/MembersBoard";
import CreateMember from "./components/CreateMember";

function Members() {
	useEffect(() => {
		getAllMembers();
	}, []);

	return (
		<Box>
			<TabMenu
				titleTab={["Main", "Create Member"]}
				component={[<MembersBoard key={1} />, <CreateMember key={2} />]}
			/>
		</Box>
	);
}

export default Members;
