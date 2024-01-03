class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 240;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Coins ||
      this instanceof Bottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = this.objectColorCheck();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  objectColorCheck() {
    if (this instanceof Character) {
      return "blue";
    } else if (this instanceof Chicken) {
      return "orange";
    } else if (this instanceof Endboss) {
      return "red";
    } else if (this instanceof Coins) {
      return "yellow";
    } else if (this instanceof Bottle) {
      return "green";
    }
  }
}
