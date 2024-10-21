import { gameData } from "./GameList";
import { Link } from "react-router-dom";

type gameCardProps = {
	game: gameData;
};
const GameCard = ({ game }: gameCardProps) => {
	return (
		<>
			<div>
				<h3>{game.name}</h3>
				<Link to={`/gameCard/${game.id}`}>
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
					<span>Add to Wishlist</span>
				</button>
			</div>
		</>
	);
};

export default GameCard;
