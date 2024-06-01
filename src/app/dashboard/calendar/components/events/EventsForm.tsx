import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import { eventsValidation } from "./validation/eventsValidation";
import { useAppSelector } from "@/redux/hooks";

type EventsFormType = {
	bookingData?: any;
	formType: "CREATE" | "UPDATE";
	onCloseDialog?: any;
};

export default function BookingsForm({
	bookingData,
	formType,
	onCloseDialog,
}: EventsFormType) {
	const isLoading = useAppSelector(
		(data) => data.classesScheduleReducer.loading
	);
	const handleCloseButton = () => {
		onCloseDialog(false);
	};

	return (
		<Formik
			initialValues={{
				bookingId: formType === "UPDATE" ? bookingData.event_id : "",
				clientId: formType === "UPDATE" ? bookingData.client_id : "",
				scheduleId: formType === "UPDATE" ? bookingData.schedule_id : "",
				date: formType === "UPDATE" ? bookingData.date : "",
				hour: formType === "UPDATE" ? bookingData.hour : "",
			}}
			onSubmit={(bookingData) => {
				if (formType === "CREATE") {
					//
				}
				if (formType === "UPDATE") {
					//
				}
			}}
			validate={eventsValidation}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<Stack component='form' onSubmit={handleSubmit} gap={2} p={2}>
					<TextField
						sx={{ display: "none" }}
						name='bookingData'
						value={formType === "UPDATE" && bookingData.id}
					/>
					<Stack
						flexDirection='row'
						gap={2}
						marginTop={4}
						justifyContent='center'>
						{isLoading ? (
							<CircularProgress />
						) : (
							<>
								<Button type='submit' variant='contained'>
									{formType === "CREATE" ? "Añadir" : "Actualizar"}
								</Button>
								{formType === "UPDATE" && (
									<Button onClick={handleCloseButton} variant='outlined'>
										Cerrar
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
