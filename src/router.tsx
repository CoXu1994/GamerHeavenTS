import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Front Page</div>,
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
