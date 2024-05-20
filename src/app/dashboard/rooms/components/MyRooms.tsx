import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import PaperBoard from "../../components/PaperBoard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {
	fetchRoomsByFitnessCenter,
	roomsCreated,
	roomsUpdated,
} from "@/redux/features/roomsSlice";
import DialogForm from "@/app/ui/DialogForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

export default function MyRooms() {
	const [openDialog, setOpenDialog] = useState(false);
	const [roomData, setRoomData] = useState({});
	const currentFitnessCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const rooms = useAppSelector((data) => data.roomsReducer.rooms);
	const updated = useAppSelector((data) => data.roomsReducer.updated);
	const created = useAppSelector((data) => data.roomsReducer.created);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (created) {
			dispatch(roomsCreated(""));
		}
	}, [created, dispatch]);

	useEffect(() => {
		if (updated) {
			dispatch(roomsUpdated(""));
			setOpenDialog(false);
		}
	}, [updated, dispatch]);

	useEffect(() => {
		if (currentFitnessCenter.id !== 0) {
			const centerId = currentFitnessCenter.id;
			if (!rooms.length) {
				dispatch(fetchRoomsByFitnessCenter(centerId));
			}
		}
	}, [currentFitnessCenter, dispatch]);

	const handleOpenDialog = (data: any) => {
		setOpenDialog(true);
		setRoomData(data);
	};
	return (
		<PaperBoard>
			<Typography component='h1' variant='h3'>
				Mis salas
			</Typography>
			<Box m={2}>
				<Button
					color='primary'
					variant='contained'
					component={Link}
					href='/dashboard/rooms/create-room'>
					<AddIcon /> Crear sala
				</Button>
			</Box>
			<Stack
				flexDirection='row'
				flexWrap='wrap'
				justifyContent='center'
				gap={2}>
				{rooms.map((room, index) => (
					<Card
						key={index}
						sx={{
							width: 300,
							padding: 2,
						}}>
						<Typography variant='h5'>{room.name}</Typography>
						<CardContent sx={{ height: 100 }}>
							<Typography variant='body2' sx={{ fontStyle: "italic" }}>
								{room.description}
							</Typography>
						</CardContent>
						<CardActions>
							<Button variant='outlined'>Horarios</Button>
							<IconButton onClick={() => handleOpenDialog(room)}>
								<EditIcon />
							</IconButton>
							<IconButton>
								<DeleteIcon sx={{ color: "#cd6868" }} />
							</IconButton>
						</CardActions>
					</Card>
				))}
			</Stack>
			<DialogForm
				type='ROOMS'
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				formData={roomData}
			/>
		</PaperBoard>
	);
}
