class Coins extends DrawableObject {
  y = 50 + Math.random() * 320;
  x = 300 + Math.random() * 2000;
  height = 120;
  width = 120;

  constructor() {
    super().loadImage("img/8_coin/coin_2.png");
  }
}
