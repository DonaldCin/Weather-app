//Weather API
const apiKey = "926652e0eae96f41590790cc13bb02c4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Current time API
const timeApiUrl = "https://timeapi.io/api/time/current/coordinate?";  // + latitude=35.6895&longitude=139.6917

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon")

//Check weather
async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    console.log(searchbox.value);

    document.querySelector(".weather").style.display = "block";

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "m/s";

    if(data.weather[0].main == "Clouds"){
        weathericon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weathericon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weathericon.src = "images/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weathericon.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weathericon.src = "images/mist.png"
    }
    else if(data.weather[0].main == "Snow"){
        weathericon.src = "images/snow.png"
    }

//change background
if(data.weather[0].main == "Clouds"){
    document.querySelector(".card").classList.add("cloudy");
}
else{
    document.querySelector(".card").classList.remove("cloudy");
}
if(data.weather[0].main == "Rain"){
    document.querySelector(".card").classList.add("rainy");
}
else{
    document.querySelector(".card").classList.remove("rainy");
}

//coordinates
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    checkTime(lat, lon);
}

//Check time
async function checkTime (lat, lon){
    const currentTime = await fetch(timeApiUrl + "latitude=" + lat + "&longitude=" + lon);
    var dataTime = await currentTime.json();
    console.log(dataTime);

    document.querySelector(".day").innerHTML = dataTime.dayOfWeek;
    document.querySelector(".hour").innerHTML = dataTime.time;

    if(dataTime.hour >= 20 || dataTime.hour < 6){
        console.log("night");
        document.querySelector(".card").classList.add("night");
    }
    else{
        document.querySelector(".card").classList.remove("night");
    }
}


searchbtn.addEventListener("click", ()=>{
    checkweather(searchbox.value);
})

searchbox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {  
        checkweather(searchbox.value);
    }
}); //Search by pressing enter
