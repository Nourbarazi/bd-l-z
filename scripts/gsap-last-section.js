import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);

export function gsapAnimationSection5() {
  let tl = gsap.timeline({
    delay: 1,
    repeat: -1,
    repeatDelay: 1,
    paused: true,
  });

  tl.to(".section-5 .one", 1.5, { morphSVG: ".section-5 .two" })
    .to(".section-5 .one", 1.5, { morphSVG: ".section-5 .three" })
    .to(".section-5 .one", 1.5, { morphSVG: ".section-5 .one" });

  ScrollTrigger.create({
    trigger: ".section-5",
    start: "top center",
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.pause(),
  });
}
