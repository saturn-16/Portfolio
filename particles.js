const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function createParticles(num) {
  for (let i = 0; i < num; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      r: Math.random() * 2 + 1
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#9b5de5aa';
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    // Draw lines
    for (let j = i + 1; j < particles.length; j++) {
      const dx = p.x - particles[j].x;
      const dy = p.y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(155,93,229,${1 - dist / 100})`;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    // Mouse attraction
    const mdx = p.x - mouse.x;
    const mdy = p.y - mouse.y;
    const mdist = Math.hypot(mdx, mdy);
    if (mdist < 120) {
      p.x -= mdx * 0.01;
      p.y -= mdy * 0.01;
    }
  });

  requestAnimationFrame(animate);
}

createParticles(120);
animate();
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
