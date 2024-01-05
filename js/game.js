let canvas;
let world;
let keyboard = new Keyboard();
let worldSound = new Audio("audio/music.mp3");

function startGame() {
  loadingSceen();
  initLevel();
  init();
  removeStartSceen();
  aktivateButtons();
  soundon();
}

function loadingSceen() {
  document.getElementById("startButton").innerHTML = `
    <img src="./img/startScreen/Spinner.gif" alt="loading">`;
}

function removeStartSceen() {
  setTimeout(() => {
    document.getElementById("startscreen").classList.add("displayNone");
  }, 1000);
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function openInfo() {
  document.getElementById("infoSite").classList.remove("displayNone");
}

function closeInfo() {
  document.getElementById("infoSite").classList.add("displayNone");
}

function muteSound() {
  let muteButton = document.getElementById("mute");
  let volumeUp = "./img/startScreen/volume_up.svg";
  let volumeOff = "./img/startScreen/volume_off.svg";
  let volumeImgPath = volumeImgPathTester();
  if (volumeImgPath == volumeUp) {
    muteButton.src = volumeOff;
    // Hier muss noch eine Function ergänst werden, welche den Ton ausschaltet
  } else if (volumeImgPath == volumeOff) {
    muteButton.src = volumeUp;
    // Hier muss noch eine Function ergänst werden, welche den Ton einschaltet
  }
}

function soundon() {
  worldSound.play();
}

function fullscrenn() {
  let fullscreen = document.getElementById("container");
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
