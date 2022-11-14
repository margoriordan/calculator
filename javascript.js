let a = ""
let b = ""
let c = ""
let operator = ""
let screenArray = ""

const numberButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll("[data-operator]")
const clearButton = document.querySelector("#clearBtn")
const deleteButton = document.querySelector("#dltBtn")
const decimalButton = document.querySelector("#decimal")
const equalsButton = document.querySelector("#equals")
const operationScreen = document.querySelector(".screen")

//keyboard operations
window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '=' || e.key === 'Enter') execute();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clear();
    if (e.key === "+" || e.key === "-" || e.key === "x" || e.key === "/" || e.key === ".")
        appendOperator(convertOperator(e.key));    
}

function convertOperator(keyboardOperator){
    if (keyboardOperator === "/") return "/";
    if (keyboardOperator === "+") return "+";
    if (keyboardOperator === "-") return "-";
    if (keyboardOperator === "x" || keyboardOperator === "*") return "x";
    if (keyboardOperator === ".") return ".";
}


//number buttons
numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
    )

    function appendNumber (number) {
    operationScreen.textContent += number;
    b += number;
    tooManyNumbers();
}


function tooManyNumbers (){
    if (operationScreen.textContent.length >= 19) {
        operationScreen.textContent = "Apologies--I cannot count that high..."
        return true;
    } else {
        return false;
    }
}

//clear + delete button
clearButton.addEventListener("click", clear);

function clear (){
    operationScreen.textContent = ""
    a = ""
    b = ""
    operator = ""
}

deleteButton.addEventListener("click", backspace)

function backspace (){
    b = b.slice(0, -1);
    operationScreen.textContent = operationScreen.textContent
        .slice(0, -1);
}

//operation buttons
operatorButtons.forEach((button)=>
    button.addEventListener("click", () => appendOperator(button.textContent))
)

function appendOperator(operator) { 
    a = b;
    b = "";
    operationScreen.textContent += operator;
    op = operator;
}

decimalButton.addEventListener("click", appendDecimal)

function appendDecimal () {
    if (!b.includes(".")){
        b += "."; 
    };
}

//equals button
equalsButton.addEventListener("click", execute)

function execute(){
    operationScreen.textContent = `${operate(op, a, b)}`
    b = operationScreen.textContent;
}

// round result
function roundResult(number){
    Math.round(number*1000)/1000;
}

//check for previousResult
function updateDisplay(){
    
}

//operation functions

const add = function(a, b) {
    return (a + b);
  };
  
const subtract = function(a, b) {
    return (a - b);
  };

const multiply = function(a, b) {
    return (a * b);
  };

const divide = function(a, b) {
    return (a / b);
  };

function operate(op, a, b){
    a = Number(a)
    b = Number(b)
    switch(op){
        case ("+"):
            return add (a, b);
        case ("-"):
            return subtract(a, b);
        case ("x"):
            return multiply(a, b);
        case ("/"):
            if (b === 0) return "Cannot divide by zero..."
            else return divide (a, b);
        default:
            return null;              
    }
  };