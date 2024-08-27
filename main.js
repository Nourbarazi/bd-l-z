import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
import { gsapAnimation } from "./scripts/parallax";
import { audioPlay } from "./scripts/audio-play";
import { morphSVG } from "./scripts/morphSVG";

animateSvgImage();
audioPlay();
// morphSVG();
setTimeout(() => {
  animateFireworks();
}, 9000);

setTimeout(() => {
  gsapAnimation();
}, 9500);
