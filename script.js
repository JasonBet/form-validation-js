const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD, and SS",
    ],
};

const form = document.querySelector("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const postalCode = document.getElementById("postal-code");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

function showError(field, message) {
    const error = field.nextElementSibling;
    field.className = "invalid";
    error.textContent = message;
    error.className = "error active";
}

function clearError(field) {
    const error = field.nextElementSibling;
    field.className = "valid";
    error.textContent = "";
    error.className = "error";
}

function validateEmail() {
    const emailRegExp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    if (isValid) {
        clearError(email);
    } else {
        showError(email, "Please enter a valid email address");
    }
}

function validateCountry() {
    if(!country.value) {
        showError(country, "Please select a country");
    } else {
        clearError(country);
    }
}

function checkPostalCode() {
    const selectedCountry = country.value;
    const postalCodeField = postalCode.value;

    if (!selectedCountry) {
        showError(country, "Please select a country.");
        return;
    }

    const constraint = new RegExp(constraints[selectedCountry][0], "");

    if(constraint.test(postalCodeField)) {
        clearError(postalCode);
    } else {
        showError(
        postalCode,
        constraints[selectedCountry][1]
        );
    }
}

function validatePassword() {
    if(password.value.length < 5) {
        showError(password, "Password must be at least 5 characters long");
    } else {
        clearError(password);
    }
}

function validateConfirmPassword() {
    if(confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match");
    } else {
        clearError(confirmPassword);
    }
}

country.addEventListener("change", checkPostalCode);
country.addEventListener("blur", checkPostalCode);
postalCode.addEventListener("input", checkPostalCode);

email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

// This defines what happens when the user tries to submit the data
form.addEventListener("submit", (event) => {
  event.preventDefault();

  validateEmail();
  validateCountry();
  checkPostalCode();
  validatePassword();
  validateConfirmPassword();

  const isValid = [...form.elements]
    .filter((field) => field.tagName === "INPUT" || field.tagName === "SELECT")
    .every((field) => field.className === "valid");

  if(isValid) {
    alert("HIGH FIVE!");
  } else {
    alert("You still have errors");
  }
});
