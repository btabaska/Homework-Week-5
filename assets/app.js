//primary object that stores the functions and data needed to build each hour row
const planObject = {
  //var to store the current hour
  hour: 0,
  //getter to grab the current text for each row
  textContent: function () {
    if (localStorage.getItem(this.hour) != undefined) {
      return localStorage.getItem(this.hour);
    } else {
      return "";
    }
  },
  //determines the difference between the current time and the row time to set the correct CSS
  backgroundColor: function () {
    //converts time to military time to make the comparison easier
    convertToMiliaryTime = (hour) => {
      if (hour < 9) {
        return hour + 12;
      } else {
        return hour;
      }
    };
    var militaryHour = convertToMiliaryTime(this.hour);
    console.log(militaryHour + " | " + moment().format("H"));
    //returns a string which is then interperated into CSS
    if (moment().format("H") < militaryHour) {
      return "future";
    } else if (moment().format("H") > militaryHour) {
      return "past";
    } else {
      return "present";
    }
  },
  //brute force way of determining if AM or PM should be displayed next to the hour row
  amOrPM: function () {
    if (this.hour <= 5) {
      return "PM";
    } else {
      return "AM";
    }
  },
  //method used to create all the HTML and tags for each of the rows
  divConstructor: function () {
    var hourScreenContainer = document.querySelector(".container");
    var hourScreenDiv = document.createElement("form");
    hourScreenDiv.setAttribute("class", "row");
    var timeBlockDiv = document.createElement("div");
    timeBlockDiv.setAttribute("class", "hour col-sm-1");
    timeBlockDiv.textContent = this.hour + this.amOrPM();
    hourScreenDiv.appendChild(timeBlockDiv);
    var hoursScreenTextArea = document.createElement("textarea");
    hoursScreenTextArea.setAttribute(
      "class",
      `textarea col-sm-10 ${this.backgroundColor()}`
    );
    hoursScreenTextArea.setAttribute("id", `textarea${this.hour}`);
    hoursScreenTextArea.setAttribute("type", "text");
    hoursScreenTextArea.textContent = this.textContent();
    hourScreenDiv.appendChild(hoursScreenTextArea);
    var hourScreenSaveBtn = document.createElement("button");
    hourScreenSaveBtn.setAttribute("type", "submit");
    hourScreenSaveBtn.setAttribute("class", "saveBtn col-sm-1");
    hourScreenSaveBtn.setAttribute("id", `Btn${this.hour}`);
    hourScreenSaveBtn.textContent = "save";
    hourScreenDiv.appendChild(hourScreenSaveBtn);
    hourScreenContainer.appendChild(hourScreenDiv);
  },
};

//array of the hours that are needed for each row
var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
//for loop goes through and runs a constructor for each of the hours in the array
hours.forEach((hour) => {
  //copies the planObject so that it does not mutate the template object
  var localPlanObject = planObject;
  //sets the copied object hour equal to the object in the array hour
  localPlanObject.hour = hour;
  localPlanObject.divConstructor();
  //creates an event listener for each object on the save button
  var saveButton = document.querySelector(`#Btn${hour}`);
  saveButton.addEventListener("click", (event) => {
    var userInputValue = document.querySelector(`#textarea${hour}`);
    event.preventDefault();
    localStorage.setItem(hour, userInputValue.value);
  });
});
