import { useState, useEffect } from "react";
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
import {
	buttonSX,
	categoryButtonsBoxSX,
	containerSX,
	primaryTextSX,
	selectBoxSX,
	selectOptionsSX,
	selectSX,
} from "./styles";

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
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [params, setParams] = useState<paramsType | null>(null);
	const [platform, setPlatform] = useState<string>("");
	const [order, setOrder] = useState<string>("");
	const [pageUrl, setPageUrl] = useState<string | null>(null);

	const { games, error }: gamesResponse = useFetchedGames({
		...params,
		pageUrl,
		shouldFetch: !!params,
	});

	useEffect(() => {
		if (pageUrl) {
			const getPageNumberFromUrl = () => {
				const urlParams = new URLSearchParams(pageUrl);
				const page = urlParams.get("page");
				return page ? parseInt(page, 10) : 1;
			};

			setPageNumber(getPageNumberFromUrl());
			window.scrollTo({ top: 380, behavior: "smooth" });
		}
	}, [pageUrl]);

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

	const handleNext = () => {
		if (games?.next) {
			setPageUrl(games.next);
		}
	};

	const handlePrevious = () => {
		if (games?.previous) {
			setPageUrl(games.previous);
		}
	};

	if (error) {
		return <h2>Error: {error}</h2>;
	}

	return (
		<Box
			component="div"
			sx={containerSX}
		>
			<Box
				component="div"
				display="block"
				marginInline="auto"
			>
				<Typography
					fontFamily="Tektur, cursive"
					textAlign="center"
					fontSize="38px"
					display="block"
				>
					Choose genre:
				</Typography>
				<Box
					component="div"
					sx={categoryButtonsBoxSX}
				>
					{CATEGORIES.map((genre: GenreType) => (
						<Button
							variant="contained"
							sx={{ ...buttonSX, width: "140px", height: 61 }}
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
				sx={selectBoxSX}
			>
				<FormControl>
					<InputLabel
						sx={primaryTextSX}
						id="platformLabel"
						shrink
					>
						Platform
					</InputLabel>
					<Select
						variant="standard"
						sx={selectSX}
						labelId="platformLabel"
						id="platform"
						label="Platform"
						value={platform}
						displayEmpty
						onChange={handleSelectPlatform}
						MenuProps={selectOptionsSX}
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
						sx={primaryTextSX}
						id="sortByLabel"
						shrink
					>
						Sort By
					</InputLabel>
					<Select
						variant="standard"
						sx={selectSX}
						labelId="sortByLabel"
						id="sortBy"
						label="SortBy"
						value={order}
						displayEmpty
						onChange={handleSelectOrder}
						MenuProps={selectOptionsSX}
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
					marginInline="auto"
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
				{games && (
					<Box
						component="div"
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="20px"
						marginTop="20px"
						marginInline="auto"
					>
						<Button
							variant="contained"
							sx={buttonSX}
							onClick={handlePrevious}
							disabled={!games.previous}
						>
							Previous
						</Button>
						<Typography
							component="span"
							fontFamily="Tektur, cursive"
						>
							{pageNumber}
						</Typography>
						<Button
							variant="contained"
							sx={buttonSX}
							onClick={handleNext}
							disabled={!games.next}
						>
							Next
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Filters;
