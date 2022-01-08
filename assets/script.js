var container = $(".container");

function displayTime() {
  //Display today's date on top of the page
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

setInterval(displayTime, 1000);

//save text entered by user in locale storage on click
container.on("click", ".save-button", function (event) {
  console.dir(event.target.parentElement);

  //look for the text in input for the corresponding clicked save button
  var enteredTxt = event.target.parentElement.children[1].value.trim();

  //return if user enters an empty string
  if (enteredTxt === "") {
    return false;
  }

  //get the time for the corresponding input
  var currentTime = event.target.parentElement.children[0].outerText;

  //save item in local storage
  localStorage.setItem(currentTime, enteredTxt);
});

//read items from storage
function getEvents() {
  var formattedTime = []; //array to store all times
  //format 9:00 am start time
  var startTime = moment().set("hour", 9).set("minute", 0).set("second", 0); //moment object

  for (i = 0; i <= 10; i++) {
    var formatted = startTime.format("hh:mm A"); //format time to show the hour

    //create html elements
    var rootEl = $("#root");
    var parentDiv = $("<div>")
      .addClass("input-group")
      .addClass("input-group-lg");
    var childDiv = $("<div>")
      .addClass("input-group-prepend")
      .addClass("custom");
    var timeTxt = $("<span>")
      .addClass("input-group-text")
      .addClass("custom-width")
      .addClass("current-time")
      .addClass("custom")
      .attr("id", "inputGroup-sizing-lg");

    childDiv.append(timeTxt);
    timeTxt.text(formatted);

    var inputTxt = $("<input>")
      .attr("type", "text")
      .addClass("form-control")
      .attr("aria-label", "Large")
      .attr("aria-describedby", "inputGroup-sizing-sm")
      .attr("id", "input-" + i);

    parentDiv.append(childDiv);
    parentDiv.append(inputTxt);

    var currentEvent = localStorage.getItem(formatted) || "";
    inputTxt.val(currentEvent);

    var saveBtn = $("<button>")
      .addClass("btn")
      .addClass("btn-light")
      .addClass("save-button");

    rootEl.append(parentDiv);
    parentDiv.append(saveBtn);

    //change input bg color based on comparing time with current time
    if (moment(startTime).hour() === moment().hour()) {
      $("#input-" + i).css("background-color", "red");
    } else if (moment(startTime).isBefore(moment())) {
      $("#input-" + i).css("background-color", "grey");
    } else if (moment(startTime).isAfter(moment())) {
      $("#input-" + i).css("background-color", "green");
    }
    startTime.add(1, "hour");
  }
}

getEvents();
