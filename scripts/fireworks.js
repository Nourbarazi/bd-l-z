// Fireworks animation
export function animateFireworks() {
  const PI2 = Math.PI * 2;
  const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
  const timestamp = (_) => new Date().getTime();

  // Deine spezifischen Farbwerte
  const colors = [
    "#fba1b7",
    "#AEDEFC",
    "#CCD3CA",
    "#DA7297",
    "#B692C2",
    "#fff",
  ];

  class Birthday {
    constructor() {
      this.resize();
      this.fireworks = [];
      this.counter = 0;
    }

    resize() {
      this.width = canvas.width = window.innerWidth;
      let center = (this.width / 2) | 0;
      this.spawnA = (center - center / 4) | 0;
      this.spawnB = (center + center / 4) | 0;
      this.height = canvas.height = window.innerHeight;
      this.spawnC = this.height * 0.1;
      this.spawnD = this.height * 0.5;
    }

    onClick(evt) {
      let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
      let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

      let count = random(3, 5);
      for (let i = 0; i < count; i++) {
        // Wähle eine zufällige Farbe aus der Liste
        let color = colors[random(0, colors.length - 1)];
        this.fireworks.push(
          new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            x,
            y,
            color,
            random(30, 110),
          ),
        );
      }

      this.counter = -1;
    }

    update(delta) {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#ffdbaa";
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.globalCompositeOperation = "lighter";

      for (let firework of this.fireworks) {
        firework.update(delta);
      }

      this.counter += delta * 3;
      if (this.counter >= 1) {
        let color = colors[random(0, colors.length - 1)];
        this.fireworks.push(
          new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            random(0, this.width),
            random(this.spawnC, this.spawnD),
            color,
            random(30, 110),
          ),
        );
        this.counter = 0;
      }

      if (this.fireworks.length > 1000) {
        this.fireworks = this.fireworks.filter((firework) => !firework.dead);
      }
    }
  }

  class Firework {
    constructor(x, y, targetX, targetY, color, offsprings) {
      this.dead = false;
      this.offsprings = offsprings;
      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.color = color;
      this.history = [];
    }

    update(delta) {
      if (this.dead) return;
      let xDiff = this.targetX - this.x;
      let yDiff = this.targetY - this.y;
      if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
        this.x += xDiff * 2 * delta;
        this.y += yDiff * 2 * delta;
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 20) this.history.shift();
      } else {
        if (this.offsprings && !this.madeChilds) {
          let babies = this.offsprings / 2;
          for (let i = 0; i < babies; i++) {
            let targetX =
              (this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
            let targetY =
              (this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;
            birthday.fireworks.push(
              new Firework(this.x, this.y, targetX, targetY, this.color, 0),
            );
          }
        }
        this.madeChilds = true;
        this.history.shift();
      }

      if (this.history.length === 0) this.dead = true;
      else if (this.offsprings) {
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i];
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.arc(point.x, point.y, 1, 0, PI2, false);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, 1, 0, PI2, false);
        ctx.fill();
      }
    }
  }

  let canvas = document.getElementById("fireworks");
  let ctx = canvas.getContext("2d");

  let then = timestamp();
  let birthday = new Birthday();
  window.onresize = () => birthday.resize();
  document.onclick = (evt) => birthday.onClick(evt);
  document.ontouchstart = (evt) => birthday.onClick(evt);

  (function loop() {
    requestAnimationFrame(loop);
    let now = timestamp();
    let delta = now - then;
    then = now;
    birthday.update(delta / 1000);
  })();
}
