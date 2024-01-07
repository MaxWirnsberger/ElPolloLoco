/**
 * This class describes the clouds and inherits MovableObject class
 */
class Cloud extends MovableObject{
    y = 20;
    width = 500;
    height = 250;

    /**
     * This constructor loads the images of the clouds and runs the animation.
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }  

    /**
     * let the clouds float to the left
     */
    animate(){
        this.moveLeft();    
    }
}
