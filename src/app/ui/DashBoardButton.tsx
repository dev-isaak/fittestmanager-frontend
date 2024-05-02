import { Button } from "@mui/material";

export default function DashBoardButton() {
	return (
		<Button
			color='primary'
			variant='contained'
			size='small'
			component='a'
			href='/dashboard'>
			Dashboard
		</Button>
	);
}
