/**
 * Describes the class for the bottles received, inheriting from DrawableObject
 */
class StatusBarEndboss extends DrawableObject {
  IMAGES_BOSS = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  percentage = 100;

  /**
   * Loads some images to visualize the status display and describes them
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSS);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Inserts the appropriate status bar
   * @param {number} percentage 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Checks the health status of the endboss and returns it as a number to display the correct status display
   * @returns number
   */
  resolveImageIndex() {
    if (this.percentage >= 80) {
      return 5;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else if (this.percentage >= 1) {
      return 0;
    } else {
      return 0;
    }
  }
}
