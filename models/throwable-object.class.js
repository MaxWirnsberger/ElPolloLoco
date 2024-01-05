class ThrowableObject extends MovableObject {
  hitEnemyWithBottle = false;
  IMAGE_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_GLASBREAK = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGE_BOTTLE);
    this.loadImages(this.IMAGE_GLASBREAK);
    this.x = x;
    this.y = y;
    this.trow();
    this.animate();
  }

  trow() {
    this.width = 100;
    this.height = 80;
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  animate() {
    setInterval(() => {
      if (this.bottleArrivedGround()) {
        this.bottleSplash();
        this.hitEnemyWithBottle = false;
      } else {
        this.playAnimation(this.IMAGE_BOTTLE);
      }
    }, 50);
  }

  bottleArrivedGround(){
    return this.y >= 300;
  }

  bottleSplash() {
    this.playAnimation(this.IMAGE_GLASBREAK);
    this.speedY = -25;
  }
}
