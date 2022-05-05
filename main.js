import { gameOverSound, music, score, bulletSpound, crash } from "./sound.js";
import { hitTestRectangle, contain } from "./hitTestRectangle.js";
import { inputDirection } from "./movement.js";
import { menu, gameOverScene, gameOverText, gameOverStyle } from "./scenes.js";
import { sound } from "@pixi/sound";
//import "./style.css"
import * as PIXI from "pixi.js";
let ammo = [];
let background;
let spaceShip, fire;
let state;
let message,
  point = 0;
export let menuLogo;
let enemies;
let loading;
let gameScene, loadingScene;
let explosionTextures = [];
let loadingTextures = [];

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
  .add("assets/loading.json")
  .add("assets/logo.png")
  .load(setup);


export function setup() {
  state = idle;
  gameScene = new PIXI.Container();
  loadingScene = new PIXI.Container();
  loadExplosionTextures();
  loadLoadingScreenTextures();
  animateLoadingScreen();


  const explosion = new PIXI.AnimatedSprite(explosionTextures);
  const explosion2 = new PIXI.AnimatedSprite(explosionTextures);

  explosion.height = 300;
  explosion.width = 300;
  explosion.play();
  explosion.position.set(100, 300);
  explosion.animationSpeed = 0.5;
  explosion.anchor.set(0.5);
  menu.addChild(explosion);

  explosion2.height = 300;
  explosion2.width = 300;
  explosion2.play();
  explosion2.position.set(700, 300);
  explosion2.animationSpeed = 0.5;
  explosion2.anchor.set(0.5);
  menu.addChild(explosion2);

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
  app.stage.addChild(loadingScene);
  setTimeout(() => {
    app.stage.addChild(menu);
    loadingScene.visible = false;
  }, 2000);
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

function animateLoadingScreen() {
  loading = new PIXI.AnimatedSprite(loadingTextures);
  loading.loop = true;
  loading.height = 200;
  loading.width = 200;
  loading.anchor.set(0.5);
  loading.position.set(400, 300);
  loading.animationSpeed = 0.1;
  loading.play();
  loadingScene.addChild(loading);
}

function loadLoadingScreenTextures() {
  let j;
  for (j = 1; j < 9; j++) {
    const texture = PIXI.Texture.from(`loading_${j}.png`);
    loadingTextures.push(texture);
  }
}
function loadExplosionTextures() {
  let i;
  for (i = 1; i < 40; i++) {
    const texture = PIXI.Texture.from(`explosion_${i}.png`);
    explosionTextures.push(texture);
  }
}

export function start() {
  state = play;
  shoot();
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

  enemies = [];
  ammo = [];
  for (var i = gameScene.children.length - 1; i >= 0; i--) {
    gameScene.removeChild(gameScene.children[i]);
  }
}

//SHOOTING MECHANISM
function shoot() {
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
}

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
  console.log("added")
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
