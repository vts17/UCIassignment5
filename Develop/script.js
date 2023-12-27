// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  //
  // HINT: What does `this` reference in the click listener function? How can DOM
  // traversal be used to get the "hour-x" id of the time-block containing the
  // button that was clicked? How might the id be useful when saving the
  // description in local storage?
  $(document).on("click", ".saveBtn", function () {
    // Get the id of the time-block that contains the save button
    const timeBlockId = $(this).closest(".time-block").attr("id");
    // Get the textarea element in the time-block and get its value
    const textareaValue = $(`#${timeBlockId} textarea`).val();
    // Save the value in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, textareaValue);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // HINT: How can the id attribute of each time-block be used to conditionally
  // add or remove the past, present, and future classes? How can Day.js be used
  // to get the current hour in 24-hour time?
  $(".time-block").each(function (i, el) {
    const timeBlockId = $(el).attr("id");
    const currentHour = dayjs().hour();
    if (currentHour < timeBlockId.slice(-2)) {
      $(el).addClass("future");
    } else if (currentHour === timeBlockId.slice(-2)) {
      $(el).addClass("present");
    } else {
      $(el).addClass("past");
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // HINT: How can the id attribute of each time-block be used to do this?
  $(".time-block").each(function (i, el) {
    const timeBlockId = $(el).attr("id");
    const textareaValue = localStorage.getItem(timeBlockId);
    if (textareaValue) {
      $(`#${timeBlockId} textarea`).val(textareaValue);
    }
  });

  // TODO: Add code to display the current date in the header of the page.

  const currentDate = dayjs().format("MMMM Do, YYYY");
$("#current-date").text(currentDate);

});