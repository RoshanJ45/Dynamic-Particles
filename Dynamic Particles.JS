const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
function Particle(x, y) {
this.x = x;
this.y = y;
this.size = Math.random() * 5 + 1;
this.speedX = Math.random() * 2 - 1;
this.speedY = Math.random() * 2 - 1;
this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
this.update = function() {
this.x += this.speedX;
this.y += this.speedY;
if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
};
this.draw = function() {
ctx.fillStyle = this.color;
ctx.beginPath();
ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
ctx.fill();
};
}
function initParticles(event) {
for (let i = 0; i < 10; i++) {
const x = event.clientX;
const y = event.clientY;
particles.push(new Particle(x, y));
}
}
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
particles.forEach(particle => {
particle.update();
particle.draw();
});
requestAnimationFrame(animate);
}
canvas.addEventListener('mousemove', initParticles);
animate();
window.addEventListener('resize', () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});
