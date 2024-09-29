import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
// import { gsapSections } from "./scripts/gsap-sections";
import { gsapAnimationSection1 } from "./scripts/gsap-f-section";
import { gsapAnimationSection2 } from "./scripts/gsap-s-section";
import { gsapAnimationSection3 } from "./scripts/gsap-t-section";
import { gsapAnimationSection4 } from "./scripts/gsap-fo-section";
import { gsapAnimationSection5 } from "./scripts/gsap-last-section";
import { gsapAnimation } from "./scripts/gsap";
import { audioPlay } from "./scripts/audio-play";

// gsapSections();
animateSvgImage();
audioPlay();
setTimeout(() => {
  animateFireworks();
}, 9000);
gsapAnimation();
gsapAnimationSection1();
gsapAnimationSection2();
gsapAnimationSection3();
gsapAnimationSection4();
gsapAnimationSection5();
