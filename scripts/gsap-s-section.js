import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function gsapAnimationSection2() {
  let sections = gsap.utils.toArray(".section-2 .image-wrapper");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".section-2",
      start: "center center",
      end: () =>
        "+=" + document.querySelector(".horizontal-scroll").offsetWidth,
      pin: true,
      scrub: 1.5,
      snap: 1 / (sections.length - 1),
      invalidateOnRefresh: true,
    },
  });

  const marqueeAnimation = () => {
    const marqueeInner = document.querySelector(
      ".section-2 .content-marquee .content",
    );

    let rate = 200;
    // get the width of the element
    let distance = marqueeInner.clientWidth;
    // get the margin-right of the element
    let style = window.getComputedStyle(marqueeInner);
    let marginRight = parseInt(style.marginRight) || 0;
    // get the total width of the element
    let totalDistance = distance + marginRight;
    // get the duration of the animation
    // for a better explanation, see the quoted codepen in the first comment
    let time = totalDistance / rate;
    // get the parent of the element
    let container = marqueeInner.parentElement;

    // Marquee animation
    gsap.to(container, {
      x: "-" + (totalDistance + 50),
      repeat: -1,
      duration: time + 20,
      ease: "linear",
      paused: true, // Pause the animation initially
      scrollTrigger: {
        trigger: ".section-2", // Start when section 2 comes into view
        start: "top center", // Adjust as needed
        onEnter: (self) => {
          gsap.to(marqueeInner, { paused: false });
        },
        onLeaveBack: (self) => {
          gsap.to(marqueeInner, { paused: true });
        },
      },
    });
  };

  marqueeAnimation();
}
