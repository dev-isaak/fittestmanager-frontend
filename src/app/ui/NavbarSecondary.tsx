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
import secondaryNavbarMenu from "../lib/secondaryNavbarMenu.json";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeSession, scrollToSection } from "../lib/data";
import { AuthContext } from "./layout/Navbar";

export default function NavbarSecondary() {
	const [open, setOpen] = useState(false);
	const pathName = usePathname();
	const router = useRouter();
	const isLoggedIn = useContext(AuthContext);
	const [isSignedIn, setIsSignedIn] = useState(isLoggedIn);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const handleLogout = async () => {
		const isLoggedOut = await removeSession();
		if (isLoggedOut) {
			setIsSignedIn(false);
		}
	};

	const handleScroll = (sectionId: string) => {
		const isHomePage = scrollToSection(sectionId, pathName);

		if (isHomePage) {
			setOpen(false);
		} else {
			router.push(`/#${sectionId}`);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<AppBar
				position='static'
				sx={{
					boxShadow: 0,
					bgcolor: "primary",
					color: "white",
					backgroundImage: "none",
				}}>
				<Container>
					<Toolbar
						variant='regular'
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							flexShrink: 0,
							maxHeight: 40,
							width: "100%",
						}}>
						<Box
							sx={{
								flexGrow: 1,
								display: "flex",
								alignItems: "center",
								ml: "-18px",
								px: 0,
							}}>
							<Image
								src={
									"https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
								}
								alt='logo of sitemark'
								width={140}
								height={140}
							/>
							<Box sx={{ display: { xs: "none", md: "flex" } }}>
								{secondaryNavbarMenu.map((item, index) => {
									return (
										<MenuItem
											key={index}
											onClick={() => handleScroll(item.href)}
											sx={{ py: "6px", px: "12px" }}>
											<Typography variant='body2' color='white'>
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
										color='secondary'
										variant='text'
										size='small'
										component='a'
										href='/sign-in'>
										Sign in
									</Button>
									<Button
										color='secondary'
										variant='contained'
										size='small'
										component='a'
										href='/sign-up'>
										Sign up
									</Button>
								</>
							) : (
								<Button
									color='secondary'
									variant='contained'
									size='small'
									component='a'
									onClick={handleLogout}>
									Logout
								</Button>
							)}
						</Box>
						<Box sx={{ display: { sm: "", md: "none" } }}>
							<Button
								variant='text'
								color='primary'
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
									{secondaryNavbarMenu.map((item, index) => {
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
													color='secondary'
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
												color='secondary'
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
