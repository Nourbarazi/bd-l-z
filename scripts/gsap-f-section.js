import { gsap } from "gsap";
import SplitType from "split-type";

export function gsapAnimationSection1() {
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
        ease: "power2.out",
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

  gsap.to(".section-1 .flower", {
    x: 0,
    duration: 3,
    opacity: 1,
    rotation: 360,
    ease: "linear",
    onComplete: function () {
      gsap.to(".section-1 .flower", {
        rotation: "+=360",
        duration: 4,
        ease: "linear",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    },
  });
}
