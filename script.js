let calcResult = document.getElementById("result");
let calculations = document.getElementById("calculations");
let typedButtons = document.getElementsByClassName("typed-buttons");
let mathematicSymbols = document.getElementsByClassName("mathematic-symbols")
let equal = document.getElementById("equal");
let clear = document.getElementById("AC");
let deleteBtn = document.getElementById("delete");
let buttons = document.getElementsByTagName("button");
let calculationsArray;
let result;
for (const button of typedButtons) {
    button.addEventListener("click", function () {
        if (button.classList.contains("mathematic-symbols")) {
            calculations.textContent += ` ${(button.value)} `;
        }
        else if (button.classList.contains("dotdot") && button.classList.contains("hundredper")) {
            calculations.textContent += `${(button.value)}`
        }
        else {
            calculations.textContent += button.value;
        }
    });
}

function multiply() {
    let index = calculationsArray.findIndex(element => element == "*")
    result = Number(calculationsArray[index + 1]) * Number(calculationsArray[index - 1])
    calculationsArray.splice(calculationsArray.indexOf("*") - 1, 3, result.toString());
}

function division() {
    let index = calculationsArray.findIndex(element => element == "/")
    result = Number(calculationsArray[index - 1]) / Number(calculationsArray[index + 1]);
    calculationsArray.splice(calculationsArray.indexOf("/") - 1, 3, result.toString());
    return result;
}

function add() {
    let index = calculationsArray.findIndex(element => element == "+")
    result = Number(calculationsArray[index + 1]) + Number(calculationsArray[index - 1]);
    calculationsArray.splice(calculationsArray.indexOf("+") - 1, 3, result.toString());
    return result;
}

function subtract() {
    let index = calculationsArray.findIndex(element => element == "-")
    result = Number(calculationsArray[index - 1]) - Number(calculationsArray[index + 1]);
    calculationsArray.splice(calculationsArray.indexOf("-") - 1, 3, result.toString());
    return result;
}
function searchForOperator(loopingFunction, indexValue) {
    while (calculationsArray.indexOf(indexValue) !== -1) {
        loopingFunction();
    }
}

function plusMinusOrder() {
    if (calculationsArray.includes("+") && calculationsArray.includes("-")) {
        if (calculationsArray.indexOf("+") < calculationsArray.indexOf("-")) {
            add();
            subtract();
            searchForOperator(add, "+")
            searchForOperator(subtract, "-")
        }
        else if (calculationsArray.indexOf("+") > calculationsArray.indexOf("-")) {
            subtract();
            add();
            searchForOperator(subtract, "-")
            searchForOperator(add, "+")
        }
    }

    else if (calculationsArray.includes("+") && !calculationsArray.includes("-")) {
        add();
        searchForOperator(add, "+")
    }

    else if (!calculationsArray.includes("+") && calculationsArray.includes("-")) {
        subtract();
        searchForOperator(subtract, "-")
    }
}

function hundredPercent() {
    let index = calculationsArray.findIndex(element => element == "%")
    result = Number(calculationsArray[index - 1]) / 100;
    calculationsArray.splice(calculationsArray.indexOf("%") - 1, 2, result.toString());
    return result;
}

function calc() {
    calculationsArray = calculations.textContent.split(' ');
    console.log(calculationsArray)
    if (calculationsArray.includes("")) {
        return "Error"
    }
    else {

        if (calculationsArray.includes("%")) {
            hundredPercent();
            searchForOperator(hundredPercent, "%")
        }
        if (calculationsArray.includes("*") && calculationsArray.includes("/")) {
            if (calculationsArray.indexOf("*") < calculationsArray.indexOf("/")) {
                multiply();
                division();
                searchForOperator(multiply, "*");
                searchForOperator(division, "/");
            }
            else if (calculationsArray.indexOf("*") > calculationsArray.indexOf("/")) {
                division();
                multiply();
                searchForOperator(division, "/");
                searchForOperator(multiply, "*");
            }
            plusMinusOrder()
        }
        else if (calculationsArray.includes("*") || calculationsArray.includes("/")) {
            if (calculationsArray.includes("*") && !calculationsArray.includes("/")) {
                multiply();
                searchForOperator(multiply, "*")
                plusMinusOrder();
            }

            else if (!calculationsArray.includes("*") && calculationsArray.includes("/")) {
                searchForOperator(division, "/")
                plusMinusOrder()
            }
        }
        else if (!calculationsArray.includes("*") && !calculationsArray.includes("/")) {
            plusMinusOrder()
        }

        return result;
    }
}

equal.addEventListener('click', function () {
    calcResult.textContent = calc();
    if (calcResult.textContent == "NaN" || calcResult.textContent == "Infinity" || calcResult.textContent == "-Infinity") {
        calcResult.textContent = "ERROR";
        calcResult.style.fontSize = "2.2rem";
    }
});

deleteBtn.addEventListener('click', function () {
    calcResult.textContent = "0";
    calculations.textContent = calculations.textContent.slice(0, -1)
})

clear.addEventListener('click', function () {
    calculationsArray = calculations.textContent.split(' ');
    calculations.textContent = "";
    calcResult.textContent = "0";
    calculationsArray.splice(0, calculationsArray.length)
});

document.addEventListener("keydown", function (event) {
    for (const button of buttons) {
        if (button.value == event.key) { button.click(); }
        event.preventDefault()
    }
})
