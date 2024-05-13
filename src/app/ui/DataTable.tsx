import {
	Avatar,
	Box,
	Pagination,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useState } from "react";
import usePagination from "../dashboard/members/lib/pagination";

type DataTableType = {
	data: unknown[];
};

export default function DataTable({ data }: DataTableType) {
	const [page, setPage] = useState(0);
	const PER_PAGE = 3;
	const count = Math.ceil(data.length / PER_PAGE);
	const _DATA = usePagination(data, PER_PAGE);

	const handleUserClick = (data: unknown[]) => {
		// alert(member.first_name);
	};

	const handlePageChange = (event: any, value: number) => {
		setPage(value);
		_DATA.jump(value);
	};

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Photo</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Phone Number</TableCell>
							<TableCell>Plan</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{_DATA.currentData().map((member: any) => (
							<TableRow
								key={member.user_id}
								onClick={() => handleUserClick(member)}>
								<TableCell>
									<Avatar src={member.photo} />
								</TableCell>
								<TableCell>
									{member.first_name} {member.last_name}
								</TableCell>
								<TableCell>{member.email}</TableCell>
								<TableCell>{member.phone_number}</TableCell>
								<TableCell>{member.plan}</TableCell>
								<TableCell></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Stack width='100%' alignItems='center' paddingY={2}>
				<Pagination
					count={count}
					page={page}
					onChange={handlePageChange}
					color='primary'
					variant='outlined'
				/>
			</Stack>
		</Box>
	);
}
