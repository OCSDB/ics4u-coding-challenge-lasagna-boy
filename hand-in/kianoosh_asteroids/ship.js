function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.r = 15;
    this.isBoosting = false;
    this.life = 3;
    this.cooldown = 0;
    //Shield
    this.shield = 100;
    this.shieldUp = false;
    this.shieldR = 60;
    
    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
    this.render = function() {
        fill(255,255,255);
        strokeWeight(1);
        stroke(255,255,255);
        resetMatrix();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + (PI / 2));
        triangle(-this.r * 3 / 4, this.r, this.r * 3 / 4, this.r, 0, -this.r);
    }

    this.setRotation = function(a) {
        this.rotation = a;
    }
    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }
    this.shieldhits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.shieldR + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.turn = function(ang) {
        this.heading += ang;
    }

    this.control = function() {
        if (keys[LEFT_ARROW] && keys[RIGHT_ARROW]) {
			//Don't turn
        } 
        else if (keys[LEFT_ARROW]) {
            ship.turn(-0.05);
        } 
        else if (keys[RIGHT_ARROW]) {
            ship.turn(0.05);
        }
        if (keys[UP_ARROW]) {
            this.isBoosting = true;
        } 
        else {
            this.isBoosting = false;
        }
        if (keys[90]) {		//Z
            if (this.cooldown === 0) {
            	lasers.push(new Laser(ship.pos, ship.heading));
                this.cooldown += 10;
            }
        }
        if (keys[32]) {		//Space
			this.shieldUp = true;
        }
        else {
            this.shieldUp = false;
        }
    }
    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }
        if (this.cooldown > 0){
        	this.cooldown -= 1;
        }
        if (this.shield < 120) {
            this.shield += 1;
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }
    this.runShield = function() {
        if (this.shieldUp) { 
        	if (this.shield === 120) {
                for (var j = asteroids.length - 1; j >= 0; j--) {
                if (this.shieldhits(asteroids[j])) {
                    asteroids.splice(j, 1);
                    this.shield = 0;
                }
                
            }
        	}
        }
    }
	this.renderShield = function() {
        resetMatrix();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        noFill();
        strokeWeight(5);
        var whiteness = map(this.shield,0,120,50,255);
        var fullness = map(this.shield,0,120,radians(4),radians(176));
        if (this.shieldUp) { 
        	if (this.shield === 120) {
            	stroke(255,255,255);
                ellipse(0,0,this.shieldR,this.shieldR);
        	}
            else {
            	stroke(255,0,0);
                arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
                scale(1,-1);
                arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
            }
        }
        else {
            stroke(255,whiteness,whiteness,70);
            arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
            scale(1,-1);
            arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
        }
        strokeWeight(1);
    }
    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
    this.run = function() {
        this.control();
        this.update();
        this.edges();
        this.render();
        this.runShield();
        this.renderShield();
    }
}