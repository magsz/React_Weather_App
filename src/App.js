import "./App.css";

import Search from "./Components/Search";
import Weather from "./Components/Weather";
import Forecast from "./Components/Forecast";
import Favorites from "./Components/Favorites";

import { useState, useEffect } from "react";
import axios from "axios";
import useFavorites from "./Components/useFavorites";

function App() {
	const API_KEY = process.env.REACT_APP_API_KEY;

	const [city, setCity] = useState("");
	const [cityLatAndLon, setCityLatAndLon] = useState({});
	const [weatherData, setWeatherData] = useState([]);
	const [weatherFethced, setWeatherFetched] = useState(false);
	const [error, setError] = useState(false);
	const [isFavorite, setFavorite] = useState(false);
	const { favorites, addFavorite, removeFavorite } = useFavorites();

	useEffect(() => {
		if (cityLatAndLon[0]) {
			const lat = cityLatAndLon[0].lat;
			const lon = cityLatAndLon[0].lon;

			getWeather(lat, lon);
		}
	}, [cityLatAndLon]);

	useEffect(() => {
		const isFav = favorites.some((fav) => fav.city === city);
		setFavorite(isFav);
	}, [city, favorites]);

	async function searchCity(cityEntered) {
		try {
			setCity(cityEntered);

			axios.get(
				`https://api.openweathermap.org/geo/1.0/direct?q=${cityEntered}&limit=1&appid=${API_KEY}`
			).then((res) => {
				if (res.data.length > 0) {
					setCityLatAndLon(res.data);
					setError(false);
				} else {
					alert("Please enter a valid city");
					setError(true);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function getWeather(latitude, longitude) {
		try {
			axios.get(
				`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&units=imperial&lan=eng&appid=${API_KEY}`
			).then((res) => {
				setWeatherData(res.data);
				setWeatherFetched(true);
			});
		} catch (error) {
			console.log(error);
		}
	}

	function getDate(dtIn, timezoneIn) {
		let dt = dtIn;
		let timezone = timezoneIn;
		let dateTime = (dt + timezone) * 1000;
		let date = new Date(dateTime);

		return date.toLocaleDateString();
	}
	return (
		<div>
			<Search city={city} searchCity={searchCity} setCity={setCity} />

			{error
				? ""
				: weatherFethced && (
						<>
							<Weather
								error={error}
								city={city}
								weather={weatherData}
								getDate={getDate}
								setFavorite={setFavorite}
								addFavorite={() =>
									addFavorite(city, weatherData)
								}
								removeFavorite={() =>
									removeFavorite(city)
								}
							/>
							<Forecast
								weather={weatherData}
								getDate={getDate}
							/>

							<div>
								<Favorites
									city={city}
									favorites={favorites}
									getDate={getDate}
									isFavorite={isFavorite}
									removeFavorite={removeFavorite}
								/>
							</div>
						</>
				  )}
		</div>
	);
}

export default App;
