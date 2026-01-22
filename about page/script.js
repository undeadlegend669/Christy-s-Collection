const darkToggle = document.getElementById("darkModeToggle");
const dropdown = document.querySelector(".dropdown");
const list = document.querySelector(".list");
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark") ? "enabled" : "disabled"
    );
});

list.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});
