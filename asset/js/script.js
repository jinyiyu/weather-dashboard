const searchHistoryCity = $("#searchHistoryCity");
const cityName = $("#cityName");
const searchInput = $("#search-input");
const searchBtn = $("#searchBtn");

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

//   add eventListener to the cities enabling to click
const clickRecentCity = (event) => {
  const handleRecentCityClick = $(event.target).attr("data-city");
  console.log(handleRecentCityClick);
};

const renderRecentCity = () => {
  const citySearch = readFromLocalStorage("citySearch", []);
  if (!citySearch.length) {
    // - if no search history, render massage : no previous search history.
    const noRecentSearch = `<div class="alert alert-warning p-4 text-center" id="noRecentSearch" role="alert">
    No Recent Searches...
  </div>`;
    searchHistoryCity.append(noRecentSearch);
  } else {
    $("#noRecentSearch").remove();
    // - if has search history in LS then render the city name one by one for the top 8 most resent search
    const listCityName = (city) => {
      const recentSearch = `<li
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        data-city="London"
      >
        ${city}
        <span class="badge rounded-pill">14</span>
      </li>`;
      cityName.append(recentSearch);
    };

    const recentSearchCities = citySearch.map(listCityName).join("");

    const clearBtn = `              <button type="submit" class="btn btn-primary btnColor">
    Clear All Recent Search
  </button>`;
    cityName.append(clearBtn);
  }
};

const handleSearchInput = (event) => {
  // get input val
  event.preventDefault();
  const getCitySearch = searchInput.val();
  console.log(getCitySearch);

  // check if exist in ls
  if (getCitySearch) {
    const citySearch = readFromLocalStorage("citySearch", []);
    citySearch.push(getCitySearch);
    writeToLocalStorage("citySearch", citySearch);
    cityName.children().remove();
    renderRecentCity();
  }
  // exist: 1) add up rouned pill 2) render wearther
  //        3)store it in ls 4)refresh the page
  // not exist: push to ls and refresh?
};

const onReady = () => {
  renderRecentCity();
  cityName.click(clickRecentCity);
  searchBtn.click(handleSearchInput);
};

$(document).ready(onReady);
