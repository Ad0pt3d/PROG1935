function validateForm() {
    let errors = ``;
    let output = `<table class="table table-bordered"><tbody>`;

    let totalPurchase;
    let totalRewards;
    let rewardsPercent;
    let rewardsPending;


    // Form field validations
    let customerName = document.getElementById("customerName").value;
    let customerNameRegEx = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/i
    if(!customerNameRegEx.test(customerName)) {
        errors += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter your full name</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        output += `<tr>
            <td>Customer Name</td>
            <td>${customerName}</td>
        </tr>`;
    }

    let customerNumber = document.getElementById("customerNumber").value;
    let customerNumberRegEx = /^[0-9]{5}[A-Z]{2}$/
    if(!customerNumberRegEx.test(customerNumber)) {
        errors += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter the customer number in format '54321BA'</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        output += `<tr>
        <td>Customer Number</td>
        <td>${customerNumber}</td>
        </tr>`
    }

    let customerEmail = document.getElementById("customerEmail").value;
    let customerEmailRegEx = /^\w+@\w+.\.\w+$/
    if(!customerEmailRegEx.test(customerEmail)) {
        errors += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter an email</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        output += `<tr>
        <td>Customer Email</td>
        <td>${customerEmail}</td>
        </tr>`
    }

    let costOfClothings = document.getElementById("costOfClothings").value
    costOfClothings = parseInt(costOfClothings)
    if (costOfClothings <= 0 || isNaN(costOfClothings)) {
        errors += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a number greater than 0 for cost of clothing</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }

    let costOfAccessories = document.getElementById("costOfAccessories").value
    costOfAccessories = parseInt(costOfAccessories)
    if (isNaN(costOfAccessories)) {
        costOfAccessories = "";
    } else if (costOfAccessories <= 0) {
        errors += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a number greater than 0 for cost of accessories</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }

    let rewardsRecieved = document.getElementById("rewardsRecieved").value;
    rewardsRecieved = parseInt(rewardsRecieved);
    if (isNaN(rewardsRecieved)) {
        errors += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>Please enter a number for rewards recieved</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }


    // Calculations
    totalPurchase = costOfClothings + costOfAccessories

    if (totalPurchase < 2500) {
        rewardsPercent = 0.10;
    } else if (totalPurchase == 2500 || totalPurchase < 4000) {
        rewardsPercent = 0.15;
    } else {
        rewardsPercent = 0.20;
    }

    totalRewards = totalPurchase * rewardsPercent;

    rewardsPending = totalRewards - rewardsRecieved

    // Add rows to output for calulcated fields
    output += `<tr>
    <td>Total Purchase</td>
    <td>$${totalPurchase}</td>
    </tr>
    <tr>
    <td>Total Rewards</td>
    <td>$${totalRewards}</td>
    </tr>
    <tr>
    <td>Rewards Recieved</td>
    <td>$${rewardsRecieved}</td>
    </tr>
    <tr>
    <td>Rewards Pending</td>
    <td>$${rewardsPending}</td>
    </tr>`;

    output += `</tbody></table>`;

    // Errors or output
    if(errors) {
        // Show the errors
        document.getElementById("errors").innerHTML = errors;

        // Clear the output
        document.getElementById("output").innerHTML = "";
    } else {
        // Clear the errors
        document.getElementById("errors").innerHTML = "";

        // Show the output
        document.getElementById("output").innerHTML = output;
    }
    
    // Return
    return false;

    // Rafi Miah | 8981738
}
