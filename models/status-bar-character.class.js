/**
 * Describes the class for the bottles received, inheriting from DrawableObject
 */
class StatusBarLife extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  /**
   * Loads some images to visualize the status display and describes them
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 30;
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
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Checks the health status and returns it as a number to display the correct status display
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
