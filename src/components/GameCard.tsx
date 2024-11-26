import { Link } from "react-router-dom";
import { gameDetailsType } from "./GameTypes";
import { addToWishlist } from "./WishlistOperations";

type gameCardProps = {
	game: gameDetailsType;
};
const GameCard = ({ game }: gameCardProps) => {
	return (
		<>
			<div>
				<h3>{game.name}</h3>
				<Link to={`/games/${game.id}`}>
					<img
						src={game.background_image}
						alt={game.name}
						style={{ height: "300px", width: "400px" }}
					/>
				</Link>
				<div>
					<span>Metacritic score: {game.metacritic}</span>
				</div>
				<button style={{ background: "gray" }}>
					<span className="btn__icon icon-plus-squared"></span>
					<span onClick={() => addToWishlist(game)}>
						Add to Wishlist
					</span>
				</button>
			</div>
		</>
	);
};

export default GameCard;
