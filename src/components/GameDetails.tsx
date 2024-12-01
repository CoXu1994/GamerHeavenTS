import { useParams } from "react-router-dom";
import useFetchedGame from "../hooks/useFetchedGame";
import { gameDetailsType, platformDetailsType } from "./GameTypes";
import { addToWishlist } from "./WishlistOperations";
import { Box, Typography, Button } from "@mui/material";

type gameResponse = {
	game: gameDetailsType | null;
	error?: string | null;
};
const GameDetails = () => {
	const { gameId } = useParams();
	const { game, error }: gameResponse = useFetchedGame(gameId);

	if (error) {
		return (
			<Typography
				variant="h3"
				component="h2"
				fontFamily="Tektur, cursive"
				sx={{
					textAlign: "center",
				}}
			>
				Error: {error}
			</Typography>
		);
	}

	if (!game) {
		return (
			<Typography
				variant="h3"
				component="h2"
				fontFamily="Tektur, cursive"
				sx={{
					textAlign: "center",
				}}
			>
				Loading...
			</Typography>
		);
	}

	return (
		<Box
			component="section"
			sx={{ p: 2 }}
		>
			<img
				src={game.background_image}
				alt={game.name}
				style={{ width: "100%" }}
			/>

			<Typography
				variant="h3"
				component="h1"
				fontFamily="Tektur, cursive"
			>
				{game.name}
			</Typography>

			<Typography
				variant="h6"
				component="h3"
				fontFamily="Tektur, cursive"
			>
				Description
			</Typography>
			<Typography
				variant="body2"
				fontFamily="Tektur, cursive"
			>
				{game.description_raw}
			</Typography>

			<Box component="div">
				<Box component="div">
					<Typography
						variant="body1"
						fontFamily="Tektur, cursive"
					>
						ESRB rating:
						{game.esrb_rating !== null && game.esrb_rating?.name}
						{game.esrb_rating == null && "-"}
					</Typography>
				</Box>

				<Box component="div">
					<Typography
						variant="body1"
						fontFamily="Tektur, cursive"
					>
						Metacritic Score: {game.metacritic}
					</Typography>
				</Box>
			</Box>

			<Box>
				<Box>
					<Typography
						variant="h6"
						component="h3"
						fontFamily="Tektur, cursive"
					>
						Platforms:{" "}
					</Typography>
					<Typography
						component="div"
						fontFamily="Tektur, cursive"
					>
						-{" "}
						{game.platforms?.map((item: platformDetailsType) => (
							<Typography
								component="span"
								fontFamily="Tektur, cursive"
								key={item.platform.id}
							>
								{item.platform.name} -{" "}
							</Typography>
						))}
					</Typography>
				</Box>
			</Box>
			<Button
				variant="contained"
				style={{ backgroundColor: "gray" }}
				onClick={() => addToWishlist(game)}
			>
				<Typography
					variant="body2"
					component="span"
					color="text.primary"
					className="btn__icon icon-plus-squared"
				></Typography>
				<Typography
					variant="body2"
					component="span"
					color="text.primary"
				>
					Add to Wishlist
				</Typography>
			</Button>
			<Typography
				component="div"
				sx={{ textAlign: "center" }}
				fontFamily="Tektur, cursive"
			>
				All data and images comes from RAWG.{" "}
				<a
					href="https://rawg.io/apidocs"
					target="_blank"
				>
					Find more at https://rawg.io/apidocs{" "}
				</a>
			</Typography>
		</Box>
	);
};

export default GameDetails;
