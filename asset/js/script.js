const searchHistoryCity = $("#searchHistoryCity");
const cityName = $("#cityName");
const searchInput = $("#search-input");
const searchBtn = $("#searchBtn");
const currentWeatherCard = $("#currentWeatherCard");
const clearAllBtn = $("#clearAllBtn");
const noRecentSearch = $("#noRecentSearch");
const alarmSection = $("#alarmSection");
const forcastSection = $("#forcastSection");

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = JSON.parse(localStorage.getItem(key));
  if (dataFromLS) {
    return dataFromLS;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);
  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//add eventListener to the cities enabling to click
const clickRecentCity = (event) => {
  const handleRecentCityClick = $(event.target).attr("data-city");
  console.log(handleRecentCityClick);
};

const createClearAllBtn = () => {
  alarmSection.empty();
  const clearBtn = `<button type="submit" class="btn btn-primary btnColor">
      Clear All Recent Search
    </button>`;
  clearAllBtn.append(clearBtn);
};

const handleClearAllBtn = (event) => {
  event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    localStorage.clear();
    cityName.empty();
    clearAllBtn.empty();
    renderRecentCity();
  }
};

const renderRecentCity = () => {
  cityName.empty();
  alarmSection.empty();
  clearAllBtn.empty();
  const citySearch = readFromLocalStorage("citySearch", []);
  if (!citySearch.length) {
    // - if no search history, render massage : no previous search history.
    const noRecentSearch = `<div class="alert alert-warning p-4 text-center mb-0" id="noRecentSearch" role="alert">
    No Recent Searches...
  </div>`;
    alarmSection.append(noRecentSearch);
  } else {
    alarmSection.empty();
    // cityName.removeChild();
    // - if has search history in LS then render the city name one by one for the top 8 most resent search
    const listCityName = (city) => {
      const recentSearch = `<li
        id="test" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        data-city="${city}"
      >
        ${city}
        <span class="badge rounded-pill">14</span>
      </li>`;
      cityName.append(recentSearch);
    };

    citySearch.map(listCityName).join("");
    createClearAllBtn();
    clearAllBtn.click(handleClearAllBtn);
  }
};

const renderCurrentWeather = (city, data) => {
  const renderCurrentWeatherCard = `<div class="text-center">
<h2 class="card-title">${city}</h2>
<p class="card-text">${moment.unix(data.dt).format("ddd, Do MMM, YYYY")}</p>
<img
  src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"
  alt="cloudy image"
/>
</div>
<div class="row justify-content-center g-0">
<div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
  Temperature
</div>
<div class="col-sm-12 col-md-7 p-2 border">${data.temp}°C</div>
</div>
<div class="row justify-content-center g-0">
<div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
  Humidity
</div>
<div class="col-sm-12 col-md-7 p-2 border">${data.humidity}%</div>
</div>
<div class="row justify-content-center g-0">
<div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
  Wind Speed
</div>
<div class="col-sm-12 col-md-7 p-2 border">${data.wind_speed} MPH</div>
</div>
<div class="row justify-content-center g-0">
<div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
  UV Index
</div>
<div class="col-sm-12 col-md-7 p-2 border">
  <span class="UVColor px-2">${data.uvi}</span>
</div>
</div>`;
  currentWeatherCard.append(renderCurrentWeatherCard);
};

const renderForcastWeather = (data) => {
  const renderForcastWeatherCard = (each) => {
    return `<div class="card m-2 shadow-sm border-0 weatherCards">
    <div class="weatherIcon">
      <img
        src="http://openweathermap.org/img/w/${each.weather[0].icon}.png"
        class="card-img-top border"
        alt="cloudy image"
      />
    </div>
    <div class="card-body text-center">
      <p class="card-text">${moment
        .unix(each.dt)
        .format("ddd, Do MMM, YYYY")}</p>
    </div>
    <div class="row justify-content-center g-0">
      <div class="col-sm-12 col-md-5 p-2 border titleColor fw-bold">
        Temperature
      </div>
      <div class="col-sm-12 col-md-7 p-2 border">${each.temp.day}°C</div>
    </div>
    <div class="row justify-content-center g-0">
      <div class="col-sm-12 col-md-5 p-2 border titleColor fw-bold">
        Humidity
      </div>
      <div class="col-sm-12 col-md-7 p-2 border">${each.humidity}%</div>
    </div>
    <div class="row justify-content-center g-0">
      <div class="col-sm-12 col-md-5 p-2 border titleColor fw-bold">
        Wind Speed
      </div>
      <div class="col-sm-12 col-md-7 p-2 border">${each.wind_speed} MPH</div>
    </div>
    <div class="row justify-content-center g-0">
      <div class="col-sm-12 col-md-5 p-2 border titleColor fw-bold">
        UV Index
      </div>
      <div class="col-sm-12 col-md-7 p-2 border">
        <span class="UVColor px-2">${each.uvi}</span>
      </div>
    </div>

    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>`;
  };
  const forcastcard = data.slice(1, 7).map(renderForcastWeatherCard).join("");

  const ForcastWeatherCard = `<hr class="m-0" />
    <h2 class="card-title text-center p-3 m-0 bgColor">
      6-Day Forecast
    </h2>
    <div class="d-flex justify-content-center flex-wrap bgColor">
      ${forcastcard}
      </div>
    </div>`;
  forcastSection.append(ForcastWeatherCard);
};

const renderWeather = async (getCitySearch) => {
  const url = constructUrl("https://api.openweathermap.org/data/2.5/weather", {
    q: getCitySearch,
    appid: "6f6cd94be7c9266b5280d639b56fa121",
  });
  const Data = await fetchData(url);
  let lat = Data?.coord?.lat;
  let lon = Data?.coord?.lon;
  let cityName = Data.name;

  const newUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly",
      units: "metric",
      appid: "6f6cd94be7c9266b5280d639b56fa121",
    }
  );
  const newData = await fetchData(newUrl);
  console.log(newData);

  //   render current and forcast weather card by applying the data from weather API
  renderCurrentWeather(cityName, newData.current);
  renderForcastWeather(newData.daily);
};

const handleSearchInput = (event) => {
  // get input val
  event.preventDefault();
  const getCitySearch = searchInput.val();
  console.log(getCitySearch);

  if (getCitySearch) {
    renderWeather(getCitySearch);
    //  3)store it in ls
    const citySearch = readFromLocalStorage("citySearch", []);
    citySearch.push(getCitySearch);
    writeToLocalStorage("citySearch", citySearch);
    cityName.children().remove();

    // 4) add up rouned pill
    // 5) refresh the whole page
  }
  renderRecentCity();
  // not exist: render a message or check if its validate?
};

const onReady = () => {
  renderRecentCity();
  //   cityName.click(clickRecentCity);回头需要完善的
  searchBtn.click(handleSearchInput);
};

$(document).ready(onReady);
