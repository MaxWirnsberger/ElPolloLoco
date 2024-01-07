/**
 * This class describes the enemies in the form of chickens and inherits MovableObject class
 */
class Chicken extends MovableObject {
  y = 360;
  height = 70;
  width = 80;
  enemyDead = false;
  chickenIntervals = [];
  moveLeftInterval;
  walkinAnimationInterval;
  chickenIsDead = false;

  offset = {
    top: 20,
    right: 10,
    bottom: 0,
    left: 10
};

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * This constructor loads several images of the chickens and runs the animation.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + Math.random() * 1500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
    this.animateDeadChicken();
  }

  /**
   * Trigger functions at a specified interval to move the character and animate the actions
   */
  animate() {
    this.moveLeftInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.walkinAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
    this.chickenIntervals.push(this.moveLeftInterval);
    this.chickenIntervals.push(this.walkinAnimationInterval);
  }

  /**
   * Trigger functions if the Chicken is dead
   */
  animateDeadChicken() {
    setInterval(() => {
      if (this.enemyDead) {
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
      }
    }, 150);
  }

  /**
   * Stops Interval if the chicken is dead
   */
  stopChicken() {
    this.chickenIntervals.forEach(clearInterval);
    this.chickenIsDead = true;
  }
}
