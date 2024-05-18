import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import MemberForm from "../dashboard/members/components/MemberForm";
import CoachForm from "../dashboard/coaches/components/CoachForm";

type DialogFormType = {
	openDialog: boolean;
	setOpenDialog: any;
	formData: unknown;
	type: "MEMBERS" | "COACHES";
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
			</DialogContent>
		</Dialog>
	);
}
