// --- CONFIGURATION MAPPING ---
// Add or adjust the exact password + passcode pairs and targets here
const ROUTES = [
  {
    password: "love",        // Password (e.g. word/phrase)
    passcode: "1234",        // Passcode (e.g. pin/date)
    redirect: "pre-romance.html"
  },
  {
    password: "YoruTsuki",  // Password (e.g. word/phrase)
    passcode: "ForEver",
    redirect: "break-phase.html"
  },
  {
    password: "tsuki",        // Replace with your chosen secret word
    passcode: "dream",         // Replace with your chosen passcode/date
    redirect: "dream.html"
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gateway-form");
  const passwordInput = document.getElementById("portal-password");
  const passcodeInput = document.getElementById("portal-passcode");
  const statusMsg = document.getElementById("status-msg");
  const card = document.getElementById("portal-card");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredPass = passwordInput.value.trim().toLowerCase();
    const enteredCode = passcodeInput.value.trim();

    // Match against the configured routes
    const matchedRoute = ROUTES.find(
      (route) =>
        route.password.toLowerCase() === enteredPass &&
        route.passcode === enteredCode
    );

    if (matchedRoute) {
      statusMsg.style.color = "#059669"; // subtle emerald
      statusMsg.textContent = "Unlocking your space... ✨";
      
      // Store unlock flag for session verification
      sessionStorage.setItem("access_granted", "true");
      sessionStorage.setItem("target_page", matchedRoute.redirect);

      setTimeout(() => {
        window.location.href = matchedRoute.redirect;
      }, 700);
    } else {
      statusMsg.style.color = "var(--primary-rose)";
      statusMsg.textContent = "That combination doesn't seem right my love. Try again 💕";
      
      card.classList.remove("shake");
      void card.offsetWidth; // Force reflow
      card.classList.add("shake");
    }
  });
});