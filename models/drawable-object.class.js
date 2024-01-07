/**
 * This class is a pre-class for several elements in the game.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 240;
  height = 150;
  width = 100;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  throw_sound = new Audio("audio/throw.mp3");
  bottlePickUp_sound = new Audio("audio/bottle.mp3");
  glasBreak_sound = new Audio("audio/glass.mp3");
  endBoss_hit_sound = new Audio("audio/chicken.mp3");

  /**
   * Is a function that adds images to the game
   * @param {string} path 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function allows multiple images to be integrated into the game
   * @param {Array} array 
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Adds the images into the game and thus draws the actual game
   * @param {canvas - context} ctx 
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // drawFrame(ctx) {
  //   if (
  //     this instanceof Character ||
  //     this instanceof Chicken ||
  //     this instanceof Endboss ||
  //     this instanceof Coins ||
  //     this instanceof Bottle
  //   ) {
  //     ctx.beginPath();
  //     ctx.lineWidth = "3";
  //     ctx.strokeStyle = this.objectColorCheck();
  //     ctx.rect(this.x, this.y, this.width, this.height);
  //     ctx.stroke();
  //   }
  // }

  // drawFrameHitBox(ctx) {
  //   if (
  //     this instanceof Character ||
  //     this instanceof Chicken ||
  //     this instanceof Endboss ||
  //     this instanceof Coins ||
  //     this instanceof Bottle
  //   ) {
  //     ctx.beginPath();
  //     ctx.lineWidth = "2";
  //     ctx.strokeStyle = "red";
  //     ctx.rect(
  //       this.x + this.offset.left,
  //       this.y + this.offset.top,
  //       this.width - this.offset.right - this.offset.left,
  //       this.height - this.offset.bottom - this.offset.top
  //     );
  //     ctx.stroke();
  //   }
  // }

  // objectColorCheck() {
  //   if (this instanceof Character) {
  //     return "blue";
  //   } else if (this instanceof Chicken) {
  //     return "orange";
  //   } else if (this instanceof Endboss) {
  //     return "red";
  //   } else if (this instanceof Coins) {
  //     return "yellow";
  //   } else if (this instanceof Bottle) {
  //     return "green";
  //   }
  // }
}
