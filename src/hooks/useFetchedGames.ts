import axios from "axios";
import { useState, useEffect } from "react";
import filterType from "../components/FilterTypes";
import { gameDetailsType } from "../components/GameTypes";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

const localCache: Record<string, gameDetailsType> = {};

const useFetchedGames = ({ platform, genre, sortBy }: filterType) => {
	const [games, setGames] = useState<gameDetailsType | null>(null);
	const [error, setError] = useState<string | null>(null);

	let cacheKey = "";

	if (platform || genre || sortBy) {
		cacheKey = `${platform}${genre}${sortBy}`;
	}

	useEffect(() => {
		const controller = new AbortController();

		const fetchGames = async () => {
			try {
				if (localCache[cacheKey]) {
					console.log("Using cached data");
					setGames(localCache[cacheKey]);
					return;
				}
				const response = await axios.get("/games", {
					baseURL: `https://${apiHost}/api`,
					signal: controller.signal,
					params: {
						key: apiKey,
						platforms: platform,
						ordering: sortBy,
						genres: genre,
					},
				});
				if (response.data.status !== 0) {
					localCache[cacheKey] = response.data;
					setGames(localCache[cacheKey]);
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

		if (!localCache[cacheKey]) {
			fetchGames();
		}

		return () => {
			controller.abort();
		};
	}, [platform, genre, sortBy, cacheKey]);

	return { games, error };
};

export default useFetchedGames;
