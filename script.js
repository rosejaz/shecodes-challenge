function blueberry(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let chosenPlace = document.querySelector("#current-city");
  chosenPlace.innerHTML = inputCity.value;
}

let targetCity = document.querySelector("#search-form");
targetCity.addEventListener("submit", blueberry);

let myDestination = document.querySelector("#currently");

let currentTime = new Date();
console.log(currentTime);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

console.log(currentTime.getDay());

let currentDay = days[currentTime.getDay()];

let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

console.log(formattedDate);

myDestination.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function finalDetails(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function whichCity(city) {
  let apiKey = "42c1dd34e632f1dd4075f23f7b184abb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(finalDetails);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  whichCity(city);
}

function searchLocation(position) {
  let apiKey = "42c1dd34e632f1dd4075f23f7b184abb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(finalDetails);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
whichCity("London");
