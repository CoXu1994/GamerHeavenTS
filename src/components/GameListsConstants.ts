type queryType = {
	platforms?: string | undefined;
	ordering?: string | undefined;
};

type GameListQueryItem = {
	title: string;
	query?: queryType;
};

export const gameListsQueries: GameListQueryItem[] = [
	{ title: "New games", query: { ordering: "released" } },
	{ title: "Popular games", query: {} },
	{ title: "Best rated games", query: { ordering: "rating" } },
	{ title: "Play on PC", query: { platforms: "4" } },
	{ title: "Play on Playstation 5", query: { platforms: "187" } },
	{ title: "Play on Xbox Series S/X", query: { platforms: "186" } },
];
