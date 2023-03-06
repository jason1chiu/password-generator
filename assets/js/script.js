// Select the "Generate Password" button
var generateBtn = document.querySelector("#generate");

// Create a new Bootstrap modal instance
const notifyModal = new bootstrap.Modal(document.getElementById('notifyModal'), {})

// Define the main password generation function
async function writePassword() {

  // Call the generatePassword function and wait for it to complete
  var password = await generatePassword();

  // Select the text input where the password will be displayed
  var passwordText = document.querySelector("#password");

  // Define the function to generate the password
  async function generatePassword() {

    // Prompt the user for the password length, lowercase, uppercase, numeric, and special characters
    var passwordLength = await myPrompt("Choose the number of characters (8 to 128) in your password.",'number');
    var lowercaseChars = await myPrompt("Do you want to include lowercase characters in your password?", 'boolean');
    var uppercaseChars = await myPrompt("Do you want to include uppercase characters in your password?", 'boolean');
    var numericChars = await myPrompt("Do you want to include numeric characters in your password? [Y for yes or N for no]",'boolean');
    var specialChars = await myPrompt("Do you want to include special characters in your password? [Y for yes or N for no]",'boolean');

    // Combine the user's responses into a single string
    var response = lowercaseChars + uppercaseChars + numericChars + specialChars;

    // Check if the user did not select any character types
    if (response === "NNNN") {
      myAlert("Invalid responses to create password");
    } else {
      // Hide the modal
      notifyModal.hide();
    }

    // Define the character set based on the user's selections
    var charsSet = "";
    function findCharsSet(type) {
      var lowercase = "abcdefghijklmnopqrstuvwxyz";
      var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var number = "0123456789";
      var special = "!:#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

      if (type[0] === "Y") { charsSet += lowercase };
      if (type[1] === "Y") { charsSet += uppercase };
      if (type[2] === "Y") { charsSet += number };
      if (type[3] === "Y") { charsSet += special };
    }
    findCharsSet(response);

    // Generate the random password using the defined character set and password length
    var result = ""
    for (var i = 0; i < passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * charsSet.length);
      result += charsSet.charAt(randomNumber);
    }

    // Return the generated password
    return result;
  }

  // Display the generated password in the password text input
  passwordText.value = password;
}

// Add event listener to the "Generate Password" button
generateBtn.addEventListener("click", writePassword);

// Select the elements in the modal that will be updated
const notifyModalLabel = document.getElementById('notifyModalLabel');
const notifyModalBody = document.getElementById('notifyModalBody');
const notifyModalButton = document.getElementById('notifyModalButton');
const closeModalButton = document.getElementById('closeModalButton');

// Add event listener to the "Generate Password" button in the modal to disable it
notifyModalButton.addEventListener('click', () => {
    notifyModalButton.setAttribute('disabled', true);
});

// Define a function to display alerts in the modal
function myAlert(message) {
  notifyModal.show();
    // Set the alert message
    notifyModalBody.innerText = message;

    // Enable the "Close" button
    closeModalButton.removeAttribute('disabled');
  
    // Add event listener to the "Close" button to hide the modal
    closeModalButton.addEventListener('click', () => {
      notifyModal.hide();
    });
  };
  
  // Define a function to display prompts in the modal
  async function myPrompt(question, type) {
  
    // Show the modal and disable the "Generate" button
    notifyModal.show();
    closeModalButton.setAttribute('disabled', true);
  
    // Set the question as the modal label
    notifyModalLabel.innerText = question;
  
    // Initialize the result variable to null
    let result = null;
  
    // Check the type of prompt (number or boolean)
    if (type === 'number') {
  
      // Show a number input with a minimum of 8 and a maximum of 128
      notifyModalBody.innerHTML = `
      <div class="col-md-3">
        <input min='8' max='128' type="number" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" required>
        <div id="validationServer05Feedback" class="invalid-feedback"></div>
      </div>
      `;
  
      // Add event listener to the number input to validate the input and enable the "Generate" button
      notifyModalBody.querySelector('input').addEventListener('input', (event) => {
        let value = event.target.value;
        result = value;
        if (value.match(/[0-9]/g) && +value >= 8 && +value <= 128) {
          notifyModalButton.removeAttribute('disabled');
        } else {
          notifyModalButton.setAttribute('disabled', true);
        }
      });
  
    } else if (type === 'boolean') {
  
      // Show two radio buttons for "Yes" and "No" options
      notifyModalBody.innerHTML = `
      <div class="form-check">
        <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required value='Y'>
        <label class="form-check-label" for="validationFormCheck2">Yes</label>
      </div>
      <div class="form-check mb-3">
        <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required value='N'>
        <label class="form-check-label" for="validationFormCheck3">No</label>
        <div class="invalid-feedback">More example invalid feedback text</div>
      </div>
      `;
  
      // Add event listener to the radio buttons to get the selected value and enable the "Generate" button
      notifyModalBody.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', (event) => {
          result = event.target.value;
          notifyModalButton.removeAttribute('disabled');
        });
      });
    };
  
    // Return a Promise that resolves to the user's response
    return new Promise((res, rej) => {
      notifyModalButton.addEventListener('click', () => {
        res(result);
      });
    });
  };
  