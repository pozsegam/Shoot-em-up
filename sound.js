import { sound } from "@pixi/sound";
import * as PIXI from "pixi.js";

export const gameOverSound = sound.add("gameOverSound", "assets/gameover.wav");

export const music = sound.add("music", "assets/music.mp3");
export const bulletSpound = sound.add("laser", "assets/laser.ogg");
export const crash = sound.add("crash", "assets/crash.wav");
export const score = sound.add("score", "assets/score.wav");
