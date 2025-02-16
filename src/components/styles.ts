export const buttonSX = {
	backgroundColor: "rgba(255, 255, 255, 0.125)",
	fontFamily: "Tektur, cursive",
	width: "105px",
	border: "1px solid white",
	padding: "10px 16px",
	borderRadius: "5px",
	fontSize: "12px",
	transition: "all 1s",
	"&: hover": {
		backgroundColor: "white",
	},
	"&: hover > * ": {
		color: "black",
	},
};
export const containerSX = {
	marginInline: "auto",
	marginTop: "100px",
	display: "block",
	minWidth: "320px",
};

export const primaryTextSX = {
	color: "white",
	fontFamily: "Tektur, cursive",
};

export const selectSX = {
	fontFamily: "Tektur, cursive",
	width: "282px",
	color: "white",
	border: "1px solid white",
	padding: "10px 16px",
	borderRadius: "5px",
};

export const selectOptionsSX = {
	PaperProps: {
		sx: {
			bgcolor: "black",

			fontFamily: "Tektur, cursive",
			"& .MuiMenuItem-root": {
				padding: 2,
				border: "1px solid white",
			},
		},
	},
};

export const categoryButtonsBoxSX = {
	display: "flex",
	width: "100%",
	flexWrap: "wrap",
	justifyContent: "center",
	gap: "2px",
	marginTop: "20px",
};

export const selectBoxSX = {
	marginTop: "40px",
	display: "flex",
	flexDirection: { xs: "column", md: "row" },
	gap: { xs: "40px", md: "160px" },
	justifyContent: "center",
	alignItems: "center",
};

// Overlay

export const overlaySX = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.9)",
	zIndex: 1000,
};

export const categoryTitlesSX = {
	fontFamily: "Tektur, cursive",
	marginLeft: "20px",
	borderBottom: "2px solid white",
	paddingBottom: "2px",
};

export const sx_container__searchbar = {
	width: { sm: "380px" },
	marginTop: "30px",
	marginInline: "auto",
};

export const searchInputSX = {
	backgroundColor: "rgba(255, 255, 255, 0.125)",
	marginTop: "10px",
	marginInline: "auto",
	width: { sm: "380px" },
	border: "2px solid white",
	zIndex: 1100,
	position: "relative",

	input: {
		fontFamily: "Tektur, cursive",
		color: "white",
		"::placeholder": {
			color: "white",
		},
		"&:focus": {
			color: "black",
		},
	},

	"& .MuiOutlinedInput-notchedOutline": {
		border: "none",
	},
	"& .MuiOutlinedInput-root": {
		transition: "all 0.3s ease-in-out",

		"&:hover .MuiOutlinedInput-notchedOutline": {
			border: "none",
			transition: "all 0.3s ease-in-out",
		},
		"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
		"&.Mui-focused": {
			boxShadow: "none",
			bgcolor: "white",
		},
	},
};
export const searchLabelSX = {
	color: "white",
	fontFamily: "Tektur, cursive",
	textAlign: "center",
	transform: "none",
	position: "static",
	fontSize: "24px",
};

export const searchResultsSX = {
	bgcolor: "rgb(0, 0, 0)",
	zIndex: 1100,
	position: "absolute",
	width: 380,
	maxHeight: 400,
	overflow: "auto",
	"&::-webkit-scrollbar": {
		height: "15px",
	},
	"&::-webkit-scrollbar-track": {
		background: "rgba(255, 255, 255, 0.125)",
	},
	"&::-webkit-scrollbar-thumb": {
		background: "white",
		border: "1px solid white",
	},
	"&::-webkit-scrollbar-thumb:hover": {
		background: "rgba(255, 255, 255, 0.125)",
	},
};
