import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
import { gsapAnimationSection1 } from "./scripts/gsap-f-section";
import { gsapAnimationSection2 } from "./scripts/gsap-s-section";
import { gsapAnimationSection3 } from "./scripts/gsap-t-section";
import { gsapSections } from "./scripts/gsap-sections";
import { audioPlay } from "./scripts/audio-play";

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
gsapAnimationSection3();
