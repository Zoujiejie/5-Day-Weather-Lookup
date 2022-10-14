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

function makeSecondCall(lat,lon){
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

 fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var fiveDayArray =[data.list[6],data.list[14],data.list[22],data.list[30],data.list[38]]
            console.log(fiveDayArray)
            makeFiveDayCards(fiveDayArray)

        });
}

function makeFiveDayCards(days) {
    var fiveDaySlot = document.getElementById("fiveDay")
    days.forEach(function(day){
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

function makeOneDayForecast(data){
    console.log("Pringing results function")
}