import { ThemeOptions, createTheme } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
	palette: {
		primary: {
			main: "#141E46",
		},
		secondary: {
			main: "#8DECB4",
		},
		background: {
			default: "#ffffff",
			paper: "#ececec",
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
		divider: "rgba(76,76,76,0.12)",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					border: 0,
					borderRadius: 3,
					color: "white",
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
					background: "#f5f5f5",
					padding: 0,
					border: "none",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {},
				head: {
					background: "#434343",
					color: "white",
					fontWeight: 600,
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					"&:nth-of-type(odd)": {
						background: "#f5f5f5",
					},
				},
			},
		},
	},
	shape: {
		borderRadius: 4,
	},
});

export default theme;
