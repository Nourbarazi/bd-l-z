import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
import { gsapTest } from "./scripts/parallax";

animateSvgImage();
setTimeout(() => {
  animateFireworks();
}, 9000);

setTimeout(() => {
  gsapTest();
}, 9500);
