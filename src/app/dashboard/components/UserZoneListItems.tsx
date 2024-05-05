import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

export const UserZoneListItems = () => {
	const pathName = usePathname();
	const supabase = createClient();
	const route = useRouter();

	const removeSession = async () => {
		await supabase.auth.signOut({ scope: "local" });
		route.push("/");
	};

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
					sx={{
						background:
							pathName === item.path ? "rgba(20,30,70,.3)" : "inherit",
					}}
					onClick={removeSession}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText primary={item.text} />
				</ListItemButton>
			))}
		</>
	);
};
