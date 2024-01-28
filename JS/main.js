let cityInput = document.getElementById("city");
let country = document.getElementById("country");
let region = document.getElementById("region");
let nameOfTheCity = document.getElementById("nameOfTheCity");
let dateOfToday = document.getElementById("dateOfToday");
let lastUpdate = document.getElementById("lastUpdate");
let windSpeed = document.getElementById("windSpeed");
let humidity = document.getElementById("humidity");
let cloud = document.getElementById("cloud");
let conditionText = document.getElementById("conditionText");
let conditionIcon = document.getElementById("conditionIcon");
let currentDegree = document.getElementById("currentDegree");
let currMinDay = document.getElementById("currMinDay");
let currMaxDay = document.getElementById("currMaxDay");
let dayForcastOne = document.getElementById("dayForcastOne");
let conditionTextTwo = document.getElementById("conditionTextTwo");
let conditionIconTwo = document.getElementById("conditionIconTwo");
let minTomorrow = document.getElementById("minTomorrow");
let maxTomorrow = document.getElementById("maxTomorrow");
let conditionTextThree = document.getElementById("conditionTextThree");
let conditionIconThree = document.getElementById("conditionIconThree");
let dayForcastTwo = document.getElementById("dayForcastTwo");
let maxThree = document.getElementById("maxThree");
let minThree = document.getElementById("minThree");

let allItems = {};

cityInput.addEventListener('change', handleCityInputChange);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const http = 'https:';

async function handleCityInputChange() {
    const apiLink = `https://api.weatherapi.com/v1/forecast.json?key=3394f9b01f0a418da2f191903233112&q=${cityInput.value}&days=3&aqi=no&alerts=no`;

    try {
        const response = await fetch(apiLink);

        if (response.ok) {
            allItems = await response.json();
            displayData();
        } else {
            throw new Error('There is a problem in the network.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData() {
    const date = new Date(allItems.location.localtime);
    const dayOfWeek = date.getDay();
    const dayName = days[dayOfWeek];

    const dateOfTodayNumber = allItems.location.localtime.split(" ", 1);
    const lastUpdateNumber = allItems.current.last_updated;
    const windSpeedNumber = allItems.current.wind_kph + ` k/h`;
    const humidityNumber = allItems.current.humidity + `%`;
    const cloudNumber = allItems.current.cloud + `%`;
    const conditionTextCase = allItems.current.condition.text;
    const conditionIconImgCase = allItems.current.condition.icon;
    const currentDegreeNumber = allItems.current.temp_c;
    const currMinDayDeg = allItems.forecast.forecastday[0].day.mintemp_c;
    const currMaxDayDeg = allItems.forecast.forecastday[0].day.maxtemp_c;

    const dateTwo = new Date(allItems.forecast.forecastday[1].date);
    const dateThree = new Date(allItems.forecast.forecastday[2].date);
    const dayOfWeekTwo = dateTwo.getDay();
    const dayOfWeekThree = dateThree.getDay();
    const dateNameTwo = days[dayOfWeekTwo];
    const dateNameThree = days[dayOfWeekThree];
    const conditionTextTomorrow = allItems.forecast.forecastday[1].day.condition.text;
    const conditionIconTomorrow = allItems.forecast.forecastday[1].day.condition.icon;
    const maxTomorrowDeg = allItems.forecast.forecastday[1].day.maxtemp_c;
    const minTomorrowDeg = allItems.forecast.forecastday[1].day.mintemp_c;
    const conditionTextThreeCase = allItems.forecast.forecastday[2].day.condition.text;
    const conditionIconThreeIcon = allItems.forecast.forecastday[2].day.condition.icon;
    const maxThreeDeg = allItems.forecast.forecastday[2].day.maxtemp_c;
    const minThreeDeg = allItems.forecast.forecastday[2].day.mintemp_c;

    updateElement(country, allItems.location.country);
    updateElement(nameOfTheCity, allItems.location.name);
    updateElement(region, allItems.location.region);
    updateElement(dateOfToday, `${dateOfTodayNumber} ${dayName}`);
    updateElement(lastUpdate, lastUpdateNumber);
    updateElement(windSpeed, windSpeedNumber);
    updateElement(humidity, humidityNumber);
    updateElement(cloud, cloudNumber);
    updateElement(conditionText, conditionTextCase);
    updateElement(conditionIcon, http.concat(conditionIconImgCase));
    updateElement(currentDegree, currentDegreeNumber);
    updateElement(currMinDay, currMinDayDeg);
    updateElement(currMaxDay, currMaxDayDeg);
    updateElement(dayForcastOne, dateNameTwo);
    updateElement(conditionTextTwo, conditionTextTomorrow);
    updateElement(conditionIconTwo, http.concat(conditionIconTomorrow));
    updateElement(maxTomorrow, maxTomorrowDeg);
    updateElement(minTomorrow, minTomorrowDeg);
    updateElement(conditionTextThree, conditionTextThreeCase);
    updateElement(conditionIconThree, http.concat(conditionIconThreeIcon));
    updateElement(dayForcastTwo, dateNameThree);
    updateElement(maxThree, maxThreeDeg);
    updateElement(minThree, minThreeDeg);
}

function updateElement(element, value) {
    element.innerHTML = value;
}
