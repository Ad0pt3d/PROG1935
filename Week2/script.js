var reciept = `<table class="table table-bordered table-striped"><tbody>`;
var totalBeforeTax = 0;
const TAX_RATE = 0.13;
var tax = 0;
var totalAfterTax = 0;


function addToCart(productName, pricePerItem, productQuantityId, productCartButtonId) {
    let quantity = parseInt(prompt(`How many ${productName} would you like?`));
    while (quantity <= 0 || isNaN(quantity)) {
        quantity = parseInt(prompt(`How many ${productName} would you like? Please enter a positive number`));
    }


    document.getElementById(productQuantityId).innerHTML = `x${quantity}`;

    let lineTotal = quantity * pricePerItem;
    totalBeforeTax += lineTotal;
    
    document.getElementById(productCartButtonId).disabled = true;
    document.getElementById("checkout").hidden = false;


    reciept += 
    `<tr>
        <td>${productName}</td> 
        <td>$${pricePerItem.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>$${lineTotal.toFixed(2)}</td>
    </tr>`; 
      
}

function checkout() {
    let customerName = prompt(`What's your name?`);
    while (customerName.trim().length <= 0 || customerName === null) {
        customerName = prompt(`What's your name? Please enter your name`);
    } 

    reciept = `<h4>Customer Name: ${customerName}</h4>` + reciept;

    tax = totalBeforeTax * TAX_RATE;
    totalAfterTax = totalBeforeTax + tax;

    reciept += 
    `<tr>
        <td colspan="3">GST @ 13%</td> 
        <td>$${tax.toFixed(2)}</td>
    </tr>`;
    reciept += 
    `<tr>
        <td colspan="3">Total</td>
        <td>$${totalAfterTax.toFixed(2)}</td>
    </tr>`;

    reciept += `</tbody></table>`;
    document.getElementById("reciept").innerHTML = reciept;

    document.getElementById("product1CartButton").disabled = true;
    document.getElementById("product2CartButton").disabled = true;
    document.getElementById("checkout").disabled = true;
}