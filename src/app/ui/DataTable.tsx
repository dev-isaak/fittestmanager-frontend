import {
	Avatar,
	Box,
	Chip,
	CircularProgress,
	Pagination,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import usePagination from "../dashboard/members/lib/pagination";
import DialogForm from "./DialogForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { membersUpdated } from "@/redux/features/membersSlice";
import { coachesUpdated } from "@/redux/features/coachesSlice";
import { classesUpdated } from "@/redux/features/classesSlice";
import { seminarsUpdated } from "@/redux/features/seminarsSlice";
import { convertDateType } from "../dashboard/lib/utils";
import dayjs, { Dayjs } from "dayjs";
import { scheduleUpdated } from "@/redux/features/classesScheduleSlice";

type TitleColType = {
	name: string;
	align: "center" | "right" | "left";
};

type DataColType = {
	dbName: string;
	align: "center" | "right" | "left";
};

type DataTableType = {
	data: unknown[];
	type:
		| "MEMBERS"
		| "COACHES"
		| "CLASSES"
		| "SEMINARS"
		| "SCHEDULES"
		| "INVITE_MEMBER";
	titleCol: TitleColType[];
	dataCol: DataColType[];
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
	const seminarUpdated = useAppSelector((data) => data.seminarsReducer.updated);
	const schedulesUpdated = useAppSelector(
		(data) => data.classesScheduleReducer.updated
	);
	const isLoading = useAppSelector((data) => data.coachesReducer.loading);
	const dispatch = useAppDispatch();
	const rooms = useAppSelector((data) => data.roomsReducer.rooms);

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

	useEffect(() => {
		if (seminarUpdated) {
			setOpenDialog(false);
			dispatch(seminarsUpdated(""));
		}
	}, [seminarUpdated]);

	useEffect(() => {
		if (schedulesUpdated) {
			setOpenDialog(false);
			dispatch(scheduleUpdated(""));
		}
	}, [schedulesUpdated]);

	const handleUserClick = (data: unknown[]) => {
		setOpenDialog(true);
		setFormData(data);
	};

	const handlePageChange = (event: any, value: number) => {
		setPage(value);
		_DATA.jump(value);
	};

	return (
		<Box width='100%'>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{titleCol.map((title, index) => (
								<TableCell key={index} align={title.align}>
									{title.name}
								</TableCell>
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
							{_DATA.currentData()?.map((data: any, index) => (
								<TableRow key={index} onClick={() => handleUserClick(data)}>
									{dataCol.map((col) => (
										<React.Fragment key={`${col.dbName}-${data.user_id}`}>
											{col.dbName === "photo" ? (
												<TableCell>
													<Avatar
														sx={{ width: 56, height: 56 }}
														src={data[col.dbName]}
													/>
												</TableCell>
											) : col.dbName === "status" ? (
												<TableCell align={col.align}>
													<Chip
														label={data[col.dbName]}
														variant='outlined'
														color={
															data[col.dbName] === "active"
																? "success"
																: data[col.dbName] === "canceled"
																? "error"
																: data[col.dbName] === "paused"
																? "info"
																: "primary"
														}
													/>
												</TableCell>
											) : col.dbName === "color" ? (
												<TableCell align={col.align} sx={{ display: "flex" }}>
													<Box
														sx={{
															background: data.color?.color,
															width: 25,
															height: 25,
														}}></Box>
												</TableCell>
											) : col.dbName === "room_id" ? (
												<TableCell>
													{rooms.map((room) => {
														if (room.id === data[col.dbName]) return room.name;
													})}
												</TableCell>
											) : col.dbName === "since_day" ||
											  col.dbName === "until_day" ? (
												<TableCell>
													{convertDateType(data[col.dbName])}
												</TableCell>
											) : col.dbName === "start" ? (
												<TableCell>
													{dayjs(data["start"]).format("hh:mm")}
												</TableCell>
											) : col.dbName === "end" ? (
												<TableCell>
													{dayjs(data["end"]).format("hh:mm")}
												</TableCell>
											) : col.dbName === "week_day" ? (
												<TableCell>
													{(() => {
														if (data[col.dbName] === "monday") {
															return "Lunes";
														} else if (data[col.dbName] === "tuesday") {
															return "Martes";
														} else if (data[col.dbName] === "wednesday") {
															return "Miércoles";
														} else if (data[col.dbName] === "thursday") {
															return "Jueves";
														} else if (data[col.dbName] === "friday") {
															return "Viernes";
														} else if (data[col.dbName] === "saturday") {
															return "Sábado";
														} else if (data[col.dbName] === "sunday") {
															return "Domingo";
														}
													})()}
												</TableCell>
											) : (
												<TableCell align={col.align}>
													{data[col.dbName]}
												</TableCell>
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
