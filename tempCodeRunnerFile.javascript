var today = new Date();
var monthDate = today.getFullYear() + "/" + (today.getMonth() + 1);
var startDate = monthDate + "/1";
var endDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var endDate = monthDate + "/" + endDay[today.getMonth()];

console.log(startDate);
console.log(endDate);