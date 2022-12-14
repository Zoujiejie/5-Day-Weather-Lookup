# 5-Day-Weather-Lookup

## User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Psuedocode
* Fetch OpenWeather API for information including temperature, humidty and wind speed of the curent date and the future 5-day forecast of a searched city
* Using LocalStorge to store the search input data and to persist data when the page is refreshed
* An icon representation of weather conditions
* Make search history responsive

## Websites
* [GitHub repo](https://github.com/Zoujiejie/5-Day-Weather-Lookup)
* [GitHub Deployed Page](https://zoujiejie.github.io/5-Day-Weather-Lookup/)

## Credits
[OpenWeather API](https://openweathermap.org/api) is an API used to retrieve current weather data and weather forecast for different locations 