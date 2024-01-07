let canvas;
let world;
let keyboard = new Keyboard();
let soundIsOn = false;
worldSound = new Audio("audio/music.mp3");

function startGame() {
  loadingSceen();
  initLevel();
  init();
  removeStartSceen();
  aktivateButtons();
  soundon();
  muteButtonTestOnStart();
}

function loadingSceen() {
  document.getElementById("startButton").innerHTML = `
    <img src="./img/startScreen/Spinner.gif" alt="loading">`;
}

function removeStartSceen() {
  setTimeout(() => {
    let canvasContrainer = document.getElementById("canvasContainer");
    document.getElementById("startContainer").classList.add("displayNone");
    canvasContrainer.classList.remove("displayNone");
  }, 3000);
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundIsOn, worldSound);
}

function openInfo() {
  document.getElementById("infoSite").classList.remove("displayNone");
}

function closeInfo() {
  document.getElementById("infoSite").classList.add("displayNone");
}

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

function SoundOptionsOFF(id) {
  if (id == "muteOnGame") {
    world.soundIsOn = false;
    soundIsOn = false;
  } else {
    soundIsOn = false;
  }    
}

function SoundOptionsON(id) {
  if (id == "muteOnGame") {
    world.soundIsOn = true;
    soundIsOn = true;
  } else {
    soundIsOn = true;
  }  
}

function soundon() {
  if (soundIsOn) {
    worldSound.play();
  } else {
    worldSound.pause();
  }
}

function fullscrenn() {
  let fullscreen = document.getElementById("canvasContainer");
  enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function volumeImgPathTester() {
  let path = document.getElementById("mute").src.split("img")[1];
  path = `./img` + path;
  return path;
}

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
