const form = document.getElementById("contactForm");
const darkToggle = document.getElementById("darkModeToggle");
const dropdown = document.querySelector(".dropdown");
const list = document.querySelector(".list");

list.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";

});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  clearErrors();

  if (name.value.trim() === "") {
    showError(name, "Name is required");
    valid = false;
  }

  if (!validateEmail(email.value)) {
    showError(email, "Enter a valid email");
    valid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, "Message must be at least 10 characters");
    valid = false;
  }

  if (valid) {
    alert("Message sent successfully!");
    form.reset();
  }
});

function showError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(err => err.textContent = "");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* 🌙 Dark mode toggle */

if(localStorage.getItem('darkMode') === 'enabled'){
  document.body.classList.add('dark');
  darkToggle.checked = true;
}

darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')){
    localStorage.setItem('darkMode','enabled');
  } else {
    localStorage.setItem('darkMode','disabled');
  }
});