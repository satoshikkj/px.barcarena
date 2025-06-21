// === Fundo com estrelas ===
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let w, h, stars = [];

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.2,
      alpha: Math.random(),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      deltaAlpha: (Math.random() - 0.5) * 0.02
    });
  }
}

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * devicePixelRatio;
  canvas.height = h * devicePixelRatio;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(devicePixelRatio, devicePixelRatio);
  createStars(150);
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  stars.forEach(star => {
    star.alpha += star.deltaAlpha;
    if (star.alpha <= 0 || star.alpha >= 1) star.deltaAlpha *= -1;

    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0) star.x = w;
    else if (star.x > w) star.x = 0;
    if (star.y < 0) star.y = h;
    else if (star.y > h) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
    ctx.shadowBlur = 4;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resize);
resize();
drawStars();

// === Interações DOM + Frases + Contador ===
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-barcarena");
  const content = document.querySelector(".content");
  const info = document.getElementById("info-festa");
  const voltar = document.getElementById("voltar-topo");
  const titulo = document.querySelector("h1") || document.getElementById("titulo");
  const fraseElemento = document.getElementById("frase-romantica");

  // Botão para ativar animações e mostrar info
  btn?.addEventListener("click", () => {
    content?.classList.add("mover-topo");
    titulo?.classList.add("mover-topo");

    btn.style.transition = "opacity 0.6s ease";
    btn.style.opacity = 0;
    setTimeout(() => {
      btn.style.display = "none";
    }, 600);

    // Agita as estrelas
    stars.forEach(star => {
      star.dx += (Math.random() - 0.5) * 0.8;
      star.dy += (Math.random() - 0.5) * 0.8;
    });

    setTimeout(() => {
      info?.classList.add("show");
      info?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  });

  // Botão voltar ao topo
  voltar?.addEventListener("click", () => {
    info?.classList.remove("show");
    content?.classList.remove("mover-topo");
    titulo?.classList.remove("mover-topo");

    btn.style.display = "inline-block";
    setTimeout(() => {
      btn.style.opacity = 1;
    }, 10);

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === Frases Românticas Animadas ===
  const frases = [
    "Se amor tivesse um nome, seria o seu.",
    "Perfeição é ficar olhando suas fotos.",
    "Você é o meu lugar favorito.",
    "Te encontrar foi como achar uma estrela cadente.",
    "O universo sorriu quando você nasceu."
  ];

  let fraseIndex = 0;

  function mostrarProximaFrase() {
    if (!fraseElemento) return;

    fraseElemento.textContent = frases[fraseIndex];
    fraseElemento.classList.remove("aparecendo");
    void fraseElemento.offsetWidth; // Força reflow
    fraseElemento.classList.add("aparecendo");

    fraseIndex = (fraseIndex + 1) % frases.length;
  }

  setInterval(mostrarProximaFrase, 5000);
  mostrarProximaFrase();

  // === Contador Regressivo para o evento ===
  function iniciarContador(dataEvento) {
    const fim = new Date(dataEvento).getTime();

    setInterval(() => {
      const agora = new Date().getTime();
      const distancia = fim - agora;

      const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

      document.getElementById('dias').innerText = dias.toString().padStart(2, '0');
      document.getElementById('horas').innerText = horas.toString().padStart(2, '0');
      document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
      document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
    }, 1000);
  }

iniciarContador("2025-12-06T09:00:00"); // data e hora do evento
});
