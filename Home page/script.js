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


const videos = document.querySelectorAll(".video-track, .video");
const track = document.querySelector(".video-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {

  let currentIndex = 0;
  const videosPerView = 4;
  const maxIndex = Math.max(0, videos.length - videosPerView);

  function updateSlider() {
    if (!videos.length) return;

    const videoWidth = videos[0].offsetWidth + 15; // width + gap
    track.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  updateSlider(); // initial position
});


// // Move slider
// function updateSlider() {
//   const videoWidth = videos[0].offsetWidth + 15; // width + gap
//   track.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
// }

// Optional: play video on hover
videos.forEach(video => {
  video.addEventListener("mouseenter", () => video.play());
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});
videos.forEach(video => {
  video.addEventListener("click", () => {
    const link = video.getAttribute("data-link");
    if (link) {
      window.open(link, "_blank"); // opens Instagram in new tab
    }
  });
});
const dropdown = document.querySelector(".dropdown");
const list = document.querySelector(".menu");
list.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

console.log(list);