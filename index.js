// var submitButton = document.getElementById("submitButton");
var accountNumber = document.getElementById("accountNumber");
var form = document.getElementById("form");


function User() {
    form.style.visibility = "visible";
}

// form.addEventListener("submit", function (event) {
//     event.preventDefault();
function submitAccount(e) {
 e.preventDefault();
    var editxhr = new XMLHttpRequest();
    editxhr.open("GET", "http://localhost:3000/customers/" + accountNumber.value);
    editxhr.responseType = "json";
    editxhr.send();
    editxhr.onload = function () {
        if (this.status == 200) {
            console.log(this.response);
            window.location = "user.html?id=" + this.response.id;
        } else {
            alert("You have entered wrong account number");
        }
    
    }
}
    // };

// })


 
function Admin() {
    window.location = "admin.html";
}