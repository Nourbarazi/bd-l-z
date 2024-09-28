import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

export function gsapAnimationSection3() {
  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".section-3 .images-wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: false,
        scrub: 1.5,
      },
    })
    .to(".section-3 .images-wrapper .pink-img img", {
      scale: 2,
      z: 2000,
      ease: "power1.inOut",
    });

  // Return the timeline for further use if needed
  return tl;
}
