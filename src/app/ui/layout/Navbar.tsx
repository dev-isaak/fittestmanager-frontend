"use client";
import { usePathname } from "next/navigation";
import NavbarMain from "../NavbarMain";
import NavbarSecondary from "../NavbarSecondary";

function NavBar() {
	const pathName = usePathname();

	if (pathName === "/") {
		return <NavbarMain />;
	} else if (
		pathName !== "/" &&
		!/^\/dashboard\/.*/.test(pathName) &&
		pathName !== "/dashboard"
	) {
		return <NavbarSecondary />;
	}
}

export default NavBar;
