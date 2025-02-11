import { useParams } from "react-router-dom";
import useFetchedGame from "../hooks/useFetchedGame";
import { gameDetailsType, platformDetailsType } from "./GameTypes";
import { addToWishlist } from "./wishListOperations";
import { Box, Typography, Button } from "@mui/material";

const buttonSX = {
	backgroundColor: "transparent",
	border: "1px solid white",
	padding: "20px 40px",
	borderRadius: "25px",
	fontSize: "24px",
	transition: "all 1s",
	"&: hover": {
		backgroundColor: "white",
	},
	"&: hover > * ": {
		color: "black",
	},
};

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
			marginInline="auto"
			maxWidth="1020px"
		>
			<img
				src={game.background_image}
				alt={game.name}
				style={{
					width: "100%",
					borderRadius: "5px",
					marginTop: "10px",
				}}
			/>

			<Typography
				variant="h3"
				component="h1"
				fontFamily="Tektur, cursive"
				bgcolor="#ffffff20"
				textAlign="center"
				borderRadius="5px"
				marginTop="20px"
				padding="14px 28px"
			>
				{game.name}
			</Typography>
			<Box
				component="div"
				bgcolor="#ffffff20"
				borderRadius="5px"
				marginTop="20px"
				padding="14px 28px"
			>
				<Typography
					variant="h6"
					component="h3"
					fontFamily="Tektur, cursive"
					borderBottom="1px solid white"
				>
					Description
				</Typography>
				<Typography
					variant="body2"
					fontFamily="Tektur, cursive"
					marginTop="10px"
					paddingBottom="6px"
				>
					{game.description_raw}
				</Typography>
			</Box>
			<Box
				component="div"
				bgcolor="#ffffff20"
				borderRadius="5px"
				marginTop="20px"
				padding="14px 28px"
				display="flex"
				alignItems="center"
				justifyContent="center"
				marginInline="auto"
				gap="200px"
			>
				<Box
					component="div"
					flexBasis="20%"
				>
					<Typography
						variant="body1"
						fontFamily="Tektur, cursive"
						borderBottom="2px solid white"
						textAlign="center"
						paddingBottom="5px"
					>
						ESRB rating:
					</Typography>
					<Typography
						variant="body1"
						fontFamily="Tektur, cursive"
						textAlign="center"
						paddingTop="5px"
					>
						{game.esrb_rating !== null && game.esrb_rating?.name}
						{game.esrb_rating == null && "-"}
					</Typography>
				</Box>

				<Box
					component="div"
					flexBasis="20%"
				>
					<Typography
						variant="body1"
						fontFamily="Tektur, cursive"
						borderBottom="2px solid white"
						textAlign="center"
						paddingBottom="5px"
					>
						Metacritic Score:
					</Typography>
					<Typography
						variant="body1"
						fontFamily="Tektur, cursive"
						textAlign="center"
						paddingTop="5px"
					>
						{game.metacritic !== null && game.metacritic}
						{game.metacritic == null && "-"}
					</Typography>
				</Box>
			</Box>

			<Box
				component="div"
				bgcolor="#ffffff20"
				borderRadius="5px"
				marginTop="20px"
				padding="14px 28px"
				textAlign="center"
			>
				<Typography
					variant="h6"
					component="h3"
					fontFamily="Tektur, cursive"
					borderBottom="2px solid white"
					paddingBottom="5px"
				>
					Platforms:{" "}
				</Typography>
				<Typography
					component="div"
					fontFamily="Tektur, cursive"
					paddingTop="5px"
					fontSize="20px"
				>
					-{" "}
					{game.platforms?.map(
						(item: platformDetailsType) =>
							`${item.platform.name} - `
					)}
				</Typography>
			</Box>

			<Box
				component="div"
				display="flex"
				marginTop="20px"
				justifyContent="center"
				alignItems="center"
				gap="10px"
			>
				<Typography
					component="div"
					textAlign="center"
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
				<Button
					variant="contained"
					sx={buttonSX}
					onClick={() => addToWishlist(game)}
				>
					<Typography
						variant="body2"
						component="span"
						fontFamily="Tektur, cursive"
						color="white"
						className="btn__icon icon-plus-squared"
					></Typography>
					<Typography
						variant="body2"
						component="span"
						fontFamily="Tektur, cursive"
						color="white"
					>
						Add to Wishlist
					</Typography>
				</Button>
			</Box>
		</Box>
	);
};

export default GameDetails;
