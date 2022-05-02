import { gameOverSound, music, score, bulletSpound, crash } from "./sound.js";
import { hitTestRectangle, contain } from "./hitTestRectangle.js";
import { inputDirection } from "./movement.js";
import { menu, gameOverScene, gameOverText, gameOverStyle } from "./scenes.js";

let ammo = [];
let background;
let spaceShip;
let state, fire;
let point = 0;
let message;
export let menuLogo;
let enemies;

let app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

//LOADING ASSETS
PIXI.Loader.shared
  .add("assets/spaceShip.png")
  .add("assets/background.png")
  .add("assets/fire.gif")
  .add("assets/bullet.png")
  .add("assets/enemy.png")
  .add("assets/explosion.json")
  .add("assets/logo.png")
  .load(setup);
let gameScene;

export function setup() {
  state = idle;
  gameScene = new PIXI.Container();

  let sheet = PIXI.Loader.shared.resources["assets/explosion.png"];
  explosion = new PIXI.extras.AnimatedSprite(sheet.animations["explosion"]);
  menuLogo = new PIXI.Sprite(
    PIXI.Loader.shared.resources["assets/logo.png"].texture
  );
  menuLogo.anchor.set(0.5);
  menuLogo.position.set(400, 120);
  menuLogo.width = 160;
  menuLogo.height = 80;

  //ADDING SCENES TO STAGE
  app.stage.addChild(gameScene);
  app.stage.addChild(gameOverScene);
  app.stage.addChild(menu);
  menu.addChild(menuLogo);

  //SCENES VISIBILIY
  menu.visible = true;
  gameScene.visible = false;
  gameOverScene.visible = false;

  const style = new PIXI.TextStyle({
    fontFamily: "VT323",
    fontSize: 64,
    fill: "white",
  });

  //SCOREBOARD
  message = new PIXI.Text("SCORE:" + point, style);
  message.position.set(10, 10);

  //bg image
  background = new PIXI.TilingSprite(
    PIXI.Loader.shared.resources["assets/background.png"].texture,
    800,
    600
  );
  fire = new PIXI.Sprite(
    PIXI.Loader.shared.resources["assets/fire.gif"].texture
  );

  spaceShip = new PIXI.Sprite(
    PIXI.Loader.shared.resources["assets/spaceShip.png"].texture
  );
  //spaceship position
  spaceShip.position.set(20, 100);
  //velocity
  spaceShip.vx = 0;
  spaceShip.vy = 0;
  //spaceship scale
  spaceShip.width = 60;
  spaceShip.height = 60;

  fire.width = 90;
  fire.height = 90;
  fire.position.set(-90, 145);

  app.ticker.add((delta) => gameLoop(delta));
}

export function start() {
  state = play;
  enemies = [];
  ammo = [];
  point = 0;
  message.text = "SCORE:" + point;
  music.play();
  spaceShip.addChild(fire);
  gameScene.addChild(background);
  gameScene.addChild(spaceShip);
  gameScene.addChild(message);

  menu.visible = false;
  gameOverScene.visible = false;
  gameScene.visible = true;
  if (state == play) {
    setInterval(addEnemy, 2000);
  }
}

function idle() {}

export function toMenu() {
  state = idle;
  gameScene.visible = false;
  gameOverScene.visible = false;
  menu.visible = true;
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
  music.stop();
  enemies = [];
  ammo = [];
  for (var i = gameScene.children.length - 1; i >= 0; i--) {
    gameScene.removeChild(gameScene.children[i]);
  }
}

//SHOOTING MECHANISM
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    let bullet = new PIXI.Sprite(
      PIXI.Loader.shared.resources["assets/bullet.png"].texture
    );
    let startY = spaceShip.y + spaceShip.height / 4;
    let startX = spaceShip.x + 30;
    bullet.position.set(startX, startY);
    gameScene.addChild(bullet);
    bulletSpound.play();

    ammo.push(bullet);
  }
});

//RANDOM NUM FOR RANDOM MOVEMENT
//TODO
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//CREATE ENEMY
function addEnemy() {
  let enemy = new PIXI.Sprite(
    PIXI.Loader.shared.resources["assets/enemy.png"].texture
  );
  enemy.width = 60;
  enemy.height = 60;
  enemy.position.set(
    randomInt(800, 900) - enemy.width,
    randomInt(1, 600) - enemy.height
  );
  gameScene.addChild(enemy);
  enemies.push(enemy);
}

function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  contain(spaceShip, { x: 0, y: 0, width: 800, height: 600 });
  spaceShip.x += inputDirection.x;
  spaceShip.y += inputDirection.y;

  //MINDEN AMMOT AZ AMMO ARRAYBEN SHIFTEL 1EL AZ X TENGELYEN
  for (let i = 0; i < ammo.length; i++) {
    ammo[i].x += 5;
    for (let j = 0; j < enemies.length; j++) {
      if (hitTestRectangle(ammo[i], enemies[j])) {
        point += 10;
        message.text = "SCORE:" + point;
        gameScene.removeChild(enemies[j]);
        gameScene.removeChild(ammo[i]);
        enemies.splice(j, 1);
        ammo.splice(i, 1);
        crash.play();
        score.play();
      }
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    if (hitTestRectangle(enemies[i], spaceShip)) {
      crash.play();
      gameOverSound.play();
      state = end;
      gameOverText.text = "GAME OVER!\nSCORE:" + point;
    }
    enemies[i].x -= 5;
  }

  //PARALLAX SCROLLING EFFECT
  background.tilePosition.x -= 1;
}
