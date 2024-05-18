function addTwoNumbers() {
    var number1 = parseInt(prompt("Enter the first number"));
    var number2 = parseInt(prompt("Enter the second number"));
    var result = number1 + number2;
    document.write(`${number1} + ${number2} = ${result}`);
}

function modulusTwoNumbers() {
    var number1 = parseInt(prompt("Enter the first number"));
    var number2 = parseInt(prompt("Enter the second number"));
    var result = number1 % number2;
    document.write(`${number1} % ${number2} = ${result}`);
}