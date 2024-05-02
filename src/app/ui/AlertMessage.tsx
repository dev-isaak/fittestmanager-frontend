import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlertMessage() {
	return (
		<ToastContainer
			position='top-right'
			autoClose={5000}
			closeButton
			transition={Bounce}
			theme='dark'
			hideProgressBar
		/>
	);
}
