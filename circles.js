let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let mouseX = 0;
let mouseY = 0;
let movementX = 0;
let movementY = 0;
canvas.addEventListener("mousemove", e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    movementX = e.movementX;
    movementY = e.movementY;
})

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

function CreateCircle() {
    // let r = Math.random() * 20;
    let r = 3;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let y = Math.random() * (innerHeight - r * 2) + r;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    let colour = getRandomColour();
    return new Circle(x, y, dx, dy, r, colour);
}

let circles = [];
for (let i = 0; i < 300; i++) {
    let circle = CreateCircle();
    circles.push(circle);
}

function getStrokeStyle(DistanceBetweenCircles, r) {
    if (DistanceBetweenCircles < r) {
        return "rgba(0, 0, 0, 1)";
    }
    else if (DistanceBetweenCircles < r * 1.5) {
        return "rgba(0, 0, 0, 0.9)";
    }
    else if (DistanceBetweenCircles < r * 2) {
        return "rgba(0, 0, 0, 0.8)";
    }
    else if (DistanceBetweenCircles < r * 2.5) {
        return "rgba(0, 0, 0, 0.7)";
    }
    else if (DistanceBetweenCircles < r * 3) {
        return "rgba(0, 0, 0, 0.6)";
    }
    else if (DistanceBetweenCircles < r * 3.5) {
        return "rgba(0, 0, 0, 0.5)";
    }
    else {
        return "rgba(0, 0, 0, 0.4)";
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    // console.log("MouseX: " + mouseX + ", MouseY: " + mouseY);

    for (let i = 0; i < circles.length; i++) {
        const circle1 = circles[i];
        if ((circle1.x > 0 && circle1.x < innerWidth) && 
            (circle1.y > 0 && circle1.y < innerHeight)) {
                circle1.update();
            }
        else {
            circles.splice(i, 1);
            let circle = CreateCircle();
            circles.push(circle);
        }

        const DistanceBetweenMouse = Math.sqrt((mouseX-circle1.x)*(mouseX-circle1.x) + (mouseY-circle1.y)*(mouseY-circle1.y));
        if (DistanceBetweenMouse < circle1.r * 16) {
            // console.log("MovementX: " + movementX + ", MovementY: " + movementY);
            circle1.x = circle1.x + movementX;
            circle1.y = circle1.y + movementY;
        }

        for (let j = 0; j < circles.length; j++) {
            const circle2 = circles[j];
            const DistanceBetweenCircles = Math.sqrt((circle2.x-circle1.x)*(circle2.x-circle1.x) + (circle2.y-circle1.y)*(circle2.y-circle1.y));
            if (DistanceBetweenCircles < circle1.r * 16) {
                context.beginPath();
                context.moveTo(circle1.x, circle1.y);
                context.lineTo(circle2.x, circle2.y);
                context.strokeStyle = getStrokeStyle(DistanceBetweenCircles, circle1.r);
                context.stroke();
            }
        }
    }
}

animate();