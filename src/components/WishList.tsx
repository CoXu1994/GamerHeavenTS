import { useState, useEffect } from "react";
import {
	clearWishlist,
	getWishlist,
	removeFromWishlist,
} from "./wishListOperations";
import { gameDetailsType } from "./GameTypes";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { buttonSX, containerSX } from "./styles";

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
		<Box sx={containerSX}>
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
						<Button
							variant="contained"
							sx={{
								...buttonSX,
								width: { xs: "100px", sm: "220px" },
							}}
						>
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
