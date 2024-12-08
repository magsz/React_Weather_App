import React from "react";

export default function Search({ city, searchCity, setCity, setFavorite }) {
	/**
	 *  Function: handleSubmit
	 *  handles the city submitted in the input field.
	 *  sets the city in the setCity state function
	 *  passes city in the searchCity function so it can retrieve the lat and lon of that city
	 */
	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const city = formData.get("city");

		setCity(city);
		searchCity(city);
		event.target.reset();
	}
	return (
		<div className="max-width-full min-w-96 h-44">
			<form
				className="flex flex-row justify-center space-x-0.5 mt-16 min-w-60 max-w-full h-12"
				onSubmit={handleSubmit}>
				<input
					className="basis-1/4 rounded-sm text-2xl indent-1"
					type="text"
					name="city"
					placeholder="Houston"
					required
				/>
				<button
					className="bg-sky-850 basis-1/6 rounded-sm border-double border-2 
			 			 	 border-sky-100 hover:bg-sky-700 uppercase 
							   text-xl font-normal text-white">
					Search
				</button>
			</form>
		</div>
	);
}
