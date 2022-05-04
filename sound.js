import * as PIXI from "./node_modules/pixi.js";
import * as PIXI from "./node_modules/pixi-sound";

export const gameOverSound = PIXI.sound.Sound.from({
  url: "assets/gameover.wav",
  autoPlay: false,
  volume: 0.2,
});

export const music = PIXI.sound.Sound.from({
  url: "assets/music.mp3",
  //autoPlay: true,
  loop: true,
  volume: 0.2,
});
export const bulletSpound = PIXI.sound.Sound.from({
  url: "assets/laser.ogg",
  //autoPlay: true,
  volume: 0.2,
});
export const crash = PIXI.sound.Sound.from({
  url: "assets/crash.wav",
  //autoPlay: true,
  volume: 0.2,
});
export const score = PIXI.sound.Sound.from({
  url: "assets/score.wav",
  //autoPlay: true,
  volume: 0.2,
});
