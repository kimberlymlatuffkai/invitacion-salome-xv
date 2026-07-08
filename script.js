const envelopeScreen = document.querySelector("#envelope");
const envelope = document.querySelector(".envelope");
const main = document.querySelector("#invitation");
const music = document.querySelector("#backgroundMusic");
const musicControl = document.querySelector("#musicControl");

function openInvitation() {
  if (envelope.classList.contains("is-opening")) return;
  envelope.classList.add("is-opening");
  music.volume = 0.42;
  music.play().then(() => {
    musicControl.classList.add("visible");
  }).catch(() => {
    musicControl.classList.add("visible", "paused");
    musicControl.setAttribute("aria-label", "Reproducir música");
  });
  setTimeout(() => {
    envelopeScreen.classList.add("opened");
    main.classList.add("visible");
    main.setAttribute("aria-hidden", "false");
    document.body.classList.remove("locked");
  }, 1200);
}

document.querySelector("#openInvitation").addEventListener("click", openInvitation);
document.querySelector("#openLabel").addEventListener("click", openInvitation);

musicControl.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicControl.classList.remove("paused");
    musicControl.setAttribute("aria-label", "Pausar música");
  } else {
    music.pause();
    musicControl.classList.add("paused");
    musicControl.setAttribute("aria-label", "Reproducir música");
  }
});

const eventDate = new Date("2026-07-26T20:00:00-04:00");
function updateCountdown() {
  const distance = Math.max(0, eventDate - new Date());
  const parts = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
  Object.entries(parts).forEach(([id, value]) => {
    document.querySelector(`#${id}`).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("seen");
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const message = encodeURIComponent("Hola, confirmo mi asistencia a los XV años de Salomé Marin el 26 de julio. ✨");
document.querySelector("#whatsappLink").href = `https://wa.me/584243715126?text=${message}`;
