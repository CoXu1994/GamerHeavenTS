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
			<AppBar position="fixed">
				<Toolbar>
					<Link
						to="/"
						style={{ textDecoration: "none" }}
					>
						<Typography className="nav__title icon-gamepad">
							GamerHeaven
						</Typography>
					</Link>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
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
									<Typography>Go to wish list</Typography>
								</ListItemButton>
							</Link>
							<Link
								to="/categories"
								style={{ textDecoration: "none" }}
							>
								<ListItemButton>
									<Typography>Go to categories</Typography>
								</ListItemButton>
							</Link>
						</Box>
					</Drawer>

					<Box>
						<Link
							to="/wishlist"
							style={{ textDecoration: "none" }}
						>
							<Typography>Wish list</Typography>
						</Link>
						<Link
							to="/categories"
							style={{ textDecoration: "none" }}
						>
							<Typography>Categories</Typography>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navigation;
