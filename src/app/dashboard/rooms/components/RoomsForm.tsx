import { createNewRoom, updateRoomInfo } from "@/redux/features/roomsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import { roomFormValidation } from "../validation/roomFormValidation";

type RoomFormType = {
	roomData?: any;
	formType: "CREATE" | "UPDATE";
	onCloseDialog?: any;
};

export default function RoomsForm({
	roomData,
	formType,
	onCloseDialog,
}: RoomFormType) {
	const dispatch = useAppDispatch();
	const currentCenter = useAppSelector(
		(data) => data.fitnessCentersReducer.currentFitnessCenter
	);
	const isLoading = useAppSelector((data) => data.roomsReducer.loading);

	const handleCloseButton = () => {
		onCloseDialog(false);
	};
	return (
		<Formik
			initialValues={{
				roomId: formType === "UPDATE" ? roomData.id : "",
				roomName: formType === "UPDATE" ? roomData.name : "",
				roomDescription: formType === "UPDATE" ? roomData.description : "",
			}}
			onSubmit={(formData) => {
				if (formType === "UPDATE") {
					dispatch(updateRoomInfo(formData));
				}
				if (formType === "CREATE") {
					dispatch(
						createNewRoom({ room: formData, centerId: currentCenter.id })
					);
				}
			}}
			validate={roomFormValidation}>
			{({ values, errors, touched, handleChange, handleSubmit }) => (
				<Stack
					component='form'
					onSubmit={handleSubmit}
					gap={2}
					minWidth={400}
					alignItems='center'>
					<TextField
						fullWidth
						label='Nombre de la sala*'
						name='roomName'
						onChange={handleChange}
						error={Boolean(
							errors.roomName && touched.roomName && errors.roomName
						)}
						helperText={errors.roomName && touched.roomName && errors.roomName}
						defaultValue={values.roomName}
					/>
					<TextField
						sx={{ display: "none" }}
						name='roomId'
						value={formType === "UPDATE" && values.roomId}
					/>
					<TextField
						multiline
						rows={3}
						fullWidth
						label='Descripción'
						name='roomDescription'
						onChange={handleChange}
						defaultValue={values.roomDescription}
					/>
					<Stack flexDirection='row' gap={2} marginTop={4}>
						{isLoading ? (
							<CircularProgress />
						) : (
							<>
								<Button type='submit' variant='contained'>
									{formType === "CREATE" ? "Crear sala" : "Actualizar"}
								</Button>
								{formType === "UPDATE" && (
									<Button
										onClick={handleCloseButton}
										variant='outlined'
										color='error'>
										Cancelar
									</Button>
								)}
							</>
						)}
					</Stack>
				</Stack>
			)}
		</Formik>
	);
}
