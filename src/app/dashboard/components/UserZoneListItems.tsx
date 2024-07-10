import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

export const UserZoneListItems = () => {
	const pathName = usePathname();
	const supabase = createClient();
	const route = useRouter();
	const iconColor = "#d0d0d0";

	const removeSession = async () => {
		await supabase.auth.signOut({ scope: "local" });
		route.push("/");
	};

	const menuItems = [
		{
			text: "Configuración",
			icon: <SettingsIcon sx={{ color: iconColor }} />,
			path: "/dashboard/configuration",
		},
		{
			text: "Logout",
			icon: <PowerSettingsNewIcon sx={{ color: iconColor }} />,
			path: "/",
		},
	];

	return (
		<>
			{menuItems.map((item, index) => {
				if (item.text === "Logout") {
					return (
						<ListItemButton
							key={index}
							sx={{
								background:
									pathName === item.path ? "rgba(65,76,99,1)" : "inherit",
							}}
							onClick={removeSession}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					);
				} else {
					return (
						<ListItemButton
							key={index}
							sx={{
								background:
									pathName === item.path ? "rgba(65,76,99,1)" : "inherit",
							}}
							href={item.path}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					);
				}
			})}
		</>
	);
};
