var container = $(".container");

function displayTime() {
  //Display today's date on top of the page
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

setInterval(displayTime, 1000);

container.on("click", ".save-button", function (event) {
  console.dir(event.target.parentElement);

  //look for the text in input for the corresponding clicked save button
  var enteredTxt = event.target.parentElement.children[1].value;

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
    var formatted = startTime.format("hh:mm A");
    formattedTime[i] = formatted;

    startTime.add(1, "hour");
  }

  startTime = moment().set("hour", 9).set("minute", 0).set("second", 0); //moment object
  for (var i = 0; i < formattedTime.length; i++) {
    var rootEl = $("#root");

    var parentDiv = $("<div>")
      .addClass("input-group")
      .addClass("input-group-lg");
    var childDiv = $("<div>").addClass("input-group-prepend");
    var timeTxt = $("<span>")
      .addClass("input-group-text")
      .addClass("custom-width")
      .addClass("current-time")
      .attr("id", "inputGroup-sizing-lg");

    childDiv.append(timeTxt);

    timeTxt.text(formattedTime[i]);

    var inputTxt = $("<input>")
      .attr("type", "text")
      .addClass("form-control")
      .attr("aria-label", "Large")
      .attr("aria-describedby", "inputGroup-sizing-sm")
      .attr("id", "input-" + i);

    parentDiv.append(childDiv);
    parentDiv.append(inputTxt);

    var currentEvent = localStorage.getItem(formattedTime[i]) || "";
    inputTxt.val(currentEvent);

    var saveBtn = $("<button>")
      .addClass("btn")
      .addClass("btn-light")
      .addClass("save-button");

    rootEl.append(parentDiv);

    parentDiv.append(saveBtn);

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
