import { WeatherAPI } from "./weather-api.js";

class WeatherApp {


    init() {
        this.addEventHandlers();

    }

    addEventHandlers() {
        const searchBoxElement = document.querySelector(".search-box");
        searchBoxElement.param1 = this;
        searchBoxElement.addEventListener("keypress", this.handleEvent);
    }

    handleEvent(event) {
        if (event.key == "Enter" || event.keyCode == 13) {

            const eventTarget = event.target;
            const theWeatherAppObj = eventTarget.param1;
            const cityName = eventTarget.value;

            const weatherAPI = new WeatherAPI(cityName);
            weatherAPI.invoke().then((response) => {
                theWeatherAppObj.updateUIElements(response);
            })

        }
    }

    updateUIElements(weatherJSON) {


        const cityElement = document.querySelector(".location .city");
        cityElement.innerHTML = `${weatherJSON.name}, ${weatherJSON.sys.country}`;

        const dateElement = document.querySelector(".location .date");
        const currentdate = new Date();
        const dateAsString = currentdate.toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'

        })
        dateElement.innerHTML = `${dateAsString}`;

        const temperatureElement = document.querySelector(".current .temp");
        temperatureElement.innerHTML = `${weatherJSON.main.temp} °c`;

        const weatherElement = document.querySelector(".current .weather");
        const weathervalue = weatherJSON.weather[0].main;
        weatherElement.innerHTML = weathervalue;




        const higLowElement = document.querySelector(".current .hi-low");
        higLowElement.innerHTML = `${weatherJSON.main.temp_max}°c / ${weatherJSON.main.temp_min}°c`;

    }
}

export { WeatherApp }