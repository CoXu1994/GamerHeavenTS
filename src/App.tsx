import "./App.css";
import "./css/normalize.css";
import "./css/fontello.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Container } from "@mui/material";

function App(): JSX.Element {
	return (
		<>
			<Container maxWidth="lg">
				<RouterProvider router={router} />
			</Container>
		</>
	);
}

export default App;
