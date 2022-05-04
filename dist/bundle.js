/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./hitTestRectangle.js":
/*!*****************************!*\
  !*** ./hitTestRectangle.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"contain\": () => (/* binding */ contain),\n/* harmony export */   \"hitTestRectangle\": () => (/* binding */ hitTestRectangle)\n/* harmony export */ });\nfunction hitTestRectangle(r1, r2) {\r\n  //Calculate `centerX` and `centerY` properties on the sprites\r\n  r1.centerX = r1.x + r1.width / 2;\r\n  r1.centerY = r1.y + r1.height / 2;\r\n  r2.centerX = r2.x + r2.width / 2;\r\n  r2.centerY = r2.y + r2.height / 2;\r\n\r\n  //Calculate the `halfWidth` and `halfHeight` properties of the sprites\r\n  r1.halfWidth = r1.width / 2;\r\n  r1.halfHeight = r1.height / 2;\r\n  r2.halfWidth = r2.width / 2;\r\n  r2.halfHeight = r2.height / 2;\r\n\r\n  //Create a `collision` variable that will tell us\r\n  //if a collision is occurring\r\n  let collision = false;\r\n\r\n  //Check whether the shapes of the sprites are overlapping. If they\r\n  //are, set `collision` to `true`\r\n  if (\r\n    Math.abs(r1.centerX - r2.centerX) < r1.halfWidth + r2.halfWidth &&\r\n    Math.abs(r1.centerY - r2.centerY) < r1.halfHeight + r2.halfHeight\r\n  ) {\r\n    collision = true;\r\n  }\r\n\r\n  //Return the value of `collision` back to the main program\r\n  return collision;\r\n}\r\n\r\n//player cant move out\r\nfunction contain(sprite, container) {\r\n  let collision = undefined;\r\n\r\n  //Left\r\n  if (sprite.x < container.x) {\r\n    sprite.x = container.x;\r\n    collision = \"left\";\r\n  }\r\n\r\n  //Top\r\n  if (sprite.y < container.y) {\r\n    sprite.y = container.y;\r\n    collision = \"top\";\r\n  }\r\n\r\n  //Right\r\n  if (sprite.x + sprite.width > container.width) {\r\n    sprite.x = container.width - sprite.width;\r\n    collision = \"right\";\r\n  }\r\n\r\n  //Bottom\r\n  if (sprite.y + sprite.height > container.height) {\r\n    sprite.y = container.height - sprite.height;\r\n    collision = \"bottom\";\r\n  }\r\n\r\n  //Return the `collision` value\r\n  return collision;\r\n}\r\n\n\n//# sourceURL=webpack://dist/./hitTestRectangle.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"menuLogo\": () => (/* binding */ menuLogo),\n/* harmony export */   \"setup\": () => (/* binding */ setup),\n/* harmony export */   \"start\": () => (/* binding */ start),\n/* harmony export */   \"toMenu\": () => (/* binding */ toMenu)\n/* harmony export */ });\n/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sound.js */ \"./sound.js\");\n/* harmony import */ var _hitTestRectangle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hitTestRectangle.js */ \"./hitTestRectangle.js\");\n/* harmony import */ var _movement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./movement.js */ \"./movement.js\");\n/* harmony import */ var _scenes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes.js */ \"./scenes.js\");\n\r\n\r\n\r\n\r\n\r\nlet ammo = [];\r\nlet background;\r\nlet spaceShip, fire;\r\nlet state;\r\nlet message,\r\n  point = 0;\r\nlet menuLogo;\r\nlet enemies;\r\nlet loading;\r\nlet gameScene, loadingScene;\r\nlet explosionTextures = [];\r\nlet loadingTextures = [];\r\n\r\nlet app = new PIXI.Application({ width: 800, height: 600 });\r\ndocument.body.appendChild(app.view);\r\n\r\n//LOADING ASSETS\r\nPIXI.Loader.shared\r\n  .add(\"assets/spaceShip.png\")\r\n  .add(\"assets/background.png\")\r\n  .add(\"assets/fire.gif\")\r\n  .add(\"assets/bullet.png\")\r\n  .add(\"assets/enemy.png\")\r\n  .add(\"assets/explosion.json\")\r\n  .add(\"assets/loading.json\")\r\n  .add(\"assets/logo.png\")\r\n  .load(setup);\r\n\r\nfunction setup() {\r\n  state = idle;\r\n  gameScene = new PIXI.Container();\r\n  loadingScene = new PIXI.Container();\r\n  loadExplosionTextures();\r\n  loadLoadingScreenTextures();\r\n  animateLoadingScreen();\r\n\r\n  const explosion = new PIXI.AnimatedSprite(explosionTextures);\r\n  const explosion2 = new PIXI.AnimatedSprite(explosionTextures);\r\n\r\n  explosion.height = 500;\r\n  explosion.width = 500;\r\n  explosion.play();\r\n  explosion.position.set(100, 300);\r\n  explosion.animationSpeed = 0.5;\r\n  explosion.anchor.set(0.5);\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.menu.addChild(explosion);\r\n\r\n  explosion2.height = 500;\r\n  explosion2.width = 500;\r\n  explosion2.play();\r\n  explosion2.position.set(700, 300);\r\n  explosion2.animationSpeed = 0.5;\r\n  explosion2.anchor.set(0.5);\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.menu.addChild(explosion2);\r\n\r\n  menuLogo = new PIXI.Sprite(\r\n    PIXI.Loader.shared.resources[\"assets/logo.png\"].texture\r\n  );\r\n  menuLogo.anchor.set(0.5);\r\n  menuLogo.position.set(400, 120);\r\n  menuLogo.width = 160;\r\n  menuLogo.height = 80;\r\n\r\n  //ADDING SCENES TO STAGE\r\n\r\n  app.stage.addChild(gameScene);\r\n  app.stage.addChild(_scenes_js__WEBPACK_IMPORTED_MODULE_3__.gameOverScene);\r\n  app.stage.addChild(loadingScene);\r\n  setTimeout(() => {\r\n    app.stage.addChild(_scenes_js__WEBPACK_IMPORTED_MODULE_3__.menu);\r\n    loadingScene.visible = false;\r\n  }, 2000);\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.menu.addChild(menuLogo);\r\n\r\n  //SCENES VISIBILIY\r\n\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.menu.visible = true;\r\n  gameScene.visible = false;\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.gameOverScene.visible = false;\r\n\r\n  const style = new PIXI.TextStyle({\r\n    fontFamily: \"VT323\",\r\n    fontSize: 64,\r\n    fill: \"white\",\r\n  });\r\n\r\n  //SCOREBOARD\r\n  message = new PIXI.Text(\"SCORE:\" + point, style);\r\n  message.position.set(10, 10);\r\n\r\n  //bg image\r\n  background = new PIXI.TilingSprite(\r\n    PIXI.Loader.shared.resources[\"assets/background.png\"].texture,\r\n    800,\r\n    600\r\n  );\r\n  fire = new PIXI.Sprite(\r\n    PIXI.Loader.shared.resources[\"assets/fire.gif\"].texture\r\n  );\r\n\r\n  spaceShip = new PIXI.Sprite(\r\n    PIXI.Loader.shared.resources[\"assets/spaceShip.png\"].texture\r\n  );\r\n  //spaceship position\r\n  spaceShip.position.set(20, 100);\r\n  //velocity\r\n  spaceShip.vx = 0;\r\n  spaceShip.vy = 0;\r\n  //spaceship scale\r\n  spaceShip.width = 60;\r\n  spaceShip.height = 60;\r\n\r\n  fire.width = 90;\r\n  fire.height = 90;\r\n  fire.position.set(-90, 145);\r\n\r\n  app.ticker.add((delta) => gameLoop(delta));\r\n}\r\n\r\nfunction animateLoadingScreen() {\r\n  loading = new PIXI.AnimatedSprite(loadingTextures);\r\n  loading.loop = true;\r\n  loading.height = 200;\r\n  loading.width = 200;\r\n  loading.anchor.set(0.5);\r\n  loading.position.set(400, 300);\r\n  loading.animationSpeed = 0.1;\r\n  loading.play();\r\n  loadingScene.addChild(loading);\r\n}\r\n\r\nfunction loadLoadingScreenTextures() {\r\n  let j;\r\n  for (j = 1; j < 9; j++) {\r\n    const texture = PIXI.Texture.from(`loading_${j}.png`);\r\n    loadingTextures.push(texture);\r\n  }\r\n}\r\nfunction loadExplosionTextures() {\r\n  let i;\r\n  for (i = 1; i < 40; i++) {\r\n    const texture = PIXI.Texture.from(`explosion_${i}.png`);\r\n    explosionTextures.push(texture);\r\n  }\r\n}\r\n\r\nfunction start() {\r\n  state = play;\r\n  shoot();\r\n  enemies = [];\r\n  ammo = [];\r\n  point = 0;\r\n  message.text = \"SCORE:\" + point;\r\n  _sound_js__WEBPACK_IMPORTED_MODULE_0__.music.play();\r\n  spaceShip.addChild(fire);\r\n  gameScene.addChild(background);\r\n  gameScene.addChild(spaceShip);\r\n  gameScene.addChild(message);\r\n\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.menu.visible = false;\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.gameOverScene.visible = false;\r\n  gameScene.visible = true;\r\n  if (state == play) {\r\n    setInterval(addEnemy, 2000);\r\n  }\r\n}\r\n\r\nfunction idle() {}\r\n\r\nfunction toMenu() {\r\n  state = idle;\r\n  gameScene.visible = false;\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.gameOverScene.visible = false;\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.menu.visible = true;\r\n}\r\n\r\nfunction end() {\r\n  gameScene.visible = false;\r\n  _scenes_js__WEBPACK_IMPORTED_MODULE_3__.gameOverScene.visible = true;\r\n  _sound_js__WEBPACK_IMPORTED_MODULE_0__.music.stop();\r\n  enemies = [];\r\n  ammo = [];\r\n  for (var i = gameScene.children.length - 1; i >= 0; i--) {\r\n    gameScene.removeChild(gameScene.children[i]);\r\n  }\r\n}\r\n\r\n//SHOOTING MECHANISM\r\nfunction shoot() {\r\n  window.addEventListener(\"keydown\", (e) => {\r\n    if (e.keyCode === 32) {\r\n      let bullet = new PIXI.Sprite(\r\n        PIXI.Loader.shared.resources[\"assets/bullet.png\"].texture\r\n      );\r\n      let startY = spaceShip.y + spaceShip.height / 4;\r\n      let startX = spaceShip.x + 30;\r\n      bullet.position.set(startX, startY);\r\n      gameScene.addChild(bullet);\r\n      _sound_js__WEBPACK_IMPORTED_MODULE_0__.bulletSpound.play();\r\n\r\n      ammo.push(bullet);\r\n    }\r\n  });\r\n}\r\n\r\n//RANDOM NUM FOR RANDOM MOVEMENT\r\n//TODO\r\nfunction randomInt(min, max) {\r\n  return Math.floor(Math.random() * (max - min + 1) + min);\r\n}\r\n\r\n//CREATE ENEMY\r\nfunction addEnemy() {\r\n  let enemy = new PIXI.Sprite(\r\n    PIXI.Loader.shared.resources[\"assets/enemy.png\"].texture\r\n  );\r\n  enemy.width = 60;\r\n  enemy.height = 60;\r\n  enemy.position.set(\r\n    randomInt(800, 900) - enemy.width,\r\n    randomInt(1, 600) - enemy.height\r\n  );\r\n  gameScene.addChild(enemy);\r\n  enemies.push(enemy);\r\n}\r\n\r\nfunction gameLoop(delta) {\r\n  state(delta);\r\n}\r\n\r\nfunction play(delta) {\r\n  (0,_hitTestRectangle_js__WEBPACK_IMPORTED_MODULE_1__.contain)(spaceShip, { x: 0, y: 0, width: 800, height: 600 });\r\n  spaceShip.x += _movement_js__WEBPACK_IMPORTED_MODULE_2__.inputDirection.x;\r\n  spaceShip.y += _movement_js__WEBPACK_IMPORTED_MODULE_2__.inputDirection.y;\r\n\r\n  //MINDEN AMMOT AZ AMMO ARRAYBEN SHIFTEL 1EL AZ X TENGELYEN\r\n  for (let i = 0; i < ammo.length; i++) {\r\n    ammo[i].x += 5;\r\n    for (let j = 0; j < enemies.length; j++) {\r\n      if ((0,_hitTestRectangle_js__WEBPACK_IMPORTED_MODULE_1__.hitTestRectangle)(ammo[i], enemies[j])) {\r\n        point += 10;\r\n        message.text = \"SCORE:\" + point;\r\n        gameScene.removeChild(enemies[j]);\r\n        gameScene.removeChild(ammo[i]);\r\n        enemies.splice(j, 1);\r\n        ammo.splice(i, 1);\r\n        _sound_js__WEBPACK_IMPORTED_MODULE_0__.crash.play();\r\n        _sound_js__WEBPACK_IMPORTED_MODULE_0__.score.play();\r\n      }\r\n    }\r\n  }\r\n  for (let i = 0; i < enemies.length; i++) {\r\n    if ((0,_hitTestRectangle_js__WEBPACK_IMPORTED_MODULE_1__.hitTestRectangle)(enemies[i], spaceShip)) {\r\n      _sound_js__WEBPACK_IMPORTED_MODULE_0__.crash.play();\r\n      _sound_js__WEBPACK_IMPORTED_MODULE_0__.gameOverSound.play();\r\n      state = end;\r\n      _scenes_js__WEBPACK_IMPORTED_MODULE_3__.gameOverText.text = \"GAME OVER!\\nSCORE:\" + point;\r\n    }\r\n    enemies[i].x -= 5;\r\n  }\r\n\r\n  //PARALLAX SCROLLING EFFECT\r\n  background.tilePosition.x -= 1;\r\n}\r\n\n\n//# sourceURL=webpack://dist/./main.js?");

/***/ }),

/***/ "./movement.js":
/*!*********************!*\
  !*** ./movement.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"inputDirection\": () => (/* binding */ inputDirection)\n/* harmony export */ });\nlet inputDirection = { x: 0, y: 0 };\r\nwindow.addEventListener(\"keydown\", (e) => {\r\n  switch (e.keyCode) {\r\n    case 39:\r\n      inputDirection.x = 5;\r\n\r\n      break;\r\n\r\n    case 37:\r\n      inputDirection.x = -5;\r\n      break;\r\n    case 40:\r\n      inputDirection.y = 5;\r\n      break;\r\n    case 38:\r\n      inputDirection.y = -5;\r\n      break;\r\n  }\r\n});\r\n\r\nwindow.addEventListener(\"keyup\", (e) => {\r\n  switch (e.keyCode) {\r\n    case 39:\r\n      inputDirection.x = 0;\r\n      break;\r\n    case 37:\r\n      inputDirection.x = 0;\r\n      break;\r\n    case 40:\r\n      inputDirection.y = 0;\r\n      break;\r\n    case 38:\r\n      inputDirection.y = 0;\r\n      break;\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack://dist/./movement.js?");

/***/ }),

/***/ "./scenes.js":
/*!*******************!*\
  !*** ./scenes.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameOverScene\": () => (/* binding */ gameOverScene),\n/* harmony export */   \"gameOverStyle\": () => (/* binding */ gameOverStyle),\n/* harmony export */   \"gameOverText\": () => (/* binding */ gameOverText),\n/* harmony export */   \"menu\": () => (/* binding */ menu),\n/* harmony export */   \"menuStyle\": () => (/* binding */ menuStyle)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n\r\n\r\nconst gameOverScene = new PIXI.Container();\r\nconst gameOverStyle = new PIXI.TextStyle({\r\n  fontFamily: \"VT323\",\r\n  fontSize: 70,\r\n  fill: \"white\",\r\n  align: \"center\",\r\n});\r\nlet gameOverText = new PIXI.Text(\"GAME OVER!\\nSCORE:\", gameOverStyle);\r\ngameOverText.anchor.set(0.5);\r\ngameOverText.position.set(400, 280);\r\ngameOverScene.addChild(gameOverText);\r\n\r\nconst playAgainContainer = new PIXI.Container();\r\nconst rectangle = new PIXI.Graphics();\r\n\r\n// TODO playagain container + click action\r\nrectangle.beginFill(0x353839);\r\nrectangle.drawRoundedRect(220, 320, 350, 100);\r\nplayAgainContainer.addChild(rectangle);\r\nplayAgainContainer.position.set(0, 20);\r\nplayAgainContainer.interactive = true;\r\nplayAgainContainer.buttonMode = true;\r\nplayAgainContainer.on(\"pointerdown\", _main_js__WEBPACK_IMPORTED_MODULE_0__.toMenu);\r\n\r\nlet playAgainText = new PIXI.Text(\"Main Menu\", gameOverStyle);\r\nplayAgainText.anchor.set(0.5);\r\nplayAgainText.position.set(400, 370);\r\n\r\nplayAgainContainer.addChild(playAgainText);\r\ngameOverScene.addChild(playAgainContainer);\r\n\r\n//main Menu\r\nconst menu = new PIXI.Container();\r\n\r\nconst menuStyle = new PIXI.TextStyle({\r\n  fontFamily: \"VT323\",\r\n  fontSize: 48,\r\n  fill: \"white\",\r\n  align: \"center\",\r\n});\r\n\r\ncreateMenu(menu, \"Game1\", menuStyle, 0.5, 400, 200, true, true, _main_js__WEBPACK_IMPORTED_MODULE_0__.start);\r\ncreateMenu(menu, \"Game2\", menuStyle, 0.5, 400, 250, true, true, _main_js__WEBPACK_IMPORTED_MODULE_0__.start);\r\ncreateMenu(menu, \"Game3\", menuStyle, 0.5, 400, 300, true, true, _main_js__WEBPACK_IMPORTED_MODULE_0__.start);\r\ncreateMenu(menu, \"Exit\", menuStyle, 0.5, 400, 350, true, true, () => {\r\n  window.open(\"https://www.reddit.com/\");\r\n});\r\nfunction createMenu(\r\n  scene,\r\n  title,\r\n  style,\r\n  anchorPoint,\r\n  x,\r\n  y,\r\n  interactive,\r\n  buttonMode,\r\n  callback\r\n) {\r\n  title = new PIXI.Text(title, style);\r\n  title.anchor.set(anchorPoint);\r\n  title.position.set(x, y);\r\n  scene.addChild(title);\r\n  title.interactive = interactive;\r\n  title.buttonMode = buttonMode;\r\n  menu.addChild(title);\r\n  title.on(\"pointerdown\", callback);\r\n}\r\n\n\n//# sourceURL=webpack://dist/./scenes.js?");

/***/ }),

/***/ "./sound.js":
/*!******************!*\
  !*** ./sound.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bulletSpound\": () => (/* binding */ bulletSpound),\n/* harmony export */   \"crash\": () => (/* binding */ crash),\n/* harmony export */   \"gameOverSound\": () => (/* binding */ gameOverSound),\n/* harmony export */   \"music\": () => (/* binding */ music),\n/* harmony export */   \"score\": () => (/* binding */ score)\n/* harmony export */ });\nconst gameOverSound = PIXI.sound.Sound.from({\r\n  url: \"assets/gameover.wav\",\r\n  autoPlay: false,\r\n  volume: 0.2,\r\n});\r\n\r\nconst music = PIXI.sound.Sound.from({\r\n  url: \"assets/music.mp3\",\r\n  //autoPlay: true,\r\n  loop: true,\r\n  volume: 0.2,\r\n});\r\nconst bulletSpound = PIXI.sound.Sound.from({\r\n  url: \"assets/laser.ogg\",\r\n  //autoPlay: true,\r\n  volume: 0.2,\r\n});\r\nconst crash = PIXI.sound.Sound.from({\r\n  url: \"assets/crash.wav\",\r\n  //autoPlay: true,\r\n  volume: 0.2,\r\n});\r\nconst score = PIXI.sound.Sound.from({\r\n  url: \"assets/score.wav\",\r\n  //autoPlay: true,\r\n  volume: 0.2,\r\n});\r\n\n\n//# sourceURL=webpack://dist/./sound.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;