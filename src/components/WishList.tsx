import { useState, useEffect } from "react";
import {
	clearWishlist,
	getWishlist,
	removeFromWishlist,
} from "./WishlistOperations";
import { gameDetailsType } from "./GameTypes";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const buttonSX = {
	backgroundColor: "rgba(255, 255, 255, 0.125)",
	fontFamily: "Tektur, cursive",
	border: "1px solid white",
	padding: "10px 16px",
	borderRadius: "5px",
	fontSize: "12px",
	transition: "all 1s",
	"&: hover": {
		backgroundColor: "white",
		color: "black",
	},
	"&: hover > * ": {
		color: "black",
	},
};

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
		<Box
			component="section"
			marginInline="auto"
			marginTop="100px"
		>
			<Typography
				component="span"
				display="block"
				fontFamily="Tektur, cursive"
				fontSize="18px"
			>
				Your wishlist records:
			</Typography>

			{wishlist.length > 0 ? (
				wishlist.map((item: gameDetailsType) => (
					<Box
						component="div"
						border="1px solid white"
						padding="10px"
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						key={item.id}
					>
						<Link
							to={`/games/${item.id}`}
							style={{
								textDecoration: "none",
							}}
						>
							<Typography
								component="span"
								fontFamily="Tektur, cursive"
							>
								{item.name}
							</Typography>
						</Link>
						<Button sx={buttonSX}>
							<Typography
								className="btn__icon icon-cancel-squared"
								paddingRight="4px"
							></Typography>
							<Typography
								component="span"
								fontFamily="Tektur, cursive"
								fontSize="12px"
								onClick={() =>
									handleRemoveFromWishList(item.id)
								}
							>
								Remove from Wishlist
							</Typography>
						</Button>
					</Box>
				))
			) : (
				<Typography
					component="div"
					fontFamily="Tektur, cursive"
					height="100px"
					fontSize="24px"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					No games on list
				</Typography>
			)}
			{wishlist.length > 0 && (
				<Box
					component="div"
					marginTop="10px"
					display="flex"
					justifyContent="flex-end"
				>
					<Button
						variant="contained"
						sx={buttonSX}
						onClick={() => handleClearWishList()}
					>
						Clear Wishlist
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default Wishlist;
