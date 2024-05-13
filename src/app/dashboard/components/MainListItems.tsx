import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ListItem } from "@mui/material";

export const MainListItems = () => {
	const pathName = usePathname();
	const menuItems = [
		{
			text: "Dashboard",
			icon: <DashboardIcon />,
			path: `/dashboard`,
		},
		{
			text: "Calendar",
			icon: <CalendarMonthIcon />,
			path: `/dashboard/calendar`,
		},
		{
			text: "Fitness Centers",
			icon: <FitnessCenterIcon />,
			path: `/dashboard/fitness-centers`,
		},
		{
			text: "Members",
			icon: <PeopleIcon />,
			path: `/dashboard/members`,
		},
		{
			text: "Reports",
			icon: <BarChartIcon />,
			path: "/reports",
		},
		{
			text: "Integrations",
			icon: <LayersIcon />,
			path: "/integrations",
		},
	];
	return (
		<>
			{menuItems.map((item, index) => (
				<ListItemButton
					component={Link}
					href={{
						pathname: item.path,
					}}
					key={index}
					sx={{
						background:
							pathName === item.path ? "rgba(20,30,70,.3)" : "inherit",
					}}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText>{item.text}</ListItemText>
				</ListItemButton>
			))}
		</>
	);
};
