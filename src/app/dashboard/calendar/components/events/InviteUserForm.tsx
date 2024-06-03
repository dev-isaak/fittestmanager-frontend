import { Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { useEffect } from "react";

type InviteUserFormType = {
	userData: any;
	onCloseDialog: any;
};

export default function InviteUserForm({
	userData,
	onCloseDialog,
}: InviteUserFormType) {
	useEffect(() => {
		console.log(userData);
	}, []);

	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	return (
		<Formik
			initialValues={
				{
					// bookingId: formType === "UPDATE" ? bookingData.event_id : "",
					// clientId: formType === "UPDATE" ? bookingData.client_id : "",
					// scheduleId: formType === "UPDATE" ? bookingData.schedule_id : "",
					// date: formType === "UPDATE" ? bookingData.date : "",
					// hour: formType === "UPDATE" ? bookingData.hour : "",
				}
			}
			onSubmit={(bookingData) => {
				//
			}}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<Stack component='form' onSubmit={handleSubmit} gap={2} p={2}>
					<Typography variant='h5'>
						Apuntar {userData.first_name} {userData.last_name}?
					</Typography>
					<Stack
						sx={{ flexDirection: "row", justifyContent: "center", gap: 2 }}>
						<Button type='submit' variant='contained'>
							Apuntar
						</Button>
						<Button onClick={handleCloseButton} variant='outlined'>
							Cerrar
						</Button>
					</Stack>
				</Stack>
			)}
		</Formik>
	);
}
