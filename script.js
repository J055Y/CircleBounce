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

let circles = [];
for (let i = 0; i < 250; i++) {
    // let r = Math.random() * 20;
    let r = 3;
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
            const DistanceBetweenCircles = Math.sqrt((circle2.x-circle1.x)*(circle2.x-circle1.x) + (circle2.y-circle1.y)*(circle2.y-circle1.y));
            if (DistanceBetweenCircles < circle1.r * 8) {
                context.beginPath();
                context.moveTo(circle1.x, circle1.y);
                context.lineTo(circle2.x, circle2.y);
                
                if (DistanceBetweenCircles < circle1.r) {
                    context.strokeStyle = "rgba(0, 0, 0, 1)";
                }
                else if (DistanceBetweenCircles < circle1.r * 1.5) {
                    context.strokeStyle = "rgba(0, 0, 0, 0.9)";
                }
                else if (DistanceBetweenCircles < circle1.r * 2) {
                    context.strokeStyle = "rgba(0, 0, 0, 0.8)";
                }
                else if (DistanceBetweenCircles < circle1.r * 2.5) {
                    context.strokeStyle = "rgba(0, 0, 0, 0.7)";
                }
                else if (DistanceBetweenCircles < circle1.r * 3) {
                    context.strokeStyle = "rgba(0, 0, 0, 0.6)";
                }
                else if (DistanceBetweenCircles < circle1.r * 3.5) {
                    context.strokeStyle = "rgba(0, 0, 0, 0.5)";
                }
                else {
                    context.strokeStyle = "rgba(0, 0, 0, 0.4)";
                }

                context.stroke();
            }
        }
    }
}

animate();