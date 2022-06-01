const searchHistoryCity = $("#searchHistoryCity");
const cityName = $("#cityName");

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

// testing search history
const readRecentSearch = ["London"];

const renderRecentCity = () => {
  //   const readRecentSearch = readFromLocalStorage("recentSearch", []);

  if (!readRecentSearch.length) {
    // - if no search history, render massage : no previous search history.
    const noRecentSearch = `<div class="alert alert-warning p-4 text-center" role="alert">
    No Recent Searches...
  </div>`;
    searchHistoryCity.append(noRecentSearch);
  } else {
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

    const recentSearchCities = readRecentSearch.map(listCityName).join("");

    const clearBtn = `              <button type="submit" class="btn btn-primary btnColor">
    Clear All Recent Search
  </button>`;
    cityName.append(clearBtn);
  }
};

const onReady = () => {
  renderRecentCity();
  cityName.click(clickRecentCity);
};

$(document).ready(onReady);
