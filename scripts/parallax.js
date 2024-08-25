import { gsap } from "gsap";
import SplitType from "split-type";

export function gsapTest() {
  let typeSplit = new SplitType("#hb", {
    types: "lines, words, chars",
    tagName: "h1",
  });

  gsap.set("#hb", { visibility: "visible" });

  gsap.from("#hb .char", {
    y: "130%",
    opacity: 1,
    rotationZ: "10",
    duration: 0.7,
    ease: "circ.out",
    stagger: 0.15,
  });
}
