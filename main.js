const cityDiv = document.getElementById('cityDiv');
const humidity = document.getElementById('humidity');
const mainInfomation = document.getElementById('mainInformation');
const description = document.getElementById('imgDescription');
const activeTemp = document.getElementById('tempSelect');
const feelslike = document.getElementsByClassName('card__mainInfoCard-feelslike')[0];
const sunriseInfo = document.getElementsByClassName('card__weatherInfo-sunriseInfo')[0];
const sunsetInfo = document.getElementsByClassName('card__weatherInfo-sunsetInfo')[0];

async function apiLoad() {
    const resp = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Gomel&appid=802a121e8d5faa4aecf1cde8bb779008");
    return await resp.json();
}

activeTemp.addEventListener('change', () => {
    apiLoad().then(data => convertTemp(data));
});

function showInformation(item) {=
    cityDiv.innerText = "Current city is " + item.name + ', ' + JSON.stringify(item.sys.country).replace(/\"/g, "");
    humidity.innerText = "Humidity: " + item.main.humidity + "%";
    mainInfomation.innerText = convertTocilcius(item.main.temp) + "°C";
    description.innerText = JSON.stringify(item.weather[0].description).replace(/\"/g, ""); //Remove quotes
    feelslike.innerText = "Feels like " + convertTocilcius(item.main.feels_like) + "°C";
    sunriseInfo.innerText = "Sunrise: " + convertUnixToJS(item.sys.sunrise);
    sunsetInfo.innerText = "Sunset: " + convertUnixToJS(item.sys.sunset);

    console.log(item);
}

function convertTemp(item) {
    if(activeTemp.value == 'cilcius') {
        mainInfomation.innerText = convertTocilcius(item.main.temp) + "°C";
        feelslike.innerText = "Feels like " + convertTocilcius(item.main.feels_like) + "°C";
    }
    if(activeTemp.value == 'fahrenheit') {
        mainInfomation.innerText = convertToFahrenheit(item.main.temp) + "°F";
        feelslike.innerText = "Feels like " + convertToFahrenheit(item.main.feels_like) + "°F";
    }
}

function convertUnixToJS(unixTime) {
    let date = new Date(unixTime * 1000);

    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();

    return formattedTime = hours + ':' + minutes.substr(-2);
}

const showImageDiv = document.getElementsByClassName('card__weatherInfo-showImage')[0];

function drawWeatherImage(item) {
    const photo = 'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png';
    const weatherImage = `<img class="weatherImage" src="${photo}" alt="./images/stub.png">`
    showImageDiv.innerHTML = weatherImage;
}

function drawWeatherImage1(showImageDiv) {
    showImageDiv.innerHTML = '';
    showImageDiv(element => drawWeatherImage(element));
}

function convertTocilcius(data) {
    return Number(((data) - 273).toFixed(1));
}

function convertToFahrenheit(data) {
    return Number(((data - 273.15) * 9 / 5 + 32).toFixed(1));
}

apiLoad().then(data => showInformation(data));
apiLoad().then(data => drawWeatherImage(data));