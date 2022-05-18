let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () => {
    // Geolocation API is used to get geographical position of user and is available inside the navigator object
    if (navigator.geolocation) {
        // Retrun position (latitude & longitude) or error
        navigator.geolocation.getCurrentPosition(showLocation, checkError);
    } else {
        locationDiv.innerText = "The browser does not support geolocation.";
    }
});

// Error Checks
const checkError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationDiv.innerText = "Please allow access to location"
            break;
        case error.POSITION_UNAVAILABLE:
            locationDiv.innerText = "Location information unavailable";
            break;
        case error.TIMEOUT:
        locationDiv.innerText = "The request to get user location timed out";
    }
};

const showLocation = async (position) => {
    // Use the Nominatim API for getting addresss from latitude and longitude
    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);

    // Response object
    let data = await response.json();
    locationDiv.innerText = `${data.address.city}, ${data.address.country}`;
};