import GameCard from "./GameCard";
import useFetchedGames from "../hooks/useFetchedGames";
import { gameDetailsType, gamesData } from "./GameTypes";
import { Box, Button, Typography } from "@mui/material";

type gamesResponse = {
	games: gamesData | null;
	error?: string | null;
};

type queryType = {
	platforms?: string | undefined;
	ordering?: string | undefined;
};

type propType = {
	prop?: queryType;
};

const GameList = ({ prop }: propType) => {
	const { games, error }: gamesResponse = useFetchedGames(prop || {});

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
				sx={{ p: 2 }}
			>
				<Box
					sx={{
						display: "flex",
						gap: 46,
						flexGrow: 1,
						flexShrink: 1,
						flexBasis: 0,
						height: 440,
						overflow: "auto",
						justifyContent: "flex-start",
						alignItems: "center",
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
						marginTop: 1,
						display: "flex",
						gap: 0.5,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						sx={{
							backgroundColor: "gray",
							fontFamily: "Tektur, cursive",
							width: 100,
						}}
					>
						Previous
					</Button>
					<Button
						variant="contained"
						sx={{
							backgroundColor: "gray",
							fontFamily: "Tektur, cursive",
							width: 100,
						}}
					>
						Next
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default GameList;
