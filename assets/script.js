"use strict";
// SECTION: DOM ELEMENTS

// let savedCity1 = $(".city1");
// let selectedCity = $(".selected-city");
// let selectedCityTemp = $("#selected-city-temp");
// let selectedCityWind = $("#selected-city-wind");
// let selectedCityHumid = $("selected-city-humid");
let searchForm = $("#search-form");
let searchHistory = $(".list-group");
let currentWeather = $("#current-weather");
let searchInput = $("#city");

const apiKey = "a7721d270b5b8958e55f066db552d8a1";
let city;
let queryURL = `http.api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

// api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
// fetch(queryURL);

// SECTION: ADD EVENT LISTENER - SUBMIT CITY/ZIP
searchForm.on("submit", (event) => {
  event.preventDefault();
  let city = event.target.city.value;
  fetchWeatherData(city);
});

// SECTION: ADD FUNCTION - FETCH WEATHER FUNCTION
function fetchWeatherData(query) {
  // NOTES: Check if postal code - https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
  let isPostal = /^\d+$/.test(query);
  let searchParam = isPostal ? `zip=${query}` : `q=${query}`;

  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?${searchParam}&appid=${apiKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// SECTION: ADD FUNCTION - DISPLAY CURRENT WEATHER

// SECTION: ADD FUNCTION - SAVE CITIES TO SEARCH HISTORY / LOCAL STORAGE

// SECTION: ADD EVENT - CLICK SAVED CITY
