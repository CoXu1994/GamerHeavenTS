export interface gameDetailsType {
	id: number;
	name: string;
	description_raw: string;
	esrb_rating: esrbTyping;
	metacritic: string;
	platforms: [platformDetailsType];
	background_image: string;
}

type esrbTyping = {
	name: string;
};

export type gamesData = {
	results: gameDetailsType[];
	next: string | null;
	previous: string | null;
};

export type platformDetailsType = {
	platform: platformTyping;
};

type platformTyping = {
	id: number;
	name: string;
};
