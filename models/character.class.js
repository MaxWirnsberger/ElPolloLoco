/**
 * This class describes the hero Pepe and inherits from the MovableObject class
 */
class Character extends MovableObject {
  height = 300;
  width = 130;
  y = 130;
  speed = 10;
  lastDoing = 0;
  nothingToDo = false;

  offset = {
    top: 100,
    right: 20,
    bottom: 10,
    left: 20,
  };

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  world;
  moveIntervall;
  animateInterval;

  wolking_sound = new Audio("audio/running.mp3");
  jumping_sound = new Audio("audio/jump.mp3");

  /**
   * This constructor loads several image sections of Pepe and executes the gravity and animation.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Trigger functions at a specified interval to move the character and animate the actions
   */
  animate() {
    this.moveIntervall = setInterval(() => this.movingCharacter(), 1000 / 60);
    this.animateInterval = setInterval(() => this.animateCharacter(), 50);
  }

  /**
   * Checks which activities are triggered and triggers other functions to execute the movements
   */
  movingCharacter() {
    this.wolking_sound.pause();
    if (this.isMovingRight()) {
      this.functionsToMoveToTheRight();
    } else if (this.isMovingLeft()) {
      this.functionsToMoveToTheLeft();
    } else if (this.isJumpingNow()) {
      this.jump();
      this.nothingToDo = false;
    }
    this.world.camera_x = -this.x + 120;
  }

  /**
   * Checks whether the character moves to the right
   * @returns boolean
   */
  isMovingRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x &&
      this.world.distanceBossAndCharacter > 10
    );
  }

  /**
   * triggers functions when the character moves to the right
   */
  functionsToMoveToTheRight() {
    this.moveRight();
    this.otherDirection = false;
    this.characterSoundWalkingCheck();
    this.nothingToDo = false;
  }

  /**
   * Checks whether the character moves to the left
   * @returns boolean
   */
  isMovingLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * triggers functions when the character moves to the left
   */
  functionsToMoveToTheLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.characterSoundWalkingCheck();
    this.nothingToDo = false;
  }

  /**
   * Checks whether the character jump
   * @returns boolean
   */
  isJumpingNow() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Checks which activities are triggered and triggers other functions to execute the animation
   */
  animateCharacter() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.characterSoundJumpingCheck();
    } else {
      this.isMovingOrNot();
    }
  }

  /**
   * This checks whether Pepe is not moving
   */
  isMovingOrNot() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (!this.nothingToDo) {
      this.lastDoing = new Date().getTime();
      this.nothingToDo = true;
    } else if (!this.isDoingNothing()) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE_LONG);
    }
  }

  /**
   * Here True is returned if Pepe doesn't move
   * @returns boolean
   */
  isDoingNothing() {
    return (
      !this.isMovingRight() &&
      !this.isMovingLeft() &&
      !this.isJumping &&
      this.isSleeping()
    );
  }

  /**
   * Here True is returned if Pepe doesn't move for more than 5 seconds
   * @returns boolean
   */
  isSleeping() {
    let timepassed = new Date().getTime() - this.lastDoing;
    timepassed = timepassed / 1000;
    return timepassed > 5;
  }

  /**
   * Creates an end screen when the game is over
   */
  endCardScreen() {
    setTimeout(() => {
      let endScreen = document.getElementById("endContainer");
      let endText = document.getElementById("endIMG");
      endText.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
      endScreen.classList.remove("displayNone");
    }, 1000);
  }

  /**
   * Checks whether the sound is permitted and plays the walkin sound
   */
  characterSoundWalkingCheck() {
    if (this.world.soundIsOn) {
      this.wolking_sound.play();
    }
  }

  /**
   * Checks whether the sound is permitted and plays the jumping sound
   */
  characterSoundJumpingCheck() {
    if (this.world.soundIsOn && !this.isJumping) {
      this.jumping_sound.play();
      this.isJumping = true;
    }
  }

  /**
   * Stops the character's intervals when the game is over
   */
  stopCharacter() {
    clearInterval(this.moveIntervall);
    clearInterval(this.animateInterval);
  }
}
