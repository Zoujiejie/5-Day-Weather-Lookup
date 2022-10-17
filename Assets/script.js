var today = moment().format('L');
var apiKey = "d98ab3a08b67e404649014566902fda3";
var searchBtnEl = document.querySelector('#searchBtn');
console.log(searchBtnEl)

function SearchInputSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#searchInput').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    console.log(searchInputVal)
    searchWeather(searchInputVal);
}
searchBtnEl.addEventListener('click', SearchInputSubmit);


function searchWeather(cityName) {
    console.log(cityName)
    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(openWeatherAPI)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            makeOneDayForecast(data);
            makeSecondCall(data.coord.lat, data.coord.lon)
        });

};

function makeOneDayForecast(data) {
    console.log("Pringing results function")
    var OneDayForecast = document.getElementById("currentWeather")
    var resultCard = document.createElement("div");
    resultCard.innerHTML =
        `<ol class="five-day-list">
        <p>Date: ${today}</p>
        <p>Temp: ${data.main.temp}</p>
        <p>Wind speed: ${data.wind.speed}</p>
        <p>Humidity: ${data.main.humidity}</p>
        </ol>
        `
    OneDayForecast.append(resultCard)
}

function makeSecondCall(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var fiveDayArray = [data.list[2], data.list[10], data.list[18], data.list[26], data.list[34]]
            console.log(fiveDayArray)
            makeFiveDayCards(fiveDayArray)

        });
}

function makeFiveDayCards(days) {
    var fiveDaySlot = document.getElementById("fiveDay")
    days.forEach(function (day) {
        console.log(day)
        var resultCard = document.createElement("div");
        resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
        resultCard.innerHTML =
            `<ol class="five-day-list">
        <p>Date: ${day.dt_txt}</p>
        <p>Temp: ${day.main.temp}</p>
        <p>Wind speed: ${day.wind.speed}</p>
        <p>Humidity: ${day.main.humidity}</p>
        </ol>
        `
        fiveDaySlot.append(resultCard)
    })
}

var searchHistoryList = [];
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    var city = $("#searchInput").val().trim();
    // searchWeather(city);
    if (!searchHistoryList.includes(city)) {
        searchHistoryList.push(city);
        var searchedCity = $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#searchHistory").append(searchedCity);
    };

    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
});

$(document).on("click", ".list-group-item", function () {
    var listCity = $(this).text();
    searchWeather(listCity);
});