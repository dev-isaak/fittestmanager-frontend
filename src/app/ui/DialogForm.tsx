import { Dialog, DialogContent } from "@mui/material";
import MemberForm from "../dashboard/members/components/MemberForm";
import CoachForm from "../dashboard/coaches/components/CoachForm";
import RoomsForm from "../dashboard/rooms/components/RoomsForm";
import ClassForm from "../dashboard/classes/components/ClassForm";
import SeminarForm from "../dashboard/seminars/components/SeminarForm";
import NewScheduleForm from "../dashboard/classes/components/NewScheduleForm";

type DialogFormType = {
	openDialog: boolean;
	setOpenDialog: any;
	formData: unknown;
	type: "MEMBERS" | "COACHES" | "ROOMS" | "CLASSES" | "SEMINARS" | "SCHEDULES";
};

export default function DialogForm({
	openDialog,
	setOpenDialog,
	formData,
	type,
}: DialogFormType) {
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	return (
		<Dialog
			open={openDialog}
			onClose={handleCloseDialog}
			fullWidth
			maxWidth='lg'>
			<DialogContent sx={{ maxWidth: "100%" }}>
				{type === "MEMBERS" && (
					<MemberForm
						memberData={formData}
						formType='UPDATE'
						onCloseDialog={setOpenDialog}
					/>
				)}
				{type === "COACHES" && (
					<CoachForm
						coachData={formData}
						formType='UPDATE'
						onCloseDialog={setOpenDialog}
					/>
				)}
				{type === "ROOMS" && (
					<RoomsForm
						roomData={formData}
						formType='UPDATE'
						onCloseDialog={setOpenDialog}
					/>
				)}
				{type === "CLASSES" && (
					<ClassForm
						classData={formData}
						formType='UPDATE'
						onCloseDialog={setOpenDialog}
					/>
				)}
				{type === "SEMINARS" && (
					<SeminarForm
						seminarData={formData}
						formType='UPDATE'
						onCloseDialog={setOpenDialog}
					/>
				)}
				{type === "SCHEDULES" && (
					<NewScheduleForm
						scheduleData={formData}
						formType='UPDATE'
						onCloseDialog={setOpenDialog}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}
