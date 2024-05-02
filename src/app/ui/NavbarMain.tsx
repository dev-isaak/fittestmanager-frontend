"use client";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import mainNavbarMenu from "../lib/mainNavbarMenu.json";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { removeSession, scrollToSection } from "../lib/data";
import { AuthContext } from "./layout/Navbar";

const logoStyle = {
	width: "140px",
	height: "auto",
	cursor: "pointer",
};

export default function NavbarMain() {
	const [open, setOpen] = useState(false);
	const isLoggedIn = useContext(AuthContext);
	const [isSignedIn, setIsSignedIn] = useState(isLoggedIn);
	const pathName = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		const isLoggedOut = await removeSession();
		if (isLoggedOut) {
			setIsSignedIn(false);
		}
	};

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const handleScroll = (sectionId: string) => {
		const isHomePage = scrollToSection(sectionId, pathName);

		if (isHomePage) {
			setOpen(false);
		} else {
			router.push("/");
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<AppBar
				position='fixed'
				sx={{
					boxShadow: 0,
					bgcolor: "transparent",
					backgroundImage: "none",
					mt: 2,
				}}>
				<Container maxWidth='lg'>
					<Toolbar
						variant='regular'
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							flexShrink: 0,
							borderRadius: "999px",
							bgcolor: "rgba(255, 255, 255, 0.4)",
							backdropFilter: "blur(24px)",
							maxHeight: 40,
							border: "1px solid",
							borderColor: "divider",
							boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
						}}>
						<Box
							sx={{
								flexGrow: 1,
								display: "flex",
								alignItems: "center",
								ml: "-18px",
								px: 0,
							}}>
							<img
								src={
									"https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
								}
								style={logoStyle}
								alt='logo of sitemark'
							/>
							<Box sx={{ display: { xs: "none", md: "flex" } }}>
								{mainNavbarMenu.map((item, index) => {
									return (
										<MenuItem
											key={index}
											onClick={() => handleScroll(item.href)}
											sx={{ py: "6px", px: "12px" }}>
											<Typography variant='body2' color='text.primary'>
												{item.title}
											</Typography>
										</MenuItem>
									);
								})}
							</Box>
						</Box>
						<Box
							sx={{
								display: { xs: "none", md: "flex" },
								gap: 0.5,
								alignItems: "center",
							}}>
							{!isSignedIn ? (
								<>
									<Button
										color='primary'
										variant='text'
										size='small'
										component='a'
										href='/sign-in'>
										Sign in
									</Button>
									<Button
										color='primary'
										variant='contained'
										size='small'
										component='a'
										href='/sign-up'>
										Sign up
									</Button>
								</>
							) : (
								<Button
									onClick={handleLogout}
									color='primary'
									variant='contained'
									size='small'
									component='a'>
									Logout
								</Button>
							)}
						</Box>
						<Box sx={{ display: { sm: "", md: "none" } }}>
							<Button
								variant='text'
								color='secondary'
								aria-label='menu'
								onClick={toggleDrawer(true)}
								sx={{ minWidth: "30px", p: "4px" }}>
								<MenuIcon />
							</Button>
							<Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
								<Box
									sx={{
										minWidth: "60dvw",
										p: 2,
										backgroundColor: "background.paper",
										flexGrow: 1,
									}}>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											alignItems: "end",
											flexGrow: 1,
										}}></Box>
									{mainNavbarMenu.map((item, index) => {
										return (
											<MenuItem
												key={index}
												onClick={() => handleScroll(item.href)}>
												{item.title}
											</MenuItem>
										);
									})}
									<Divider />
									{!isSignedIn ? (
										<>
											<MenuItem>
												<Button
													color='primary'
													variant='contained'
													component='a'
													href='/sign-up'
													sx={{ width: "100%" }}>
													Sign up
												</Button>
											</MenuItem>
											<MenuItem>
												<Button
													color='primary'
													variant='outlined'
													component='a'
													href='/sign-in'
													sx={{ width: "100%" }}>
													Sign in
												</Button>
											</MenuItem>
										</>
									) : (
										<MenuItem>
											<Button
												color='primary'
												variant='contained'
												size='small'
												component='a'
												onClick={handleLogout}>
												Logout
											</Button>
										</MenuItem>
									)}
								</Box>
							</Drawer>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}
