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

const apiKey = "a7721d270b5b8958e55f066db552d8a1";
let city;
let queryURL =
  "http.api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  apiKey;

// api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
// fetch(queryURL);

// SECTION: ADD EVENT LISTENER - SUBMIT CITY/ZIP
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

// SECTION: ADD FUNCTION - FETCH WEATHER FUNCTION

// SECTION: ADD FUNCTION - DISPLAY CURRENT WEATHER

// SECTION: ADD FUNCTION - SAVE CITIES TO SEARCH HISTORY / LOCAL STORAGE

// SECTION: ADD EVENT - CLICK SAVED CITY
