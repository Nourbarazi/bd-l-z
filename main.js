import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";

animateSvgImage();
setTimeout(() => {
  animateFireworks();
}, 8700);
