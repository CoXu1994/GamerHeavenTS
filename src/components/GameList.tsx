import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type Game = {
	id: number;
	name: string;
	background_image: string;
	metacritic: number;
};

async function getGamesApi(signal: AbortSignal) {
	const response = await fetch(
		`https://${apiHost}/api/games?key=${apiKey}&page_size=12`,
		{ signal }
	);
	return response.json();
}
const GameList = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const controller = new AbortController();

		getGamesApi(controller.signal).then((data) => setGames(data.results));

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div style={{ display: "flex", flexWrap: "wrap" }}>
			{games.map((game: Game) => (
				<div key={game.id}>
					<h2>{game.name}</h2>
					<img
						src={game.background_image}
						alt={game.name}
						style={{ height: "300px", width: "400px" }}
					/>
					<div>Metacritics score: {game.metacritic}</div>
					{/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
				</div>
			))}
			<div>
				<button style={{ background: "gray" }}>Previous</button>
				<button style={{ background: "gray" }}>Next</button>
			</div>
		</div>
	);
};

export default GameList;
