import "./style.scss";
import { animateSvgImage } from "./scripts/animation";
import { animateFireworks } from "./scripts/fireworks";
// import { gsapSections } from "./scripts/gsap-sections";
import { gsapAnimationSection3 } from "./scripts/gsap-t-section";
import { gsapAnimation } from "./scripts/gsap";
import { audioPlay } from "./scripts/audio-play";

// gsapSections();
animateSvgImage();
audioPlay();
setTimeout(() => {
  animateFireworks();
}, 9000);

gsapAnimation();
gsapAnimationSection3();
