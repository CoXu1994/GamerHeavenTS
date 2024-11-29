import { useState, useEffect } from "react";
import { CATEGORIES, PLATFORMS, SORT_BY } from "./FiltersConstants";
import GameCard from "./GameCard";
import { gameDetailsType } from "./GameTypes";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type FilterType<T = unknown> = {
	id: number;
	name: string;
} & T;

type GenreType = FilterType<{ slug: string }>;
type PlatformType = FilterType;

type paramsType = {
	genres?: string;
	platforms?: string;
	ordering?: string;
};

const Filters = () => {
	const [games, setGames] = useState([]);
	const [params, setParams] = useState<paramsType>({});
	const [shouldFetch, setShouldFetch] = useState(false);

	async function getGames(params: paramsType) {
		const urlParams = new URLSearchParams({
			key: apiKey,
			...params,
		});
		console.log(urlParams);
		const url = `https://${apiHost}/api/games?${urlParams.toString()}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Błąd przy pobieraniu danych");
		}

		return response.json();
	}
	const handleSelectOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setParams({
			...params,
			ordering: event.target.value,
		});
		setShouldFetch(true);
	};

	const handleSelectPlatform = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setParams({
			...params,
			platforms: event.target.value,
		});
		setShouldFetch(true);
	};

	const handleSelectCategory = (selectedGenre: string) => {
		setParams({ ...params, genres: selectedGenre });
		setShouldFetch(true);
	};

	useEffect(() => {
		if (!shouldFetch) return;
		getGames(params).then((data) => setGames(data.results));
	}, [params, shouldFetch]);
	return (
		<>
			<div>
				<span>Wybierz Categorie</span>
				{CATEGORIES.map((genre: GenreType) => (
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
					{PLATFORMS.map((platform: PlatformType) => (
						<option
							key={platform.id}
							value={platform.id}
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
					{SORT_BY.map((sortOption) => (
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
				{games.length > 0 ? (
					games.map((game: gameDetailsType) => (
						<GameCard
							key={game.id}
							game={game}
						/>
					))
				) : (
					<p>Brak wyników do wyświetlenia.</p>
				)}
			</div>
			<div>
				<button>Previous</button>
				<button>Next</button>
			</div>
		</>
	);
};

export default Filters;
