var hourScreenContainer = document.querySelector("#currentDay");
var currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
hourScreenContainer.textContent = currentTime;
