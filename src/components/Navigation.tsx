import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	Toolbar,
	ListItemButton,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { primaryTextSX } from "./styles";

const Navigation = () => {
	const [open, toggleDrawer] = useState(false);
	return (
		<Box>
			<AppBar
				position="fixed"
				sx={{
					bgcolor: "black",
					borderBottom: "3px solid white",
					zIndex: 1000,
				}}
			>
				<Toolbar
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<Link
						to="/"
						style={{ textDecoration: "none" }}
					>
						<Typography
							variant="h5"
							className="icon-gamepad"
							fontFamily="Tektur, cursive"
						>
							GamerHeaven
						</Typography>
					</Link>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ display: { md: "none" } }}
						onClick={() => toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						anchor="top"
						variant="temporary"
						open={open}
						onClick={() => toggleDrawer(false)}
					>
						<Box
							sx={{
								bgcolor: "rgb(0, 0, 0)",
								border: "1px solid white",
							}}
						>
							<Link
								to="/wishlist"
								style={{ textDecoration: "none" }}
							>
								<ListItemButton
									sx={{
										borderBottom: "1px solid white",
										height: "64px",
										width: "100%",
									}}
								>
									<Typography sx={primaryTextSX}>
										Go to wish list
									</Typography>
								</ListItemButton>
							</Link>
							<Link
								to="/categories"
								style={{ textDecoration: "none" }}
							>
								<ListItemButton
									sx={{
										height: "64px",
										width: "100%",
									}}
								>
									<Typography sx={primaryTextSX}>
										Go to categories
									</Typography>
								</ListItemButton>
							</Link>
						</Box>
					</Drawer>

					<Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
						<Link
							to="/wishlist"
							style={{ textDecoration: "none" }}
						>
							<Typography sx={primaryTextSX}>
								Wish list
							</Typography>
						</Link>
						<Link
							to="/categories"
							style={{ textDecoration: "none" }}
						>
							<Typography sx={primaryTextSX}>
								Categories
							</Typography>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navigation;
