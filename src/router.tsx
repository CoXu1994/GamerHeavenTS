import { createBrowserRouter } from "react-router-dom";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <GameList />,
	},
	{
		path: "/games/:gameId",
		element: <GameDetails />,
	},
	// {
	// 	path: "/wishlist",
	// 	element: <div>Wishlist</div>,
	// },
]);
