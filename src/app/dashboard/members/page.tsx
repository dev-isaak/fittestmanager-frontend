"use client";
import { Box } from "@mui/material";
import TabMenu from "@/app/ui/layout/TabMenu";
import MembersBoard from "./components/MembersBoard";
import CreateMemberPage from "./create-member/page";

function Members() {
	return (
		<Box>
			<TabMenu
				titleTab={["Main", "Create Member"]}
				component={[<MembersBoard key={1} />, <CreateMemberPage key={2} />]}
			/>
		</Box>
	);
}

export default Members;
