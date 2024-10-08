import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

// Section Animation
export function gsapSections() {
  let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
  let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
  let currentIndex = 0;
  let swipePanels = gsap.utils.toArray(".scroll-container section");

  // set z-index levels for the swipe panels
  gsap.set(swipePanels, { zIndex: (i) => swipePanels.length - i });

  // create an observer and disable it to start
  let intentObserver = ScrollTrigger.observe({
    type: "wheel,touch",
    onChangeY: (self) => {
      if (allowScroll) {
        if (self.deltaY < 0) {
          gotoPanel(currentIndex - 1, false); // Swipe up to go to the previous section
        } else if (self.deltaY > 0) {
          gotoPanel(currentIndex + 1, true); // Swipe down to go to the next section
        }
      }
    },
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
      duration: 1.2,
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
