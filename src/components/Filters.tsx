import { useState } from "react";
import { CATEGORIES, PLATFORMS, SORT_BY } from "./FiltersConstants";
import GameCard from "./GameCard";
import { gameDetailsType, gamesData } from "./GameTypes";
import useFetchedGames from "../hooks/useFetchedGames";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const buttonSX = {
	backgroundColor: "transparent",
	border: "1px solid white",
	padding: "10px 16px",
	borderRadius: "5px",
	fontSize: "12px",
	transition: "all 1s",
	"&: hover": {
		backgroundColor: "white",
	},
	"&: hover > * ": {
		color: "black",
	},
};

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
	const [platform, setPlatform] = useState<string>("");
	const [order, setOrder] = useState<string>("");
	// Warunkowe użycie hooka — domyślnie shouldFetch włącza się tylko, gdy params istnieją
	const { games, error }: gamesResponse = useFetchedGames({
		...params,
		shouldFetch: !!params,
	});

	const handleSelectOrder = (event: SelectChangeEvent<string>) => {
		setOrder(event.target.value);
		setParams((prevParams) => ({
			...prevParams,
			ordering: event.target.value,
		}));
	};

	const handleSelectPlatform = (event: SelectChangeEvent<string>) => {
		setPlatform(event.target.value);
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
		<Box
			component="section"
			sx={{ p: 2 }}
			marginInline="auto"
			maxWidth="1020px"
		>
			<Box>
				<Typography
					fontFamily="Tektur, cursive"
					textAlign="center"
					fontSize="38px"
					marginBottom="10px"
				>
					Choose genre:
				</Typography>
				<Box
					display="flex"
					flexWrap="wrap"
					justifyContent="center"
					gap="2px"
				>
					{CATEGORIES.map((genre: GenreType) => (
						<Button
							variant="contained"
							sx={buttonSX}
							key={genre.id}
							onClick={() => handleSelectCategory(genre.slug)}
						>
							<Typography
								variant="body2"
								component="span"
								fontFamily="Tektur, cursive"
								fontSize="14px"
							>
								{genre.name}
							</Typography>
						</Button>
					))}
				</Box>
			</Box>
			<Box
				component="div"
				marginTop="20px"
				display="flex"
				gap="200px"
				justifyContent="center"
			>
				<FormControl>
					<InputLabel
						sx={{ color: "white" }}
						id="platformLabel"
						shrink
					>
						Platform
					</InputLabel>
					<Select
						variant="standard"
						sx={{
							width: "200px",
							color: "white",
							border: "1px solid white",
							padding: "10px 16px",
							borderRadius: "5px",
						}}
						labelId="platformLabel"
						id="platform"
						label="Platform"
						value={platform}
						displayEmpty
						onChange={handleSelectPlatform}
						MenuProps={{
							PaperProps: {
								sx: {
									bgcolor: "transparent",
									"& .MuiMenuItem-root": {
										padding: 2,
									},
								},
							},
						}}
					>
						<MenuItem value=""> All </MenuItem>
						{PLATFORMS.map((platform: PlatformType) => (
							<MenuItem
								key={platform.id}
								value={platform.id}
							>
								{platform.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel
						sx={{ color: "white" }}
						id="sortByLabel"
						shrink
					>
						Sort By
					</InputLabel>
					<Select
						variant="standard"
						sx={{
							width: "200px",
							color: "white",
							border: "1px solid white",
							padding: "10px 16px",
							borderRadius: "5px",
						}}
						labelId="sortByLabel"
						id="sortBy"
						label="SortBy"
						value={order}
						displayEmpty
						onChange={handleSelectOrder}
					>
						<MenuItem value=""> No order </MenuItem>
						{SORT_BY.map((sortOption) => (
							<MenuItem
								key={sortOption}
								value={sortOption}
							>
								{sortOption}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box>
				{!games ? (
					<Typography>Brak wyników do wyświetlenia.</Typography>
				) : (
					games.results.map((game: gameDetailsType) => (
						<GameCard
							key={game.id}
							game={game}
						/>
					))
				)}
			</Box>
			<Box>
				<Button>Previous</Button>
				<Button>Next</Button>
			</Box>
		</Box>
	);
};

export default Filters;
