// ===============================
// ELEMENTOS
// ===============================

const startScreen = document.getElementById("startScreen");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("music");
const slides = document.querySelectorAll(".slide");
const btnSim = document.querySelector(".btn-sim");
const btnNao = document.querySelector(".btn-nao");
const respostaFinal = document.getElementById("respostaFinal");

let currentSlide = 0;

// ===============================
// INICIAR EXPERIÊNCIA
// ===============================

startScreen.addEventListener("click", () => {
  startScreen.style.display = "none";
  mainContent.classList.remove("hidden");

  music.play().catch(() => {
    console.log("Autoplay bloqueado até interação.");
  });

  iniciarSlides();
  iniciarTimer();
});

// ===============================
// CONTROLE DE SLIDES (TOQUE)
// ===============================

function iniciarSlides() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-sim") || e.target.closest(".btn-nao")) return;

    if (currentSlide < slides.length - 1) {
      slides[currentSlide].classList.remove("active");
      currentSlide++;
      slides[currentSlide].classList.add("active");
    }
  });
}

// ===============================
// TIMER (ALTERE A DATA AQUI)
// ===============================

function iniciarTimer() {

  const dataInicio = new Date("2024-01-01T00:00:00"); // MUDE AQUI
  const now = new Date();

  const diff = now - dataInicio;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

  setInterval(iniciarTimer, 1000);
}

// ===============================
// BOTÃO SIM
// ===============================

btnSim.addEventListener("click", () => {
  respostaFinal.textContent = "Você acabou de me fazer a pessoa mais feliz do mundo ❤️";
});

// ===============================
// BOTÃO NÃO (FOGE)
// ===============================

btnNao.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - btnNao.offsetWidth);
  const y = Math.random() * (window.innerHeight - btnNao.offsetHeight);

  btnNao.style.position = "absolute";
  btnNao.style.left = `${x}px`;
  btnNao.style.top = `${y}px`;
});