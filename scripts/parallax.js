import { gsap } from "gsap";
import SplitType from "split-type";

export function gsapTest() {
  let typeSplit = new SplitType(".hb-part", {
    types: "lines, words, chars",
    tagName: "h1",
  });

  const startBackgroundAnimation = () => {
    document.querySelectorAll(".hb-part .char").forEach((char) => {
      char.classList.add("animate-text-background");
    });
  };

  console.log(typeSplit);

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
}
