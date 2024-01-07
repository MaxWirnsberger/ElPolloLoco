/**
 * This class declares the images of the Bottles, inheriting from DrawableObject
 */
class Bottle extends DrawableObject {
  y = 360;
  height = 70;
  width = 55;

  /**
   * This constructor loads the images of the bottle and places them in different positions on the x-axe
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 300 + Math.random() * 2000;
  }
}
