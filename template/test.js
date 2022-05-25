function calculateDays(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var days = (end - start) / (1000 * 60 * 60 * 24);
    return days;
}
// function add two number  (param1, param2)                
function add(param1, param2) {
    return param1 + param2;
}

// function subtract two number  (param1, param2)           
function subtract(param1, param2) {
    return param1 - param2;
}

// 