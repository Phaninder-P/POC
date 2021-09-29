// static values
var savingsAccount = document.getElementById("savingsAccount");
var fixedDeposit = document.getElementById("fixedAccount");
var balance;
var allFds;
var userDetails;
var addMoney=document.getElementById("addMoney");
var userId = location.search.substring(4);
var userName = document.getElementById("userName");
var savingsAccountButton = document.getElementById("savingsAccountButton");
var fixedDepositButton = document.getElementById("fixedDepositButton");
var aButton = document.getElementById("aButton");
var savingsForm = document.getElementById("savingsForm");
var form1 = document.getElementById("form1");
var fdAmount = document.getElementById("fdAmount");
var fdButton = document.getElementById("fdButton");
var selectBox = document.getElementById("selectbox");
var accBalance = document.getElementById("accBalance");
var transactable = document.getElementById("transactable");

var historytable;
var xhrBalance;
var xhrTotalData;


// getting details from database
var xhrGetData = new XMLHttpRequest();
xhrGetData.open("GET", "http://localhost:3000/customers/" + userId, false);
xhrGetData.send();
userDetails = JSON.parse(xhrGetData.response);
xhrGetData.open("GET", "http://localhost:3000/savingsAccountTransactions/?userId=" + userId, false);
xhrGetData.send();
if (xhrGetData.status == 200) {
  xhrTotalData = JSON.parse(xhrGetData.response);
  transacHistory(xhrTotalData);
}
xhrBalance = customReduce(JSON.parse(xhrGetData.response));
userName.innerHTML += userDetails.name;
updateBalance();
xhrGetData.open("GET", "http://localhost:3000/fixedDepositTransactions/?userId=" + userId, false);
xhrGetData.send();
allFds = JSON.parse(xhrGetData.response);

// opening savings details
savingsAccountButton.addEventListener("click", function () {
  savings_Account();
})

// opening fixed deposit details
fixedDepositButton.addEventListener("click", function () {
  fixed_Deposit();
})

// savingsForm.addEventListener("submit", function (e) {
//   submitSavings(e, savingsForm);
// })
// function submitMoney(e){
//   submitSavings(e, savingsForm);
// }

function function3() {
  window.location = "index.html";
}


function savings_Account() {
  fixedDeposit.style.display = "none";
  savingsAccount.style.display = "block";
}
function submitSavings(e, savingsForm) {
  e.preventDefault();
  var date = new Date();
  var data = JSON.stringify({
    "userId": userId,
    "depositAmount": (savingsForm.elements)["addMoney"].value,
    "date": date.toDateString(),
    "openingBalance": xhrBalance,
    "closingBalance": parseInt(xhrBalance) + parseInt((savingsForm.elements)["addMoney"].value)
  });

  console.log(data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/savingsAccountTransactions", false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  updateBalance();
  updateTransacHistory(JSON.parse(data));
  if (xhr.status === 200) {
    console.log(xhr.response);

  }
  savingsForm.reset();
}





function fixed_Deposit() {
  savingsAccount.style.display = "none";
  fixedDeposit.style.display = "block";


  form1.addEventListener("submit", function (event) {
    event.preventDefault();
    var currentFd = fdAmount.value;
    var date = new Date();
    var data1 = JSON.stringify({
      "userId": userId,
      "rateOfIntrest": selectBox.value,
      "depositAmount": currentFd,
      "date": date.toDateString(),

    });
    var xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "http://localhost:3000/fixedDepositTransactions", false);
    xhr1.setRequestHeader("Content-Type", "application/json");
    xhr1.send(data1);
    if (xhr1.status === 200) {
      console.log(xhr1.response);
    }
    form1.reset();
  })

}


function customReduce(getArray) {
  var sumValue = 0;
  for (var i = 0; i < getArray.length; i++) {
    sumValue += parseInt(getArray[i].depositAmount)
  }
  return sumValue;
}

function updateBalance() {
  console.log("i am in updateBalance");
  if ((savingsForm.elements)["addMoney"].value != "") {
    console.log("i am i if");  
    accBalance.innerHTML = "<h2>Account Balance : </h2>" + (parseInt(xhrBalance) + parseInt(savingsForm.elements["addMoney"].value));
    xhrBalance = (parseInt(xhrBalance) + parseInt(savingsForm.elements["addMoney"].value));
  } else {
    // console.log("i am in else");
    accBalance.innerHTML = "<h2>Account Balance : <\h2>" + xhrBalance;
  }

}

function transacHistory(depositDataObj) {
  console.log(depositDataObj);
  // console.log("i am in deosit");
  var table = "<table id=historytable><tr><th>Date</th> <th>Opening Balance</th><th>Amount Deposited</th><th>Closing Balance</th></tr>"
  for (var i = 0; i < depositDataObj.length; i++) {
    table += "<tr><td>" + depositDataObj[i].date + "</td>" + "<td>" + depositDataObj[i].openingBalance + "</td>" + "<td>" + depositDataObj[i].depositAmount + "</td>" + "<td>" + depositDataObj[i].closingBalance + "</td></tr><br>"
  }
  table += "</table>"
  transactable.innerHTML = table;
  historytable = document.getElementById("historytable");
}

function updateTransacHistory(depositDataObj) {
  // console.log(historytable);
  historytable.innerHTML += "<tr><td>" + depositDataObj.date + "</td>" + "<td>" + depositDataObj.openingBalance + "</td>" + "<td>" + depositDataObj.depositAmount + "</td>" + "<td>" + depositDataObj.closingBalance + "</td></tr>"
}

function getAjax(url)
{
 var xhr = new XMLHttpRequest();
  xhr.open("Get", url, false);
  xhr.send();
  if(xhr.status==200)
  {
    return xhr.response;
  }
}