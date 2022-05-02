import { toMenu, start, setup, menuLogo } from "./main.js";

export const gameOverScene = new PIXI.Container();
export const gameOverStyle = new PIXI.TextStyle({
  fontFamily: "VT323",
  fontSize: 70,
  fill: "white",
  align: "center",
});
export let gameOverText = new PIXI.Text("GAME OVER!\nSCORE:", gameOverStyle);
gameOverText.anchor.set(0.5);
gameOverText.position.set(400, 280);
gameOverScene.addChild(gameOverText);

const playAgainContainer = new PIXI.Container();
const rectangle = new PIXI.Graphics();

// TODO playagain container + click action
rectangle.beginFill(0x353839);
rectangle.drawRoundedRect(220, 320, 350, 100);
playAgainContainer.addChild(rectangle);
playAgainContainer.position.set(0, 20);
playAgainContainer.interactive = true;
playAgainContainer.buttonMode = true;
playAgainContainer.on("pointerdown", toMenu);

let playAgainText = new PIXI.Text("Main Menu", gameOverStyle);
playAgainText.anchor.set(0.5);
playAgainText.position.set(400, 370);

playAgainContainer.addChild(playAgainText);
gameOverScene.addChild(playAgainContainer);

//main Menu
export const menu = new PIXI.Container();

export const menuStyle = new PIXI.TextStyle({
  fontFamily: "VT323",
  fontSize: 48,
  fill: "white",
  align: "center",
});

createMenu(menu, "Game1", menuStyle, 0.5, 400, 200, true, true, start);
createMenu(menu, "Game2", menuStyle, 0.5, 400, 250, true, true, start);
createMenu(menu, "Game3", menuStyle, 0.5, 400, 300, true, true, start);
createMenu(menu, "Exit", menuStyle, 0.5, 400, 350, true, true, () => {
  window.open("https://www.reddit.com/");
});
function createMenu(
  scene,
  title,
  style,
  anchorPoint,
  x,
  y,
  interactive,
  buttonMode,
  callback
) {
  title = new PIXI.Text(title, style);
  title.anchor.set(anchorPoint);
  title.position.set(x, y);
  scene.addChild(title);
  title.interactive = interactive;
  title.buttonMode = buttonMode;
  menu.addChild(title);
  title.on("pointerdown", callback);
}
