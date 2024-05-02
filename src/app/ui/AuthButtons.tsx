import { Button } from "@mui/material";

export default function AuthButtons() {
	return (
		<>
			<Button color='primary' variant='outlined' component='a' href='/sign-in'>
				Sign in
			</Button>

			<Button color='primary' variant='contained' component='a' href='/sign-up'>
				Sign up
			</Button>
		</>
	);
}
