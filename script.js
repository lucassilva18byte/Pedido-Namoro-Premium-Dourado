let currentSlide = 0;
let podeAvancar = false;

const slides = document.querySelectorAll(".slide");
const music = document.getElementById("music");
const naoBtn = document.getElementById("naoBtn");

document.getElementById("mensagemFinal").innerText = CONFIG.mensagemFinal;

document.getElementById("startScreen").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  music.volume = 0.4;
  music.play();
  startParticles();
  iniciarSlide(0);
});

function iniciarSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
  podeAvancar = false;

  if (index <= 2) {
    efeitoEscrita(slides[index].querySelector(".typewriter"), CONFIG.frases[index]);
  } else if (slides[index].classList.contains("timer-slide")) {
    iniciarTimer();
    podeAvancar = true;
  } else {
    podeAvancar = true;
  }
}

function efeitoEscrita(el, texto) {
  el.innerHTML = "";
  let i = 0;
  const intervalo = setInterval(() => {
    el.innerHTML += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      podeAvancar = true;
    }
  }, 50);
}

document.addEventListener("click", () => {
  if (!podeAvancar) return;
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    iniciarSlide(currentSlide);
  }
});

function iniciarTimer() {
  const startDate = new Date(CONFIG.dataPedido);
  setInterval(() => {
    const now = new Date();
    const diff = now - startDate;

    document.getElementById("days").innerText =
      Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerText =
      Math.floor((diff / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").innerText =
      Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("seconds").innerText =
      Math.floor((diff / 1000) % 60);
  }, 1000);
}

function aceitou() {
  document.body.style.background =
    "radial-gradient(circle at center, #1c1c52 0%, #2a2a72 100%)";
  document.getElementById("respostaFinal").innerText =
    "Agora começa oficialmente o nosso para sempre ❤️";
}

naoBtn.addEventListener("mouseover", () => {
  naoBtn.style.left = Math.random() * 60 + "%";
  naoBtn.style.top = Math.random() * 60 + "%";
});

function startParticles() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({length: 40}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 0.3,
    heart: Math.random() > 0.7
  }));

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      if (p.heart) {
        ctx.font = "12px Arial";
        ctx.fillText("❤️", p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      p.y -= p.speed;
      if (p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(animate);
  }
  animate();
}