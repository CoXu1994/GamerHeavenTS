import { createBrowserRouter } from "react-router-dom";
import GameDetails from "./components/GameDetails";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import Wishlist from "./components/WishList";
import MainPage from "./components/MainPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <MainPage />,
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
