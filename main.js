import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
import { gsapAnimation } from "./scripts/gsap-f-section";
import { gsapSections } from "./scripts/gsap-sections";
import { audioPlay } from "./scripts/audio-play";
import { morphSVG } from "./scripts/morphSVG";

gsapSections();
animateSvgImage();
audioPlay();
setTimeout(() => {
  animateFireworks();
}, 9000);
setTimeout(() => {
  gsapAnimation();
}, 9500);
