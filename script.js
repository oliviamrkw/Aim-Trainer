var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

var mousex = 0;
var mousey = 0;

var score = 0;
var time = 0;

document.getElementById('scoreValue').textContent = 0;
document.getElementById('timeValue').textContent = 0;

addEventListener("mousemove", function() {
  mousex = event.clientX;
  mousey = event.clientY;
});

addEventListener('click', function(event) {
  for(var i = 0; i < bal.length; i++) {
    if(
      mousex > bal[i].x - bal[i].radius &&
      mousex < bal[i].x + bal[i].radius &&
      mousey > bal[i].y - bal[i].radius &&
      mousey < bal[i].y + bal[i].radius &&
      bal[i].radius < 70
    ){
      bal[i].radius = 0;
      score++;
      console.log(score);
      document.getElementById('scoreValue').textContent = score;
      break;
    }
  }
});

var grav = 0.99;
c.strokeWidth = 5;
function randomColor() {
  return (
    "rgb(" +
    Math.round(Math.random() * 245) +
    "," +
    Math.round(Math.random() * 245) +
    "," +
    Math.round(Math.random() * 245) +
    ")"
  );
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 30 + 20;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() /5;
  this.update = function() {
    if (this.radius > 0) {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      c.fillStyle = this.color;
      c.fill();
    }
  };
}

var bal = [];
for (var i=0; i<10; i++){
    bal.push(new Ball());
}

function animate() {    
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    // check if ball hits bottom
    if (bal[i].y + bal[i].radius >= ty) {
      // reverse direction, add gravity
      bal[i].dy = -bal[i].dy * grav;
    } else {
      bal[i].dy += bal[i].vel;
    }
    
    if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;
    }
    if (score == 10){
      stopTimer();
    }
  }
}

var startTime, interval;

function startTimer(){
  startTime = Date.now();
  interval = setInterval(function() {
    document.getElementById('timeValue').textContent =((Date.now() - startTime)/1000).toFixed(2);
  }, 10);
}

function stopTimer(){
  clearInterval(interval);
}

animate();
startTimer();

const root = document.querySelector('html')

const cursor = document.createElement('div')
cursor.classList.add('cursor')
root.appendChild(cursor)

root.addEventListener('mousemove', (e) => {
  setPosition(cursor, e)
})

function setPosition(element, e) {
  element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
}