"use client";
import { Box } from "@mui/material";
import TabMenu from "@/app/ui/layout/TabMenu";
import CoachesBoard from "./components/CoachesBoard";
import CreateCoach from "./components/CreateCoach";

function Coaches() {
	return (
		<Box>
			<TabMenu
				titleTab={["Main", "Crear Coach"]}
				component={[<CoachesBoard key={1} />, <CreateCoach key={2} />]}
			/>
		</Box>
	);
}

export default Coaches;
