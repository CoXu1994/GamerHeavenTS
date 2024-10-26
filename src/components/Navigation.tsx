import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<>
			<div>
				<Link to="/">
					<span className="nav__title icon-gamepad">GamerHeaven</span>
				</Link>
				<div>
					{/* {Mobile Navigation} */}
					{/* <Link to="/wish-list">
						<p>Go to wish list</p>
					</Link>
					<Link to="categories">
						<p>Go to categories</p>
					</Link> */}

					<Link to="/wishlist">
						<p>Wish list</p>
					</Link>
					<Link to="/categories">
						<p>Categories</p>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navigation;
