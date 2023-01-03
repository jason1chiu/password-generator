// Assignment Code
var generateBtn = document.querySelector("#generate");

var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var number = "0123456789";
var special = "!:#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  function generatePassword() {
    var passwordLength = prompt("Choose the number of characters in your password.");

    if (passwordLength < 8 || passwordLength > 128) {
      alert("Password must be between 8 to 128 characters.")
    } else {
      var lowercaseChars = prompt("Do you want to include lowercase characters in your password? [Y for yes or N for no]");
      var uppercaseChars = prompt("Do you want to include uppercase characters in your password? [Y for yes or N for no]");
      var numericChars = prompt("Do you want to include numbers in your password? [Y for yes or N for no]");
      var specialChars = prompt("Do you want to include special characters in your password? [Y for yes or N for no]");

      var response = lowercaseChars + uppercaseChars + numericChars + specialChars;
      var charsSet = ""

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

      var result = '';
      for (var i = 0; i < passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * charsSet.length);
        result += charsSet.charAt(randomNumber);
      }
      return result;
    }
  }

  passwordText.value = password;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
