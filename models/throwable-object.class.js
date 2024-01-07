/**
 * This class describes the bottles that can be thrown and inherits from the MovableObject class
 */
class ThrowableObject extends MovableObject {
  hitEnemyWithBottle = false;
  offset = {
    top: 10,
    right: 0,
    bottom: 5,
    left: 10
};
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

  /**
   * Executes functions that add the images and render them
   * 
   * @param {number} x 
   * @param {number} y 
   */
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

  /**
   * Throws function and adds gravity
   */
  trow() {
    this.width = 100;
    this.height = 80;
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  /**
   * Animates the thrown bottle
   */
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

  /**
   * Checks whether the bottle has reached the bottom
   * @returns boolean
   */
  bottleArrivedGround(){
    return this.y >= 300;
  }

  /**
   * Causes the bottle to shatter if it hits the ground
   */
  bottleSplash() {
    this.playAnimation(this.IMAGE_GLASBREAK);
    this.speedY = -25;
  }
}
