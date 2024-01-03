let level1;
function initLevel() {
  level1 = new Level(
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ],
    [
      new Coins(1),
      new Coins(2),
      new Coins(3),
      new Coins(4),
      new Coins(5),
      new Coins(6),
      new Coins(7),
      new Coins(8),
      new Coins(9),
      new Coins(10)
    ],
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Endboss(),
    ],
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png",-719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 2),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png",719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png",719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png",719 * 3),
    ]
  );
}
