let popUp = document.getElementById("cookiePopup");

// When user clicks the accept button
document.getElementById("acceptCookie").addEventListener("click", () => {
    // Create date object
    let d = new Date();

    // Increment the current time by 1 minute (cookie will expire after 1 minute)
    d.setMinutes(2 + d.getMinutes());

    // Create cookie withname = myCookieName, value = thisIsMyCookie and expiry time = 1 minute
    document.cookie = "myCookieName=thisIsMyCookie; expires = " + d + ";";

    //Hide popup
    popUp.classList.add("hide");
    popUp.classList.remove("show");
});

// Check if cookie is already present
const checkCookie = () => {
    // Read the cookie and split on "="
    let input = document.cookie.split("=");

    // Check for our cookie
    if(input[0] == "myCookieName") {
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    } else {
        popUp.classList.add("show");
        popUp.classList.remove("hide");
    }
};

// Check if cookie exists when page loads
window.onload = () => {
    setTimeout(() => {
        checkCookie();
    }, 2000) 
};