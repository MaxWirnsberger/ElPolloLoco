let canvas;
let world;
let keyboard = new Keyboard();
let soundIsOn = false;
let fullscrennTest = false;
worldSound = new Audio("audio/music.mp3");

/**
 * Initiates some functions when starting the game
 */
function startGame() {
  loadingSceen();
  initLevel();
  init();
  removeStartSceen();
  aktivateButtons();
  soundon();
  muteButtonTestOnStart();
}

/**
 * shows a loading bar while the game is setting up
 */
function loadingSceen() {
  document.getElementById("startButton").innerHTML = `
    <img src="./img/startScreen/Spinner.gif" alt="loading">`;
}

/**
 * Changes from the start screen to the actual game
 */
function removeStartSceen() {
  setTimeout(() => {
    let canvasContrainer = document.getElementById("canvasContainer");
    document.getElementById("startContainer").classList.add("displayNone");
    canvasContrainer.classList.remove("displayNone");
  }, 3000);
}

/**
 * Initiation function to create the gaming world
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundIsOn, worldSound);
}

/**
 * Opens the game's information overview
 */
function openInfo() {
  document.getElementById("infoSite").classList.remove("displayNone");
}

/**
 * Closed the game's information overview
 */
function closeInfo() {
  document.getElementById("infoSite").classList.add("displayNone");
}

/**
 * Function ensures that the sound of the game is played
 * 
 * @param {string} id 
 */
function muteSound(id) {
  let muteButton = document.getElementById(id);
  let volumeUp = "./img/startScreen/volume_up.svg";
  let volumeOff = "./img/startScreen/volume_off.svg";
  if (soundIsOn) {
    muteButton.src = volumeOff;
    SoundOptionsOFF(id);
    soundon();
  } else {
    muteButton.src = volumeUp;
    SoundOptionsON(id);
    soundon();
  }
}

/**
 * Changes the icon for the sound button
 */
function muteButtonTestOnStart() {
  let muteButton = document.getElementById("muteOnGame");
  let volumeUp = "./img/startScreen/volume_up.svg";
  let volumeOff = "./img/startScreen/volume_off.svg";
  if (soundIsOn) {
    muteButton.src = volumeUp;
  } else {
    muteButton.src = volumeOff;
  }
}

/**
 * Executed by the muteSound(id) function and sets SoundIsOn to False
 * 
 * @param {string} id 
 */
function SoundOptionsOFF(id) {
  if (id == "muteOnGame") {
    world.soundIsOn = false;
    soundIsOn = false;
  } else {
    soundIsOn = false;
  }    
}

/**
 * Executed by the muteSound(id) function and sets SoundIsOn to True
 * 
 * @param {string} id 
 */
function SoundOptionsON(id) {
  if (id == "muteOnGame") {
    world.soundIsOn = true;
    soundIsOn = true;
  } else {
    soundIsOn = true;
  }  
}

/**
 * Sets the general background sound to On or Off
 */
function soundon() {
  if (soundIsOn) {
    worldSound.play();
  } else {
    worldSound.pause();
  }
}

/**
 * Sets the variables to run the FullScreen on the ID "canvas Container".
 */
function fullscrenn() {
  let fullscreen = document.getElementById("canvasContainer");
  enterFullscreen(fullscreen);
}

/**
 * Runs the FullScreen on the Canvas Container
 * 
 * @param {string} element 
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Creates a string to check a pass to an image
 * 
 * @returns string - with an img path
 */
function volumeImgPathTester() {
  let path = document.getElementById("mute").src.split("img")[1];
  path = `./img` + path;
  return path;
}

/**
 * Checks whether certain keys are pressed
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 70) {
    keyboard.F = true;
  }
});

/**
 * Check whether certain keys are no longer pressed
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 70) {
    keyboard.F = false;
  }
});

/**
 * Checks whether certain IDs are pressed and released in order to be able to play the game responsively
 */
function aktivateButtons() {
  document.getElementById("left").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("left").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById("right").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("right").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById("jump").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("jump").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
  });
  document.getElementById("shoot").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.F = true;
  });
  document.getElementById("shoot").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.F = false;
  });
}
