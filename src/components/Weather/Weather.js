import React, { useState } from 'react';
import axios from 'axios';
import './Weather.scss'
import Spinner from '../Spinner/Spinner';

export default function (){

	const [spinner, setSpinner] = useState(false);

	document.title = 'Weather';
	
	const [weather, setWeather] = useState({
		city: null,
		temperature: null,
		humidity: null,
		pressure: null,
		sky: null,
		icon: null
	});

	function getIconFromId (id){
		if(id > 199 && id < 233) return '11';
		if(id > 499 && id < 505) return '10';
		if(id === 511) return '13';
		if((id > 299 && id < 322) || (id > 519 && id < 782)) return '09';
		if(id === 800) return '01';
		if(id > 800 && id < 805) return '04';
	}


	function changeWeather (event) {
		event.preventDefault();
		event.stopPropagation();
		(async function (){
		const city = document.getElementById('city').value;
		if(!city){
			alert('Enter city name');
			return 0;
		}
		setSpinner(true);
		const weatherFromSite = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fec8b249edbf6232ae4e5957bd8e7ecf&units=metric`);
		let weatherIcon = getIconFromId(parseInt(weatherFromSite.data.weather[0].id));
		weatherFromSite.data.dt < weatherFromSite.data.sys.sunrise || weatherFromSite.data.dt > weatherFromSite.data.sys.sunset ? weatherIcon += 'n' : weatherIcon += 'd';
		weatherIcon = `http://openweathermap.org/img/w/${weatherIcon}.png`;
		setWeather({ 
			city: weatherFromSite.data.name,
			temperature: weatherFromSite.data.main.temp,
			humidity: weatherFromSite.data.main.humidity,
			pressure: weatherFromSite.data.main.pressure,
			sky: weatherFromSite.data.weather[0].description,
			icon: weatherIcon,
		});
			setSpinner(false);	  
		})();
	}
	const weatherTab = 
	<ul className='text-left'>
		<li>City: {weather.city}</li>
		<li>Temperature: {weather.temperature} &#176;C</li>
		<li>Humidity: {weather.humidity}%</li>
		<li>Pressure: {weather.pressure}Pv</li>
		<li>Weather: {weather.sky} <img src={weather.icon} alt='Weather'></img></li>
	</ul>
	
	return(
		<div className='weather'>
			{spinner ? <Spinner/> : ''}
			<div className="random-image"/>
			<div className='weather-form'>
				<form onSubmit={changeWeather}>
					<label>Enter a city name</label>
					<input type='text' id='city' placeholder='London'></input>
					<input className='submitButton' type='submit' color='info' value='Submit'></input>
					{weather.sky && weatherTab}
				</form>
			</div>
		</div>
	);
}