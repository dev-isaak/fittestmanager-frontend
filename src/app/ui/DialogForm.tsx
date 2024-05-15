import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import UpdateMemberForm from "../dashboard/members/components/UpdateMemberForm";

type DialogFormType = {
	openDialog: boolean;
	setOpenDialog: any;
	formData: unknown;
	type: "MEMBERS";
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
		<Dialog open={openDialog} onClose={handleCloseDialog}>
			<DialogContent sx={{ maxWidth: "100%" }}>
				{type === "MEMBERS" && <UpdateMemberForm memberData={formData} />}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog}>Cancelar</Button>
			</DialogActions>
		</Dialog>
	);
}
