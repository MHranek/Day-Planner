// Element references
var currentDayEl = $('#currentDay');
var containerEl = $('.container');

// Current day in header
var currentDay = moment().format('dddd, MMMM Do');
currentDayEl.text(currentDay);

// TODO Color code timeblocks
// loop through each text field, assigning it to the correct class
for (var i = 0; i < containerEl.children().length; i++) {
    // Current time of day in hours
    var currentTime = moment().format('HH');
    // Time of current row, gotten from the span inside the hour column
    var rowTime = containerEl.children().eq(i).children().eq(0).children().eq(0).text();
    // convert to number from string
    rowTime = parseFloat(rowTime);
    if (rowTime < 5) {
        rowTime = rowTime + 12;
    }
    // If time is in the past, give textarea the .past class (default)
    // If time is in the present, give textarea the .present class
    if (currentTime > rowTime) {
        containerEl.children().eq(i).children().eq(1).addClass('past');
    } else if (currentTime == rowTime) {
        containerEl.children().eq(i).children().eq(1).addClass('present');
    } else {
        containerEl.children().eq(i).children().eq(1).addClass('future');
    }
    // If time is in the future, give textarea the .future class
}

// TODO Timeblock text is saveable to local storage