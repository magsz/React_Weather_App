import React from "react";

export default function Forecast({ weather, getDate }) {
	// extract array of forecast for the following 8 days
	const foreCastData = weather.daily;

	// extract the time zone offset for that specific city
	const timezone = weather.timezone_offset;

	// maps each daily forecast into their own div's
	const dailyForecast = foreCastData.map((forecast, index) => {
		const dt = forecast.dt;
		const date = getDate(dt, timezone);

		return (
			<div
				key={index}
				className="bg-white rounded-lg shadow p-4 w-44 flex-shrink-0 space-y-2">
				<span className="block text-sm font-medium tracking-wider text-gray-700">
					{date}
				</span>
				<p className="capitalize text-gray-700">
					{forecast.summary}
				</p>
				<p className="block text-sm font-medium text-gray-700">
				Temp:
				<span className="ml-2 text-lg font-bold text-sky-700">
					{forecast.temp.day} °F
				</span>
				</p>
				<p className="text-sm text-gray-700">
					Feels like: {forecast.feels_like.day}
				</p>
			</div>
		);
	});

	return (
		<div className="flex flex-wrap gap-4 justify-center p-10">
			{dailyForecast}
		</div>
	);
}
