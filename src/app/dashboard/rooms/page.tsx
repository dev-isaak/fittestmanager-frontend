"use client";
import { Box } from "@mui/material";
import TabMenu from "@/app/ui/layout/TabMenu";
import RoomsBoard from "./components/RoomsBoard";
import CreateRoom from "./components/CreateRoom";
import CreateClass from "./classes/components/CreateClass";

function RoomsPage() {
	return (
		<Box>
			<TabMenu
				titleTab={["Main", "Crear Sala", "Crear Clase"]}
				component={[
					<RoomsBoard key={1} />,
					<CreateRoom key={2} />,
					<CreateClass key={3} />,
				]}
			/>
		</Box>
	);
}

export default RoomsPage;
