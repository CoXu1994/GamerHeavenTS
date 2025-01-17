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
							sx={{ ...buttonSX, width: "140px" }}
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
						sx={{ color: "white", fontFamily: "Tektur, cursive" }}
						id="platformLabel"
						shrink
					>
						Platform
					</InputLabel>
					<Select
						variant="standard"
						sx={{
							fontFamily: "Tektur, cursive",
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
									bgcolor: "black",
									fontFamily: "Tektur, cursive",
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
						sx={{ color: "white", fontFamily: "Tektur, cursive" }}
						id="sortByLabel"
						shrink
					>
						Sort By
					</InputLabel>
					<Select
						variant="standard"
						sx={{
							fontFamily: "Tektur, cursive",
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
						MenuProps={{
							PaperProps: {
								sx: {
									bgcolor: "black",
									fontFamily: "Tektur, cursive",
									"& .MuiMenuItem-root": {
										padding: 2,
									},
								},
							},
						}}
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
			<Box
				component="div"
				marginTop="30px"
			>
				<Box
					display="flex"
					flexWrap="wrap"
					gap="10px"
				>
					{!games ? (
						<Typography
							fontFamily="Tektur, cursive"
							textAlign="center"
							fontSize="38px"
							marginTop="40px"
							marginInline="auto"
						>
							No results - choose queries to find games
						</Typography>
					) : (
						games.results.map((game: gameDetailsType) => (
							<GameCard
								key={game.id}
								game={game}
							/>
						))
					)}
				</Box>
				<Box
					component="div"
					display={!games ? "none" : "flex"}
					justifyContent="center"
					alignItems="center"
					gap="20px"
					marginTop="20px"
					marginInline="auto"
				>
					<Button sx={buttonSX}>
						<Typography
							variant="body2"
							component="span"
							fontFamily="Tektur, cursive"
							color="white"
						>
							Previous
						</Typography>
					</Button>
					<Button
						variant="contained"
						sx={{ ...buttonSX, width: "105px" }}
					>
						<Typography
							variant="body2"
							component="span"
							fontFamily="Tektur, cursive"
							color="white"
						>
							Next
						</Typography>
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Filters;
