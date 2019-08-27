const allButtons = document.getElementsByClassName("bu")

var displayValue = "0";
var waitingForOperator = false;
var isNewOperation = false;


updateDisplayValue = (e) => {
    var buText = e.target.value;
    switch (buText) {
    //Digits
    case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0": {
        
        //if(isNewOperation)
        if(displayValue === "0" || isNewOperation) {
            displayValue = "";
            display(displayValue);
            isNewOperation = false;
        }
        displayValue += buText;
        display(displayValue);
        
        waitingForOperator = true;
        break;
    }
    //Addition, multiplication and Division Signs
    case "+": case "-": case "x": case "/": case "^": {
        buText = (buText == "x")? "*": buText;  //Replaces x with *
        if((waitingForOperator && displayValue !== "0") ) {
            
            displayValue = (isNewOperation && !waitingForOperator )? "": displayValue;
            displayValue += buText
            display(displayValue);
            waitingForOperator = false;
        }
        break;
    }

    case "AC": {
        clearScreen();
        break;
    }
    case "=": {
        performOperation(displayValue);
        isNewOperation = true;
        break;
    }

    case ".": {
        if(!(displayValue.includes(buText)) && waitingForOperator) {
            displayValue += buText
        }
        display(displayValue)
        break;
    
    }
    
    case "%": {
        //The percentage of the evaluation of the whole entry is calculated 
        performOperation("(" + displayValue + ")" + "/100")  
        isNewOperation = true;
        //Add /100 the display 
        break;
    }
    case "(-)": {
        displayValue = (displayValue[0] == "-")? displayValue.slice(1): "-" + displayValue;
        display(displayValue);
        break;
    }

    case "(": case ")": {

        displayValue = (displayValue === "0")? (buText): (displayValue + buText)
        display(displayValue);
        break;
    }     
        // default:
        //     break;
    }
    
    
}

function clearScreen() {
    displayValue = "0";
    display(displayValue);
}

function display(displayVal) {
    document.getElementById("disp").value = displayVal;
}

function performOperation(displayVal) {
    displayValue = displayVal
    var convertedDisplayValue = displayVal.replace(/\u005E/g, "**");
    try {
        displayVal = eval(convertedDisplayValue);
        display(displayVal);
    } catch (error) {
        alert(error);
    }
    waitingForOperator = false;
}


//Assigning Event Listeners for all Buttons
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", updateDisplayValue);
}