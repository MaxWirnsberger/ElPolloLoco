class Bottle extends DrawableObject {
  y = 360;
  height = 70;
  width = 80;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 300 + Math.random() * 2000;
  }
}
