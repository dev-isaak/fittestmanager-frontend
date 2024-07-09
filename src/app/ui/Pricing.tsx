"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Skeleton, Stack, Switch, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { getStripePrices } from "../lib/pricings";

// const mensualTiers = [
// 	{
// 		id: "price_1PAY0z01f9W7dg0W7JAkJIcs",
// 		title: "Basic",
// 		type: "mensual",
// 		subheader: "Recomendado",
// 		price: "50",
// 		description: [
// 			"Usuarios ilimitados",
// 			"10 GB of storage",
// 			"Help center access",
// 			"Priority email support",
// 			"Dedicated team",
// 			"Best deals",
// 		],
// 		buttonText: "Empezar ahora",
// 		buttonVariant: "contained",
// 	},
// 	{
// 		id: "price_1PAY2b01f9W7dg0WWAwSvut4",
// 		title: "Plus",
// 		type: "mensual",
// 		price: "75",
// 		description: [
// 			"Usuarios ilimitados",
// 			"30 GB of storage",
// 			"Help center access",
// 			"Phone & email support",
// 		],
// 		buttonText: "Contact us",
// 		buttonVariant: "contained",
// 	},
// ];

// const anualTiers = [
// 	{
// 		id: "price_1PZdY401f9W7dg0WQ6Qd1tUh",
// 		title: "Basic",
// 		type: "anual",
// 		subheader: "Recomendado",
// 		price: "540",
// 		description: [
// 			"Usuarios ilimitados",
// 			"10 GB of storage",
// 			"Help center access",
// 			"Priority email support",
// 			"Dedicated team",
// 			"Best deals",
// 		],
// 		buttonText: "Empezar ahora",
// 		buttonVariant: "contained",
// 	},
// 	{
// 		id: "price_1PAY2u01f9W7dg0W94n1Zdrz",
// 		title: "Plus",
// 		type: "anual",
// 		price: "70",
// 		description: [
// 			"Usuarios ilimitados",
// 			"30 GB of storage",
// 			"Help center access",
// 			"Phone & email support",
// 		],
// 		buttonText: "Contact us",
// 		buttonVariant: "contained",
// 	},
// ];

const AntSwitch = styled(Switch)(({}) => ({
	width: 28,
	height: 16,
	padding: 0,
	display: "flex",
	"&:active": {
		"& .MuiSwitch-thumb": {
			width: 15,
		},
		"& .MuiSwitch-switchBase.Mui-checked": {
			transform: "translateX(9px)",
		},
	},
	"& .MuiSwitch-switchBase": {
		padding: 2,
		"&.Mui-checked": {
			transform: "translateX(12px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: "lightblue",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: 200,
	},
	"& .MuiSwitch-track": {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: "lightgreen",
		boxSizing: "border-box",
	},
}));

export default function Pricing() {
	const router = useRouter();
	const [anualPlan, setAnualPlan] = React.useState(false);
	const [tiers, setTiers] = React.useState([]);
	const [prices, setPrices] = React.useState([]);

	React.useEffect(() => {
		const getPrices = async () => {
			const stripePrices = await getStripePrices();
			setPrices(stripePrices);
			return stripePrices;
		};
		getPrices();
	}, []);

	React.useEffect(() => {
		if (anualPlan) {
			const anualTiers = prices.filter((price) => price.interval === "year");
			setTiers(anualTiers);
		} else {
			const monthlyTiers = prices.filter((price) => price.interval === "month");
			setTiers(monthlyTiers);
		}
	}, [anualPlan, prices]);

	const handlePlanPeriodChange = () => {
		setAnualPlan(!anualPlan);
	};

	const handlePaySubscription = async (tier: any) => {
		let interval;
		if (tier.interval === "month") interval = "mensual";
		else interval = "anual";
		router.push(
			`/checkout?price_id=${tier.id}&title=${tier.product_id.name}&price=${
				tier.unit_amount / 100
			}&type=${interval}`
		);
	};

	return (
		<Container
			id='pricing'
			sx={{
				pt: { xs: 4, sm: 12 },
				pb: { xs: 8, sm: 16 },
				position: "relative",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: { xs: 3, sm: 6 },
			}}>
			<Box
				sx={{
					width: { sm: "100%", md: "60%" },
					textAlign: { sm: "left", md: "center" },
				}}>
				<Typography component='h2' variant='h4' color='text.primary'>
					Precios
				</Typography>
				<Typography variant='body1' color='text.secondary'>
					Quickly build an effective pricing table for your potential customers
					with this layout. <br />
					It&apos;s built with default Material UI components with little
					customization.
				</Typography>
				<Stack
					sx={{
						flexDirection: "row",
						alignItems: "center",
						gap: 1,
						justifyContent: "center",
						marginTop: 4,
					}}>
					<Typography variant='h6'>Mensual</Typography>
					<AntSwitch
						checked={anualPlan}
						onChange={handlePlanPeriodChange}
						inputProps={{ "aria-label": "ant design" }}
					/>
					<Typography variant='h6'>Anual</Typography>
				</Stack>
			</Box>
			<Grid container spacing={3} alignItems='center' justifyContent='center'>
				{tiers.length ? (
					tiers
						.sort(
							(a, b) => parseInt(a.metadata.sort) - parseInt(b.metadata.sort)
						)
						.map((tier) => {
							let pros;
							if (tier.metadata) {
								pros = tier.metadata.pros.split([","]);
							}
							return (
								<Grid
									item
									key={tier.title}
									xs={12}
									sm={tier.title === "Enterprise" ? 12 : 6}
									md={4}>
									<Card
										sx={{
											p: 2,
											display: "flex",
											flexDirection: "column",
											gap: 4,
											borderRadius: 5,
											border:
												tier.product_id.name === "Basic"
													? "1px solid"
													: undefined,
											borderColor:
												tier.product_id.name === "Basic"
													? "primary.main"
													: undefined,
											background:
												tier.product_id.name === "Basic"
													? "linear-gradient(180deg, rgba(17,62,104,1) 0%, rgba(6,29,64,1) 100%)"
													: "linear-gradient(180deg, rgba(247,245,245,1) 0%, rgba(170,218,222,1) 100%)",
										}}>
										<CardContent>
											<Box
												sx={{
													mb: 1,
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													color:
														tier.product_id.name === "Basic" ? "grey.100" : "",
												}}>
												<Typography component='h3' variant='h6'>
													{tier.product_id.name}
												</Typography>
												{tier.product_id.name === "Basic" && (
													<Chip
														icon={<AutoAwesomeIcon />}
														label='Recomendado'
														size='small'
														sx={{
															background: (theme) =>
																theme.palette.mode === "light" ? "" : "none",
															backgroundColor: "primary.contrastText",
															"& .MuiChip-label": {
																color: "white",
															},
															"& .MuiChip-icon": {
																color: "yellow",
															},
														}}
													/>
												)}
											</Box>
											<Box
												sx={{
													display: "flex",
													alignItems: "baseline",
													color:
														tier.product_id.name === "Basic"
															? "grey.50"
															: undefined,
												}}>
												<Typography component='h3' variant='h2'>
													{tier.unit_amount / 100}€
												</Typography>
												<Typography component='h3' variant='h6'>
													&nbsp; / {tier.interval === "month" ? "mes" : "año"}
												</Typography>
											</Box>
											{tier.interval === "year" && (
												<Typography
													variant='body2'
													sx={{
														marginTop: -2,
														color:
															tier.product_id.name === "Basic" && "#f5f5f5",
													}}>
													{tier.unit_amount / 100 / 12}€ / mes
												</Typography>
											)}
											<Divider
												sx={{
													my: 2,
													opacity: 0.2,
													borderColor: "grey.500",
												}}
											/>
											{pros?.map((line) => (
												<Box
													key={line}
													sx={{
														py: 1,
														display: "flex",
														gap: 1.5,
														alignItems: "center",
													}}>
													<DoneRoundedIcon
														sx={{
															width: 30,
															color: "green",
															marginRight: -1,
														}}
													/>
													<Typography
														variant='subtitle2'
														sx={{
															color:
																tier.product_id.name === "Basic"
																	? "#f5f5f5"
																	: "#333",
														}}>
														{line}
													</Typography>
												</Box>
											))}
										</CardContent>
										<CardActions>
											<Button
												color={
													tier.product_id.name === "Basic"
														? "secondary"
														: "primary"
												}
												fullWidth
												variant='contained'
												onClick={() => handlePaySubscription(tier)}>
												{/* {tier.buttonText} */}
												Subscribirse
											</Button>
										</CardActions>
									</Card>
								</Grid>
							);
						})
				) : (
					<Box sx={{ display: "flex", gap: 2, m: 0, p: 0 }}>
						<Skeleton variant='rounded' width={375} height={550} />
						<Skeleton variant='rounded' width={375} height={550} />
					</Box>
				)}
			</Grid>
		</Container>
	);
}
