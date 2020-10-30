const planObject = {
  hour: 0,
  textContent: function () {
    if (localStorage.getItem(this.hour) != undefined) {
      return localStorage.getItem(this.hour);
    } else {
      return "";
    }
  },
  backgroundColor: function () {
    convertToMiliaryTime = (hour) => {
      if (hour < 9) {
        return hour + 12;
      } else {
        return hour;
      }
    };
    var militaryHour = convertToMiliaryTime(this.hour);
    console.log(militaryHour + " | " + moment().format("H"));

    if (moment().format("H") < militaryHour) {
      return "future";
    } else if (moment().format("H") > militaryHour) {
      return "past";
    } else {
      return "present";
    }
  },

  amOrPM: function () {
    if (this.hour <= 5) {
      return "PM";
    } else {
      return "AM";
    }
  },

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

var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
hours.forEach((hour) => {
  var localPlanObject = planObject;
  localPlanObject.hour = hour;
  localPlanObject.divConstructor();
  var saveButton = document.querySelector(`#Btn${hour}`);
  saveButton.addEventListener("click", (event) => {
    var userInputValue = document.querySelector(`#textarea${hour}`);
    event.preventDefault();
    console.log(event.target);
    console.log(userInputValue);
    localStorage.setItem(hour, userInputValue.value);
  });
});

console.log(moment().format("h"));
