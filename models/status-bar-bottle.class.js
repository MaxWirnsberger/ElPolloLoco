/**
 * Describes the class for the bottles received, inheriting from DrawableObject
 */
class StatusBarBottle extends DrawableObject {
  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  percentage = 0;

  /**
   * Loads some images to visualize the status display and describes them
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 30;
    this.y = 40;
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
    let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Checks the number of pickUpped Bottles and returns it as a number to display the correct status display
   * @returns number
   */
  resolveImageIndex() {
    if (this.percentage >= 8) {
      return 5;
    } else if (this.percentage >= 6) {
      return 4;
    } else if (this.percentage >= 4) {
      return 3;
    } else if (this.percentage >= 2) {
      return 2;
    } else if (this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
