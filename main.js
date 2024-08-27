import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
import { gsapTest } from "./scripts/parallax";
import { audioPlayer } from "./scripts/audio-player";

animateSvgImage();
audioPlayer();
setTimeout(() => {
  animateFireworks();
}, 9000);

setTimeout(() => {
  gsapTest();
}, 9500);
