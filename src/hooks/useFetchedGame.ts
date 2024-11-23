import { useState, useEffect } from "react";
import axios from "axios";
import { gameDetailsType } from "../components/GameTypes";

const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

const useFetchedGame = (id: string | undefined) => {
	const [game, setGame] = useState<gameDetailsType | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const controller = new AbortController();

		const fetchGame = async () => {
			try {
				const response = await axios.get(`/games/${id}`, {
					baseURL: `https://${apiHost}/api`,
					signal: controller.signal,
					params: {
						key: apiKey,
					},
				});
				setGame(response.data);
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

		fetchGame();

		return () => {
			controller.abort();
		};
	}, [id]);

	return { game, error };
};
export default useFetchedGame;
