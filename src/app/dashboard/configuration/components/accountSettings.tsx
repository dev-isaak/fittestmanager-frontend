"use client";
import { createClient } from "@/app/utils/supabase/client";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	TextField,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AccountSettings = () => {
	const route = useRouter();
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");
	const supabase = createClient();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteAccount = async () => {
		const res = await fetch("/api/delete-user", {
			method: "POST",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers":
					"authorization, x-client-info, apikey, content-type",
			},
		});
		const data = await res.json();
		console.log(data);
		// if (error) {
		// 	toast.error("Error al eliminar el usuario. Prueba de nuevo más tarde.");
		// 	throw new Error("Error: ", error);
		// }

		// route.push("/");
	};

	return (
		<Box sx={{ my: 2 }}>
			<Typography component='h2' variant='h6'>
				Danger Zone
			</Typography>
			<Box sx={{ my: 2 }}>
				<Typography>
					Estás a punto de tomar una acción que no se puede deshacer.
				</Typography>
				<Typography>
					Se eliminarán todos los clientes, coaches, centros y horarios
					asociados.
				</Typography>
			</Box>
			<Button color='error' variant='contained' onClick={handleClickOpen}>
				Eliminar Cuenta
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						handleClose();
					},
				}}>
				<DialogTitle>Eliminar cuenta</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Estás a punto de tomar una acción que no se puede deshacer. Si estás
						seguro que quieres eliminar la cuenta con todos los datos asociados,
						escribe <strong>"Eliminar cuenta"</strong> en el recuadro.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						label='Escribe aquí'
						fullWidth
						variant='standard'
						defaultValue={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button
						disabled={text === "Eliminar cuenta" ? false : true}
						onClick={handleDeleteAccount}
						color='error'
						variant='contained'>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default AccountSettings;
