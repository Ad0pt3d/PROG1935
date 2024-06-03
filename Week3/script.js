function validateForm() {
    let errors = ``;
    let receipt = `<table class="table table-bordered"><tbody>`;

    let customerName = document.getElementById("customerName").value;
    let customerNameRegEx = /^[A-Z]+$|^[A-Z]+\s[A-Z]+$/i;

    let emailAddress = document.getElementById("emailAddress").value;
    let emailAddressRegEx = /^\w+@\w+.\.\w+/;

    let creditCardNumber = document.getElementById("ccNumber").value;
    let creditCardNumberRegEx = /^4\d{3}(-\d{4}){3}$/;

    let creditCardMonth = document.getElementById("ccMonth").value;
    let creditCardMonthRegEx = /^(JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;

    let creditCardYear = document.getElementById("ccYear").value;
    let creditCardYearRegEx = /^(202[5-7])$/;

    if (!customerNameRegEx.test(customerName.toUpperCase())) {
        errors += 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a customer name</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td>Customer Name</td>
            <td>${customerName.toUpperCase()}</td>
        </tr>`;
    }

    if (!emailAddressRegEx.test(emailAddress)) {
        errors += 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a valid email address</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td>Email Address</td>
            <td>${emailAddress}</td>
        </tr>`;
    }

    if (!creditCardNumberRegEx.test(creditCardNumber)) {
        errors += 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a valid credit card number</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td>Credit Card Number</td>
            <td>xxxx-xxxx-xxxx-${creditCardNumberRegEx.exec(creditCardNumber)[1]}</td>
        </tr>`;
    }

    if (!creditCardMonthRegEx.test(creditCardMonth)) {
        errors += 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a valid credit card expiry month</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td>Credit Card Expiry Month</td>
            <td>${creditCardMonth}</td>
        </tr>`;
    }

    if (!creditCardYearRegEx.test(creditCardYear)) {
        errors += 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a valid credit card expiry month</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        receipt += `<tr>
            <td>Credit Card Expiry Year</td>
            <td>${creditCardYear}</td>
        </tr>`;
    }

    receipt += `</tbody></table>`;

    if (errors) {
        // Show the errors
        document.getElementById("errors").innerHTML = errors;

        // Clear the receipt
        document.getElementById("receipt").innerHTML = "";
    } else {
        // Clear the errors
        document.getElementById("errors").innerHTML = "";

        // Show the reciept
        document.getElementById("receipt").innerHTML = receipt;
    }

    return false;
}