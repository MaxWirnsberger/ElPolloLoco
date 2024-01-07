/**
 * This class describes the Coins in the game and extends from the DrawableObject class
 */
class Coins extends DrawableObject {
  y = 80 + Math.random() * 320;
  x = 300 + Math.random() * 2000;
  height = 100;
  width = 100;

  /**
   * loads the image from the Coins
   */
  constructor() {
    super().loadImage("img/8_coin/coin_2.png");
  }
}
