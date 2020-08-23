let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

function getRandomColour() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    return [r, g, b];
}

function Circle(x, y, dx, dy, r, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.colour = colour;

    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 360, false);
        context.fillStyle = "rgba(" + this.colour[0] + "," + this.colour[1] + "," + this.colour[2] + ")";
        context.fill();
    }

    this.update = function() {
        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.draw = function() {
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.strokeStyle = "black";
        context.stroke();
    }

    this.update = function() {

        this.draw();
    }
}

let circles = [];
for (let i = 0; i < 50; i++) {
    let r = Math.random() * 50;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let y = Math.random() * (innerHeight - r * 2) + r;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    let colour = getRandomColour();
    circles.push(new Circle(x, y, dx, dy, r, colour))
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circles.length; i++) {
        const circle1 = circles[i];
        circle1.update();
        for (let j = 0; j < circles.length; j++) {
            const circle2 = circles[j];
            if (Math.sqrt((circle2.x-circle1.x)*(circle2.x-circle1.x) + (circle2.y-circle1.y)*(circle2.y-circle1.y)) < circle1.r * 4) {
                console.log("Circles close: " + circle1.x + ", " + circle2.x);

                let line = new Line(circle1.x, circle1.y, circle2.x, circle2.y);
                line.update();
            }
        }
    }
}

animate();