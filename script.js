// script.js

const weatherForm = document.getElementsByClassName("weatherForm")[0];
const cityInput = document.getElementsByClassName("cityInput")[0];
const card = document.getElementsByClassName("card")[0];
const cityDisplay = document.querySelector(".cityDisplay");
const tempDisplay = document.querySelector(".tempDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const descDisplay = document.querySelector(".descDisplay");
const weatherEmoji = document.querySelector(".weatherEmoji");
const errorDisplay = document.querySelector(".errorDisplay");
const apiKey = "a9a0c92efb46586c3906b0f609c00148";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city === "") {
        displayError("Please enter a city name.");
        return;
    }

    try {
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
    } catch (error) {
        displayError(error.message);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found. Please try again.");
    }
    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    errorDisplay.classList.remove("visible");
    cityDisplay.textContent = data.name + ", " + data.sys.country;
    tempDisplay.textContent = `Temperature: ${data.main.temp}°C`;
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    descDisplay.textContent = data.weather[0].description;
    weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);
    card.style.display = "block";
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️";
    } else if (weatherId >= 300 && weatherId < 500) {
        return "🌧️"; 
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌦️"; 
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; 
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; 
    } else if (weatherId === 800) {
        return "☀️";
    } else if (weatherId > 800) {
        return "☁️";
    } else {
        return "❓";
    }
}

function displayError(message) {
    errorDisplay.textContent = message;
    errorDisplay.classList.add("visible");
    card.style.display = "none";
}
