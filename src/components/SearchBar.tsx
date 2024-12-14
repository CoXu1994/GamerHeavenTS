import {
	Box,
	FormControl,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type foundGame = {
	id: number;
	name: string;
};

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [finds, setFinds] = useState([]);

	async function getGames(searchPhrase: string) {
		const response = await fetch(
			`https://${apiHost}/api/games?key=${apiKey}&search=${searchPhrase}`
		);
		return response.json();
	}
	const handleSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		getGames(searchQuery).then((data) => setFinds(data.results));
	};

	return (
		<Box
			component="div"
			sx={{
				width: "350px",
				marginTop: "30px",
				marginInline: "auto",
			}}
		>
			<FormControl
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<InputLabel
					htmlFor="searchBar"
					sx={{
						color: "white",
						fontFamily: "Tektur, cursive",
						textAlign: "center",
						transform: "none",
						position: "static",
					}}
				>
					Find the game
				</InputLabel>
				<TextField
					id="searchBar"
					value={searchQuery}
					onInput={handleSearching}
					variant="outlined"
					placeholder="Search"
					size="small"
					sx={{
						color: "white",
						backgroundColor: "white",
						marginTop: "10px",
						marginInline: "auto",
						width: "350px",
					}}
				/>
			</FormControl>
			<Box sx={{ bgcolor: "gray" }}>
				{finds.length > 0 &&
					finds.map((found: foundGame) => (
						<Link
							to={`/games/${found.id}`}
							style={{ textDecoration: "none" }}
							key={found.id}
						>
							<Typography
								fontFamily="Tektur, cursive"
								style={{
									border: "1px solid white",
									height: "30px",
								}}
							>
								{found.name}
							</Typography>
						</Link>
					))}
			</Box>
		</Box>
	);
};

export default SearchBar;
