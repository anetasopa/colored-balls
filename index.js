function loaded() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // i=0 color = #
  // letters[Math.floor(Math.random() * 16)]
  // Math.random() => [0, 1] => 0.65
  // 0.55 * 16 = 9.8
  // 10
  // letters[10] => #A
  //

  // #676A5D
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createBall(options) {
    const createdBall = {
      x: options.x,
      y: options.y,
      vx: options.vx,
      vy: options.vy,
      radius: options.radius,
      color: options.color,
      draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      },
      updatePosition: function () {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > canvas.width) {
          this.vx = -this.vx;
        }

        if (this.y > canvas.height + 1) {
          this.vy = -this.vy;
        }

        if (this.y < 0) {
          this.vy = -this.vy;
        }

        if (this.x < 0) {
          this.vx = -this.vx;
        }
      }
    };

    return createdBall;
  }

  let balls = [];
  for (let i = 0; i < 70; i++) {
    const options = {
      x: getRndInteger(0, canvas.width),
      y: getRndInteger(0, canvas.height),
      vx: getRndInteger(-5, 3),
      vy: getRndInteger(-5, 3),
      radius: getRndInteger(5, 15),
      color: getRandomColor()
    };
    const createdBall = createBall(options);

    balls.push(createdBall);
  }

  function animation() {
    window.requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const moreBalls = balls;

    moreBalls.forEach((createdBall) => {
      createdBall.draw();
      createdBall.updatePosition();
    });
  }

  animation();
}
