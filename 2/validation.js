const form = document.getElementById("form");

const checkFirstName = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const firstNameElement = document.getElementById("firstName");
  const firstName = firstNameElement.value.trim();
  const firstLetter = firstName.charAt(0);

  if (!isRequired(firstName)) {
    showError(firstNameElement, "First name cannot be blank.");
  } else if (!isBetween(firstName.length, min, max)) {
    showError(
      firstNameElement,
      `First name must be between ${min} and ${max} characters.`
    );
  } else if (firstLetter.toUpperCase() !== firstLetter) {
    showError(firstNameElement, `First name must start with the uppercase.`);
  } else {
    showSuccess(firstNameElement);
    valid = true;
  }
  return valid;
};

const checkLastName = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const lastNameElement = document.getElementById("lastName");
  const lastName = lastNameElement.value.trim();

  if (!isRequired(lastName)) {
    showError(lastNameElement, "Last name cannot be blank.");
  } else if (!isBetween(lastName.length, min, max)) {
    showError(
      lastNameElement,
      `Last name must be between ${min} and ${max} characters.`
    );
  } else if (firstLetter.toUpperCase() !== firstLetter) {
    showError(lastNameElement, `Last name must start with the uppercase.`);
  } else {
    showSuccess(lastNameElement);
    valid = true;
  }
  return valid;
};

const checkBirthYear = () => {
  let valid = false;
  const min = 1930,
    max = 2022;

  const birthYearElement = document.getElementById("birthYear");
  const birthYear = birthYearElement.value.trim();

  if (!isRequired(birthYear)) {
    showError(birthYearElement, "Birth year cannot be blank.");
  } else if (!isBetween(parseInt(birthYear), min, max)) {
    showError(
      birthYearElement,
      `Birth year must be between ${min} and ${max}.`
    );
  } else {
    showSuccess(birthYearElement);
    valid = true;
  }

  return valid;
};

const checkGender = () => {
  let valid = false;

  const genderElement = document.getElementById("gender");
  const gender = genderElement.value.trim();

  if (!isRequired(gender)) {
    showError(genderElement, "Gender cannot be blank.");
  } else {
    showSuccess(genderElement);
    valid = true;
  }

  return valid;
};

const checkAdress = () => {
  let valid = false;

  const adressElement = document.getElementById("adress");
  const adress = adressElement.value.trim();

  if (!isRequired(adress)) {
    showError(adressElement, "Adress cannot be blank.");
  } else {
    showSuccess(adressElement);
    valid = true;
  }

  return valid;
};

const checkCity = () => {
  let valid = false;

  const cityElement = document.getElementById("city");
  const city = cityElement.value.trim();

  if (!isRequired(city)) {
    showError(cityElement, "City cannot be blank.");
  } else {
    showSuccess(cityElement);
    valid = true;
  }

  return valid;
};

const checkCheckbox = () => {
  let valid = false;

  const checkElement = document.getElementById("check");
  const check = checkElement.value.trim();

  if (!isRequired(check)) {
    showError(checkElement, "You must consent to sanding your data");
  } else {
    showSuccess(checkElement);
    valid = true;
  }

  return valid;
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  const formField = input.parentElement;
  
  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

$("form").on("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const isFormValid = validateForm();

  if (isFormValid) {
    submitForm();
  }
}

const validateForm = () => {
  let isFirstNameValid = checkFirstName(),
    isLastNameValid = checkLastName(),
    isBirthYearValid = checkBirthYear(),
    isGenderValid = checkGender(),
    isAdressValid = checkAdress(),
    isCityValid = checkCity(),
    isCheckValid = checkCheckbox();

  return (
    isFirstNameValid &&
    isLastNameValid &&
    isBirthYearValid &&
    isGenderValid &&
    isAdressValid &&
    isCityValid &&
    isCheckValid
  );
};

const submitForm = () => {
  const statusElement = document.getElementById("status");
  const titleElement = document.getElementById("title");

  titleElement.innerText = "Success!";
  statusElement.innerHTML = "Thanks for your submission!";
  setSentData();
  form.innerHTML = "";
};

const setSentData = () => {
  const sentDataElement = document.getElementById("sentData");
  sentDataElement.innerHTML += "Sent values: " + "<br>";

  const firstName = document.getElementById("firstName").value.trim();
  sentDataElement.innerHTML += firstName + "<br>";

  const lastName = document.getElementById("lastName").value.trim();
  sentDataElement.innerHTML += lastName + "<br>";

  const birthYear = document.getElementById("birthYear").value.trim();
  sentDataElement.innerHTML += birthYear + "<br>";

  const gender = document.getElementById("gender").value.trim();
  sentDataElement.innerHTML += gender + "<br>";

  const adress = document.getElementById("adress").value.trim();
  sentDataElement.innerHTML += adress + "<br>";

  const city = document.getElementById("city").value.trim();
  sentDataElement.innerHTML += city + "<br>";

  //   var x = $("form").serializeArray();
  //   $.each(x, function (i, field) {
  //     $("#sentData").append(field.name + ":" + field.value + " ");
  //   });

  //   for (const keyValuePair of data.entries()) {
  //     sentDataElement += `<p>${keyValuePair[0]}: ${keyValuePair[1]}</p>`;
  //   }
};
