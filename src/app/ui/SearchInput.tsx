import { searchMembers } from "@/redux/features/membersSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Stack, TextField } from "@mui/material";

type SearchInputType = {
	type: "MEMBERS";
};

export default function SearchInput({ type }: SearchInputType) {
	const dispatch = useAppDispatch();

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		switch (type) {
			case "MEMBERS":
				dispatch(searchMembers(data.get("inputSearch")));
		}
	};

	return (
		<Stack
			component='form'
			onSubmit={handleSearch}
			flexDirection='row'
			gap={2}
			my={4}>
			<TextField label='Search' name='inputSearch' fullWidth />
			<Button type='submit' variant='contained'>
				Buscar
			</Button>
		</Stack>
	);
}
