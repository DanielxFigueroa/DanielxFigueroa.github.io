// Initial References
let submitButton = document.getElementById("submit-button");
let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text = "";

// Generate Text
const textGenerator = () => {
    let generatedText = "";
    // String.fromCharCode gives ASCII value from a given number
    // 9 characters will be initialized, hence loop of 3
    for (let i = 0; i < 3; i++) {
        // 65 - 90 will generate capital letters
         generatedText += String.fromCharCode(randomNumber(65, 90));

         // 97 - 122 will generate small letters
         generatedText += String.fromCharCode(randomNumber(97, 122));

         // 48 - 57 will generate numbers from 0 - 9
         generatedText += String.fromCharCode(randomNumber(48, 57));
    }

    return generatedText;
}

// Generate random numbers between a given range
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1 ) + min);

// Generating string on canvas
function drawStringOnCanvas(string) {
    /* The getContext() function returns the drawing context that has all the drawing 
    properties and functions to draw on canvas */ 
    let ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Array of text colors
    const textColors = ["rgb(0, 0, 0)", "rgb(130, 130, 130)"];

    // Space between letters
    const letterSpace = 150 / string.length;

    // Loop through string
    for (let i = 0; i < string.length; i++) {
        const xInitialSpace = 25;

        ctx.font = "20px Roboto Mono";

        ctx.fillStyle = textColors[randomNumber(0, 1)];
        ctx.fillText(string[i], xInitialSpace + i * letterSpace, randomNumber(25, 40), 100);


    }
}

// Initial function
const triggerFunction = () => {
    // Clear input
    userInput.value = "";
    text = textGenerator();

    // Randomize text so position of numbers and letters are random
    text = [...text].sort(()=> Math.random() - 0.5).join("");

    drawStringOnCanvas(text);
};

// Call triggerFunction for reload button
reloadButton.addEventListener("click", triggerFunction);

// Call triggerFunction when page loads
window.onload = () => triggerFunction();

// Submit events based on input
submitButton.addEventListener("click", () => {
    // Check if user input = generated text
    if (userInput.value === text) {
        alert("Success");
    }
    else {
        alert("Incorrect");
        triggerFunction();
    }
});