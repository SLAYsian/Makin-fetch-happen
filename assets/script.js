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
let wind = document.createElement("p");
let errorMsg = document.createElement("h3");

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
          console.log(data);
        });
      } else {
        errorMsg.textContent = `Error: ${response.status} ${response.statusText}`;
        currentWeather.append(errorMsg);
      }
    })
    .catch(function (error) {
      currentWeather.append(errorMsg);
    });
}

// SECTION: ADD FUNCTION - DISPLAY CURRENT WEATHER
function displayCurrentWeather(data) {
  let city = data.city;
  let timeList = data.list;
  let current = timeList[0];
  let dateTxt = current.dt_txt;
  let currentMain = current.main;
  let weather = current.weather;
  let currentWind = current.wind;
  // let today = today.format("dddd MMMM D, YYYY");
  let currentDate = dayjs(dateTxt).format("ddd MMM D, YYYY");
  cityName.textContent = `${city.name} (${currentDate})`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherIcon.alt = `${weather[0].description}`;
  temperature.textContent = `Temperature: ${Math.round(currentMain.temp)}˚F`;
  humidity.textContent = `Humidity: ${currentMain.humidity}%`;
  wind.textContent = `Wind Speed: ${Math.round(currentWind.speed)} m/s`;

  currentWeather.append(cityName);
  currentWeather.append(weatherIcon);
  currentWeather.append(temperature);
  currentWeather.append(humidity);
  currentWeather.append(wind);
}

// SECTION: DISPLAY 5-DAY WEATHER FORECAST

// SECTION: ADD FUNCTION - SAVE CITIES TO SEARCH HISTORY / LOCAL STORAGE

// SECTION: ADD EVENT - CLICK SAVED CITY
