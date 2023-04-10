class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
      this.previousOperationTextElement = previousOperationTextElement;
      this.currentOperationTextElement = currentOperationTextElement;
      this.currentOperation = '';
    }
  
    clear() {
        this.previousOperation = '';
        this.currentOperation = '';
        this.operation = undefined;
        this.runningTotal = 0;
      }
      

    delete() {
        this.currentOperation = this.currentOperation.toString().slice(0, -1)
      }
    appendNumber(number) {
        if (number === '.' && this.currentOperation.includes('.')) return //prevents there from being more than one decimal
        this.currentOperation = this.currentOperation.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperation === '') {
            this.currentOperation = this.previousOperation;
        }
        if (this.previousOperation !== '' && this.currentOperation !== '') { // Check if there is a previous operation and the current operation is not empty
            this.compute();
        }
        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = '';
    }
    
    compute() {
        let computation;
        const current = parseFloat(this.currentOperation);
        if (isNaN(current)) return;
    
        if (!this.previousOperation && !this.runningTotal) {
            this.runningTotal = current;
            this.currentOperation = '';
            return;
        }
    
        if (!this.previousOperation) {
            this.previousOperation = this.currentOperation;
            this.currentOperation = '';
        }
    
        const prev = parseFloat(this.previousOperation);
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
                if (current === 0) {
                    computation = 'Error'; // Cannot divide by zero - returns error instead of infinity.
                } else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
    
        this.runningTotal = computation;
        this.currentOperation = '';
        this.operation = undefined;
        this.previousOperation = '';
    }
    
    
    
    
    
    getDisplay(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        const integerDisplay = isNaN(integerDigits) ? "" : integerDigits.toString();
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }

    }
      
    updateDisplay() {
        this.currentOperationTextElement.innerText = this.currentOperation;
        if (this.operation) {
            this.previousOperationTextElement.innerText =
                `${this.previousOperation} ${this.operation}`;
        } else {
            this.previousOperationTextElement.innerText = '';
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperationTextElement = document.querySelector('[data-previous-operation]')
const currentOperationTextElement =  document.querySelector('[data-current-operation]')

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    const result = calculator.runningTotal;
    calculator.clear();
    calculator.currentOperation = result.toString();
    calculator.updateDisplay();
});

  

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })