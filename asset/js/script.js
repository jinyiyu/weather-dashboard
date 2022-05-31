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

// writeToLocalStorage("recentSearch", "London");

//   add eventListener to the cities enabling to click
const clickRecentCity = (event) => {
  const handleRecentCityClick = $(event.target).attr("data-city");
  console.log(handleRecentCityClick);
};

const renderRecentCity = () => {
  const readRecentSearch = readFromLocalStorage("recentSearch", []);
  console.log(readRecentSearch);
  if (!readRecentSearch.length) {
    // - if no search history, render massage : no previous search history.
    const noRecentSearch = `<div class="alert alert-warning p-4 text-center" role="alert">
    No Recent Searches...
  </div>`;
    searchHistoryCity.append(noRecentSearch);
  } else {
    // - if has search history in LS then render the city name one by one for the top 8 most resent search
    const recentSearch = `            <ul class="list-group">
      <li
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        London
        <span class="badge rounded-pill">14</span>
      </li>
      <li
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        Birmingham
        <span class="badge rounded-pill">2</span>
      </li>
      <li
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        Seoul
        <span class="badge rounded-pill">1</span>
      </li>
      <button type="submit" class="btn btn-primary btnColor">
        Clear All Recent Search
      </button>
    </ul>`;
    searchHistoryCity.append(recentSearch);
  }
};

const onReady = () => {
  renderRecentCity();
  cityName.click(clickRecentCity);
};

$(document).ready(onReady);
