var canvas;
var ctx;
var ballRadius;
var hoopX;
var hoopY;
var backX;
var backY;
var g;
var theta;
var score;
var interval;

var v;
var dx;
var dy;
var timer;
var stopTimer;
var mD;
var hit;
var t;
var x;
var y;

var drawInterval;
var drawFreeFall;
var netRipple = 0;
var shots = 0;
var makes = 0;
var trail = [];
var currentLevel = 1;
var netMovementSpeed = 0;
var netMovementDirection = 1;
var netBaseX = 0;
var defender = null;
var gameStarted = false;

function drawBall() {
	// Draw trailing streak effect when ball is moving through the air
	// Draw trail first (behind the ball)
	if (trail.length > 0) {
		for (var i = 0; i < trail.length; i++) {
			var trailOpacity = (i + 1) / trail.length * 0.4;
			var trailSize = 12 - (trail.length - i - 1) * 1.2;
			if (trailSize < 3) trailSize = 3;
			
			ctx.globalAlpha = trailOpacity;
			var trailGradient = ctx.createRadialGradient(trail[i].x - 2, trail[i].y - 2, 0, trail[i].x, trail[i].y, trailSize);
			trailGradient.addColorStop(0, "#FFB84D");
			trailGradient.addColorStop(1, "#FF8C00");
			ctx.fillStyle = trailGradient;
			ctx.beginPath();
			ctx.arc(trail[i].x, trail[i].y, trailSize, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
		ctx.globalAlpha = 1.0;
	}
	
	// Enhanced basketball with better visuals
	// Base orange circle with gradient effect
	var gradient = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, 12);
	gradient.addColorStop(0, "#FFB84D");
	gradient.addColorStop(1, "#FF8C00");
	ctx.fillStyle = gradient;
	ctx.beginPath();
	ctx.arc(x, y, 12, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
	
	// Black lines
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'black';
	
	// Vertical line
	ctx.beginPath();
	ctx.moveTo(x, y + 12);
	ctx.lineTo(x, y - 12);
	ctx.stroke();
	ctx.closePath();
	
	// Horizontal line
	ctx.beginPath();
	ctx.moveTo(x - 12, y);
	ctx.lineTo(x + 12, y);
	ctx.stroke();
	ctx.closePath();
	
	// Curved lines with better styling
	ctx.beginPath();
	ctx.moveTo(x - 8, y - 8);
	ctx.bezierCurveTo(x - 2, y - 4, x - 2, y + 4, x - 8, y + 8);
	ctx.stroke();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.moveTo(x + 8, y - 8);
	ctx.bezierCurveTo(x + 2, y - 4, x + 2, y + 4, x + 8, y + 8);
	ctx.stroke();
	ctx.closePath();
}

function drawHoop() {
	// Level 2 and 3: Move net horizontally
	if (currentLevel === 2 || currentLevel === 3) {
		netMovementSpeed += 0.02;
		var movementRange = 80;
		hoopX = netBaseX + Math.sin(netMovementSpeed) * movementRange;
		// Update backboard position to match
		backX = hoopX;
	}
	
	ctx.beginPath();
	ctx.rect(hoopX, hoopY, 50, 15);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();

	// Draw net with ripple effect
	for (i = 0; i < 5; i++) {
		var rippleOffset = 0;
		if (netRipple > 0) {
			// Calculate ripple wave effect
			var waveOffset = Math.sin((netRipple - i * 2) * 0.5) * 3;
			rippleOffset = waveOffset;
		}
		
		ctx.beginPath();
		ctx.moveTo(hoopX + 10 * i, hoopY + 15);
		ctx.lineTo(hoopX + 10 * i + 5 + rippleOffset, hoopY + 45);
		ctx.lineTo(hoopX + 10 * i + 10, hoopY + 15);
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}
	
	// Decay ripple effect
	if (netRipple > 0) {
		netRipple -= 0.3;
		if (netRipple < 0) {
			netRipple = 0;
		}
	}
}

function drawBackboard() {
	// Changed to a more realistic backboard color (white/glass-like)
	ctx.beginPath();
	ctx.rect(hoopX + 50, hoopY - 50, 10, 1000);
	// Create a subtle gradient for glass effect
	var backboardGradient = ctx.createLinearGradient(hoopX + 50, hoopY - 50, hoopX + 60, hoopY - 50);
	backboardGradient.addColorStop(0, "#E8E8E8");
	backboardGradient.addColorStop(0.5, "#FFFFFF");
	backboardGradient.addColorStop(1, "#E8E8E8");
	ctx.fillStyle = backboardGradient;
	ctx.fill();
	
	// Add border for definition
	ctx.strokeStyle = "#888888";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.closePath();
}

function drawDefender() {
	if (currentLevel !== 3 || !defender) return;
	
	// Update defender vertical movement
	defender.movementSpeed += 0.03;
	defender.y = defender.baseY + Math.sin(defender.movementSpeed) * defender.movementRange;
	
	// Update arms position relative to defender
	defender.armsUp.x = defender.x + Math.sin(Date.now() / 500) * 5;
	defender.armsUp.y = defender.y - 15;
	
	// Draw body (rectangle)
	ctx.fillStyle = "#4169E1"; // Royal blue
	ctx.fillRect(defender.x - defender.width/2, defender.y, defender.width, defender.height);
	
	// Draw head (circle)
	ctx.beginPath();
	ctx.arc(defender.x, defender.y - 5, 12, 0, Math.PI * 2);
	ctx.fillStyle = "#DEB887"; // Tan/skin color
	ctx.fill();
	ctx.closePath();
	
	// Draw arms up (blocking position)
	ctx.fillStyle = "#4169E1";
	// Left arm
	ctx.fillRect(defender.armsUp.x - defender.armsUp.width/2 - 10, defender.armsUp.y, 12, defender.armsUp.height);
	// Right arm
	ctx.fillRect(defender.armsUp.x + defender.armsUp.width/2 - 2, defender.armsUp.y, 12, defender.armsUp.height);
	
	// Draw legs
	ctx.fillRect(defender.x - 8, defender.y + defender.height, 8, 25);
	ctx.fillRect(defender.x, defender.y + defender.height, 8, 25);
}

function showMenu() {
	document.getElementById("startMenu").style.display = "flex";
	document.getElementById("gameContent").style.display = "none";
	gameStarted = false;
	clearInterval(drawInterval);
}

function startLevel(level) {
	currentLevel = level;
	document.getElementById("startMenu").style.display = "none";
	document.getElementById("gameContent").style.display = "block";
	document.getElementById("currentLevel").innerHTML = level;
	gameStarted = true;
	init();
}

function restartLevel() {
	init();
}

function init() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	ballRadius = 15;
	
	// Set initial hoop position
	var randomOffset = 10 * Math.floor(10 * Math.random() + 8);
	netBaseX = canvas.width - randomOffset;
	hoopX = netBaseX;
	hoopY = canvas.height / 3;
	backX = hoopX;
	backY = hoopY;
	
	// Reset net movement for level 2
	netMovementSpeed = 0;
	netMovementDirection = 1;
	
	// Generate defender for level 3
	if (currentLevel === 3) {
		var defenderX = 150 + Math.random() * (canvas.width - 400);
		var defenderBaseY = canvas.height / 2 + (Math.random() * 100 - 50);
		defender = {
			x: defenderX,
			baseY: defenderBaseY,
			y: defenderBaseY,
			width: 40,
			height: 60,
			movementSpeed: 0,
			movementRange: 60,
			armsUp: {
				x: defenderX,
				y: defenderBaseY - 15,
				width: 50,
				height: 40
			}
		};
	} else {
		defender = null;
	}
	
	g = 10;
	theta = 0.30 * Math.PI;
	score = 0;
	shots = 0;
	makes = 0;
	netRipple = 0;
	trail = [];
	interval = 0.01;

	clearInterval(drawInterval);
	drawInterval = window.setInterval(draw, interval * 1000);

	// set html
	document.getElementById("gameTitle").innerHTML = "Elite Ballers! Get to 5!";
	document.getElementById("tempScore").innerHTML = "0";
	updateStats();
	updatePowerBar(0);

	document.getElementById("myPButton").style.display = "block";
	document.getElementById("winMsg").style.display = "none";

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
	trail = [];

	drawBall();
	drawHoop();
	drawBackboard();
	drawDefender();
	updatePowerBar(0);
}

function mouseDown() {
	redraw();
	mD = true;
	shots++;
	updateStats();
}

function mouseUp() {
	mD = false;
	stopTimer = 1;
	var myInterval = window.setInterval(function () {
		if (x > canvas.width + 20 || y > canvas.height + 20 || y < -20) {
			window.clearInterval(myInterval);
			redraw();
		}
	}, 200);
}

// Keyboard support - spacebar to shoot
document.addEventListener('keydown', function(event) {
	if (event.code === 'Space' && !mD) {
		event.preventDefault();
		mouseDown();
	}
});

document.addEventListener('keyup', function(event) {
	if (event.code === 'Space' && mD) {
		event.preventDefault();
		mouseUp();
	}
});

function collisionDetection() {
	// Backboard collision detection (pole above rim)
	var backboardLeft = hoopX + 50;
	var backboardRight = hoopX + 60;
	var backboardTop = hoopY - 50;
	var backboardBottom = hoopY + 1000; // Extended down
	
	// Check if ball hits backboard
	if (x + ballRadius > backboardLeft && x - ballRadius < backboardRight && 
	    y + ballRadius > backboardTop && y - ballRadius < backboardBottom) {
		// Reverse horizontal velocity (bounce off backboard)
		dx = -dx * 0.8; // Slight energy loss on bounce
		// Move ball away from backboard to prevent sticking
		if (x > backboardLeft && x < backboardRight) {
			x = backboardLeft - ballRadius;
		}
	}
	
	// Level 3: Defender collision detection (reduced blocking area for more leeway)
	if (currentLevel === 3 && defender && (mD === false && stopTimer === 1)) {
		// Only check collision if ball is moving toward the defender area
		// Check if ball is in the general defender region
		var defenderRegionLeft = defender.x - 60;
		var defenderRegionRight = defender.x + 60;
		var defenderRegionTop = defender.y - 40;
		var defenderRegionBottom = defender.y + defender.height + 20;
		
		if (x + ballRadius > defenderRegionLeft && x - ballRadius < defenderRegionRight &&
		    y + ballRadius > defenderRegionTop && y - ballRadius < defenderRegionBottom) {
			
			// Reduced collision areas for more leeway
			// Body collision - smaller area (only center of body)
			var bodyWidth = defender.width * 0.6; // Reduced to 60% width
			var bodyHeight = defender.height * 0.7; // Reduced to 70% height
			var bodyLeft = defender.x - bodyWidth/2;
			var bodyRight = defender.x + bodyWidth/2;
			var bodyTop = defender.y + defender.height * 0.1; // Start lower
			var bodyBottom = defender.y + bodyHeight;
			
			// Only block if ball hits the center of the body
			if (x + ballRadius * 0.8 > bodyLeft && x - ballRadius * 0.8 < bodyRight &&
			    y + ballRadius * 0.8 > bodyTop && y - ballRadius * 0.8 < bodyBottom) {
				redraw();
				return;
			}
			
			// Arms collision - smaller and narrower
			var armCenterX = defender.armsUp.x;
			var armWidth = 8; // Narrower arms
			var armLeft = armCenterX - defender.armsUp.width/2;
			var armRight = armCenterX + defender.armsUp.width/2;
			var armTop = defender.armsUp.y + 5; // Start a bit lower
			var armBottom = defender.armsUp.y + defender.armsUp.height - 5;
			
			// Check left arm - only inner edge
			if (x + ballRadius * 0.7 > armLeft - 5 && x - ballRadius * 0.7 < armLeft + armWidth &&
			    y + ballRadius * 0.7 > armTop && y - ballRadius * 0.7 < armBottom) {
				redraw();
				return;
			}
			
			// Check right arm - only inner edge
			if (x + ballRadius * 0.7 > armRight - armWidth && x - ballRadius * 0.7 < armRight + 5 &&
			    y + ballRadius * 0.7 > armTop && y - ballRadius * 0.7 < armBottom) {
				redraw();
				return;
			}
			
			// Head collision - smaller radius
			var headRadius = 8; // Reduced from 12
			var distToHead = Math.sqrt((x - defender.x) * (x - defender.x) + (y - (defender.y - 5)) * (y - (defender.y - 5)));
			// Only block if very close to center of head
			if (distToHead < ballRadius * 0.7 + headRadius * 0.7) {
				redraw();
				return;
			}
		}
	}
}

function updatePowerBar(power) {
	var maxPower = 100; // Maximum visual power
	var powerPercent = Math.min((timer / maxPower) * 100, 100);
	if (!mD) {
		powerPercent = 0;
	}
	document.getElementById("powerBar").style.width = powerPercent + "%";
}

function updateStats() {
	document.getElementById("shots").innerHTML = shots;
	document.getElementById("makes").innerHTML = makes;
	var percentage = shots > 0 ? Math.round((makes / shots) * 100) : 0;
	document.getElementById("percentage").innerHTML = percentage + "%";
}

function draw() {
	// Always update and draw moving elements in levels 2 and 3
	var needsContinuousMovement = (currentLevel === 2 || currentLevel === 3);
	
	if (mD === true) {
		timer += 1;
		updatePowerBar(timer);
		
		// Continue moving net and defender even while charging
		// Redraw canvas to show movement
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawHoop();
		drawBackboard();
		drawDefender();
		drawBall();
	} else if (mD === false && stopTimer === 1) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Update trail - add current position before moving
		if (!drawFreeFall || (drawFreeFall && Math.abs(dy) > 0.1)) {
			trail.push({x: x, y: y});
			if (trail.length > 6) {
				trail.shift();
			}
		} else {
			trail = [];
		}
		
		drawHoop();
		drawBackboard();
		drawDefender();
		collisionDetection();

		if (drawFreeFall) {
			if (!window.bounceCount) {
				window.bounceCount = 0;
			}

			if (window.bounceCount < 2 && x === backX && backY < y && y < hoopY - backY) {
				x += -2;
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
		
		// Draw ball after updating position (so trail is behind)
		drawBall();
	} else if (needsContinuousMovement) {
		// Keep drawing moving elements even when user is idle
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawHoop();
		drawBackboard();
		drawDefender();
		drawBall();
	}

	if ((hoopX + 50 - x) * (hoopX + 50 - x) + (y - hoopY) * (y - hoopY) < 30 * 30 && !hit) {
		hit = true;
		drawFreeFall = true;
	}

	if (drawFreeFall && y > canvas.height) {
		drawFreeFall = false;
		hit = false;
		score++;
		makes++;
		updateStats();
		netRipple = 10; // Trigger net ripple animation
		var scoreElement = document.getElementById("tempScore");
		scoreElement.innerHTML = score;
		// Add visual feedback animation
		scoreElement.classList.add("score-updated");
		setTimeout(function() {
			scoreElement.classList.remove("score-updated");
		}, 500);
	}

	if (score === 5) {
		document.getElementById("myPButton").style.display = "none";
		document.getElementById("winMsg").style.display = "block";
	}
}
