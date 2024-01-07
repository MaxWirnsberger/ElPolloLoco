class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  bossEnergy = 100;
  coins = 0;
  bottles = 0;
  lastHit = 0;
  lastEndbossHit = 0;
  hadFirstContactWithBoss = true;
  BossWalkingIntervall = 0;
  didHit = false;
  didEndbossHit = false;
  isJumping = false;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this.y < 130) {
      return true;
    } else {
      this.isJumping = false;
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
      if (this.x > 0) {
        this.x -= 150;
      }
      this.didHit = true;
      this.hitTimer();
    }
  }

  hitTimer() {
    setTimeout(() => {
      this.didHit = false;
    }, 1000);
  }

  addCoin() {
    this.coins += 10;
  }

  addBottle() {
    this.bottles += 1;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 25;
  }

  distanceToBoss(characterX) {
    return this.x - characterX;
  }

  firstContactCheck(characterX) {
    if (characterX > 2000 && this.hadFirstContactWithBoss) {
      this.BossWalkingIntervall = 0;
      this.hadFirstContactWithBoss = false;
    }
  }

  endbossIsDead() {
    return this.bossEnergy == 0;
  }

  endbossHit() {
    this.bossEnergy -= 20;
    if (this.bossEnergy < 0) {
      this.bossEnergy = 0;
    } else {
      this.lastEndbossHit = new Date().getTime();
      this.x -= 75;
      this.didEndbossHit = true;
      this.hitEndbossTimer();
    }
  }

  hitEndbossTimer() {
    setTimeout(() => {
      this.didEndbossHit = false;
    }, 1000);
  }

  BottleGoalOnEndboss() {
    let timepassed = new Date().getTime() - this.lastEndbossHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  //Play Sounds
  bottlePickUpSound(soundIsOn) {
    if (soundIsOn) {
      this.bottlePickUp_sound.play();
    }
  }

  throwBottleSound(soundIsOn) {
    if (soundIsOn) {
      this.throw_sound.play();
    }
  }

  glasBreakSound(soundIsOn) {
    if (soundIsOn) {
      this.glasBreak_sound.play();
    }
  }

  bottleHitEndBossSound(soundIsOn) {
    if (soundIsOn) {
      this.endBoss_hit_sound.play();
    }
  }
}
