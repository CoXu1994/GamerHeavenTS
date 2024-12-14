import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import GameList from "./GameList";
import { gameListsQueries } from "./GameListsConstants";

const MainPage = () => {
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
			<SearchBar />
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
