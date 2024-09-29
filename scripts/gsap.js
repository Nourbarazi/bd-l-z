import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function gsapAnimation() {
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.refresh();

  const smoother = ScrollSmoother.create({
    wrapper: ".scroll-wrapper",
    content: ".scroll-content",
    smooth: 1,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
    preventDefault: true,
  });

  const changeBackground = () => {
    gsap.to("body", {
      backgroundColor: "#ffd1da",
      scrollTrigger: {
        trigger: ".section-2",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        ease: "power2.inOut",
      },
    });

    gsap.to("body", {
      backgroundColor: "#fba1b7",
      scrollTrigger: {
        trigger: ".section-3",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        ease: "power2.inOut",
      },
    });

    gsap.to("body", {
      backgroundColor: "#fba1b7",
      scrollTrigger: {
        trigger: ".section-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        ease: "power2.inOut",
      },
    });

    gsap.to("body", {
      backgroundColor: "#ffdbaa",
      scrollTrigger: {
        trigger: ".section-5",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        ease: "power2.inOut",
      },
    });
  };

  gsap.to(".flower", {
    filter:
      "brightness(0) saturate(100%) invert(100%) sepia(19%) saturate(6857%) hue-rotate(302deg) brightness(107%) contrast(101%)",
    duration: 1,
    scrollTrigger: {
      trigger: ".section-2",
      start: "bottom bottom",
      scrub: true,
    },
  });

  changeBackground();
}
