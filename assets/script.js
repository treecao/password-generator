var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
    console.log ("button pressed");
    // set variable of character types
    var uppercaseArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var lowercaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",  "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; 
    var specialCharsArray = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+"];
    var selectedArray = [];
    var characterCount = getCharacterCount();
    var typeSelected = false;
        //replacing to fix the cancel option. only execute if it's the response is not null
        // while (typeSelected == false) {
    while (characterCount != null && typeSelected == false) {
        var uppercase = selectedResponse("uppercase");
        if (uppercase == null) { 
            return null;
    }
        var lowercase = selectedResponse("lowercase");
        if (lowercase == null) { 
            return null;
    }
        var numChar = selectedResponse("numeric");
        if (numChar == null) { 
            return null;
    }
        var specialChars = selectedResponse("special");
        if (specialChars == null) { 
            return null;
    }
        //added to handle null responses when cancelled 
        if (uppercase == null || lowercase == null || numChar == null || specialChars == null) { 
            return null;
        }
        if ((uppercase) || (lowercase) || (numChar) || (specialChars)) {
            typeSelected = true;
        } 
        else {
        window.alert("Please response 'Yes' to at least one of the previous prompts.")
        }
    }
    //conditions to return; appends to blank array 
    if (lowercase) {
        selectedArray = selectedArray.concat(lowercaseArray);
    }
    if (uppercase) {
        selectedArray = selectedArray.concat(uppercaseArray);
    }
    if (numChar) {
        selectedArray = selectedArray.concat(numberArray);
    }
    if (specialChars) {
        selectedArray = selectedArray.concat(specialCharsArray);
    }
    var passwordString = "";
    for (var i = 0; i < characterCount; i++) {
        passwordString += selectedArray[Math.floor(Math.random() * (selectedArray.length))];
    }
    return passwordString;
}

//putting it all together :)
function getCharacterCount() {
    var userChoice = 0;
    while ((userChoice < 8) || (userChoice > 128)) {
        //removing parseInt to try & reroute the cancel action; replacing into the else
        userChoice = /*parseInt*/window.prompt("Enter the desired length of your password. (min 8; max 128)");
        if (userChoice == null) {
            return;
        }
        else {
            userChoice = parseInt(userChoice);
            //verify entered response is valid (contains numbers between 8-128)
            if (isNaN(userChoice)) {
            userChoice = 0;
            }
            if ((userChoice < 8) || (userChoice > 128)) {
                window.alert("Invalid Response.");
            }
        }
        return userChoice;
    } 
}

//message prompts
function selectedResponse(openPrompt) {
    var userChoice = "a";
    var messagePrompt = ("Would you like to include " + openPrompt + " characters in your password?");
    // validate response
    while (userChoice = "a") {
        userChoice = (window.prompt(messagePrompt));
        if (userChoice == null) {
            return null;
        }
        else {
            // adjust capitalization to match lowercase
            userChoice = userChoice.toLowerCase();
            if (userChoice == "yes") {
                return true;
            } 
            else if (userChoice == "no") {
                return false;
            }
            //return invalid alert if their response is not yes or no
            else {window.alert("Invalid Response. Please respond with either 'yes' or 'no'");
            console.log("Invalid Response. Input 'yes' or 'no' in the entry box.")
            }
        }
    }   
}

//display password
function writePassword() {
    var password = generatePassword();
    if (password != null) {  
        var passwordText = document.querySelector("#password");
        passwordText.value = password;
        console.log()
    }
    else {
        window.alert("Cancelled :(");
    }
}