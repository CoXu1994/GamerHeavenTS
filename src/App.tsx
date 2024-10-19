import "./css/normalize.css";
import "./App.css";
import "./css/fontello.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App(): JSX.Element {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
