// Animationen für Section 2
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);

export function gsapAnimationSection2() {
  //   // Zunächst den Text mit SplitType in Zeilen, Wörter und Zeichen aufteilen
  //   let typeSplit = new SplitType(".test-1", {
  //     types: "lines, words, chars",
  //     tagName: "p",
  //   });
  //   // Observer Setup
  //   let observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           // Wenn Section 2 sichtbar wird, die Animation starten
  //           gsap.from(typeSplit, {
  //             y: "100%",
  //             opacity: 0,
  //             duration: 0.85,
  //             ease: "power1.out",
  //             stagger: 0.1,
  //           });
  //         } else {
  //           // Wenn Section 1 sichtbar wird, die Animation umkehren
  //           if (entry.boundingClientRect.top > 0) {
  //             // Prüfen ob es aufwärts scrollt
  //             gsap.to(typeSplit, {
  //               y: "100%",
  //               opacity: 0,
  //               duration: 0.85,
  //               ease: "power1.out",
  //               stagger: 0.1,
  //             });
  //           }
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.5, // Trigger die Animation bei 50% Sichtbarkeit
  //     }
  //   );
  //   // Den Observer auf Section 2 und Section 1 anwenden
  //   observer.observe(document.querySelector(".section-2"));
  //   observer.observe(document.querySelector(".section-1"));
}
