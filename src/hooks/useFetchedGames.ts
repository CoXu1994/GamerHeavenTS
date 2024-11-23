import axios from "axios";
import { useState, useEffect } from "react";
import filterType from "../components/FilterTypes";
import { gamesData } from "../components/GameTypes";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

const useFetchedGames = ({
	platform = "",
	genre = "",
	sortBy = "",
}: filterType) => {
	const [games, setGames] = useState<gamesData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchGames = async () => {
			try {
				const params: Record<string, string> = {
					key: apiKey,
				};

				if (platform) params.platforms = platform;
				if (genre) params.genres = genre;
				if (sortBy) params.ordering = sortBy;

				const response = await axios.get("/games", {
					baseURL: `https://${apiHost}/api`,
					signal: controller.signal,
					params,
				});
				if (response.data.status !== 0) {
					setGames(response.data);
				} else {
					setGames(null);
				}
			} catch (err: unknown) {
				if (axios.isCancel(err)) {
					console.log("Request was canceled");
				} else if (axios.isAxiosError(err)) {
					setError(err.response?.data?.message || err.message);
				} else if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred.");
				}
			}
		};

		fetchGames();
		return () => {
			controller.abort();
		};
	}, [platform, genre, sortBy]);
	return { games, error };
};

export default useFetchedGames;
