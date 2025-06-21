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

// === Interações ===
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-barcarena");
  const content = document.querySelector(".content");
  const info = document.getElementById("info-festa");
  const voltar = document.getElementById("voltar-topo");
  const titulo = document.querySelector("h1");

  btn.addEventListener("click", () => {
    // Sobe conteúdo e título
    content.classList.add("mover-topo");
    if (titulo) titulo.classList.add("mover-topo");

    // Animação botão sumindo
    btn.style.transition = "opacity 0.6s ease";
    btn.style.opacity = 0;
    setTimeout(() => {
      btn.style.display = "none";
    }, 600);

    // Agita estrelas
    stars.forEach(star => {
      star.dx += (Math.random() - 0.5) * 0.8;
      star.dy += (Math.random() - 0.5) * 0.8;
    });

    // Exibe informações da festa
    setTimeout(() => {
      info.classList.add("show");
      info.scrollIntoView({ behavior: "smooth" });
    }, 400);
  });

  if (voltar) {
    voltar.addEventListener("click", () => {
      // Remove seção e volta ao topo
      info.classList.remove("show");
      content.classList.remove("mover-topo");
      if (titulo) titulo.classList.remove("mover-topo");

      // Volta botão principal
      btn.style.display = "inline-block";
      setTimeout(() => {
        btn.style.opacity = 1;
      }, 10);

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
