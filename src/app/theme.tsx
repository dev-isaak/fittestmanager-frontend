import { ThemeOptions, createTheme } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
	palette: {
		primary: {
			main: "rgb(28 36 52)",
		},
		secondary: {
			main: "#E86746",
		},
		background: {
			paper: "#ffffff",
		},
		error: {
			main: "#d32f2f",
		},
		warning: {
			main: "#ed6c02",
		},
		success: {
			main: "#2e7d32",
		},
	},
	typography: {
		body1: {
			fontSize: "1rem",
		},
		body2: {
			fontSize: ".9rem",
		},
		h1: {
			fontSize: "3.5rem",
			marginTop: "1rem",
			marginBottom: "1rem",
			fontWeight: "900",
		},
		h2: {
			fontSize: "3rem",
			marginTop: "1rem",
			marginBottom: "1rem",
			fontWeight: "900",
		},
		h3: {
			fontSize: "2.5rem",
			marginTop: "1rem",
			marginBottom: "1rem",
		},
		h4: {
			fontSize: "2rem",
		},
		h5: {
			fontSize: "1.5rem",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					border: 0,
					borderRadius: 3,
					color: "white",
				},
				outlinedPrimary: {
					color: "#333",
					border: "1px solid rgb(28 36 52)",
				},
				outlinedError: {
					color: "#d32f2f",
					border: "1px solid #d32f2f",
				},
				containedSecondary: {
					color: "#333",
					fontWeight: "700",
				},
				textPrimary: {
					color: "#333",
				},
				textSecondary: {
					color: "white",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					background: "white",
					padding: 0,
					border: "none",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {},
				head: {
					color: "rgba(65,76,99,.7)",
					background: "rgba(65,76,99,.1)",
					fontWeight: 600,
					textTransform: "uppercase",
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					transition: "300ms all",
					"&:hover": {
						cursor: "pointer",
						background: "rgba(65,76,99,.1)",
					},
				},
			},
		},
		// MuiTabs: {
		// 	styleOverrides: {
		// 		indicator: {
		// 			backgroundColor: "#f5f5f5",
		// 		},
		// 	},
		// },
		// MuiTab: {
		// 	styleOverrides: {
		// 		root: {
		// 			"&.Mui-selected": {
		// 				background: "rgb(241, 245, 249)",
		// 				borderRadius: "10px 10px 0px 0px",
		// 				boxShadow: "4px 4px 10px lightgray",
		// 			},
		// 			"&.MuiTabs-indicator": {
		// 				backgroundColor: "red",
		// 			},
		// 		},
		// 	},
		// },
		MuiAvatar: {
			styleOverrides: {
				root: {
					border: "1px solid lightgray",
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					width: "100%",
					marginTop: 4,
					marginBottom: 6,
					fontSize: "0.9rem",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: "0",
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				colorError: {
					backgroundColor: "#ff000021",
				},
				colorSuccess: {
					backgroundColor: "#00800030",
				},
				colorInfo: {
					backgroundColor: "#0000ff1c",
				},
			},
		},
	},
	shape: {
		borderRadius: 4,
	},
});

export default theme;
