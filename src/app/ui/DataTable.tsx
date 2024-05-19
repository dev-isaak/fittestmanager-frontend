import {
	Avatar,
	Box,
	Chip,
	CircularProgress,
	Pagination,
	Paper,
	Skeleton,
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
import { coachesUpdated } from "@/redux/features/coachesSlice";
import { classesUpdated } from "@/redux/features/classesSlice";

type DataTableType = {
	data: unknown[];
	type: "MEMBERS" | "COACHES" | "CLASSES";
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
	const PER_PAGE = 5;
	const count = Math.ceil(data.length / PER_PAGE);
	const _DATA = usePagination(data, PER_PAGE);
	const memberUpdated = useAppSelector((data) => data.membersReducer.updated);
	const coachUpdated = useAppSelector((data) => data.coachesReducer.updated);
	const classUpdated = useAppSelector((data) => data.classesReducer.updated);
	const isLoading = useAppSelector((data) => data.coachesReducer.loading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (memberUpdated) {
			setOpenDialog(false);
			toast.success("Miembro actualizado.");
			dispatch(membersUpdated(""));
		} else if (coachUpdated) {
			setOpenDialog(false);
			toast.success("Coach actualizado.");
			dispatch(coachesUpdated(""));
		}
	}, [memberUpdated, coachUpdated]);

	useEffect(() => {
		if (classUpdated) {
			setOpenDialog(false);
			dispatch(classesUpdated(""));
		}
	}, [classUpdated]);

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
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{titleCol.map((title, index) => (
								<TableCell key={index}>{title}</TableCell>
							))}
						</TableRow>
					</TableHead>
					{isLoading ? (
						<TableBody>
							<TableRow>
								<TableCell>
									<CircularProgress />
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{_DATA.currentData().map((data: any, index) => (
								<TableRow key={index} onClick={() => handleUserClick(data)}>
									{dataCol.map((col) => (
										<React.Fragment key={`${col}-${data.user_id}`}>
											{col === "photo" ? (
												<TableCell>
													<Avatar
														sx={{ width: 56, height: 56 }}
														src={data[col]}
													/>
												</TableCell>
											) : col === "status" ? (
												<TableCell>
													<Chip
														label={data[col]}
														variant='outlined'
														color={
															data[col] === "active"
																? "success"
																: data[col] === "canceled"
																? "error"
																: data[col] === "paused"
																? "info"
																: "primary"
														}
													/>
												</TableCell>
											) : col === "color" ? (
												<TableCell>
													<Box
														sx={{
															background: data[col],
															width: 25,
															height: 25,
														}}></Box>
												</TableCell>
											) : (
												<TableCell>{data[col]}</TableCell>
											)}
										</React.Fragment>
									))}
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>
			</TableContainer>
			<Stack width='100%' alignItems='center' paddingTop={4}>
				<Pagination
					count={count}
					page={page}
					onChange={handlePageChange}
					variant='text'
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
