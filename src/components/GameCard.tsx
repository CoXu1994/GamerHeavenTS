import { Link } from "react-router-dom";
import { gameDetailsType } from "./GameTypes";
import { addToWishlist } from "./WishlistOperations";
import Grid from "@mui/material/Grid2";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
type gameCardProps = {
	game: gameDetailsType;
};
const GameCard = ({ game }: gameCardProps) => {
	return (
		<Grid
			sx={{
				xs: 12,
				sm: 6,
				md: 4,
				lg: 3,
			}}
		>
			<Card
				sx={{
					width: 280,
					height: 400,
					bgcolor: "gray",
				}}
			>
				<CardContent>
					<Typography
						gutterBottom
						variant="h6"
						component="div"
						color="text.primary"
						textAlign="center"
						fontFamily="Tektur, cursive"
					>
						{game.name}
					</Typography>

					<Link
						to={`/games/${game.id}`}
						style={{ textDecoration: "none" }}
					>
						<CardMedia
							component="img"
							image={game.background_image}
							alt={game.name}
							height="240"
						/>
					</Link>

					<Typography
						variant="body2"
						color="text.primary"
						fontFamily="Tektur, cursive"
						marginTop="10px"
					>
						Metacritic score: {game.metacritic}
					</Typography>

					<CardActions sx={{ paddingInline: 0 }}>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "gray",
								fontFamily: "Tektur, cursive",
							}}
							onClick={() => addToWishlist(game)}
						>
							<Typography
								variant="body2"
								component="span"
								color="text.primary"
								className="btn__icon icon-plus-squared"
								fontFamily="Tektur, cursive"
							></Typography>
							<Typography
								variant="body2"
								component="span"
								color="text.primary"
								fontFamily="Tektur, cursive"
							>
								Add to Wishlist
							</Typography>
						</Button>
					</CardActions>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default GameCard;
