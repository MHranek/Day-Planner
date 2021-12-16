// Element references
var currentDayEl = $('#currentDay');
var containerEl = $('.container');

// Current day in header
var currentDay = moment().format('dddd, MMMM Do');
currentDayEl.text(currentDay);

// Color code timeblocks
// loop through each text field, assigning it to the correct class
for (var i = 0; i < containerEl.children().length; i++) {
    // Current time of day in hours
    var currentTime = moment().format('HH');
    // Time of current row, gotten from the span inside the hour column
    var rowTime = containerEl.children().eq(i).children().eq(0).children().eq(0).text();
    // convert to number from string
    rowTime = parseFloat(rowTime);
    if (rowTime < 5) {rowTime = rowTime + 12;}
    if (currentTime > rowTime) {
        // If time is in the past, give textarea the .past class
        containerEl.children().eq(i).children().eq(1).addClass('past');
    } else if (currentTime == rowTime) {
        // If time is in the present, give textarea the .present class
        containerEl.children().eq(i).children().eq(1).addClass('present');
    } else {
        // If time is in the future, give textarea the .future class
        containerEl.children().eq(i).children().eq(1).addClass('future');
    } 
}
// Timeblock text is saveable to local storage
// Listen for click event on save button
containerEl.on('click', '.saveBtn', function (event) {
    var element = $(event.target);
    // check if target is save icon or save button
    if (element.is('.fa-save')) {
        element = element.parent();
    }
    storeData(element);
})
// Function to store data to localstorage
function storeData(element) {
    // key
    var key = element.parent().children().eq(0).text().trim();
    // value
    var value = element.parent().children().eq(1).val();
    // key value pair put into localstorage
    localStorage.setItem(key, value);
}
// Function to pull data from localstorage
function retrieveData() {
    for (var i = 0; i < containerEl.children().length; i++) {
        // look for localstorage to parse
        var retrievedKey = containerEl.children().eq(i).children().eq(0).text().trim();
        var retrievedValue = localStorage.getItem(retrievedKey);
        containerEl.children().eq(i).children().eq(1).val(retrievedValue);
    }
}
// On page load retrieve data from localstorage
retrieveData()