import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { usePathname } from "next/navigation";

export const UserZoneListItems = () => {
	const pathName = usePathname();

	const menuItems = [
		{
			text: "Logout",
			icon: <PowerSettingsNewIcon />,
			path: "/",
		},
	];
	return (
		<>
			{menuItems.map((item, index) => (
				<ListItemButton
					key={index}
					sx={{ bgcolor: pathName === item.path && "rgba(20,30,70,.3)" }}
					href={item.path}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText primary={item.text} />
				</ListItemButton>
			))}
		</>
	);
};
