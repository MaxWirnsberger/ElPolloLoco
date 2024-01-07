/**
 * Describes the class for the bottles received, inheriting from DrawableObject
 */
class StatusBarCoin extends DrawableObject {
  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];
  percentage = 0;

  /**
   * Loads some images to visualize the status display and describes them
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.x = 30;
    this.y = 80;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Inserts the appropriate status bar
   * @param {number} percentage 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Checks the number of pickUpped Coins and returns it as a number to display the correct status display
   * @returns number
   */
  resolveImageIndex() {
    if (this.percentage >= 80) {
      return 5;
    } else if (this.percentage >= 60) {
      return 4;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage >= 20) {
      return 2;
    } else if (this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
