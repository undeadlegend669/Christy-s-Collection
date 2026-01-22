

const form = document.getElementById("paymentForm");
const popup = document.getElementById("successPopup");
const closeBtn = document.getElementById("closePopup");
const darkToggle = document.getElementById("darkModeToggle");

/* ---------- FORMATTING ---------- */
document.getElementById("cardNumber").addEventListener("input", e => {
  e.target.value = e.target.value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
});

document.getElementById("expiry").addEventListener("input", e => {
  e.target.value = e.target.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 5);
});

/* ---------- SUBMIT ---------- */
form.addEventListener("submit", e => {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById("name");
  const card = document.getElementById("cardNumber");
  const expiry = document.getElementById("expiry");
  const cvv = document.getElementById("cvv");

  let valid = true;

  if (!/^[a-zA-Z ]+$/.test(name.value.trim())) {
    showError(name, "Enter a valid name");
    valid = false;
  }

  const cleanCard = card.value.replace(/\s/g, "");
  if (!luhnCheck(cleanCard)) {
    showError(card, "Invalid card number");
    valid = false;
  }

  if (!validExpiry(expiry.value)) {
    showError(expiry, "Card expired or invalid");
    valid = false;
  }

  if (!/^\d{3}$/.test(cvv.value)) {
    showError(cvv, "Invalid CVV");
    valid = false;
  }

  if (valid) {
    popup.style.display = "flex";
    form.reset();
  }
});

/* ---------- HELPERS ---------- */
function luhnCheck(num) {
  let sum = 0;
  let flip = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num[i]);
    if (flip) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    flip = !flip;
  }
  return sum % 10 === 0;
}

function validExpiry(value) {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const [mm, yy] = value.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const expiry = new Date(2000 + yy, mm);
  return expiry > now;
}

function showError(input, message) {
  input.nextElementSibling.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Dark mode persistence
document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");

  // Load previous preference
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }

  // Toggle dark mode
  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark") ? "enabled" : "disabled"
    );
  });
});
const total = localStorage.getItem("cartTotal");
document.getElementById("amount").textContent = `${total}`;
