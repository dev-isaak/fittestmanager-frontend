import TabMenu from "@/app/ui/layout/TabMenu";
import FitnessCentersBoard from "./components/FitnessCentersBoard";
import CreateCenter from "./components/CreateCenter";

export default function FitnessCenters() {
	return (
		<>
			<TabMenu
				titleTab={["Main", "Create Fitness Center"]}
				component={[<FitnessCentersBoard key={1} />, <CreateCenter key={2} />]}
			/>
		</>
	);
}
