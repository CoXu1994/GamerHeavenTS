import { useState } from "react";
import { Link } from "react-router-dom";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type foundGame = {
	id: number;
	name: string;
};

const SearchBar = () => {
	const [searchGame, setSearchGame] = useState("");
	const [finds, setFinds] = useState([]);

	async function getGames(searchPhrase: string) {
		const response = await fetch(
			`https://${apiHost}/api/games?key=${apiKey}&search=${searchPhrase}`
		);
		return response.json();
	}
	const handleSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchGame(event.target.value);
		getGames(searchGame).then((data) => setFinds(data.results));
	};

	return (
		<>
			<label htmlFor="search">Find the game</label>
			<input
				type="text"
				id="search"
				value={searchGame}
				onChange={handleSearching}
			/>
			{finds.length > 0 &&
				finds.map((found: foundGame) => (
					<Link to={`/games/${found.id}`}>
						<div key={found.id}>{found.name}</div>
					</Link>
				))}
		</>
	);
};

export default SearchBar;
