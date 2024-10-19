import { createBrowserRouter } from "react-router-dom";
import GameList from "./components/GameList";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <GameList />,
	},
	{
		path: "/games/:gameId",
		element: <div>Game Details</div>,
	},
	{
		path: "/wishlist",
		element: <div>Wishlist</div>,
	},
]);
