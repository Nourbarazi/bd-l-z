// Animationen für Section 2
import { gsap } from "gsap";
import SplitType from "split-type";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export function gsapAnimationSection2() {
  document.addEventListener("DOMContentLoaded", function () {
    // Text aufteilen mit SplitType
    let typeSplit = new SplitType(".section-2 .content", {
      types: "lines, words, chars",
      tagName: "span",
    });

    // IntersectionObserver einrichten
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animation starten, wenn der Text im Sichtbereich ist
            gsap.from(entry.target.querySelectorAll(".section-2 .char"), {
              y: "100%",
              opacity: 1,
              duration: 0.8,
              ease: "power1.out",
              stagger: 0.1,
            });
            observer.unobserve(entry.target); // Beobachtung aufheben, nachdem animiert wurde
          }
        });
      },
      { threshold: 0.1 },
    );

    // Alle Elemente mit dem Attribut 'animate' beobachten
    document.querySelectorAll(".section-2 .content").forEach((element) => {
      observer.observe(element);
    });
  });
}
