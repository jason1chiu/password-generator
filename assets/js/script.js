// This variable selects the button element with the ID "generate"
var generateBtn = document.querySelector("#generate");

// This creates a new instance of the Bootstrap Modal for notifications
const notifyModal = new bootstrap.Modal(document.getElementById('notifyModal'), {})

// This function writes the generated password to the password field in the HTML document
async function writePassword() {

  // This variable awaits the generated password from the generatePassword() function
  var password = await generatePassword();

  // This variable selects the HTML element where the generated password will be written
  var passwordText = document.querySelector("#password");

  // This function generates the password with user inputs and returns it
  async function generatePassword() {
    
    // These variables await user input from the custom prompt function myPrompt()
    var passwordLength = await myPrompt("Choose the number of characters (8 to 128) in your password.", 'number');
    var lowercaseChars = await myPrompt("Do you want to include lowercase characters in your password? [Y for yes or N for no]", 'boolean');
    var uppercaseChars = await myPrompt("Do you want to include uppercase characters in your password? [Y for yes or N for no]",'boolean');
    var numericChars = await myPrompt("Do you want to include numeric characters in your password? [Y for yes or N for no]", 'boolean');
    var specialChars = await myPrompt("Do you want to include special characters in your password? [Y for yes or N for no]",'boolean');

    // This condition checks if all user responses are "N" and shows an error message if they are
    if (lowercaseChars === "N" && uppercaseChars === "N" && numericChars === "N" && specialChars === "N") {
      myAlert("Your responses cannot all be 'No'");
    }

    // This hides the notification modal
    notifyModal.hide()

    // This variable concatenates the user's input into one string
    var response = lowercaseChars + uppercaseChars + numericChars + specialChars;
    var charsSet = "";
    
    // This function generates the character set for the password based on the user's input
    function findCharsSet(type) {
      var lowercase = "abcdefghijklmnopqrstuvwxyz";
      var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var number = "0123456789";
      var special = "!:#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

      if (type[0] === "Y") {
        charsSet += lowercase
      };
      if (type[1] === "Y") {
        charsSet += uppercase
      };
      if (type[2] === "Y") {
        charsSet += number
      };
      if (type[3] === "Y") {
        charsSet += special
      };
    }

    // This calls the findCharsSet() function to generate the character set
    findCharsSet(response);
    var result = ""

    // This loop generates the password using the generated character set and password length
    for (var i = 0; i < passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * charsSet.length);
      result += charsSet.charAt(randomNumber);
    };

    // This returns the generated password
    return result;
  };

  // This writes the generated password to the HTML document
  passwordText.value = password;
};

// This adds an event listener to the "Generate Password" button to trigger the writePassword() function
generateBtn.addEventListener("click", writePassword);

// These variables select the necessary elements in the notification modal
const notifyModalLabel = document.getElementById('notifyModalLabel');
const notifyModalBody = document.getElementById('notifyModalBody');
const notifyModalButton = document.getElementById('notifyModalButton');

// This event listener disables the notification modal button when it is clicked
notifyModalButton.addEventListener('click', () => {
    notifyModalButton.setAttribute('disabled', true);
});

// This function shows an error message in the notification modal
function myAlert(message) {
  notifyModalLabel.innerText = 'Error';
  notifyModalBody.innerText = message;
  notifyModalButton.removeAttribute('disabled');
}

// This function creates a custom prompt using the notification modal and returns the user's input
async function myPrompt(question, type) {

  // This shows the notification modal and sets the question as the label
  notifyModal.show();
  notifyModalLabel.innerText = question;
  let result = null;
  
  // This condition generates a number input field in the notification modal body
  if (type === 'number') {
    notifyModalBody.innerHTML = `
      <div class="col-md-3">
        <input min='8' max='128' type="number" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" required>
        <div id="validationServer05Feedback" class="invalid-feedback">
        </div>
      </div>
    `;

    // This event listener updates the result variable with the input value and enables/disables the modal button based on input validity
    notifyModalBody.querySelector('input').addEventListener('input', (event) => {
    let value = event.target.value;
    result = value;
    if (value.match(/[0-9]/g) && +value >= 8 && +value <= 128) {
      notifyModalButton.removeAttribute('disabled');
    } else {
      notifyModalButton.setAttribute('disabled',true);
      }
    });

  // This condition generates a boolean input field in the notification modal body
  } else if (type === 'boolean') {
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

    // This event listener updates the result variable with the selected radio button value and enables the modal button
    notifyModalBody.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', (event) => {
      result = event.target.value;
      notifyModalButton.removeAttribute('disabled');
      })
    })
  }

  // This returns a promise that resolves with the user's input when the modal button is clicked
  return new Promise((res) => {
    notifyModalButton.addEventListener('click', () => {
      res(result)
    })
  })
}