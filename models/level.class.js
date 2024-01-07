/**
 * This class declares the first level and includes the various elements, except for the character
 */
class Level {
    bottles;
    coins;
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    /**
     * This constructor invites multiple classes to add to the level
     * 
     * @param {class} bottles 
     * @param {class} coins 
     * @param {classes} enemies 
     * @param {class} endboss 
     * @param {class} clouds 
     * @param {class} backgroundObjects 
     */
    constructor(bottles, coins, enemies, endboss, clouds, backgroundObjects){
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
