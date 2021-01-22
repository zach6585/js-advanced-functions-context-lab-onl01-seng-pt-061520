/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (fourArray) {
    let jSObject = {
        firstName: fourArray[0],
        familyName: fourArray[1],
        title: fourArray[2],
        payPerHour: fourArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return jSObject;

}

let createEmployeeRecords = function(arrayOfArrays) {
    let returnArray = [];
    for (const i of arrayOfArrays) {
        returnArray.push(createEmployeeRecord(i));
    }
    return returnArray;
}

let createTimeInEvent = function(dateTime) {
    let newTimeObject = {
        type: "TimeIn",
        hour: parseInt(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    };
    this.timeInEvents.push(newTimeObject);
    return this;
}

let createTimeOutEvent = function(dateTime) {
    let newTimeObject = {
        type: "TimeOut",
        hour: parseInt(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    };
    this.timeOutEvents.push(newTimeObject);
    return this;
}

let hoursWorkedOnDate = function(dateTime) {
    let timeIn = 0;
    let timeOut = 0;
    for (const i of this.timeInEvents) {
        if (i.date === dateTime) {
            timeIn = i.hour;
        }

    }
    for (const j of this.timeOutEvents) {
        if (j.date === dateTime) {
            timeOut = j.hour;
        }
    }

    return (timeOut-timeIn)/100;
}

let wagesEarnedOnDate = function(dateTime) {
    let hoursWork = hoursWorkedOnDate.apply(this,[dateTime]);
    return hoursWork*this.payPerHour;
}

let findEmployeeByFirstName = function(arrayOfEmps, firstNamed) {
    for (const i of arrayOfEmps) {
        if (i.firstName === firstNamed) {
            return i;
        }
    }
    return undefined;
}

let calculatePayroll = function(arrayOfEmps) {
    let payArray = [];
    for (const i of arrayOfEmps) {
        for (const j of i.timeInEvents) {
            payArray.push(wagesEarnedOnDate.call(i,j.date))
        }
    }
    return payArray.reduce(function(total, initial) {
        return total + initial;
    });
}