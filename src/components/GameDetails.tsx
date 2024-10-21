import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type gameDetailsData = {
	id: number;
	name: string;
	description_raw: string;
	esrb_rating: string;
	metacritic: string;
	platforms: [];
	background_image: string;
};

type platformType = {
	id: number;
	name: string;
};

const GameDetails = () => {
	const { gameId } = useParams();
	const [game, setGame] = useState({});

	async function getGamesApi(signal: AbortSignal) {
		const response = await fetch(
			`https://${apiHost}/api/games/${gameId}?key=${apiKey}`,
			{ signal }
		);
		return response.json();
	}

	useEffect(() => {
		const controller = new AbortController();

		getGamesApi(controller.signal).then((data) => setGame(data));

		return () => {
			controller.abort();
		};
	}, []);

	if (Object.keys(game).length === 0) {
		return <p>Loading...</p>;
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
							{game.esrb_rating !== null && game.esrb_rating.name}
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
							{game.platforms.map((item) => (
								<span key={item.platform.id}>
									{item.platform.name} -{" "}
								</span>
							))}
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
