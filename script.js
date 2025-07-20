// // script.js
const user = document.getElementById("user");
const userid = document.getElementById("userid");

async function getData(lat, long) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=${lat},${long}&aqi=yes`
  );
  return await res.json();
}

async function getLocation(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  // Display coords directly
  user.innerHTML = `Latitude: ${lat.toFixed(4)}<br>Longitude: ${long.toFixed(4)}`;
  
  // If you also want to fetch weather:
  // const result = await getData(lat, long);
  // user.innerHTML += `<br>Location: ${result.location.name}, ${result.location.region}`;
  // console.log(result);
}

function failedToGet(error) {
  console.error(error);
  user.textContent = "Failed to get location: " + error.message;
}

userid.addEventListener("click", () => {
  if (navigator.geolocation) {
    user.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(getLocation, failedToGet);
  } else {
    user.textContent = "Geolocation is not supported by your browser.";
  }
});
