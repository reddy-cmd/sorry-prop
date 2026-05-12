const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const seekSlider = document.getElementById("seek-slider");
const curTimeLabel = document.getElementById("current-time");
const durTimeLabel = document.getElementById("duration-time");
const statusText = document.getElementById("status-text-value");
let isPlaying = false;

// Format seconds into M:SS
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  sec = Math.floor(sec);
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

// Function to update the slider and labels once music data is ready
function initMetadata() {
  durTimeLabel.textContent = formatTime(audio.duration);
  seekSlider.max = Math.floor(audio.duration);
  console.log("Music Metadata Loaded. Duration:", audio.duration);
}

// Event: Metadata loaded from server
audio.addEventListener("loadedmetadata", initMetadata);

// Fallback: If metadata was already loaded before the script ran
if (audio.readyState >= 1) {
  initMetadata();
}

// Update slider as music plays
audio.addEventListener("timeupdate", () => {
  seekSlider.value = Math.floor(audio.currentTime);
  curTimeLabel.textContent = formatTime(audio.currentTime);
});

// User moves the slider manually
seekSlider.addEventListener("input", () => {
  audio.currentTime = seekSlider.value;
  curTimeLabel.textContent = formatTime(audio.currentTime);
});

// Play/Pause Logic with Error Handling
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play()
      .then(() => {
        playBtn.innerHTML = "&#10073;&#10073;"; // Pause icon
        statusText.innerHTML = '<span style="font-size:1.3em;">&#127925;</span> PLAYING <span style="font-size:1.3em;">&#127925;</span>';
        isPlaying = true;
      })
      .catch((error) => {
        console.error("Playback failed. Check if the file path is correct:", error);
        alert("The browser blocked the music or the file wasn't found. Check the console (F12) for details.");
      });
  } else {
    audio.pause();
    playBtn.innerHTML = "&#9654;"; // Play icon
    statusText.textContent = "PAUSED";
    isPlaying = false;
  }
});

// When song finishes
audio.addEventListener("ended", () => {
  playBtn.innerHTML = "&#9654;";
  statusText.textContent = "PAUSED";
  isPlaying = false;
  audio.currentTime = 0;
  seekSlider.value = 0;
  curTimeLabel.textContent = formatTime(0);
});

// Previous Button (Restart Song)
document.getElementById("prev-btn").addEventListener("click", () => {
  audio.currentTime = 0;
  if (isPlaying) audio.play();
});

// Next Button (Skip to End)
document.getElementById("next-btn").addEventListener("click", () => {
  audio.currentTime = audio.duration || 0;
  audio.pause();
  playBtn.innerHTML = "&#9654;";
  statusText.textContent = "PAUSED";
  isPlaying = false;
});

// Navigation with Fade effect
function navigateWithFade(url) {
  document.body.classList.add("fadeout");
  setTimeout(() => {
    window.location.href = url;
  }, 700);
}

document.getElementById("backBtn").addEventListener("click", () => {
  navigateWithFade("SpecialCard.html");
});

document.getElementById("nextBtn").addEventListener("click", () => {
  navigateWithFade("ThankYouCard.html");
});