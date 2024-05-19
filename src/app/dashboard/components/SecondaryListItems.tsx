import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { usePathname } from "next/navigation";

export const SecondaryListItems = () => {
	const pathName = usePathname();
	const iconColor = "#d0d0d0";

	const menuItems = [
		{
			text: "Current month",
			icon: <AssignmentIcon sx={{ color: iconColor }} />,
			path: "/dashboard/reports/current-month",
		},
		{
			text: "Last quarter",
			icon: <AssignmentIcon sx={{ color: iconColor }} />,
			path: "/dashboard/reports/last-quarter",
		},
		{
			text: "Year-end sale",
			icon: <AssignmentIcon sx={{ color: iconColor }} />,
			path: "/dashboard/reports/year-end-sale",
		},
	];
	return (
		<>
			{menuItems.map((item, index) => (
				<ListItemButton
					key={index}
					sx={{
						background: pathName === item.path ? "rgba(65,76,99,1)" : "inherit",
					}}
					href={item.path}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText primary={item.text} />
				</ListItemButton>
			))}
		</>
	);
};
