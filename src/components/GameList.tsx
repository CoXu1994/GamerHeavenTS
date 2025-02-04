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
						marginTop: 2,
						display: "flex",
						gap: 3,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						sx={buttonSX}
					>
						Previous
					</Button>
					<Button
						variant="contained"
						sx={buttonSX}
					>
						Next
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default GameList;
