"use client";
import { usePathname } from "next/navigation";
import NavbarMain from "../NavbarMain";
import NavbarSecondary from "../NavbarSecondary";
import { createContext } from "react";

export const AuthContext = createContext(false);

type NavBarType = {
	isLoggedIn: boolean;
};

function NavBar({ isLoggedIn }: NavBarType) {
	const pathName = usePathname();

	if (pathName === "/") {
		return (
			<AuthContext.Provider value={isLoggedIn}>
				<NavbarMain />
			</AuthContext.Provider>
		);
	} else if (
		pathName !== "/" &&
		!/^\/dashboard\/.*/.test(pathName) &&
		pathName !== "/dashboard"
	) {
		return (
			<AuthContext.Provider value={isLoggedIn}>
				<NavbarSecondary />
			</AuthContext.Provider>
		);
	}
}

export default NavBar;
