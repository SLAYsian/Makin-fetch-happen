"use strict";
// SECTION: DOM ELEMENTS

let searchForm = $("#search-form");
let searchHistory = $(".list-group");
let currentWeather = $("#current-weather");
let searchInput = $("#city");
let cityName = document.createElement("h3");
let weatherIcon = document.createElement("img");
let temperature = document.createElement("p");
let humidity = document.createElement("p");
let windSpeedEl = document.createElement("p");
let errorMsg = document.createElement("h3");
let forecastHeaderEl = document.querySelectorAll(".card-header");
let forecastBodyEl = document.querySelectorAll(".card-body");

const apiKey = "a7721d270b5b8958e55f066db552d8a1";
let city;
const queryURL = `http.api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

// api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
// fetch(queryURL);

// SECTION: ADD EVENT LISTENER - SUBMIT CITY/ZIP
searchForm.on("submit", (event) => {
  event.preventDefault();
  let city = event.target.city.value;
  fetchWeatherData(city);
});

// NOTES: ERROR MESSAGE FUNCTION:

// SECTION: ADD FUNCTION - FETCH WEATHER FUNCTION
function fetchWeatherData(query) {
  // NOTES: Check if postal code
  let isPostal = /^\d+$/.test(query);
  let searchParam = isPostal ? `zip=${query}` : `q=${query}`;

  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?${searchParam}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayCurrentWeather(data);
          displayForecast(data);
          console.log(data);
        });
      } else {
        errorMsg.textContent = `Error: ${response.status} ${response.statusText}`;
        currentWeather.append(errorMsg);
        forecastBodyEl.append(errorMsg);
      }
    })
    .catch(function (error) {
      currentWeather.append(errorMsg);
      forecastBodyEl.append(errorMsg);
    });
}

// SECTION: ADD FUNCTION - DISPLAY CURRENT WEATHER
function displayCurrentWeather(data) {
  let { city, list } = data;

  let current = list[0];
  let { dt_txt, main, weather, wind } = current;

  let currentDate = dayjs(dt_txt).format("ddd MMM D, YYYY");
  cityName.textContent = `${city.name} (${currentDate})`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherIcon.alt = `${weather[0].description}`;
  temperature.textContent = `Temperature: ${Math.round(main.temp)} °F`;
  humidity.textContent = `Humidity: ${main.humidity}%`;
  windSpeedEl.textContent = `Wind Speed: ${Math.round(wind.speed)} m/s`;

  currentWeather.append(cityName);
  currentWeather.append(weatherIcon);
  currentWeather.append(temperature);
  currentWeather.append(humidity);
  currentWeather.append(windSpeedEl);
}

// SECTION: DISPLAY 5-DAY WEATHER FORECAST
function displayForecast(data) {
  let { list } = data;
  let dailyData = list.filter((item) => {
    let time = new Date(item.dt_txt).getHours();
    return time === 12;
  });

  dailyData.slice(0, 5).forEach((day, index) => {
    let { dt_txt, main, weather, wind } = day;
    let date = new Date(dt_txt).toLocaleDateString();

    let forecastContainerEl = document.getElementById("forecast-container");
    let forecastDate = document.createElement("h4");
    let forecastIcon = document.createElement("img");
    let forecastTemp = document.createElement("p");
    let forecastHumidity = document.createElement("p");
    let forecastWind = document.createElement("p");

    forecastDate.textContent = `${date}`;
    forecastIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    forecastIcon.alt = `${weather[0].description}`;
    forecastTemp.textContent = `Temperature: ${Math.round(main.temp)} °F`;
    forecastWind.textContent = `Wind Speed: ${Math.round(wind.speed)} m/s`;
    forecastHumidity.textContent = `Humidity: ${main.humidity}%`;

    forecastContainerEl.classList.remove("visually-hidden");
    forecastBodyEl[index].innerHTML = "";
    forecastHeaderEl[index].innerHTML = "";
    forecastHeaderEl[index].append(forecastDate);
    forecastBodyEl[index].append(forecastIcon);
    forecastBodyEl[index].append(forecastTemp);
    forecastBodyEl[index].append(forecastHumidity);
    forecastBodyEl[index].append(forecastWind);
  });
}

// SECTION: ADD FUNCTION - SAVE CITIES TO SEARCH HISTORY / LOCAL STORAGE

// SECTION: ADD EVENT - CLICK SAVED CITY
