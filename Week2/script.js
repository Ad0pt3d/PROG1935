var reciept = `<table class="table table-bordered table-striped"><tbody>`;


function addToCart(productName, pricePerItem, productQuantityId) {
    let quantity = parseInt(prompt(`How many ${productName} would you like?`));
    document.getElementById(productQuantityId).innerHTML = `${quantity}`
    let lineTotal = quantity * pricePerItem;
    

    reciept += 
    `<tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Price per Item</th>
        <th>Total</th>
    </tr>
    <tr>
        <td>${productName}</td> 
        <td>${quantity}</td>
        <td>$${pricePerItem.toFixed(2)}</td>
        <td>$${lineTotal.toFixed(2)}</td>
    </tr`;

    // TODO: Move the following to checkout function
    reciept += `</tbody></table>`;
    document.getElementById(productQuantityId).innerHTML = `x${quantity}`
    document.getElementById("reciept").innerHTML = reciept;
}