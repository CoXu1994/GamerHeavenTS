import { gameDetailsType } from "./GameTypes";

export function addToWishlist(game: gameDetailsType) {
	const wishlistRaw = localStorage.getItem("wishlist");
	const wishlist: gameDetailsType[] = wishlistRaw
		? JSON.parse(wishlistRaw)
		: [];

	const exists = wishlist.some(
		(item: gameDetailsType) => item.id === game.id
	);
	if (!exists) {
		wishlist.push(game);
		localStorage.setItem("wishlist", JSON.stringify(wishlist));
		console.log("Game has been added to wishlist:", game);
	} else {
		console.log("Game is already on wishlist");
	}
}

export function removeFromWishlist(gameId: number) {
	const wishlistRaw = localStorage.getItem("wishlist");
	let wishlist: gameDetailsType[] = wishlistRaw
		? JSON.parse(wishlistRaw)
		: [];
	wishlist = wishlist.filter((item: gameDetailsType) => item.id !== gameId);
	localStorage.setItem("wishlist", JSON.stringify(wishlist));
	console.log(`Game with ID ${gameId} has been removed.`);
}

export function getWishlist() {
	const wishlistRaw = localStorage.getItem("wishlist");
	const wishlist: gameDetailsType[] = wishlistRaw
		? JSON.parse(wishlistRaw)
		: [];
	console.log("Wishlist data:", wishlist);
	return wishlist;
}

export function clearWishlist() {
	localStorage.removeItem("wishlist");
	console.log("Wishlist has been cleared.");
}
