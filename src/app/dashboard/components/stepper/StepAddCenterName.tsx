import { Button, Stack, TextField } from "@mui/material";

export default function StepAddCenterName() {
	const handleAddCenterName = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log(data.get("centerName"));
	};

	return (
		<Stack
			component='form'
			onSubmit={handleAddCenterName}
			justifyContent='center'
			width='100%'
			gap={2}>
			<TextField label='Nombre' variant='filled' name='centerName' />
			<Button type='submit' variant='contained'>
				Añadir nombre
			</Button>
		</Stack>
	);
}
