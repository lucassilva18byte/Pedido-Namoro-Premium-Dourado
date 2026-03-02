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

  music.play().catch(() => {});
  iniciarSlides();
  iniciarTimer();
  iniciarParticulas();
});

// ===============================
// CONTROLE DE SLIDES
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
// TIMER
// ===============================

function iniciarTimer() {

  const dataInicio = new Date("2024-01-01T00:00:00"); // ALTERE AQUI
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

  setTimeout(iniciarTimer, 1000);
}

// ===============================
// BOTÃO SIM
// ===============================

btnSim.addEventListener("click", () => {
  respostaFinal.textContent = "Você acabou de me fazer a pessoa mais feliz do mundo ❤️";
});

// ===============================
// BOTÃO NÃO FOGE
// ===============================

btnNao.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - btnNao.offsetWidth);
  const y = Math.random() * (window.innerHeight - btnNao.offsetHeight);

  btnNao.style.position = "absolute";
  btnNao.style.left = `${x}px`;
  btnNao.style.top = `${y}px`;
});

// ===============================
// PARTÍCULAS + CORAÇÕES SUAVES
// ===============================

function iniciarParticulas() {

  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const total = 40; // quantidade (sutil)

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 200;
      this.size = Math.random() * 6 + 4;
      this.speed = Math.random() * 0.6 + 0.3;
      this.opacity = Math.random() * 0.15 + 0.05;
      this.type = Math.random() > 0.6 ? "heart" : "dot";
    }

    draw() {
      ctx.globalAlpha = this.opacity;

      if (this.type === "dot") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement)
          .getPropertyValue('--particle-color');
        ctx.fill();
      } else {
        ctx.fillStyle = getComputedStyle(document.documentElement)
          .getPropertyValue('--particle-color');
        desenharCoracao(this.x, this.y, this.size);
      }

      ctx.globalAlpha = 1;
    }

    update() {
      this.y -= this.speed;
      if (this.y < -10) this.reset();
    }
  }

  function desenharCoracao(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size/2, y - size/2,
                      x - size, y + size/3,
                      x, y + size);
    ctx.bezierCurveTo(x + size, y + size/3,
                      x + size/2, y - size/2,
                      x, y);
    ctx.fill();
  }

  for (let i = 0; i < total; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}