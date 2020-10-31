//This is just used to set the current date and time in the header
var hourScreenContainer = document.querySelector("#currentDay");
var currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
hourScreenContainer.textContent = currentTime;
