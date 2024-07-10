"use client";
import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import AccountSettings from "./components/accountSettings";

const Configuration = () => {
	return (
		<Stack>
			<Paper sx={{ p: 2 }}>
				<Typography variant='h5' component='h2'>
					Información personal
				</Typography>
				<Divider />
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Typography variant='body2'>Nombre</Typography>
							<TextField name='name' fullWidth defaultValue={"Isaac"} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant='body2'>Apellidos</Typography>
							<TextField
								name='lastName'
								fullWidth
								defaultValue={"Montenegro Martínez"}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Typography variant='body2'>Email</Typography>
							<TextField
								name='email'
								fullWidth
								defaultValue={"isaac_montenegro@stuller.com"}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant='body2'>Teléfono</Typography>
							<TextField name='phone' fullWidth defaultValue={"666666666"} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Typography variant='body2'>Dirección</Typography>
							<TextField
								name='streetLine1'
								fullWidth
								defaultValue={"C/ selva"}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant='body2'>Línea 2</Typography>
							<TextField name='streetLine2' fullWidth defaultValue={"3-7"} />
						</Grid>
					</Grid>
					<Box>
						<Typography variant='body2'>Dirección</Typography>
						<TextField name='postalCode' defaultValue={"08016"} />
					</Box>
					<Button
						variant='contained'
						sx={{ width: "fit-content", margin: "auto" }}>
						Actualizar
					</Button>
				</Box>
			</Paper>
			<AccountSettings />
		</Stack>
	);
};

export default Configuration;
