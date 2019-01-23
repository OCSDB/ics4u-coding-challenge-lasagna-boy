var keys = [];
var score = 0;

var timesHit = 0;

var ship;
var asteroids = [];
var lasers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    ship = new Ship();
    textSize(26);
    textFont('monospace');
    ellipseMode(CENTER);
    for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0,0,0);

    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
        	timesHit++;
        }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }
	if (asteroids.length <= 3) {
        var newAsteroidPos = createVector(random(-5,0), random(0,height),random(25,50));
        asteroids.push(new Asteroid(newAsteroidPos));
    }
    for (i = lasers.length - 1; i >= 0; i--) {
        lasers[i].run();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 10) {
                        var newAsteroids = asteroids[j].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);
                    score++;
                    break;
                }
                
            }
        }
    }
    ship.run();    
    //draw HUD
    resetMatrix();
    fill(255,255,255,100);
    stroke(255,255,255,100);
    textAlign(LEFT,CENTER);
    text("SCORE: " + score, 20,30);
    textAlign(RIGHT,CENTER);
    var timesHitsec = round((timesHit/60)*100)/100;
    text("SECONDS HIT: " + timesHitsec.toFixed(2), width-20,30);
}

keyPressed = function() {
    keys[keyCode] = true;
};
keyReleased = function() {
    keys[keyCode] = false;
};