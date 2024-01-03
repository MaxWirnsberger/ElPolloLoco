class Coins extends DrawableObject {
  y = 50 + Math.random() * 320;
  x = 300 + Math.random() * 2000;
  height = 45;
  width = 45;
  coinCounter;

  constructor(number) {
    super().loadImage("img/8_coin/coin_2.png");
    this.coinCounter = number;
  }
}
