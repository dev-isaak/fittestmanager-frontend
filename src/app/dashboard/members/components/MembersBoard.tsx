import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllMembers } from "../lib/data";
import { IMember } from "../interfaces/interfaces";

export default function MembersBoard() {
	const [members, setMembers] = useState([]);

	const fetchMembers = async () => {
		const membersList: any = await getAllMembers();
		setMembers(membersList);
	};

	useEffect(() => {
		fetchMembers();
	}, []);

	return (
		<Box>
			<h2>Board Members</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Photo</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Birth Date</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Phone Number</TableCell>
							<TableCell>Fitness Center</TableCell>
							<TableCell>Plan</TableCell>
							<TableCell>Gender</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{members.map((member: any) => (
							<TableRow key={member.user_id}>
								<TableCell>{member.photo}</TableCell>
								<TableCell>{member.first_name}</TableCell>
								<TableCell>{member.last_name}</TableCell>
								<TableCell>{member.email}</TableCell>
								<TableCell>{member.birth_date}</TableCell>
								<TableCell>{member.address}</TableCell>
								<TableCell>{member.phone_number}</TableCell>
								<TableCell>{member.fitness_centers.center_name}</TableCell>
								<TableCell>{member.plan}</TableCell>
								<TableCell>{member.gender}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
