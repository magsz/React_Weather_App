import React from "react";

import { useState } from "react";

export default function Weather({
	city,
	weather,
	getDate,
	setFavorite,
	addFavorite,
	removeFavorite,
	error,
}) {
	const [clicked, setClicked] = useState(false);

	// the return value from calling getDate is stored in currentDate
	let currentDate = getDate(weather.current.dt, weather.timezone_offset);

	// extracting description, temp, humidity, and feelslike from the object return from api call
	const description = weather.current.weather[0].description;
	const temp = weather.current.temp;
	const humidity = weather.current.humidity;
	const feelsLike = weather.current.feels_like;

	/**
	 * Function: handleClick
	 * 	conditionally removes or adds city to favorites list
	 *  depends on if the favorites button was cliked or unclicked
	 */
	function handleClick() {
		if (clicked) {
			removeFavorite(city);
		} else {
			addFavorite(city);
		}
		setClicked((prevClick) => !prevClick);
	}

	return (
		<div className="m-auto mt-4 p-8 bg-white rounded-lg shadow-lg max-w-xl
						 text-gray-700 space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-8">

			<header className="flex flec-col md:flex-row items-center pb-4 md:space-x-4 ml-10">
				<h1 className="text-2xl flex font-semibold">Todays Current Weather in <span className="text-sky-700 text-2xl font-bold ml-2">{city}</span></h1>
				<button className={`text-2xl ${clicked ? "text-yellow-400" : "text-gray-400"}`} onClick={handleClick}>
					{clicked ? "★" : "☆"}
				</button>
			</header>

			<div className="space-y-2 text-center">
				<p className="text-lg font-medium tracking-wider">{currentDate}</p>
				<p className="capitalize text-xl font-bold">{description}</p>
				<p className="text-4xl font-bold text-sky-700">{temp} °F</p>
				<p className="text-sm">Humidity: {humidity}</p>
				<p className="text-sm">Feels like: {feelsLike}</p>
			</div>
		</div>
	);
}
