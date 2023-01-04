// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    function generatePassword() {

        // variables for different types of characters 
        var lowercase = "abcdefghijklmnopqrstuvwxyz";
        var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var number = "0123456789";
        var special = "!:#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

        // prompting for an answer to indicate how many characters does the user want in their password
        var passwordLength = prompt("Choose the number of characters (8 to 128) in your password.");
        // returns a message if user decides to cancel or enter no response
        if (passwordLength === "" || passwordLength === null) {
            return "Thank you for trying my password generator!"
        }
        // while loop for passwordLength until conditions are met
        while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
            // alerts and prompts again if conditionals are not met
            alert("Must be a number between 8 and 128");
            passwordLength = prompt("Choose the number of characters (8 to 128) in your password.");
            // returns a message if user decides to cancel or enter no response
            if (passwordLength === "" || passwordLength === null) {
                return "Thank you for trying my password generator!"
            }
            // breaks out of while loop to move on to next prompt
            if (passwordLength >= 8 && passwordLength <= 128) {
                break;
            }
        }

        // prompting for an answer to include lowercase characters in password
        var lowercaseChars = prompt("Do you want to include lowercase characters in your password? [Y for yes or N for no]");
        // returns a message if user decides to cancel or enter no response
        if (lowercaseChars === "" || lowercaseChars === null) {
            return "Thank you for trying my password generator!"
        }
        // while loop for lowercaseChars until conditions are met
        while (!(lowercaseChars === "Y" || lowercaseChars === "N")) {
            // alerts and prompts again if conditionals are not met
            alert("Must be Y or N");
            lowercaseChars = prompt("Do you want to include lowercase characters in your password? [Y for yes or N for no]");
            // returns a message if user decides to cancel or enter no response
            if (lowercaseChars === "" || lowercaseChars === null) {
                return "Thank you for trying my password generator!"
            }
            // breaks out of while loop to move on to next prompt
            if (lowercaseChars === "Y" || lowercaseChars === "N") {
                break;
            }
        }

        // prompting for an answer to include upperase characters in password
        var uppercaseChars = prompt("Do you want to include uppercase characters in your password? [Y for yes or N for no]");
        if (uppercaseChars === "" || uppercaseChars === null) {
            return "Thank you for trying my password generator!"
        }
        // while loop for uppercaseChars until conditions are met
        while (!(uppercaseChars === "Y" || uppercaseChars === "N")) {
            // alerts and prompts again if conditionals are not met
            alert("Must be Y or N");
            uppercaseChars = prompt("Do you want to include uppercase characters in your password? [Y for yes or N for no]");
            if (uppercaseChars === "" || uppercaseChars === null) {
                return "Thank you for trying my password generator!"
            }
            // breaks out of while loop to move on to next prompt
            if (uppercaseChars === "Y" || uppercaseChars === "N") {
                break;
            }
        }

        // prompting for an answer to include numeric characters in password
        var numericChars = prompt("Do you want to include numeric characters in your password? [Y for yes or N for no]");
        // while loop for numericChars until conditions are met
        while (!(numericChars === "Y" || numericChars === "N")) {
            alert("Must be Y or N");
            numericChars = prompt("Do you want to include numeric characters in your password? [Y for yes or N for no]");
            // breaks out of while loop to move on to next prompt
            if (numericChars === "Y" || numericChars === "N") {
                break;
            }
        }

        // prompting for an answer to include special characters in password
        var specialChars = prompt("Do you want to include special characters in your password? [Y for yes or N for no]");
        // while loop for specialChars until conditions are met
        while (!(specialChars === "Y" || specialChars === "N")) {
            alert("Must be Y or N");
            specialChars = prompt("Do you want to include special characters in your password? [Y for yes or N for no]");
            // breaks out of while loop to move on to next step
            if (specialChars === "Y" || specialChars === "N") {
                break;
            }
        }

        // generates a string for the answers given in the prompts
        var response = lowercaseChars + uppercaseChars + numericChars + specialChars;

        // generates an empty string to highlight different situations
        var charsSet = ""

        // switch among the 15 possible cases provided by response
        switch (response) {
            case "YYYY":
                charsSet = lowercase + uppercase + number + special;
                break;
            case "YYYN":
                charsSet = lowercase + uppercase + number;
                break;
            case "YYNY":
                charsSet = lowercase + uppercase + special;
                break;
            case "YNYY":
                charsSet = lowercase + number + special;
                break;
            case "YYNN":
                charsSet = lowercase + uppercase;
                break;
            case "YNYN":
                charsSet = lowercase + number;
                break;
            case "YNNY":
                charsSet = lowercase + special;
                break;
            case "YNNN":
                charsSet = lowercase;
                break;
            case "NYYY":
                charsSet = uppercase + number + special;
                break;
            case "NYYN":
                charsSet = uppercase + number;
                break;
            case "NYNY":
                charsSet = uppercase + special;
                break;
            case "NYNN":
                charsSet = uppercase;
                break;
            case "NNYY":
                charsSet = number + special;
                break;
            case "NNYN":
                charsSet = number;
                break;
            case "NNNY":
                charsSet = special;
                break;
        }

        var array = new Uint32Array(charsSet.length);

        window.crypto.getRandomValues(array);
        var result = ''

        for (var i = 0; i < passwordLength; i++) {
            result += charsSet[array[i] % charsSet.length];
        }
        return result;

        /*       // generates an empty string to output a password
              var result = "";

              // for loop for the password generation at consecutive indices
              for (var i = 0; i < passwordLength; i++) {
                // creates an random number between 0 and 1, multiply it by the length of charsSet, and rounding it down to the nearest integer
                var randomNumber = Math.floor(Math.random() * charsSet.length);
                // generates a string by adding characters consecutively
                result += charsSet.charAt(randomNumber);
              }
              // returns the password
              return result; */
    }

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);