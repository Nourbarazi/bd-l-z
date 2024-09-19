import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

// Section Animation
export function gsapSections() {
  // let sections = document.querySelectorAll("section"),
  //   background = document.querySelectorAll(".bg"),
  //   outerWrappers = gsap.utils.toArray(".outer"),
  //   innerWrappers = gsap.utils.toArray(".inner"),
  //   currentIndex = -1,
  //   animating,
  //   observerEnabled = true;
  // let clamp = gsap.utils.clamp(0, sections.length - 1);
  // gsap.set(outerWrappers, { yPercent: 100 });
  // gsap.set(innerWrappers, { yPercent: -100 });
  // function gotoSection(index, direction) {
  //   index = clamp(index); // make sure it's valid
  //   // If they are the same, it's either the first or last slide
  //   if (index === currentIndex) {
  //     return;
  //   }
  //   animating = true;
  //   let fromTop = direction === -1,
  //     dFactor = fromTop ? -1 : 1,
  //     tl = gsap.timeline({
  //       defaults: { duration: 1.25, ease: "power1.inOut" },
  //       onComplete: () => {
  //         animating = false;
  //         // Disable Observer when reaching the last section
  //         // if (index === sections.length - 1 && observerEnabled) {
  //         //   Observer.getAll()[0].disable(); // Disable the observer
  //         //   observerEnabled = false; // Mark it as disabled
  //         //   console.log("Observer disabled");
  //         // }
  //       },
  //     });
  //   if (currentIndex >= 0) {
  //     // The first time this function runs, current is -1
  //     gsap.set(sections[currentIndex], { zIndex: 0 });
  //     tl.to(background[currentIndex], { yPercent: -15 * dFactor }).set(
  //       sections[currentIndex],
  //       { autoAlpha: 0 }
  //     );
  //   }
  //   gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  //   tl.fromTo(
  //     [outerWrappers[index], innerWrappers[index]],
  //     { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
  //     { yPercent: 0 },
  //     0
  //   ).fromTo(background[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
  //   currentIndex = index;
  //   return tl;
  // }
  // Observer.create({
  //   type: "wheel, pointer",
  //   wheelSpeed: -0.8,
  //   onDown: () => {
  //     !animating && gotoSection(currentIndex - 1, -1);
  //   },
  //   onUp: () => {
  //     !animating && gotoSection(currentIndex + 1, 1);
  //   },
  //   tolerance: 100,
  //   allowClicks: true,
  //   preventDefault: true,
  //   passive: false,
  // });
  // gotoSection(0, 1).progress(1);

  let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
  let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
  let currentIndex = 0;
  let swipePanels = gsap.utils.toArray(".scroll-container section");

  // set z-index levels for the swipe panels
  gsap.set(swipePanels, { zIndex: (i) => swipePanels.length - i });

  // create an observer and disable it to start
  let intentObserver = ScrollTrigger.observe({
    type: "wheel,touch",
    onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
    onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
    tolerance: 10,
    preventDefault: true,
    onEnable(self) {
      allowScroll = false;
      scrollTimeout.restart(true);
      // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
      let savedScroll = self.scrollY();
      self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
      document.addEventListener("scroll", self._restoreScroll, {
        passive: false,
      });
    },
    onDisable: (self) =>
      document.removeEventListener("scroll", self._restoreScroll),
  });
  intentObserver.disable();

  // handle the panel swipe animations
  function gotoPanel(index, isScrollingDown) {
    // return to normal scroll if we're at the end or back up to the start
    if (
      (index === swipePanels.length && isScrollingDown) ||
      (index === -1 && !isScrollingDown)
    ) {
      intentObserver.disable(); // resume native scroll
      return;
    }
    allowScroll = false;
    scrollTimeout.restart(true);

    let target = isScrollingDown
      ? swipePanels[currentIndex]
      : swipePanels[index];
    gsap.to(target, {
      yPercent: isScrollingDown ? -100 : 0,
      duration: 0.75,
    });

    currentIndex = index;
  }

  // pin swipe section and initiate observer
  ScrollTrigger.create({
    trigger: ".scroll-container",
    pin: true,
    start: "top top",
    end: "+=200", // just needs to be enough to not risk vibration where a user's fast-scroll shoots way past the end
    onEnter: (self) => {
      if (intentObserver.isEnabled) {
        return;
      } // in case the native scroll jumped past the end and then we force it back to where it should be.
      self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
      intentObserver.enable(); // STOP native scrolling
    },
    onEnterBack: (self) => {
      if (intentObserver.isEnabled) {
        return;
      } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
      self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
      intentObserver.enable(); // STOP native scrolling
    },
  });
}
