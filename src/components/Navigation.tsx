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

const Navigation = () => {
	const [open, toggleDrawer] = useState(false);
	return (
		<Box>
			<AppBar
				position="fixed"
				sx={{
					bgcolor: "black",
					borderBottom: "3px solid white",
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
						sx={{ display: { lg: "none" } }}
						onClick={() => toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						anchor="top"
						variant="temporary"
						open={open}
						onClose={() => toggleDrawer(false)}
					>
						<Box>
							<Link
								to="/wishlist"
								style={{ textDecoration: "none" }}
							>
								<ListItemButton>
									<Typography fontFamily="Tektur, cursive">
										Go to wish list
									</Typography>
								</ListItemButton>
							</Link>
							<Link
								to="/categories"
								style={{ textDecoration: "none" }}
							>
								<ListItemButton>
									<Typography fontFamily="Tektur, cursive">
										Go to categories
									</Typography>
								</ListItemButton>
							</Link>
						</Box>
					</Drawer>

					<Box sx={{ display: { xs: "none", lg: "flex" }, gap: 5 }}>
						<Link
							to="/wishlist"
							style={{ textDecoration: "none" }}
						>
							<Typography fontFamily="Tektur, cursive">
								Wish list
							</Typography>
						</Link>
						<Link
							to="/categories"
							style={{ textDecoration: "none" }}
						>
							<Typography fontFamily="Tektur, cursive">
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
