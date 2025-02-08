import {
	Box,
	FormControl,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type foundGame = {
	id: number;
	name: string;
};

type SearchBarProps = {
	onResultsFound: (hasResults: boolean) => void;
};

const SearchBar = ({ onResultsFound }: SearchBarProps) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [finds, setFinds] = useState<foundGame[]>([]);

	async function getGames(searchPhrase: string) {
		const response = await fetch(
			`https://${apiHost}/api/games?key=${apiKey}&search=${searchPhrase}`
		);
		return response.json();
	}
	const handleSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFinds([]); // Gwarantujemy, że lista wyników jest pusta, jeśli query jest puste
			onResultsFound(false);
			return;
		}

		getGames(searchQuery).then((data) => {
			if (searchQuery.trim() === "") {
				setFinds([]); // Zapewniamy, że nie przypisujemy wyników, jeśli searchQuery się zmieniło
				onResultsFound(false);
			} else {
				setFinds(data.results);
				onResultsFound(data.results.length > 0);
			}
		});
	}, [searchQuery, onResultsFound]);
	return (
		<Box
			component="div"
			sx={{
				width: "380px",
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
						fontSize: "24px",
					}}
				>
					Find the game
				</InputLabel>
				<TextField
					id="searchBar"
					value={searchQuery}
					onInput={handleSearching}
					variant="outlined"
					placeholder="Search..."
					size="small"
					autoComplete="off"
					sx={{
						backgroundColor: "rgba(255, 255, 255, 0.125)",
						marginTop: "10px",
						marginInline: "auto",
						width: "380px",
						border: "2px solid white",
						zIndex: 1100,
						position: "relative",

						input: {
							fontFamily: "Tektur, cursive",
							color: "white",
							"::placeholder": {
								color: "white",
							},
							"&:focus": {
								color: "black",
							},
						},

						"& .MuiOutlinedInput-notchedOutline": {
							border: "none", // Usunięcie ramki
						},
						"& .MuiOutlinedInput-root": {
							transition: "all 0.3s ease-in-out",

							"&:hover .MuiOutlinedInput-notchedOutline": {
								border: "none", // Usunięcie ramki po najechaniu
								transition: "all 0.3s ease-in-out",
							},
							"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
								border: "none", // Usunięcie ramki po focusie
							},
							"&.Mui-focused": {
								boxShadow: "none", // Usunięcie efektu podświetlenia po focusie
								bgcolor: "white",
							},
						},
					}}
				/>
			</FormControl>
			<Box
				sx={{
					bgcolor: "rgb(0, 0, 0)",
					zIndex: 1100,
					position: "absolute",
					width: 380,
					maxHeight: 400,
					overflow: "auto",
				}}
			>
				{!!finds.length &&
					searchQuery.trim() !== "" &&
					finds.map((found: foundGame) => (
						<Link
							to={`/games/${found.id}`}
							style={{
								textDecoration: "none",
							}}
							key={found.id}
						>
							<Typography
								fontFamily="Tektur, cursive"
								style={{
									border: "1.5px solid white",
									height: "34px",
									padding: "4px 10px",
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
