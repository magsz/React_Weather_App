import React from "react";

export default function Favorites({
	city,
	favorites,
	setFavoriteCity,
	removeFavorite,
	getDate,
}) {
	const favlist = favorites.map((fav, index) => {
		return (
			<div
				key={index}
				className="bg-white rounded-lg justify-items-center shadow p-4 w-64 flex-shrink-0 space-y-3">
				<h3 className="text-lg font-bold text-sky-700">
					{fav.city}
				</h3>
				<p className="text-sm text-gray-700">
					{fav.weather.current.weather[0].description}
				</p>
				<p className="text-md font-medium text-gray-700">
					Temp: <span className="text-sky-700"> {fav.weather.current.temp} °F</span> 
				</p>
				<p className="text-sm text-gray-600">
					Feels like: {fav.weather.current.feels_like}
				</p>
				<button
					onClick={() => removeFavorite(fav.city)}
					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
					Remove
				</button>
			</div>
		);
	});
	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold text-gray-700 mb-4">
				Favorite Cities
			</h2>
			<div className="flex flex-wrap gap-4 justify-center">
				{favorites.length > 0 ? (
					favlist
				) : (
					<p className="text-gray-500">No favorites yet.</p>
				)}
			</div>
		</div>
	);
}
