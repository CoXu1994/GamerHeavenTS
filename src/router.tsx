import { createBrowserRouter } from "react-router-dom";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import Wishlist from "./components/WishList";

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
				element: <Wishlist />,
			},
			{
				path: "/categories",
				element: <Filters />,
			},
		],
	},
]);
