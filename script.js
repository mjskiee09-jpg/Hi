const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const CENTER = { x: canvas.width / 2, y: canvas.height / 2 };
let particles = [];

function heart(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

class Particle {
  constructor() {
    this.t = Math.random() * Math.PI * 2;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 80 + 10; // 🔥 smaller radius (closer to heart)
    this.speed = Math.random() * 0.015 + 0.005;
    this.life = 1;
    this.size = Math.random() * 2.5 + 1; // 🔥 bigger particles
  }

  update() {
    this.radius -= 0.6; // 🔥 slower inward spiral
    this.t += this.speed;
    this.life -= 0.002; // 🔥 slower fade (more visible)
  }

  draw() {
    let h = heart(this.t);
    let scale = 18; // 🔥 bigger heart size
    let hx = CENTER.x + h.x * scale;
    let hy = CENTER.y + h.y * scale;

    let x = hx + Math.cos(this.angle) * this.radius;
    let y = hy + Math.sin(this.angle) * this.radius;

    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 50, 150, ${this.life})`; // 🔥 brighter pink
    ctx.fill();
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)"; // 🔥 less blur → clearer heart
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 🔥 more particles per frame
  for (let i = 0; i < 25; i++) {
    particles.push(new Particle());
  }

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0 || p.radius <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
