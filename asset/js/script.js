const searchHistoryCity = $("#searchHistoryCity");
const cityName = $("#cityName");
const searchInput = $("#search-input");
const searchBtn = $("#searchBtn");
const currentWeatherCard = $("#currentWeatherCard");
const clearAllBtn = $("#clearAllBtn");
const noRecentSearch = $("#noRecentSearch");
const alarmSection = $("#alarmSection");

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

const renderCurrentWeather = () => {
  const renderCurrentWeatherCard = `            <div class="text-center">
    <h2 class="card-title">London</h2>
    <p class="card-text">Tuesday,31st May, 2022 14:48:20</p>
    <img
      src="http://openweathermap.org/img/w/04d.png"
      alt="cloudy image"
    />
  </div>
  <div class="row justify-content-center g-0">
    <div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
      Temperature
    </div>
    <div class="col-sm-12 col-md-7 p-2 border">14.42°C</div>
  </div>
  <div class="row justify-content-center g-0">
    <div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
      Humidity
    </div>
    <div class="col-sm-12 col-md-7 p-2 border">73%</div>
  </div>
  <div class="row justify-content-center g-0">
    <div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
      Wind Speed
    </div>
    <div class="col-sm-12 col-md-7 p-2 border">5.14 MPH</div>
  </div>
  <div class="row justify-content-center g-0">
    <div class="col-sm-12 col-md-3 p-2 border titleColor fw-bold">
      UV Index
    </div>
    <div class="col-sm-12 col-md-7 p-2 border">
      <span class="UVColor px-2">4.31</span>
    </div>
  </div>`;
  currentWeatherCard.append(renderCurrentWeatherCard);
};
const renderForcastWeather = () => {};

const handleSearchInput = (event) => {
  // get input val
  event.preventDefault();
  const getCitySearch = searchInput.val();
  console.log(getCitySearch);

  // check if searched city exist in ls
  if (getCitySearch) {
    //  1) render current weather
    renderCurrentWeather();
    //  2)render forcast weather
    renderForcastWeather();
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
  //   cityName.click(clickRecentCity);
  searchBtn.click(handleSearchInput);
};

$(document).ready(onReady);
