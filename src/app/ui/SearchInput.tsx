import { searchCoaches } from "@/redux/features/coachesSlice";
import {
	searchActiveMembers,
	searchMembers,
} from "@/redux/features/membersSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IconButton, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchInputType = {
	type: "MEMBERS" | "COACHES" | "ACTIVE_MEMBERS";
};

export default function SearchInput({ type }: SearchInputType) {
	const dispatch = useAppDispatch();

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		switch (type) {
			case "MEMBERS":
				dispatch(searchMembers(data.get("inputSearch")));
			case "COACHES":
				dispatch(searchCoaches(data.get("inputSearch")));
			case "ACTIVE_MEMBERS":
				dispatch(searchActiveMembers(data.get("inputSearch")));
		}
	};

	return (
		<Stack
			component='form'
			onSubmit={handleSearch}
			flexDirection='row'
			gap={2}
			my={4}>
			<IconButton type='submit'>
				<SearchIcon />
			</IconButton>
			<TextField label='Search' name='inputSearch' fullWidth />
		</Stack>
	);
}
