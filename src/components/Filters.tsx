import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type filterType = {
	id: number;
	name: string;
	slug: string;
};

type gameType = {
	name: string;
	id: number;
};

type paramsType = {
	genres?: string;
	platforms?: string;
	ordering?: string;
};

const sortOptions = [
	"name",
	"-name",
	"released",
	"-released",
	"added",
	"-added",
	"created",
	"-created",
	"updated",
	"-updated",
	"rating",
	"-rating",
	"metacritic",
	"-metacritic",
];

const Filters = () => {
	const [apiGenres, setApiGenres] = useState([]);
	const [apiPlatforms, setApiPlatforms] = useState([]);
	const [games, setGames] = useState([]);
	const [params, setParams] = useState({});

	async function getGenres(signal: AbortSignal) {
		const response = await fetch(
			`https://${apiHost}/api/genres?key=${apiKey}`,
			{ signal }
		);
		return response.json();
	}

	async function getPlatforms(signal: AbortSignal) {
		const response = await fetch(
			`https://${apiHost}/api/platforms?key=${apiKey}`,
			{ signal }
		);
		return response.json();
	}

	async function getGames(params: paramsType) {
		const urlParams = new URLSearchParams({
			key: apiKey,
			...params,
		});

		const url = `https://${apiHost}/api/games?${urlParams.toString()}`;
		console.log(url);
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Błąd przy pobieraniu danych");
		}

		return response.json();
	}
	const handleSelectOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setParams((prevState) => ({
			...prevState,
			ordering: event.target.value,
		}));
		getGames(params).then((data) => setGames(data.results));
	};

	const handleSelectPlatform = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setParams((prevState) => ({
			...prevState,
			platforms: event.target.value,
		}));
		getGames(params).then((data) => setGames(data.results));
	};

	const handleSelectCategory = (selectedGenre: string) => {
		setParams((prevState) => ({ ...prevState, genres: selectedGenre }));
		getGames(params).then((data) => setGames(data.results));
	};

	useEffect(() => {
		const controller = new AbortController();
		getGenres(controller.signal).then((data) => setApiGenres(data.results));
		getPlatforms(controller.signal).then((data) =>
			setApiPlatforms(data.results)
		);
		return () => {
			controller.abort();
		};
	}, []);

	console.log(games);
	console.log(params);

	return (
		<>
			<div>
				<span>Wybierz Categorie</span>
				{apiGenres.map((genre: filterType) => (
					<button
						key={genre.id}
						onClick={() => handleSelectCategory(genre.slug)}
					>
						{genre.name}
					</button>
				))}
			</div>
			<div>
				<label htmlFor="platform">Platform</label>
				<select
					id="platform"
					onChange={handleSelectPlatform}
				>
					<option value="">Wybierz Platformę</option>
					{apiPlatforms.map((platform: filterType) => (
						<option
							key={platform.id}
							value={platform.slug}
						>
							{platform.name}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="sortBy">Sort by:</label>
				<select
					id="sortBy"
					onChange={handleSelectOrder}
				>
					<option value="">Sort options</option>
					{sortOptions.map((sortOption) => (
						<option
							key={sortOption}
							value={sortOption}
						>
							{sortOption}
						</option>
					))}
				</select>
			</div>
			<div>
				{games.map((game: gameType) => (
					<div key={game.id}>{game.name}</div>
				))}
			</div>
		</>
	);
};

export default Filters;
