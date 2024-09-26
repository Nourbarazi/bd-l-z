import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function gsapAnimation() {
  //   const sections = document.querySelectorAll("section");

  //   create the smooth scroller FIRST!
  const smoother = ScrollSmoother.create({
    wrapper: ".scroll-wrapper",
    content: ".scroll-content",
    smooth: 2.5,
    normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
    ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
    effects: true,
    preventDefault: true,
  });

  const fSectionAnimation = () => {
    let typeSplit = new SplitType(".hb-part", {
      types: "lines, words, chars",
      tagName: "h1",
    });

    // Background animation
    const startBackgroundAnimation = () => {
      document.querySelectorAll(".hb-part .char").forEach((char) => {
        char.classList.add("animate-text-background");
      });
    };

    // Text Animation
    gsap.set(".hb-part", { visibility: "visible" });

    gsap.from(".hb-part .char", {
      y: "130%",
      opacity: 1,
      rotationZ: "10",
      duration: 0.7,
      ease: "circ.out",
      stagger: 0.15,
      onComplete: startBackgroundAnimation,
    });

    // Audio Icon Animation
    let scaleAnimation;
    let audioBtn = document.querySelector(".audio-icon-toggle");
    gsap.to(audioBtn, {
      x: 0,
      duration: 1,
      opacity: 1,
      onComplete: function () {
        scaleAnimation = gsap.to(audioBtn, {
          scale: 1.5,
          ease: "none",
          repeat: -1,
          duration: 1,
        });
      },
    });

    audioBtn.addEventListener("click", function () {
      if (scaleAnimation) {
        scaleAnimation.kill();
        gsap.to(audioBtn, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });

    gsap.utils.toArray(".flower").forEach((flower, i) => {
      gsap.to(flower, {
        rotate: 360,
        duration: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-content",
          start: "top top",
          scrub: true,
          end: "bottom bottom",
        },
      });
    });

    gsap.to(".flower", {
      x: 0,
      duration: 1.5,
      opacity: 1,
      ease: "linear",
    });
  };

  gsap.to(".flower-1", {
    width: "30px",
    height: "30px",
    scrollTrigger: {
      trigger: ".flower-1",
      start: "bottom bottom",
      end: "top top",
      scrub: true,
    },
  });

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
    const marqueeInner = document.querySelector(".section-2 .content-marquee");

    // Marquee animation
    gsap.to(marqueeInner, {
      x: "-120%",
      repeat: -1,
      duration: 20,
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

  setTimeout(() => {
    fSectionAnimation();
  }, 9500);
}
