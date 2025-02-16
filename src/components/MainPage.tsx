import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import GameList from "./GameList";
import { gameListsQueries } from "./GameListsConstants";
import { useState } from "react";
import {
	categoryTitlesSX,
	containerSX,
	overlaySX,
	primaryTextSX,
} from "./styles";

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
		<Box sx={containerSX}>
			<Box sx={{ textAlign: "center", paddingInline: "8px" }}>
				<Typography sx={primaryTextSX}>
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
				<Box
					component="div"
					sx={overlaySX}
				></Box>
			)}
			<Box
				component="div"
				sx={{ marginTop: "20px" }}
			>
				{gameListsQueries.map((gameList) => (
					<Box
						component="div"
						key={gameList.title}
					>
						<Typography
							variant="h5"
							component="span"
							sx={categoryTitlesSX}
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
