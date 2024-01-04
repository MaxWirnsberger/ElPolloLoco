class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarLife = new StatusBarLife();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  statusBarBoss = new StatusBarEndboss();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionswithEndboss();
      this.pickUpCoin();
      this.pickUpBottles();
      this.checkThrowObjects();
      this.checkBottleCollisions();
      this.checkBottleEndbossAttace();
      this.checkDistanceToBoss();
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
      }
    });
  }

  checkIfHitWithAJump(enemy, index) {
    return (
      this.character.isAboveGround() &&
      this.character.isColliding(enemy) &&
      !this.level.enemies[index].chickenIsDead
    );
  }

  checkItWillGetHurt(enemy, index) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      !this.level.enemies[index].chickenIsDead &&
      !this.character.didHit
    );
  }

  killChickeWithAJump(enemy, index) {
    enemy.enemyDead = true;
    this.level.enemies[index].stopChicken();
    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 1000);
  }

  checkBottleCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      this.throwableObjects.forEach((bottle) => {
        if (enemy.isColliding(bottle)) {
          enemy.enemyDead = true;
          this.level.enemies[index].stopChicken();
          setTimeout(() => {
            this.level.enemies.splice(index, 1);
          }, 1000);
        }
      });
    });
  }

  checkBottleEndbossAttace() {
    this.level.endboss.forEach((boss) => {
      this.throwableObjects.forEach((bottle) => {
        if (boss.isColliding(bottle) && !boss.didEndbossHit) {
          boss.endbossHit();
          this.statusBarBoss.setPercentage(boss.bossEnergy);
        }
      });
    });
  }

  checkCollisionswithEndboss() {
    this.level.endboss.forEach((boss) => {
      if (this.character.isColliding(boss) && !boss.bossIsDead) {
        this.character.hit();
        this.statusBarLife.setPercentage(this.character.energy);
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
      this.character.bottles -= 1;
      this.statusBarBottle.setPercentage(this.character.bottles);
      this.throwableObjects.push(bottle);
    }
  }

  checkDistanceToBoss() {
    this.level.endboss[0].firstContactCheck(this.character.x);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBoss);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);

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
