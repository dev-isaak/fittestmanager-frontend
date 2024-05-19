import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import { classFormValidation } from "../validation/classFormValidation";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";
import { createNewClass, updateClassInfo } from "@/redux/features/classesSlice";

type RoomFormType = {
	classData?: any;
	formType: "CREATE" | "UPDATE";
	onCloseDialog?: any;
};

export default function ClassForm({
	classData,
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
				classId: formType === "UPDATE" ? classData.id : "",
				className: formType === "UPDATE" ? classData.name : "",
				classDescription: formType === "UPDATE" ? classData.description : "",
				color: formType === "UPDATE" ? classData.color : "#ffffff",
				coach_id: formType === "UPDATE" ? classData.coachId : "",
			}}
			onSubmit={(formData) => {
				if (formType === "UPDATE") {
					dispatch(updateClassInfo(formData));
				}
				if (formType === "CREATE") {
					dispatch(
						createNewClass({ classData: formData, centerId: currentCenter.id })
					);
				}
			}}
			validate={classFormValidation}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<Stack
					component='form'
					onSubmit={handleSubmit}
					gap={2}
					minWidth={400}
					alignItems='center'>
					<TextField
						sx={{ display: "none" }}
						name='classId'
						value={formType === "UPDATE" && values.classId}
					/>
					<TextField
						fullWidth
						label='Nombre de la clase*'
						name='className'
						onChange={handleChange}
						error={Boolean(
							errors.className && touched.className && errors.className
						)}
						helperText={
							errors.className && touched.className && errors.className
						}
						defaultValue={values.className}
					/>
					<TextField
						multiline
						rows={3}
						fullWidth
						label='Descripción'
						name='classDescription'
						onChange={handleChange}
						defaultValue={values.classDescription}
					/>
					<MuiColorInput
						format='hex'
						value={values.color}
						onChange={(event: any) => {
							setFieldValue("color", event);
						}}
					/>
					<Stack flexDirection='row' gap={2} marginTop={4}>
						{isLoading ? (
							<CircularProgress />
						) : (
							<>
								<Button type='submit' variant='contained'>
									{formType === "CREATE" ? "Crear clase" : "Actualizar"}
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
