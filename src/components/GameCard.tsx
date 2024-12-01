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
			<Card sx={{ width: "100%", minHeight: "100%", bgcolor: "gray" }}>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						color="text.primary"
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
					>
						Metacritic score: {game.metacritic}
					</Typography>

					<CardActions>
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
					</CardActions>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default GameCard;
