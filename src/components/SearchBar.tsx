import {
	Box,
	FormControl,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	searchInputSX,
	searchLabelSX,
	searchResultsSX,
	sx_container__searchbar,
} from "./styles";

const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type foundGame = {
	id: number;
	name: string;
};

type SearchBarProps = {
	onResultsFound: (hasResults: boolean) => void;
	onFocusChange: (isFocused: boolean) => void;
	isSearchFocused: boolean;
};

const SearchBar = ({
	onResultsFound,
	onFocusChange,
	isSearchFocused,
}: SearchBarProps) => {
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
			setFinds([]);
			onResultsFound(false);
			return;
		}

		getGames(searchQuery).then((data) => {
			if (searchQuery.trim() === "") {
				setFinds([]);
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
			sx={sx_container__searchbar}
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
					sx={searchLabelSX}
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
					onFocus={() => onFocusChange(true)}
					onBlur={() => setTimeout(() => onFocusChange(false), 100)}
					sx={searchInputSX}
				/>
			</FormControl>
			<Box sx={searchResultsSX}>
				{isSearchFocused &&
					!!finds.length &&
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
