// 1. Session Guard (Ensures visitor came through the gate)
if (sessionStorage.getItem("access_granted") !== "true") {
  window.location.replace("index.html");
}

// 2. Audio Control for Background Music
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");
  const status = document.getElementById("music-status");

  // Modern browsers block autoplay until a user interacts with the page
  const tryAutoplay = () => {
    music.play().then(() => {
      icon.textContent = "🔊";
      status.textContent = "Playing “Mein Tera”";
    }).catch(() => {
      icon.textContent = "▶️";
      status.textContent = "Tap to Play Music";
    });
  };

  // Attempt play immediately
  tryAutoplay();

  // Try on first document click if autoplay was initially blocked
  document.body.addEventListener("click", () => {
    if (music.paused) {
      tryAutoplay();
    }
  }, { once: true });

  // Toggle button handler
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      music.play();
      icon.textContent = "🔊";
      status.textContent = "Playing “Mein Tera”";
    } else {
      music.pause();
      icon.textContent = "⏸️";
      status.textContent = "Paused";
    }
  });
});