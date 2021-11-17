function createEmployeeRecord(array){
    const record = {};

    record.firstName = array[0];
    record.familyName = array[1];
    record.title = array[2];
    record.payPerHour = array[3];
    record.timeInEvents = [];
    record.timeOutEvents = [];

    return record;
}


function createEmployeeRecords(nestedArr){
    return nestedArr.map((arr) => createEmployeeRecord(arr));
}


function createTimeInEvent(dateStamp){
    const e = {};

    const dateStampArr = dateStamp.split("");
    const dateInput = dateStampArr.slice(0, 10).join("");
    const hourInput = parseInt(dateStampArr.slice(11).join(""));

    e.type = "TimeIn";
    e.hour = hourInput;
    e.date = dateInput;

    this.timeInEvents.push(e);

    return this;
}


function createTimeOutEvent(dateStamp){
    const e = {};

    const dateStampArr = dateStamp.split("");
    const dateInput = dateStampArr.slice(0, 10).join("");
    const hourInput = parseInt(dateStampArr.slice(11).join(""));

    e.type = "TimeOut";
    e.hour = hourInput;
    e.date = dateInput;

    this.timeOutEvents.push(e);

    return this;
}


function hoursWorkedOnDate(dateStamp){
    const inArr = this.timeInEvents;
    const outArr = this.timeOutEvents;

    function hoursWorked(arr){
        for(const e of arr) {
            if (e.date === dateStamp){
                return e.hour / 100
            }
        }
    };

    const hourIn = hoursWorked(this.timeInEvents);
    const hourOut = hoursWorked(this.timeOutEvents);

    return hourOut - hourIn;
}


function wagesEarnedOnDate(dateStamp){
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}


function allWagesFor () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    for(const e of srcArray){
        if (e.firstName === firstName) {
            return e;
        }
    }
}

function calculatePayroll(eArr){
    const wagesArr =  eArr.map(e => allWagesFor.call(e));
    const total = wagesArr.reduce(((accum, wage) => accum+=wage), 0);
    return total;

}