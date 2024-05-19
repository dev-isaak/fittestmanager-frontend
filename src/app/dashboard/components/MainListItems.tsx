import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SportsIcon from "@mui/icons-material/Sports";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MainListItems = () => {
	const pathName = usePathname();
	const iconColor = "#d0d0d0";
	const menuItems = [
		{
			text: "Dashboard",
			icon: <DashboardIcon sx={{ color: iconColor }} />,
			path: `/dashboard`,
		},
		{
			text: "Calendario",
			icon: <CalendarMonthIcon sx={{ color: iconColor }} />,
			path: `/dashboard/calendar`,
		},
		{
			text: "Fitness Centers",
			icon: <FitnessCenterIcon sx={{ color: iconColor }} />,
			path: `/dashboard/fitness-centers`,
		},
		{
			text: "Miembros",
			icon: <PeopleIcon sx={{ color: iconColor }} />,
			path: `/dashboard/members`,
		},
		{
			text: "Coaches",
			icon: <SportsIcon sx={{ color: iconColor }} />,
			path: `/dashboard/coaches`,
		},
		{
			text: "Salas",
			icon: <AddHomeIcon sx={{ color: iconColor }} />,
			path: `/dashboard/rooms`,
		},
		{
			text: "Reports",
			icon: <BarChartIcon sx={{ color: iconColor }} />,
			path: "/reports",
		},
		{
			text: "Integrations",
			icon: <LayersIcon sx={{ color: iconColor }} />,
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
						background: pathName === item.path ? "rgba(65,76,99,1)" : "inherit",
					}}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText>{item.text}</ListItemText>
				</ListItemButton>
			))}
		</>
	);
};
