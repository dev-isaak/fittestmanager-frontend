import { useAppDispatch } from "@/redux/hooks";
import { Box, Button, FormControlLabel, Stack, Switch } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateScheduleData } from "@/redux/features/classesScheduleSlice";
import DOMPurify from "dompurify";

export default function TextEditor({
	eventData,
	eventIsOutdated,
	eventIsCancelled,
}: any) {
	const [value, setValue] = useState(eventData.wod);
	const [showWod, setShowWod] = useState(eventData.show_wod);
	const dispatch = useAppDispatch();

	const handleSaveWod = () => {
		const data = { ...eventData, wod: value };
		dispatch(updateScheduleData({ bookingData: data }));
	};

	const handleShowWod = () => {
		const data = { ...eventData, show_wod: !showWod };
		dispatch(updateScheduleData({ bookingData: data }));
		setShowWod(!showWod);
	};

	const sanitizedData = () => ({
		__html: DOMPurify.sanitize(value),
	});

	return !eventIsCancelled && !eventIsOutdated ? (
		<>
			<Box sx={{ marginY: 2 }}>
				<FormControlLabel
					onClick={handleShowWod}
					control={<Switch checked={showWod} />}
					label='Mostrar WOD a los usuarios'
				/>

				<ReactQuill
					style={{
						height: 200,
						marginTop: 10,
						marginBottom: 10,
					}}
					theme='snow'
					value={value}
					onChange={setValue}
				/>
			</Box>
			<Stack sx={{ alignItems: "center", width: "100%", marginTop: 8 }}>
				<Button
					onClick={handleSaveWod}
					variant='contained'
					color='primary'
					sx={{ width: "fit-content" }}>
					Guardar WOD
				</Button>
			</Stack>
		</>
	) : (
		<Box>
			<div
				dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}></div>
		</Box>
	);
}
