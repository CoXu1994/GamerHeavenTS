import { Link } from "react-router-dom";
import { gameDetailsType } from "./GameTypes";
import { addToWishlist } from "./wishListOperations";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";

const buttonSX = {
	backgroundColor: "transparent",

	border: "1px solid white",
	padding: "10px 16px",
	borderRadius: "5px",
	fontSize: "12px",
	transition: "all 1s",
	"&: hover": {
		backgroundColor: "white",
	},
	"&: hover > * ": {
		color: "black",
	},
};

type gameCardProps = {
	game: gameDetailsType;
};
const GameCard = ({ game }: gameCardProps) => {
	return (
		<Box
			component="div"
			marginInline="auto"
		>
			<Card
				sx={{
					width: 280,
					height: 360,
					bgcolor: "rgba(255, 255, 255, 0.125)",
					border: "1px solid white",
					borderRadius: "10px",
				}}
			>
				<CardContent>
					<Typography
						gutterBottom
						variant="h6"
						component="div"
						color="white"
						textAlign="center"
						fontFamily="Tektur, cursive"
						lineHeight="1"
						marginBottom="10px"
						height="40px"
					>
						{game.name}
					</Typography>

					<Link
						to={`/games/${game.id}`}
						style={{
							textDecoration: "none",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: 180,
							width: 246,
						}}
					>
						<CardMedia
							component="img"
							sx={{
								borderRadius: "15px",
								boxShadow: "1px 1px 8px #fff",
								transition: "all .5s",
								"&: hover": {
									boxShadow: "1px 1px 20px #fff",
									height: "174px",
									width: "240px",
								},
							}}
							image={
								game.background_image
									? game.background_image
									: "No image"
							}
							alt={game.name}
							height="180px"
						/>
					</Link>

					<Typography
						variant="body2"
						component="div"
						display="block"
						color="white"
						fontFamily="Tektur, cursive"
						fontSize="20px"
						textAlign="center"
						marginTop="10px"
					>
						Metacritic score:{" "}
						<Typography
							variant="body2"
							component="span"
							color="white"
							fontFamily="Tektur, cursive"
							fontSize="24px"
							fontWeight="700"
						>
							{game.metacritic}
						</Typography>
					</Typography>

					<CardActions sx={{ paddingInline: 0 }}>
						<Button
							variant="contained"
							sx={{ ...buttonSX, marginInline: "auto" }}
							onClick={() => addToWishlist(game)}
						>
							<Typography
								variant="body2"
								component="span"
								color="white"
								className="btn__icon icon-plus-squared"
								fontFamily="Tektur, cursive"
							></Typography>
							<Typography
								variant="body2"
								component="span"
								color="white"
								fontFamily="Tektur, cursive"
							>
								Add to Wishlist
							</Typography>
						</Button>
					</CardActions>
				</CardContent>
			</Card>
		</Box>
	);
};

export default GameCard;
