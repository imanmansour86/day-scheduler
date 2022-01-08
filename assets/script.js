console.log(moment().format());
var container = $(".container");

//Display today's date on top of the page
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

function compareTime() {
  var currentTime = moment().format("hh:mm"); //get current time
  console.log(currentTime);

  var first = "09:00";
  var t = moment("9").format("hh:mm");
  console.log(t);

  console.log(moment("09:00").isBefore("12:00", "hour"));
}

container.on("click", ".save-button", function (event) {
  console.dir(event.target.parentElement);

  //look for the text in input for the corresponding clicked save button
  var enteredTxt = event.target.parentElement.children[1].value;

  console.log(
    "text entered by user is " +
      event.target.parentElement.children[0].outerText
  );
  //get the time for the corresponding input
  var currentTime = event.target.parentElement.children[0].outerText;

  //save item in local storage
  localStorage.setItem(currentTime, enteredTxt);
});

//read items from storage
function getEvents() {
  var formattedTime = []; //array to store all times
  //format 9:00 am start time
  var startTime = moment().set("hour", 9).set("minute", 0).set("second", 0);
  console.log("time is " + startTime);

  for (i = 0; i <= 10; i++) {
    var formatted = startTime.format("hh:mm A");
    formattedTime[i] = formatted;
    startTime.add(1, "hour");

    console.log("formated time is", formattedTime);
  }

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
      .attr("aria-describedby", "inputGroup-sizing-sm");

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
  }
}

getEvents();
