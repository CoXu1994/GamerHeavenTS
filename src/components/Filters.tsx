import { useState } from "react";
import { CATEGORIES, PLATFORMS, SORT_BY } from "./FiltersConstants";
import GameCard from "./GameCard";
import { gameDetailsType, gamesData } from "./GameTypes";
import useFetchedGames from "../hooks/useFetchedGames";

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
type gamesResponse = {
	games: gamesData | null;
	error?: string | null;
};

const Filters = () => {
	const [params, setParams] = useState<paramsType | null>(null);

	// Warunkowe użycie hooka — domyślnie shouldFetch włącza się tylko, gdy params istnieją
	const { games, error }: gamesResponse = useFetchedGames({
		...params,
		shouldFetch: !!params,
	});

	const handleSelectOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setParams((prevParams) => ({
			...prevParams,
			ordering: event.target.value,
		}));
	};

	const handleSelectPlatform = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setParams((prevParams) => ({
			...prevParams,
			platforms: event.target.value,
		}));
	};

	const handleSelectCategory = (selectedGenre: string) => {
		setParams((prevParams) => ({
			...prevParams,
			genres: selectedGenre,
		}));
	};

	if (error) {
		return <h2>Error: {error}</h2>;
	}

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
				{!games ? (
					<p>Brak wyników do wyświetlenia.</p>
				) : (
					games.results.map((game: gameDetailsType) => (
						<GameCard
							key={game.id}
							game={game}
						/>
					))
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
