import { useParams } from "react-router-dom";
import useFetchedGame from "../hooks/useFetchedGame";
import { gameDetailsType, platformDetailsType } from "./GameTypes";

type gameResponse = {
	game: gameDetailsType | null;
	error?: string | null;
};
const GameDetails = () => {
	const { gameId } = useParams();
	const { game, error }: gameResponse = useFetchedGame(gameId);

	if (error) {
		return <h2>Error: {error}</h2>;
	}

	if (!game) {
		return <h2>Loading...</h2>;
	}

	return (
		<>
			<div>
				<img
					src={game.background_image}
					alt={game.name}
				/>

				<div>
					<h2>{game.name}</h2>
				</div>

				<div>
					<h3>Description</h3>
					<p>{game.description_raw}</p>
				</div>

				<div>
					<div>
						<span>ESRB rating: </span>
						<span>
							{game.esrb_rating !== null &&
								game.esrb_rating?.name}
							{game.esrb_rating == null && "-"}
						</span>
					</div>

					<div>
						<span>Metacritic Score: </span>
						<span>{game.metacritic}</span>
					</div>
				</div>

				<div>
					<div>
						<h3>Platforms: </h3>
						<div>
							-{" "}
							{game.platforms?.map(
								(item: platformDetailsType) => (
									<span key={item.platform.id}>
										{item.platform.name} -{" "}
									</span>
								)
							)}
						</div>
					</div>
				</div>
				<p>
					All data and images comes from RAWG.{" "}
					<a href="https://rawg.io/apidocs">
						Find more at https://rawg.io/apidocs{" "}
					</a>
				</p>
				<button>
					<span className="btn__icon icon-plus-squared"></span>
					<span>Add to Wishlist</span>
				</button>
			</div>
		</>
	);
};

export default GameDetails;
