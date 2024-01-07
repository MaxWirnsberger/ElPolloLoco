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

  setWorld() {
    let boss = this.level.endboss[0];
    boss.world = this;
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionswithEndboss();
      this.pickUpCoin();
      this.pickUpBottles();
      this.checkDistanceToBoss();
    }, 10);
  }

  bottleAttack() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkBottleCollisions();
      this.checkBottleEndbossAttack();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.checkIfHitWithAJump(enemy, index)) {
        this.character.jump();
        this.killChickeWithAJump(enemy, index);
        this.statusBarLife.setPercentage(this.character.energy);
      } else if (this.checkItWillGetHurt(enemy, index)) {
        this.character.hit();
        this.statusBarLife.setPercentage(this.character.energy);
        this.checkGameOver();
      }
    });
  }

  checkIfHitWithAJump(enemy) {
    return (
      this.character.isAboveGround() &&
      this.character.isColliding(enemy) &&
      !enemy.chickenIsDead
    );
  }

  checkItWillGetHurt(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      !enemy.chickenIsDead &&
      !this.character.didHit
    );
  }

  killChickeWithAJump(enemy) {
    enemy.enemyDead = true;
    enemy.stopChicken();
  }

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

  checkCollisionswithEndboss() {
    this.level.endboss.forEach((boss) => {
      if (this.character.isColliding(boss) && !boss.bossIsDead) {
        this.character.hit();
        this.statusBarLife.setPercentage(this.character.energy);
        this.checkGameOver();
      }
    });
  }

  pickUpCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.addCoin();
        this.level.coins.splice(index, 1);
        this.statusBarCoin.setPercentage(this.character.coins);
      }
    });
  }

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

  checkThrowObjects() {
    if (this.keyboard.F && this.character.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y
      );
      bottle.throwBottleSound(this.soundIsOn);
      this.character.bottles -= 1;
      this.statusBarBottle.setPercentage(this.character.bottles);
      this.throwableObjects.push(bottle);
    }
  }

  checkDistanceToBoss() {
    let boss = this.level.endboss[0];
    this.distanceBossAndCharacter = boss.distanceToBoss(this.character.x);
    boss.firstContactCheck(this.character.x);
  }

  checkWinning(boss) {
    if (boss.endbossIsDead()) {
      this.character.stopCharacter();
      boss.stopBoss();
    }
  }

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

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);
    movableObject.drawFrameHitBox(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
