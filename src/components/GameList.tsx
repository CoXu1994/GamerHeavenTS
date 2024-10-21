import { useEffect, useState } from "react";
import GameCard from "./GameCard";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

export type gameData = {
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
		<>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{games.map((game: gameData) => (
					<GameCard
						key={game.id}
						game={game}
					/>
				))}
			</div>
			<div>
				<button style={{ background: "gray" }}>Previous</button>
				<button style={{ background: "gray" }}>Next</button>
			</div>
		</>
	);
};

export default GameList;
