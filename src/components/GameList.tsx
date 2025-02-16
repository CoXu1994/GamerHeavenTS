import GameCard from "./GameCard";
import useFetchedGames from "../hooks/useFetchedGames";
import { gameDetailsType, gamesData } from "./GameTypes";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";

type gamesResponse = {
	games: gamesData | null;
	error?: string | null;
};

type queryType = {
	platforms?: string | undefined;
	ordering?: string | undefined;
	pageUrl?: string | null;
	shouldFetch?: boolean;
};

type propType = {
	prop?: queryType;
};

const buttonSX = {
	backgroundColor: "rgba(255, 255, 255, 0.125)",
	fontFamily: "Tektur, cursive",
	width: "105px",
	border: "1px solid white",
	padding: "10px 16px",
	borderRadius: "5px",
	fontSize: "12px",
	transition: "all 1s",
	"&: hover": {
		backgroundColor: "white",
		color: "black",
	},
	"&: hover > * ": {
		color: "black",
	},
};

const GameList = ({ prop }: propType) => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [pageUrl, setPageUrl] = useState<string | null>(null);
	const { games, error }: gamesResponse = useFetchedGames({
		...prop,
		pageUrl,
	});

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (pageUrl) {
			const getPageNumberFromUrl = () => {
				const urlParams = new URLSearchParams(pageUrl);
				const page = urlParams.get("page");
				return page ? parseInt(page, 10) : 1;
			};

			setPageNumber(getPageNumberFromUrl());
		}

		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTo({
				left: 0,
				behavior: "smooth",
			});
		}
	}, [pageUrl]);

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
		return (
			<Typography
				variant="h3"
				component="h2"
				fontFamily="Tektur, cursive"
				sx={{
					textAlign: "center",
				}}
			>
				Error: {error}
			</Typography>
		);
	}

	if (!games) {
		return (
			<Typography
				variant="h3"
				component="h2"
				fontFamily="Tektur, cursive"
				sx={{
					textAlign: "center",
				}}
			>
				Loading...
			</Typography>
		);
	}

	return (
		<>
			<Box
				component="section"
				sx={{ paddingInline: "20px" }}
			>
				<Box
					ref={scrollContainerRef}
					sx={{
						display: "flex",
						gap: 3,
						flexGrow: 1,
						flexShrink: 1,
						flexBasis: 0,
						height: 440,
						overflow: "auto",
						justifyContent: "flex-start",
						alignItems: "center",
						"&::-webkit-scrollbar": {
							height: "15px",
						},
						"&::-webkit-scrollbar-track": {
							background: "rgba(255, 255, 255, 0.125)",
							borderRadius: "5px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "white",
							border: "1px solid white",
							borderRadius: "5px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							background: "rgba(255, 255, 255, 0.125)",
						},
					}}
				>
					{games?.results.map((game: gameDetailsType) => (
						<GameCard
							key={game.id}
							game={game}
						/>
					))}
				</Box>
				<Box
					sx={{
						margin: "20px 0",
						display: "flex",
						gap: 3,
						justifyContent: "center",
						alignItems: "center",
					}}
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
			</Box>
		</>
	);
};

export default GameList;
