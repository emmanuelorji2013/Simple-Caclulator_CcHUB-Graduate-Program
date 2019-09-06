const allButtons = document.getElementsByClassName("bu")

var displayValue = "0";
var waitingForOperator = false;
var isNewOperation = false;
var canPoint = true;
var isAnswer = false;


updateDisplayValue = (e) => {
    var buText = e.target.value;
    switch (buText) {
    //Digits
    case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0": {
        
        //if(isNewOperation)
        if((displayValue === "0") || isNewOperation) {
            displayValue = "";
            //display(displayValue);
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
        if(waitingForOperator && (displayValue !== "0") ) {
            
            displayValue = (isNewOperation && !waitingForOperator )? "": displayValue;
            displayValue += buText
            display(displayValue);
            waitingForOperator = false;
            canPoint = true;
            isAnswer = false;
        }
        break;
    }

    case "AC": {
        clearScreen();
        break;
    }
    case "=": {
        performOperation(displayValue);
        //isNewOperation = true;
        break;
    }

    case ".": {
        if((waitingForOperator && canPoint)) {
            displayValue += buText
            canPoint = false;
            waitingForOperator = false; //Point cannot be followed by an operator
        }
        display(displayValue)
        break;
    
    }
    
    case "%": {
        //The percentage of the evaluation of the whole entry is calculated 
        performOperation("(" + displayValue + ")" + "/100")  
       // isNewOperation = true;
        //Add /100 the display 
        break;
    }
    case "(-)": {
        
        if (isAnswer) {
            displayValue = (displayValue[0] == "-")? displayValue.slice(1, displayValue.length): "-" + displayValue;
        } else {
            displayValue = (displayValue[0] == "-")? displayValue.slice(2,displayValue.length - 1): "-(" + displayValue + ")";
        }
        
        display(displayValue);
        break;
    }

    case "(": case ")": {

        displayValue = (displayValue === "0")? (buText): (displayValue + buText)
        display(displayValue);
        break;
    }
    
    case "\u0011": {
        // (\u0011) is unicode for the HTML code (&#17;) used for back button
        displayValue = displayValue.slice(0, displayValue.length-1);
        display(displayValue);
    }
        // default:
        //     break;
    }
    
    
}

function clearScreen() {
    displayValue = "0";
    display(displayValue);
    waitingForOperator = true;
    isNewOperation = false;//Allow the zero to be used when a point is the next input
    canPoint = true;
}

function display(displayVal) {
    document.getElementById("disp").value = displayVal;
}

function performOperation(displayVal) {
    //displayValue = displayVal
    if(displayVal && (displayVal !== "0")) {
        try {
            var convertedDisplayValue = displayVal.toString().replace(/\u005E/g, "**"); // (/\u005E/g) is regular expression for all appearances of (^)
            displayValue = eval(convertedDisplayValue).toString();
            
            canPoint = displayValue.includes(".")? false: canPoint; //Disable addition of point if answer contains "." 
            
            display(displayValue);
            isAnswer = true;
        } catch (error) {
            alert(error);
        }
        //waitingForOperator = false;
    }
    
}


//Assigning Event Listeners for all Buttons
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", updateDisplayValue);
}

/*
TODO:   (1) Button (-) shouldn't work when display is zero or empty
        (2) Use regular expression to make sure (-) works well when minus sign is to be removed from a number that 
            is not in the form -(xxx)
        (3) Make expressions of the form x(y) work by putting * whenever a number is just before "(" or just after ")"
*/