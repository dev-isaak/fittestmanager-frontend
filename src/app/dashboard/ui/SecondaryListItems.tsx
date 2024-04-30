import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { usePathname } from "next/navigation";

export const SecondaryListItems = () => {
	const pathName = usePathname();

	const menuItems = [
		{
			text: "Current month",
			icon: <AssignmentIcon />,
			path: "/dashboard/reports/current-month",
		},
		{
			text: "Last quarter",
			icon: <AssignmentIcon />,
			path: "/dashboard/reports/last-quarter",
		},
		{
			text: "Year-end sale",
			icon: <AssignmentIcon />,
			path: "/dashboard/reports/year-end-sale",
		},
	];
	return (
		<>
			{menuItems.map((item, index) => (
				<ListItemButton
					key={index}
					sx={{ background: pathName === item.path && "rgba(20,30,70,.3)" }}
					href={item.path}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText primary={item.text} />
				</ListItemButton>
			))}
		</>
	);
};
