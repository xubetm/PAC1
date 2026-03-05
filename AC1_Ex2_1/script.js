const form = document.querySelector(".caja-formulario");
const user = document.getElementById("user");
const password = document.getElementById("password");
const email = document.getElementById("email");
const confirmPassword = document.getElementById("confirm-password");
const age = document.getElementById("age");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userNameValue = user.value.trim();
  const userError = document.getElementById("user-error");

  if (userNameValue === "" || userNameValue.length < 3) {
    userError.textContent = "Error: el user debe tener al menos 3 caracteres";
    user.style.border = "2px solid red";
  } else {
    user.style.border = "2px solid green";
    userError.textContent = "";
  }

  const emailValue = email.value.trim();
  const emailError = document.getElementById("email-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    emailError.textContent = "El formato de email no es correcto";
    email.style.border = "2px solid red";
  } else {
    emailError.textContent = "";
    email.style.border = "2px solid green";
  }

  const ageValue = age.value.trim();
  const errorAge = document.getElementById("age-error");

  if (ageValue < 0 || ageValue >= 100) {
    errorAge.textContent =
      "La edad no puede ser más pequeña que 0 ni más grande que 100";
    age.style.border = "2px solid red";
  } else {
    errorAge.textContent = "";
    age.style.border = "2px solid green";
  }

  const passwordValue = password.value.trim();
  const passwordError = document.getElementById("error-password");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()_+\-={}|\[\]\\:";'<>?,./]).{8,}$/;

  if (!passwordRegex.test(passwordValue)) {
    passwordError.textContent =
      "Error: el password ha de tener al menos 8 caracteres, mayúscula, minúscula, número y símbolo";
    password.style.border = "2px solid red";
  } else {
    passwordError.textContent = "";
    password.style.border = "2px solid green";
  }

  const confirmPasswordValue = confirmPassword.value.trim();
  const errorConfirmPassword = document.getElementById("error-confirmPassword");

  if (confirmPasswordValue !== passwordValue) {
    errorConfirmPassword.textContent = "Error: El Password no coincide";
    confirmPassword.style.border = "2px solid red";
  } else {
    errorConfirmPassword.textContent = "";
    confirmPassword.style.border = "2px solid green";
  }

  console.log("Username:", user.value);
  console.log("Password:", password.value);
  console.log("Email:", email.value);
  console.log("confirm-password:", confirmPassword.value);
  console.log("Age:", age.value);

  user.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  age.value = "";
});
