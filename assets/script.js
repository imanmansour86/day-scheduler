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
  allTimes = ["9", "10", "11"];

  for (var i = 0; i < allTimes.length; i++) {
    var rootEl = $("#root");

    var parentDiv = $("<div>")
      .addClass("input-group")
      .addClass("input-group-lg");
    var childDiv = $("<div>").addClass("input-group-prepend");
    var timeTxt = $("<span>")
      .addClass("input-group-text")
      .addClass("custom-width")
      .attr("id", "inputGroup-sizing-lg");

    childDiv.append(timeTxt);

    timeTxt.text(allTimes[i]);

    var inputTxt = $("<input>")
      .attr("type", "text")
      .addClass("form-control")
      .attr("aria-label", "Large")
      .attr("aria-describedby", "inputGroup-sizing-sm")
      .appendTo(childDiv);

    var currentEvent = localStorage.getItem(allTimes[i]) || "";
    inputTxt.val(currentEvent);

    var saveBtn = $("<button>")
      .addClass("btn")
      .addClass("btn-light")
      .addClass("save-button");

    rootEl.append(parentDiv);
    parentDiv.append(childDiv);

    childDiv.append(saveBtn);
  }
}

getEvents();
/* <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text custom-width" id="inputGroup-sizing-lg"
            >4:00pm</span
          >
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        <button type="button" class="btn btn-light save-button"></button>
      </div> */
