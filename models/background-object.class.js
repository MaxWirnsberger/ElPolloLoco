/**
 * This class declares the images in the background of the game, inheriting from MovableObjects
 */
class BackgroundObject extends MovableObject{

    width = 720;
    height = 480;

    /**
     * Creates new 'BackgroundImg' instance
     * @param {string} imagePath 
     * @param {number} x 
     */
    constructor(imagePath, x){
        super().loadImage(imagePath)
        this.x = x;
        this.y = 0;
    }
}