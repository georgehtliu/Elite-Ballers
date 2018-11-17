function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#FF8C00";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x, y + 12);
    ctx.lineTo(x, y - 12);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x - 12, y);
    ctx.lineTo(x + 12, y);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x - 8, y - 8);
    ctx.bezierCurveTo(x - 2, y - 4, x - 2, y + 4, x - 8, y + 8);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x + 8, y - 8);
    ctx.bezierCurveTo(x + 2, y - 4, x + 2, y + 4, x + 8, y + 8);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawHoop() {
    ctx.beginPath();
    ctx.rect(hoopX, hoopY, 50, 15);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    for (i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(hoopX + 10 * i, hoopY + 15);
        ctx.lineTo(hoopX + 10 * i + 5, hoopY + 45);
        ctx.lineTo(hoopX + 10 * i + 10, hoopY + 15);
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.closePath();
    }

}

function drawBackboard() {
    ctx.beginPath();
    ctx.rect(hoopX + 50, hoopY - 50, 10, 1000);
    ctx.fillStyle = "#FF9684";
    ctx.fill();
    ctx.closePath();
}

function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ballRadius = 15;
    hoopX = canvas.width - 10 * Math.floor(10 * Math.random() + 8);
    hoopY = canvas.height / 3;
    backX = hoopX;
    backY = hoopY;
    g = 10;
    theta = 0.30 * Math.PI;
    score = 0;
    interval = 0.01;

    clearInterval(drawInterval);
    drawInterval = window.setInterval(draw, interval * 1000);

    // set html
    document.getElementById("gameTitle").innerHTML = "Elite Ballers! Get to 5!";
    document.getElementById("tempScore").innerHTML = "0";

    document.getElementById("myPButton").style.display="block";
    document.getElementById("winMsg").style.display="none";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redraw();
}

function redraw() {			
    drawFreeFall = false;
    v = undefined;
    dx = undefined;
    dy = undefined;
    timer = 1;
    stopTimer = 0;
    mD = false;
    hit = false;
    t = 0;
    x = 30;
    y = canvas.height - 30;
    window.bounceCount = 0;

    drawBall();
    drawHoop();
    drawBackboard();
}

function mouseDown() {
    redraw();
    mD = true;
}

function mouseUp() {
    mD = false;
    stopTimer = 1;
    var myInterval = window.setInterval(function() {
        if (x > canvas.width + 20 || y > canvas.height + 20 || y < -20) {
            window.clearInterval(myInterval);
            redraw();
        }
    }, 200);
}

function collisionDetection() {
    if (x > (hoopX + 50) && x < (hoopX + 60) && y > (hoopY - 50) && y < (hoopY + 50)) {
        dy = -dy;
    }
}

function draw() {
    if (mD === true) {
        timer += 1;
    }

    if (mD === false && stopTimer === 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawHoop();
        drawBackboard();
        collisionDetection();

        if (drawFreeFall) {
            if (!window.bounceCount) {
                window.bounceCount = 0;
            }

            if (window.bounceCount < 2 && x === backX && backY < y && y < hoopY - backY) {
                x += -2
                y += 2;
                window.bounceCount++;
            } else {
                t += interval;
                dy = 0.5 * g * t * t;
                y += dy;
            }
        } else {
            t += interval;
            v = timer * 0.1;
            dx = v * Math.cos(theta);
            dy = -v * Math.sin(theta) + g * t;
            x += dx;
            y += dy;
        }
    }

    if ((hoopX + 50 - x) * (hoopX + 50 - x) + (y - hoopY) * (y - hoopY) < 30 * 30 && !hit) {
        hit = true;
        hit = false;
        drawFreeFall = true;
    }

    if (drawFreeFall && y > canvas.height) {
        drawFreeFall = false;
        score++;
        document.getElementById("tempScore").innerHTML = score;
    }

    if (score === 5) {
        document.getElementById("myPButton").style.display="none";
        document.getElementById("winMsg").style.display="block";
    }
}
