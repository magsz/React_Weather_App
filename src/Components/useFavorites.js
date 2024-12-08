import { useState, useEffect } from "react";

export default function useFavorites() {
	// creating a custom hook to help add and remove favorite cities into local storage
	const [favorites, setFavorites] = useState(() => {
		const savedFavorites = localStorage.getItem("favorites");
		return savedFavorites ? JSON.parse(savedFavorites) : []; // makes sure it's an array
	});

	/**
	 * side effect to set local storage depending on whether there are any favorites
	 */

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	/**
	 * Function: addFavorite
	 * will add the city and the weatherData retrieved from the APi into the favorites state array
	 */
	const addFavorite = (city, weather) => {
		const newFavorite = { city, weather };
		setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
	};

	/**
	 * Function: removeFavorite
	 *  will remove a city from the favorites favorites state array
	 */
	const removeFavorite = (city) => {
		setFavorites((prevFavorites) =>
			prevFavorites.filter((fav) => fav.city !== city)
		);
	};

	return { favorites, addFavorite, removeFavorite };
}
