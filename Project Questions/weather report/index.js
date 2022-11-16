const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weather = document.querySelector(".weather");
const notFound = document.querySelector(".not-found");

const img = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");

const APIKey = "185dbcc57e27f9315a49d3f1c762ebd7";

searchInput.addEventListener("input", (event) => {
  if (!event.target.value) {
    notFound.style.display = "none";
    weather.style.display = "none";
  }
});

search.addEventListener("click", () => {
  const city = searchInput.value;
  if (!city) return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.cod === "404") {
        weather.style.display = "none";
        weather.classList.remove("fadeIn");
        notFound.style.display = "block";
        notFound.classList.add("fadeIn");
        return;
      }

      switch (res.weather[0].main) {
        case "Clear":
          img.src = "./images/clear.png";
          break;
        case "Rain":
          img.src = "./images/rain.png";
          break;
        case "Snow":
          img.src = "./images/snow.png";
          break;
        case "Clouds":
          img.src = "./images/cloud.png";
          break;
        case "Haze":
          img.src = "./images/mist.png";
          break;
        default:
          break;
      }
      notFound.style.display = "none";
      weather.classList.remove("fadeIn");
      weather.style.display = "block";
      weather.classList.add("fadeIn");

      temperature.innerHTML = `${parseInt(res.main.temp)}<span>°C</span>`;
      description.innerHTML = `${res.weather[0].description}`;
      humidity.innerHTML = `${parseInt(res.main.humidity)}%`;
      wind.innerHTML = `${parseInt(res.wind.speed)}Km/h`;
    });
});
