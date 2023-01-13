let date = new Date();
console.log(date);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
console.log(day);

let hours = date.getHours();
let minutes = date.getMinutes();
let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");
currentDay.innerHTML = day;
currentTime.innerHTML = `${hours}:${minutes}`;

function getCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text");
  let inputValue = input.value;
  console.log(inputValue);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCity);
  axios.get(apiUrl).then(displayCelsius);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);

function displayCelsius(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = "6";
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  h2.innerHTML = temperature;
}

function changeCelsiusTheme() {
  let removeCelsius = document.querySelector("#celsius");
  removeCelsius.classList.remove("temp-celsius");
  let removeFahrenheit = document.querySelector("#fahrenheit");
  removeFahrenheit.classList.add("temp-Fahrenheit");
}
let celsius = document.querySelector(".temp-celsius");
celsius.addEventListener("click", displayCelsius);
celsius.addEventListener("click", changeCelsiusTheme);

function changeCity(response) {
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${response.data.name}`;
}

function getPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCity);
  axios.get(apiUrl).then(displayCelsius);
}

let getLocationButton = document.querySelector("#location-button");

getLocationButton.addEventListener("click", function showLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
});
