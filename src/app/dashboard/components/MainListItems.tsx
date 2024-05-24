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
import { Collapse, List } from "@mui/material";
import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const MainListItems = () => {
	const [openItems, setOpenItems] = useState({});
	const pathName = usePathname();
	const iconColor = "#d0d0d0";

	const handleClick = (index) => {
		setOpenItems((prevOpenItems) => ({
			...prevOpenItems,
			[index]: !prevOpenItems[index],
		}));
	};

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
			// path: `#`,
			nested: [
				{
					text: "Main",
					path: "/dashboard/members",
				},
				{
					text: "Crear miembro",
					path: "/dashboard/members/create-member",
				},
			],
		},
		{
			text: "Coaches",
			icon: <SportsIcon sx={{ color: iconColor }} />,
			// path: `/dashboard/coaches`,
			nested: [
				{
					text: "Main",
					path: "/dashboard/coaches",
				},
				{
					text: "Crear coach",
					path: "/dashboard/coaches/create-coach",
				},
			],
		},
		{
			text: "Salas",
			icon: <AddHomeIcon sx={{ color: iconColor }} />,
			// path: `/dashboard/rooms`,
			nested: [
				{
					text: "Main",
					path: "/dashboard/rooms",
				},
				{
					text: "Crear sala",
					path: "/dashboard/rooms/create-room",
				},
				{
					text: "Crear clase",
					path: "/dashboard/classes/create-class",
				},
				{
					text: "Crear evento",
					path: "/dashboard/seminars/create-seminar",
				},
			],
		},
		{
			text: "Reports",
			icon: <BarChartIcon sx={{ color: iconColor }} />,
			path: "/reports",
		},
	];
	return (
		<>
			{menuItems.map((item, index) =>
				item.nested ? (
					<React.Fragment key={index}>
						<ListItemButton
							onClick={() => handleClick(index)}
							component={Link}
							href={{ pathname: item.path }}
							sx={{
								background: pathName.includes(item.path)
									? "rgba(65,76,99,1)"
									: "inherit",
							}}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{item.text}</ListItemText>
							{openItems[index] ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={openItems[index]} timeout='auto' unmountOnExit>
							<List>
								{item.nested.map((nestedItem, index2) => (
									<ListItemButton
										component={Link}
										href={{
											pathname: nestedItem.path,
										}}
										key={index2}
										sx={{
											paddingLeft: 10,
											color: pathName === nestedItem.path ? "white" : "#8a99af",
										}}>
										<ListItemText sx={{ fontSize: ".9rem" }}>
											{nestedItem.text}
										</ListItemText>
									</ListItemButton>
								))}
							</List>
						</Collapse>
					</React.Fragment>
				) : (
					<ListItemButton
						component={Link}
						href={{
							pathname: item.path,
						}}
						key={index}
						sx={{
							background:
								pathName === item.path ? "rgba(65,76,99,1)" : "inherit",
						}}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText>{item.text}</ListItemText>
					</ListItemButton>
				)
			)}
		</>
	);
};
