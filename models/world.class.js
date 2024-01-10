/**
 * Creates the world class and adds several elements to it.
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  soundIsOn;
  worldSound;
  camera_x = 0;
  distanceBossAndCharacter;
  statusBarLife = new StatusBarLife();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  statusBarBoss = new StatusBarEndboss();
  throwableObjects = [];

  /**
   * The Constructor performs several functions to bring the world to life
   * @param {string} canvas 
   * @param {boolean} keyboard 
   * @param {boolean} soundIsOn 
   * @param {string} worldSound 
   */
  constructor(canvas, keyboard, soundIsOn, worldSound) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundIsOn = soundIsOn;
    this.worldSound = worldSound;
    this.draw();
    this.setWorld();
    this.run();
    this.bottleAttack();
  }

  /**
   * Adds various elements to the world's options
   */
  setWorld() {
    let boss = this.level.endboss[0];
    boss.world = this;
    this.character.world = this;
  }

  /**
   * Fires multiple functions at an interval to check whether elements collide or elements are canceled
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionswithEndboss();
      this.pickUpCoin();
      this.pickUpBottles();
      this.checkDistanceToBoss();
    }, 10);
  }

  /**
   * Triggers multiple functions at an interval to check if the bottles collide with an opponent
   */
  bottleAttack() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkBottleCollisions();
      this.checkBottleEndbossAttack();
    }, 200);
  }

  /**
   * Check the collision between Pepe and the chickens
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.checkIfHitWithAJump(enemy, index)) {
        this.character.jump();
        this.killChickeWithAJump(enemy, index);
        this.statusBarLife.setPercentage(this.character.energy);
      } else if (this.checkItWillGetHurt(enemy, index)) {
        this.character.hit("chicken");
        this.statusBarLife.setPercentage(this.character.energy);
        this.checkGameOver();
      }
    });
  }

  /**
   * Checks whether Pepe jumps to defeat an opponent
   * 
   * @param {Array} enemy 
   * @returns boolean
   */
  checkIfHitWithAJump(enemy) {
    return (
      this.character.isAboveGround() &&
      this.character.isColliding(enemy) &&
      !enemy.chickenIsDead
    );
  }

  /**
   * Checks whether Pepe can be hit by opponents
   * 
   * @param {Array} enemy 
   * @returns boolean
   */
  checkItWillGetHurt(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      !enemy.chickenIsDead &&
      !this.character.didHit
    );
  }

  /**
   * Checks if Chicken has been defeated
   * 
   * @param {Array} enemy 
   */
  killChickeWithAJump(enemy) {
    enemy.enemyDead = true;
    enemy.stopChicken();
  }

  /**
   * Checks whether the bottle collides with the opponent
   */
  checkBottleCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle) => {
        if (enemy.isColliding(bottle)) {
          bottle.glasBreakSound();
          bottle.hitEnemyWithBottle = true;
          enemy.enemyDead = true;
          enemy.stopChicken();
        }
      });
    });
  }

  /**
   * Check if the bottle collides with the Endboss
   */
  checkBottleEndbossAttack() {
    this.level.endboss.forEach((boss) => {
      this.throwableObjects.forEach((bottle) => {
        if (boss.isColliding(bottle) && !boss.didEndbossHit) {
          boss.endbossHit();
          boss.bottleHitEndBossSound(this.soundIsOn);
          bottle.glasBreakSound(this.soundIsOn);
          this.statusBarBoss.setPercentage(boss.bossEnergy);
          this.checkWinning(boss);
        }
      });
    });
  }

  /**
   * Check if Pepe collides with the Endboss
   */
  checkCollisionswithEndboss() {
    this.level.endboss.forEach((boss) => {
      if (this.character.isColliding(boss) && !boss.bossIsDead) {
        this.character.hit("boss");
        this.statusBarLife.setPercentage(this.character.energy);
        this.checkGameOver();
      }
    });
  }

  /**
   * Check whether Pepe collides with any Coins and pick them up
   */
  pickUpCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.addCoin();
        this.level.coins.splice(index, 1);
        this.statusBarCoin.setPercentage(this.character.coins);
      }
    });
  }

  /**
   * Check whether Pepe collides with any Bottles and pick them up
   */
  pickUpBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.addBottle();
        this.character.bottlePickUpSound(this.soundIsOn);
        this.level.bottles.splice(index, 1);
        this.statusBarBottle.setPercentage(this.character.bottles);
      }
    });
  }

  /**
   * When throwing the bottle, creates a new bottle if a bottle was previously picked up and throws it
   */
  checkThrowObjects() {
    if (this.keyboard.F && this.character.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y);
      bottle.throwBottleSound(this.soundIsOn);
      this.character.bottles -= 1;
      this.statusBarBottle.setPercentage(this.character.bottles);
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * Check the distance to the Endboss
   */
  checkDistanceToBoss() {
    let boss = this.level.endboss[0];
    this.distanceBossAndCharacter = boss.distanceToBoss(this.character.x);
    boss.firstContactCheck(this.character.x);
  }

  /**
   * Checks whether the final boss is dead and stops their intervals
   * 
   * @param {Array} boss 
   */
  checkWinning(boss) {
    if (boss.endbossIsDead()) {
      this.character.stopCharacter();
      boss.stopBoss();
    }
  }

  /**
   * Checks if the game is over and stops several intervals
   */
  checkGameOver() {
    if (this.character.isDead()) {
      this.character.stopCharacter();
      this.level.endboss[0].stopBoss();
      this.level.enemies.forEach((enemy) => {
        enemy.stopChicken();
      });
      this.character.endCardScreen();
    }
  }

  /**
   * Draws the elements on the canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBoss);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds objects to canvas
   * 
   * @param {Array} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds moving elements to the canvas
   * 
   * @param {Array} movableObject 
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    } movableObject.draw(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  /**
   * Make sure Pepe can look the other way
   * @param {Array} mo 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Make sure Pepe can look the right direction again
   * @param {Array} mo 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
