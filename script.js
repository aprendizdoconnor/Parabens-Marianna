const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetti {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 8 + 4;
    this.speed = Math.random() * 5 + 2;
    this.color = `hsl(${Math.random()*360}, 100%, 60%)`;
    this.tilt = Math.random() * 10 - 5;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.tilt, this.y);
    ctx.lineTo(this.x + this.tilt + this.size / 2, this.y + this.size);
    ctx.lineTo(this.x + this.tilt - this.size / 2, this.y + this.size);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    this.y += this.speed;
    this.x += Math.sin(this.y * 0.05) * 2;
    if (this.y > canvas.height) this.y = Math.random() * -50;
  }
}

const confettis = [];

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettis.forEach(c => { c.draw(); c.update(); });
  requestAnimationFrame(animate);
}

document.getElementById('webButton').addEventListener('click', () => {
  for(let i=0;i<30;i++){
    confettis.push(new Confetti());
  }
});

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
