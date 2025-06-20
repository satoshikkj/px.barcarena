// Estrelas animadas no background
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

function draw() {
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
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

// Interação botão "Barcarena" para subir o card suavemente
const btn = document.getElementById('btn-barcarena');
const card = document.querySelector('.card');

btn.addEventListener('click', () => {
  card.classList.toggle('move-up');
});

// Ainda não há ação JS obrigatória no card, mas você pode usar este espaço para adicionar animações extras
console.log("Cartão interativo carregado com sucesso!");
