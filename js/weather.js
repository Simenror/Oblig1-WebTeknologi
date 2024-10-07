const weatherContainer = document.getElementById("weather_container");

// Array of locations with Latitude and Longitude we want to display
const locations = [
    {Name: "Tokyo, Japan", Latitude: 35.6895, Longitude: 139.6917},
    {Name: "Berlin, Deutchland", Latitude: 52.5244, Longitude: 13.4105},
    {Name: "Oslo, Norway", Latitude: 59.9127, Longitude: 10.7461},
    {Name: "New York, USA", Latitude: 40.7143, Longitude: -74.006},
    {Name: "Barcelona, Spain", Latitude: 41.3888, Longitude: 2.159}
];

function fetchWeather(location) {
    // Fetches the weatherdata from the API with the array info
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.Latitude}&longitude=${location.Longitude}&current_weather=true`)
    .then(response => response.json()) // Translates to JSON
    .then(data => {
        const currentWeather = data.current_weather;
        display(location.Name, currentWeather); // Calls a function to display the data recieved
    })

}

// Function to display the weather data from a location
function display(name, weather) {
    // Creates a new element and adds a class for styling
    const weatherElement = document.createElement('div')
    weatherElement.classList.add('weather_element')

    // Adds the information into weatherElement
    weatherElement.innerHTML=`
    <h2>${name}</h2>
    <p>Temperature: ${weather.temperature} °C</p>
    <p>Windspeed: ${weather.windspeed} km/h</p>
    <p>Weathercode: ${weather.weathercode}</p>
    `;

    // Adds weatherElement to the container to put it on the page
    weatherContainer.appendChild(weatherElement);
}

// Fetches all the weather data and updates the page
function fetchAllData() {
    weatherContainer.innerHTML = ''; // Clears the page before new data is put in
    // Goes through each location and fetches the weather
    locations.forEach(location => fetchWeather(location)); 
}


fetchAllData(); // Fetches the initial data

setInterval(fetchAllData, 1000*60*5); // Fetches the data and updates it every 5 minutes

