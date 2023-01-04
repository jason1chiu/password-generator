// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    function generatePassword() {


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

        var response = lowercaseChars + uppercaseChars + numericChars + specialChars;

        // generates an empty string to highlight different situations
        var charsSet = "";

        function findCharsSet(type) {

            // variables for different types of characters 
            var lowercase = "abcdefghijklmnopqrstuvwxyz";
            var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var number = "0123456789";
            var special = "!:#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

            // invalid length of response
            if (type.length !== 4) {
                alert("invalid length of response argument");
                return;
            }

            // conditionals for including which characters to have
            if (type[0] === "Y") { charsSet += lowercase };
            if (type[1] === "Y") { charsSet += uppercase };
            if (type[2] === "Y") { charsSet += number };
            if (type[3] === "Y") { charsSet += special };
        }

        // function to find the characters based on response
        findCharsSet(response);
        
        // generates an empty string to fill in password
        var result = ""

        // for loop for the password generation at consecutive indices
        for (var i = 0; i < passwordLength; i++) {
            // creates an random number between 0 and 1, multiply it by the length of charsSet, and rounding it down to the nearest integer
            var randomNumber = Math.floor(Math.random() * charsSet.length);
            // generates a string by adding characters consecutively
            result += charsSet.charAt(randomNumber);
        }
        // returns the password
        return result;

        /* // create an empty array of unsigned 32-bit integers based of the number of characters in charsSet 
        var array = new Uint32Array(charsSet.length);

        // fills the array with random numbers in its cryptographic meaning
        window.crypto.getRandomValues(array);

        // generates an empty string to fill in password
        var result = ""
    
        // generates the password one character at a time
        for (var i = 0; i < passwordLength; i++) {
            result += charsSet[array[i] % charsSet.length];
        }
        return result; */
    }

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);