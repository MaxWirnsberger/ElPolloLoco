class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  world;
  EndbossIsDead = false;

  moveLeftInterval;
  animationInterval;
  bossIsDead = false;
  win_game_sound = new Audio("audio/win.mp3");

  offset = {
    top: 60,
    right: 0,
    bottom: 5,
    left: 15,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.speed = 15;
    this.animate();
  }

  animate() {
    this.moveLeftInterval = setInterval(() => {
      if (this.hadFirstContactWithBoss) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (
        this.BossWalkingIntervall < 10 &&
        !this.hadFirstContactWithBoss
      ) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.world.distanceBossAndCharacter > 10) {
        this.moveLeft();
        this.endbossReactions();
      }
      this.BossWalkingIntervall++;
    }, 150);
  }

  endbossReactions() {
      this.animationInterval = setInterval(() => {
        if (this.endbossIsDead()) {
          this.playAnimation(this.IMAGES_DEAD);
          this.playWinningSound();
          this.endCardScreenWin();
          this.stopBoss();
        } else if (this.BottleGoalOnEndboss()) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }, 150);
  }

  stopBoss() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.animationInterval);
    this.bossIsDead = true;
  }

  playWinningSound() {
    if (this.world.soundIsOn) {
      this.win_game_sound.play();
      this.world.worldSound.pause();
    }
  }

  endCardScreenWin() {
    setTimeout(() => {
      let endScreen = document.getElementById("endContainer");
      let endText = document.getElementById("endIMG");
      endText.src = "img/9_intro_outro_screens/game_over/game over!.png";
      endScreen.classList.remove("displayNone");
    }, 1000);
  }
}
