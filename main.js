import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
import { gsapAnimationSection1 } from "./scripts/gsap-f-section";
import { gsapAnimationSection2 } from "./scripts/gsap-s-section";
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
  gsapAnimationSection1();
}, 9500);

gsapAnimationSection2();
