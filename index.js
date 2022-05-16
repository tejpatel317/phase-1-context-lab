/* Your Code Here */
function createEmployeeRecord(array) {
    let employeeObject = {}
    employeeObject.firstName = array[0]
    employeeObject.familyName = array[1]
    employeeObject.title = array[2]
    employeeObject.payPerHour = array[3]
    employeeObject.timeInEvents = []
    employeeObject.timeOutEvents = []
    return employeeObject
}

function createEmployeeRecords(arrayOfArrays) {
    const employeeArrayOfObjects = arrayOfArrays.map(createEmployeeRecord)
    return employeeArrayOfObjects
}

function createTimeInEvent(timeInString) {
    const timeInObject = {}
    timeInObject.type = "TimeIn"
    timeInObject.date = timeInString.split(" ")[0]
    timeInObject.hour = parseInt(timeInString.split(" ")[1], 10)
    this.timeInEvents.push(timeInObject)
    return this;
}

function createTimeOutEvent(timeOutString) {
    const timeInObject = {}
    timeInObject.type = "TimeOut"
    timeInObject.date = timeOutString.split(" ")[0]
    timeInObject.hour = parseInt(timeOutString.split(" ")[1], 10)
    this.timeOutEvents.push(timeInObject)
    return this;
}

function hoursWorkedOnDate(date) {
    let hourIn = this.timeInEvents.find((e) =>{
        return e.date === date
    });
    let hourOut = this.timeOutEvents.find((e) => {
        return e.date === date
    });
    return (hourOut.hour - hourIn.hour)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    const employeeWithFirstName = srcArray.find(function(element) {
        return element.firstName === firstName
    })
    return employeeWithFirstName
}

function calculatePayroll(arrayOfEmployees) {
    const final = arrayOfEmployees.reduce((total, element) => {
        return total + allWagesFor.call(element)
    }, 0)

    return final;
}
