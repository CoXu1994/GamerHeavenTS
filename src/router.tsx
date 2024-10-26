import { createBrowserRouter } from "react-router-dom";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <GameList />,
			},

			{
				path: "/games/:gameId",
				element: <GameDetails />,
			},
			{
				path: "/wishlist",
				element: <div>Wishlist</div>,
			},
			{
				path: "/categories",
				element: <div>Categories</div>,
			},
		],
	},
]);
