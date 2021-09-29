var savingsAmount = document.getElementById("savingsAmount")
var fixedDepositAmount = document.getElementById("fixedDepositAmount")
var allSavingsAccountTransactions;
var allFixedDepositTransactions;
var savingsTable = document.getElementById("savingsTable");
var fixedDepositTable = document.getElementById("fixedDepositTable");
var storeTransactions = {};


savingsTable.style.display = "none";
fixedDepositTable.style.display = "none";
var xhrGetData = new XMLHttpRequest();
xhrGetData.open("GET", "http://localhost:3000/savingsAccountTransactions/", false);
xhrGetData.send();
allSavingsAccountTransactions = JSON.parse(xhrGetData.response);
savingsAmount.innerHTML = customReduce(allSavingsAccountTransactions);
xhrGetData.open("GET", "http://localhost:3000/fixedDepositTransactions/", false);
xhrGetData.send();
allFixedDepositTransactions = JSON.parse(xhrGetData.response);
fixedDepositAmount.innerHTML = customReduce(allFixedDepositTransactions);

//Creating Savings Table
function savingsButton() {
    savingsTable.style.display = "block";
    fixedDepositTable.style.display = "none";
    var data = "<table><tr><th>Acc Number</th><th>Amount</th></tr>";
    for (var i = 0; i < allSavingsAccountTransactions.length; i++) {
        var obj = allSavingsAccountTransactions[i];
        storeTransactions[obj.userId] !== undefined ? storeTransactions[obj.userId] += parseInt(obj.depositAmount) : storeTransactions[obj.userId] = parseInt(obj.depositAmount);
    }
    var userIds = Object.getOwnPropertyNames(storeTransactions);
    for (var i = 0; i < userIds.length; i++) {
        data += "<tr><td>" + userIds[i] + "</td><td>" + storeTransactions[userIds[i]] + "</td></tr>";
    }
    data += "</table>";
    savingsTable.innerHTML = data;
}

 function fixedDepositButton() {
    savingsTable.style.display = "none";
    fixedDepositTable.style.display = "block";
    var data = "<table><tr><th>Acc Number</th><th>Amount</th><th>Date</th><th>Rate of Interest</th></tr>";
    for (var i = 0; i < allFixedDepositTransactions.length; i++) {
        data += "<tr><td>" + allFixedDepositTransactions[i].userId + "</td><td>" + allFixedDepositTransactions[i].depositAmount + "</td><td>" + allFixedDepositTransactions[i].date + "</td><td>" + allFixedDepositTransactions[i].rateOfIntrest + "</td></tr>";
    }
    data += "</table>";
    fixedDepositTable.innerHTML = data;
}

function customReduce(getArray) {
    var sumValue = 0;
    for (var i = 0; i < getArray.length; i++) {
        sumValue += parseInt(getArray[i].depositAmount)
    }
    return sumValue;
}

function home() {
    window.location = "index.html";
}