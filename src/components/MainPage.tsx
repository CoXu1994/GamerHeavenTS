import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import GameList from "./GameList";
import { gameListsQueries } from "./GameListsConstants";
import { useState } from "react";

const MainPage = () => {
	const [hasResults, setHasResults] = useState(false);
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	const handleResultsFound = (resultsExist: boolean) => {
		setHasResults(resultsExist);
	};
	const handleFocusChange = (isFocused: boolean) => {
		setIsSearchFocused(isFocused);
	};
	return (
		<Box sx={{ marginInline: "auto" }}>
			<Box sx={{ textAlign: "center" }}>
				<Typography
					fontFamily="Tektur, cursive"
					sx={{ paddingTop: "10px" }}
				>
					All data and images comes from RAWG.{" "}
					<a href="https://rawg.io/apidocs">
						Find more at https://rawg.io/apidocs{" "}
					</a>
				</Typography>
			</Box>
			<SearchBar
				onResultsFound={handleResultsFound}
				onFocusChange={handleFocusChange}
				isSearchFocused={isSearchFocused}
			/>
			{hasResults && isSearchFocused && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.9)", // Przyciemnienie tła
						zIndex: 1000, // Overlay nad innymi elementami
					}}
				></div>
			)}
			<Box>
				{gameListsQueries.map((gameList) => (
					<Box>
						<Typography
							variant="h5"
							component="h5"
							fontFamily="Tektur, cursive"
						>
							{gameList.title}
						</Typography>
						<GameList prop={gameList.query} />
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default MainPage;
