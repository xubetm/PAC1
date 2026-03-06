const form = document.querySelector(".caja-formulario");
const user = document.getElementById("user");
const password = document.getElementById("password");
const email = document.getElementById("email");
const confirmPassword = document.getElementById("confirm-password");
const age = document.getElementById("age");

function validateUser() {
  const userNameValue = user.value.trim();
  const userError = document.getElementById("user-error");

  if (userNameValue === "" || userNameValue.length < 3) {
    userError.textContent = "Error: el user debe tener al menos 3 caracteres";
    user.style.border = "2px solid red";
    return false;
  } else {
    user.style.border = "2px solid green";
    userError.textContent = "";
    return true;
  }
}

function validateEmail() {
  const emailValue = email.value.trim();
  const emailError = document.getElementById("email-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    emailError.textContent = "El formato de email no es correcto";
    email.style.border = "2px solid red";
    return false;
  } else {
    emailError.textContent = "";
    email.style.border = "2px solid green";
    return true;
  }
}

function validatePassword() {
  const passwordValue = password.value.trim();
  const passwordError = document.getElementById("error-password");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()_+\-={}|\[\]\\:";'<>?,./]).{8,}$/;

  if (!passwordRegex.test(passwordValue)) {
    passwordError.textContent =
      "Error: el password ha de tener al menos 8 caracteres, mayúscula, minúscula, número y símbolo";
    password.style.border = "2px solid red";
    return false;
  } else {
    passwordError.textContent = "";
    password.style.border = "2px solid green";
    return true;
  }
}

function validateConfirmPassword() {
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const errorConfirmPassword = document.getElementById("error-confirmPassword");

  if (confirmPasswordValue !== passwordValue) {
    errorConfirmPassword.textContent = "Error: El Password no coincide";
    confirmPassword.style.border = "2px solid red";
    return false;
  } else {
    errorConfirmPassword.textContent = "";
    confirmPassword.style.border = "2px solid green";
    return true;
  }
}

function validateAge() {
  const ageValue = Number(age.value.trim());
  const errorAge = document.getElementById("age-error");

  if (ageValue < 0 || ageValue >= 1000) {
    errorAge.textContent =
      "La edad no puede ser más pequeña que 0 ni más grande que 100";
    age.style.border = "2px solid red";
    return false;
  } else {
    errorAge.textContent = "";
    age.style.border = "2px solid green";
    return true;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userValid = validateUser();
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const confirmPasswordValid = validateConfirmPassword();
  const ageValid = validateAge();

  if (
    userValid &&
    emailValid &&
    passwordValid &&
    confirmPasswordValid &&
    ageValid
  ) {
    user.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    age.value = "";
  }
});
