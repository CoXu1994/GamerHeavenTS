import { useState, useEffect } from "react";
import {
	clearWishlist,
	getWishlist,
	removeFromWishlist,
} from "./WishlistOperations";
import { gameDetailsType } from "./GameTypes";

const Wishlist = () => {
	const [wishlist, setWishList] = useState<gameDetailsType[]>([]);

	useEffect(() => {
		renderWishList();
	}, []);

	const renderWishList = () => {
		const wishListData = getWishlist();
		setWishList(wishListData);
	};
	const handleRemoveFromWishList = (gameId: number) => {
		removeFromWishlist(gameId);
		renderWishList();
	};

	const handleClearWishList = () => {
		clearWishlist();
		renderWishList();
	};

	return (
		<>
			{wishlist.length > 0 && (
				<button onClick={() => handleClearWishList()}>
					Clear Wishlist
				</button>
			)}

			{wishlist.length > 0 &&
				wishlist.map((item: gameDetailsType) => (
					<div key={item.id}>
						<span>
							ID:{item.id}-Title:{item.name}
						</span>
						<button style={{ background: "gray" }}>
							<span className="btn__icon icon-cancel-squared"></span>
							<span
								onClick={() =>
									handleRemoveFromWishList(item.id)
								}
							>
								Remove from Wishlist
							</span>
						</button>
					</div>
				))}
		</>
	);
};

export default Wishlist;
