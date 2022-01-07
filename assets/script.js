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

  var enteredTxt = event.target.parentElement.children[1].value;

  console.log(
    "text entered by user is " +
      event.target.parentElement.children[0].outerText
  );

  var currentTime = event.target.parentElement.children[0].outerText;

  localStorage.setItem(currentTime, enteredTxt);
});

function getEvents() {
  const allEvent = Object.entries(localStorage);
}
