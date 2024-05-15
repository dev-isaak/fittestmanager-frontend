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
import React, { useEffect, useState } from "react";
import usePagination from "../dashboard/members/lib/pagination";
import DialogForm from "./DialogForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { membersUpdated } from "@/redux/features/membersSlice";

type DataTableType = {
	data: unknown[];
	type: "MEMBERS";
	titleCol: string[];
	dataCol: string[];
	onClickOpenDialog?: boolean;
};

export default function DataTable({
	data,
	titleCol,
	type,
	dataCol,
	onClickOpenDialog,
}: DataTableType) {
	const [page, setPage] = useState(0);
	const [openDialog, setOpenDialog] = useState(false);
	const [formData, setFormData] = useState({});
	const PER_PAGE = 3;
	const count = Math.ceil(data.length / PER_PAGE);
	const _DATA = usePagination(data, PER_PAGE);
	const updated = useAppSelector((data) => data.membersReducer.updated);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (updated) {
			setOpenDialog(false);
			toast.success("Usuario actualizado.");
			dispatch(membersUpdated(""));
		}
	}, [updated]);

	const handleUserClick = (data: unknown[]) => {
		setOpenDialog(true);
		setFormData(data);
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
							{titleCol.map((title, index) => (
								<TableCell key={index}>{title}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{_DATA.currentData().map((data: any) => (
							<TableRow
								key={data.user_id}
								onClick={() => handleUserClick(data)}>
								{dataCol.map((col) => (
									<React.Fragment key={`${col}-${data.user_id}`}>
										{col === "photo" ? (
											<TableCell>
												<Avatar
													sx={{ width: 56, height: 56 }}
													src={data[col]}
												/>
											</TableCell>
										) : (
											<TableCell>{data[col]}</TableCell>
										)}
									</React.Fragment>
								))}
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
			{onClickOpenDialog && (
				<DialogForm
					type={type}
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
					formData={formData}
				/>
			)}
		</Box>
	);
}
