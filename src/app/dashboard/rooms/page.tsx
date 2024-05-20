"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MyRooms from "./components/MyRooms";
import ClassesTable from "../classes/components/ClassesTable";
import PaperBoard from "../components/PaperBoard";
import DataTable from "@/app/ui/DataTable";

const eventos = [
	{
		nombre: "Boxeo",
		descripción: "clase de boxeo",
	},
	{
		nombre: "Yoga",
		descripción: "clase de Yoga",
	},
	{
		nombre: "Pilates",
		descripción: "clase de Pilates",
	},
	{
		nombre: "Estiramientos",
		descripción: "clase de Estiramientos",
	},
];

function RoomsPage() {
	return (
		<Stack gap={2}>
			<MyRooms />
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<ClassesTable />
				</Grid>
				<Grid item xs={12} md={6}>
					<PaperBoard>
						<Typography component='h3' variant='h4'>
							Seminarios / Eventos
						</Typography>
						<Box m={2}>
							<Button color='primary' variant='contained'>
								{/* <AddIcon /> Añadir seminario / evento */}
							</Button>
						</Box>
						<DataTable
							data={eventos}
							type='COACHES'
							titleCol={["Clase", "Color"]}
							dataCol={["name", "color"]}
						/>
					</PaperBoard>
				</Grid>
			</Grid>
		</Stack>
	);
}

export default RoomsPage;
