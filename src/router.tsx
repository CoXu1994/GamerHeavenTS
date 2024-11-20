import { createBrowserRouter } from "react-router-dom";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";

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
				element: <SearchBar />,
			},
			{
				path: "/categories",
				element: <Filters />,
			},
		],
	},
]);
