/**
 * This class is a precursor to many moving elements in the game
 */
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

  /**
   * Describes the gravity when an element is above the ground
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * Checks if an element is above the ground
   * @returns boolean
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this.y < 130) {
      return true;
    } else {
      this.isJumping = false;
    }
  }

  /**
   * Checks if two elements in the game collide
   *
   * @param {string} obj
   * @returns boolean
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * Reduces Pepe's health when hit
   */
  hit(enemy) {
    this.hitCheckBossOrChicken(enemy)
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
      if (this.x > 0 && enemy == "boss") {
        this.x -= 150;
      }
      this.didHit = true;
      this.hitTimer();
    }
  }

  /**
   * Check whether Pepe was caught by the boss or a chicken
   */
  hitCheckBossOrChicken(enemy){
    if (enemy == "boss") {
      this.energy -= 33.3333;
    } else {
      this.energy -= 10;
    }
  }

  /**
   * Check the time when Pepe was hit
   */
  hitTimer() {
    setTimeout(() => {
      this.didHit = false;
    }, 1000);
  }

  /**
   * Adds the coins when they collided with Pepe
   */
  addCoin() {
    this.coins += 10;
  }

  /**
   * Adds the bottles when they collided with Pepe
   */
  addBottle() {
    this.bottles += 1;
  }

  /**
   * Checks whether Pepe can be hurt
   * @returns boolean
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks whether Pepe has already been defeated
   * @returns boolean
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * This function ensures that the elements can move to the right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * This function ensures that the elements can move to the left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Checks all images in an array and does this in a continuous loop
   *
   * @param {string} images // img Path
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * When executed, ensures that elements move 25px up
   */
  jump() {
    this.speedY = 25;
  }

  /**
   * Check the distance between Pepe and the final boss
   *
   * @param {number} characterX
   * @returns boolean
   */
  distanceToBoss(characterX) {
    return this.x - characterX;
  }

  /**
   * Check whether Pepe has already encountered the final boss
   *
   * @param {number} characterX
   */
  firstContactCheck(characterX) {
    if (characterX > 2000 && this.hadFirstContactWithBoss) {
      this.BossWalkingIntervall = 0;
      this.hadFirstContactWithBoss = false;
    }
  }

  /**
   * Check if the final boss is dead
   *
   * @returns boolean
   */
  endbossIsDead() {
    return this.bossEnergy == 0;
  }

  /**
   * Reduces Endboss health when hit
   */
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

  /**
   * ensures that the final boss cannot be beaten again straight away
   */
  hitEndbossTimer() {
    setTimeout(() => {
      this.didEndbossHit = false;
    }, 1000);
  }

  /**
   * Check whether the bottle can hurt the final boss at the moment
   *
   * @returns boolean
   */
  BottleGoalOnEndboss() {
    let timepassed = new Date().getTime() - this.lastEndbossHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  //Play Sounds-----------------------------------------------------
  /**
   * Plays sound when bottle is picked up
   * @param {boolean} soundIsOn
   */
  bottlePickUpSound(soundIsOn) {
    if (soundIsOn) {
      this.bottlePickUp_sound.play();
    }
  }

  /**
   * Plays sound when bottle is thrown
   * @param {boolean} soundIsOn
   */
  throwBottleSound(soundIsOn) {
    if (soundIsOn) {
      this.throw_sound.play();
    }
  }

  /**
   * Plays sound when bottle gets broken
   * @param {boolean} soundIsOn
   */
  glasBreakSound(soundIsOn) {
    if (soundIsOn) {
      this.glasBreak_sound.play();
    }
  }

  /**
   * Plays sound when the bottle hits the final boss
   * @param {boolean} soundIsOn
   */
  bottleHitEndBossSound(soundIsOn) {
    if (soundIsOn) {
      this.endBoss_hit_sound.play();
    }
  }
}
