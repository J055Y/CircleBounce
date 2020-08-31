// The MIT License (MIT)
// Copyright © 2020 J055Y
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the “Software”),
// to deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is furnished
// to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

function CircleCanvas(numberOfCircles, velocity, colour) {
    this.numberOfCircles = numberOfCircles;
    this.velocity = velocity;
    this.colour = colour;
    this.circles = [];

    this.mouseX = 0;
    this.mouseY = 0;
    this.movementX = 0;
    this.movementY = 0;

    canvas.addEventListener("mousemove", e => {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        this.movementX = e.movementX;
        this.movementY = e.movementY;
    })

    this.init = function () {
        for (let i = 0; i < this.numberOfCircles; i++) {
            let circle = this.createCircle();
            this.circles.push(circle);
        }
    }

    this.createCircle = function () {
        let dx;
        let dy;
        let colour;
        let r = 3;
        let x = Math.random() * (innerWidth - r * 2) + r;
        let y = Math.random() * (innerHeight - r * 2) + r;

        if (typeof this.velocity !== "number") {
            console.log("Invalid velocity value, defaulting to multiplier of 2");
            dx = (Math.random() - 0.5) * 2;
            dy = (Math.random() - 0.5) * 2;
        }
        else {
            dx = (Math.random() - 0.5) * this.velocity;
            dy = (Math.random() - 0.5) * this.velocity;
        }

        if (typeof this.colour === "string") {
            if (this.colour === "random") {
                colour = "#" + Math.floor(Math.random()*16777215).toString(16);
            }
            else if (this.colour.charAt(0) === "#") {
                colour = this.colour;
            }
        }
        else console.log("Invalid colour value");
        return new Circle(x, y, dx, dy, r, colour);
    }

    this.animate = function () {
        requestAnimationFrame(this.animate.bind(this)); // This doesn't work...
        context.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < this.circles.length; i++) {
            const circle1 = this.circles[i];
            if ((circle1.x > 0 && circle1.x < innerWidth) &&
                (circle1.y > 0 && circle1.y < innerHeight)) {
                circle1.update();
            }
            else {
                this.circles.splice(i, 1);
                let circle = this.createCircle();
                this.circles.push(circle);
            }

            const DistanceBetweenMouse = Math.sqrt((this.mouseX-circle1.x)*(this.mouseX-circle1.x) + (this.mouseY-circle1.y)*(this.mouseY-circle1.y));
            if (DistanceBetweenMouse < circle1.r * 16) {
                circle1.x = circle1.x + (this.movementX - circle1.r);
                circle1.y = circle1.y + (this.movementY - circle1.r);
            }

            for (let j = 0; j < this.circles.length; j++) {
                const circle2 = this.circles[j];
                const circles = Math.sqrt((circle2.x-circle1.x)*(circle2.x-circle1.x) + (circle2.y-circle1.y)*(circle2.y-circle1.y));
                if (circles < circle1.r * 16) {
                    context.beginPath();
                    context.moveTo(circle1.x, circle1.y);
                    context.lineTo(circle2.x, circle2.y);
                    context.strokeStyle = getStrokeStyle(circles, circle1.r);
                    context.stroke();
                }
            }
        }
    }
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
        context.fillStyle = this.colour;
        // if (this.colour === typeof(Array) && this.colour.length === 3) {
        //     context.fillStyle = "rgba(" + this.colour[0] + "," + this.colour[1] + "," + this.colour[2] + ")";
        // }
        // else {
        //     try {
        //         context.fillStyle = this.colour;
        //     } catch (exception) {
        //         console.log("Invalid colour format");
        //         context.fillStyle = "black";
        //     }
        // }
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

window.onload = function() {
    const config = Function("return " + canvas.id)();
    config.init();
    config.animate();
};