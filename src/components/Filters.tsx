import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

type filterType = {
	name: string;
};

const Filters = () => {
	const [apiGenres, setApiGenres] = useState([]);
	const [apiPlatforms, setApiPlatforms] = useState([]);

	async function getGenres(signal: AbortSignal) {
		const response = await fetch(
			`https://${apiHost}/api/genres?key=${apiKey}`,
			{ signal }
		);
		return response.json();
	}

	async function getPlatforms(signal: AbortSignal) {
		const response = await fetch(
			`https://${apiHost}/api/platforms?key=${apiKey}`,
			{ signal }
		);
		return response.json();
	}

	useEffect(() => {
		const controller = new AbortController();
		getGenres(controller.signal).then((data) => setApiGenres(data.results));
		getPlatforms(controller.signal).then((data) =>
			setApiPlatforms(data.results)
		);
		return () => {
			controller.abort();
		};
	}, []);
	console.log(apiGenres);
	return (
		<>
			<div>
				{apiGenres.map((genre: filterType) => (
					<button>{genre.name}</button>
				))}
			</div>
			<div>
				<label htmlFor="platform">Platform</label>
				<select id="platform">
					{apiPlatforms.map((platform: filterType) => (
						<option>{platform.name}</option>
					))}
				</select>
			</div>
		</>
	);
};

export default Filters;
