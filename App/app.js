class Calculator {
  constructor(outputPrev, outputCurrent) {
    this.prevOutput = outputPrev[0].innerText;
    this.currentOutput = outputCurrent[0].innerText;

    console.log(this.prevOutput);
    console.log(this.currentOutput);
  }

  clear() {
    this.prevOutput = "";
    this.currentOutput = "";
    this.operand = undefined;
  }

  delete() {
    this.currentOutput = this.currentOutput.slice(0, -1);
  }

  compute() {}

  appendNumber(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  chooseOperation(operations) {
    if (this.currentOutput.includes(operations)) return;
    this.currentOutput = this.currentOutput.toString() + operations;
  }

  updateDisplay() {
    outputCurrentDOM[0].innerText = this.currentOutput;
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
console.log(numberButtons);

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
