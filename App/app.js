class Calculator {
  constructor(outputPrev, outputCurrent) {
    this.prevOutput = outputPrev[0].innerText;
    this.currentOutput = outputCurrent[0].innerText;
  }

  clear() {
    this.prevOutput = "";
    this.currentOutput = "";
    this.operand = undefined;
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOutput);
    console.log(prev);
    const current = parseFloat(this.currentOutput);

    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOutput = computation;
    this.operation = undefined;
    this.prevOutput = "";
  }

  appendNumber(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  chooseOperation(operations) {
    if (this.currentOutput === "") return;
    if (this.prevOutput !== "") {
      this.compute();
    }

    this.operation = operations;
    this.prevOutput = this.currentOutput + this.operation;
    this.currentOutput = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigit = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigit)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigit.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    outputCurrentDOM[0].innerText = this.getDisplayNumber(this.currentOutput);

    if (this.operation != null) {
      outputPrevDOM[0].innerText = `${this.getDisplayNumber(this.prevOutput)} ${
        this.operation
      }`;
    } else {
      outputPrevDOM[0].innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operandButtons = document.querySelectorAll("[data-operand]");
const equalButton = document.querySelectorAll("[data-equals]");
const deleteButton = document.querySelectorAll("[data-delete]");
const clearButton = document.querySelectorAll("[data-clear]");
const outputPrevDOM = document.querySelectorAll("[data-prev-state]");
const outputCurrentDOM = document.querySelectorAll("[data-curr-state]");

const calculator = new Calculator(outputPrevDOM, outputCurrentDOM);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

deleteButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });
});

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

clearButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });
});

equalButton[0].addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
