/* ==========================================
   PESTE - Background Canvas Animation
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSporeCanvas();
});

/* ------------------------------------------
   Spore Particle Background
------------------------------------------ */
function initSporeCanvas() {
  const canvas = document.getElementById('sporeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = 35;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.3 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.5 + 0.15;
      this.isRed = Math.random() > 0.5;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      if (this.y < 0 || this.x < 0 || this.x > width) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isRed ? `rgba(204, 17, 0, ${this.opacity})` : `rgba(160, 160, 160, ${this.opacity * 0.6})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
