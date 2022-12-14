let calcResult = document.getElementById("result");
let calculations = document.getElementById("calculations");
let visibaleCalculations = document.getElementById("visibaleCalculations")
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
        if (calculations.textContent.length <= 29) {
            if (button.classList.contains("mathematic-symbols")) {
                calculations.textContent += ` ${(button.value)} `;
                visibaleCalculations.textContent += ` ${(button.value)} `;
            }
            else if (button.classList.contains("dotdot")) {
                calculations.textContent += `${(button.value)}`;
                visibaleCalculations.textContent += `${(button.value)}`;
            }
            else if (button.classList.contains("hundredper")) {
                button.key = " / 100";
                calculations.textContent += `${button.key}`
                visibaleCalculations.textContent += "% ";
            }
            else {
                calculations.textContent += button.value;
                visibaleCalculations.textContent += button.value;
            }
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

function calc() {
    calculationsArray = calculations.textContent.split(' ');
    console.log(calculationsArray)
    if (calculationsArray.includes("")) {
        return "Error";
    }

    else {
        if (!calculationsArray.includes("*") && !calculationsArray.includes("/") && !calculationsArray.includes("+") && !calculationsArray.includes("-")) {
            result = calculationsArray[0];
        }

        else if (calculationsArray.includes("*") && calculationsArray.includes("/")) {
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
            plusMinusOrder();
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
    else if (+calcResult.textContent !== Math.floor(+calcResult.textContent)) {
        calcResult.textContent = (+calcResult.textContent).toFixed(2);
    }
    if (calcResult.textContent.length > 10) {
        calcResult.style.fontSize = "1.5rem"
    }
    visibaleCalculations.textContent = calcResult.textContent;
    calculations.textContent = calcResult.textContent
});

deleteBtn.addEventListener('click', function () {
    calcResult.textContent = "0";
    visibaleCalculations.textContent = calculations.textContent;
    visibaleCalculations.textContent = visibaleCalculations.textContent.slice(0, -1)
    calculations.textContent = calculations.textContent.slice(0, -1)
})

clear.addEventListener('click', function () {
    calculationsArray = calculations.textContent.split(' ');
    visibaleCalculations.textContent = "";
    calcResult.textContent = "0";
    calculationsArray.splice(0, calculationsArray.length)
});

document.addEventListener("keydown", function (event) {
    for (const button of buttons) {
        if (button.value == event.key) button.click();
    }
})
