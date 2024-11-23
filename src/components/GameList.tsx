import GameCard from "./GameCard";
import useFetchedGames from "../hooks/useFetchedGames";
import { gameDetailsType, gamesData } from "./GameTypes";

type gamesResponse = {
	games: gamesData | null;
	error?: string | null;
};

const GameList = () => {
	const { games, error }: gamesResponse = useFetchedGames({});

	if (error) {
		return <h2>Error: {error}</h2>;
	}

	if (!games) {
		return <h2>Loading...</h2>;
	}

	return (
		<>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{games?.results.map((game: gameDetailsType) => (
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
