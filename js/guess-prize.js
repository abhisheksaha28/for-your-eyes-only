// Session Guard
if (sessionStorage.getItem("access_granted") !== "true") {
  window.location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("unlock-form");
  const passInput = document.getElementById("prize-pass");
  const errorMsg = document.getElementById("prize-error");
  const frostOverlay = document.getElementById("frost-overlay");
  const lockModal = document.getElementById("lock-modal");
  const audio = document.getElementById("prize-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");
  const musicStatus = document.getElementById("music-status");

  // The password you requested
  const TARGET_PASS = "puchu-loves-abhi";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const entered = passInput.value.trim().toLowerCase();

    if (entered === TARGET_PASS) {
      // 1. Fade away frosted overlay
      frostOverlay.classList.add("hidden");

      // 2. Play audio immediately
      audio.play().then(() => {
        musicToggle.style.display = "flex";
      }).catch(() => {
        // Fallback if browser blocks sound
        musicToggle.style.display = "flex";
        musicIcon.textContent = "▶️";
        musicStatus.textContent = "Tap to Play Sound";
      });

      // 3. Launch animated heart burst
      spawnHearts();
    } else {
      errorMsg.textContent = "Wrong passcode, my love! Try again 💕";
      lockModal.classList.remove("shake");
      void lockModal.offsetWidth;
      lockModal.classList.add("shake");
    }
  });

  // Music Widget toggle handler
  musicToggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      musicIcon.textContent = "🔊";
      musicStatus.textContent = "Playing Music";
    } else {
      audio.pause();
      musicIcon.textContent = "⏸️";
      musicStatus.textContent = "Paused";
    }
  });
});

// Floating Hearts Animation Engine
function spawnHearts() {
  const canvas = document.getElementById("heart-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];
  const heartSymbols = ["💖", "💕", "❤️", "🌸", "✨"];

  for (let i = 0; i < 45; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 80,
      size: Math.random() * 20 + 16,
      speedY: Math.random() * 2.5 + 1.5,
      speedX: (Math.random() - 0.5) * 1.5,
      opacity: 1,
      char: heartSymbols[Math.floor(Math.random() * heartSymbols.length)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < hearts.length; i++) {
      const h = hearts[i];
      ctx.globalAlpha = h.opacity;
      ctx.font = `${h.size}px serif`;
      ctx.fillText(h.char, h.x, h.y);

      h.y -= h.speedY;
      h.x += h.speedX;

      if (h.y < canvas.height * 0.4) {
        h.opacity -= 0.008;
      }
    }

    if (hearts.some(h => h.opacity > 0)) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}