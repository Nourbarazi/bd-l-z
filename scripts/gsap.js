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
    smooth: 1.5,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
    preventDefault: true,
  });

  ScrollTrigger.normalizeScroll(true);

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
      duration: time,
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

  const sequenceAnimation = () => {
    const canvas = document.querySelector(".sequence-container");
    const context = canvas.getContext("2d");

    const originalWidth = 812;
    const originalHeight = 878;

    // Funktion, um das Canvas an die aktuelle Bildschirmgröße anzupassen
    function resizeCanvas() {
      const aspectRatio = originalWidth / originalHeight;
      const canvasWidth = window.innerWidth; // Volle Breite des Viewports
      const canvasHeight = canvasWidth / aspectRatio; // Höhe basierend auf dem Seitenverhältnis der Bilder

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const frameCount = 15; // Die Anzahl der Frames, die du hast
    const currentFrame = (index) =>
      `assets/images/sequences/output-${index + 1}.png`;
    // Passe den Pfad zu deinen lokalen Bildern an. Ersetze 'path/to/your/images' mit deinem tatsächlichen Verzeichnis.

    const images = [];
    const animationObj = { frame: 0 }; // Das Objekt zur Steuerung der Animation

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    gsap.to(animationObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".section-4",
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 0.5,
      },
      onUpdate: render,
    });

    images[0].onload = render;

    // function render() {
    //   context.clearRect(0, 0, canvas.width, canvas.height);
    //   context.drawImage(images[animationObj.frame], 0, 0);
    // }

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Berechne den Skalierungsfaktor basierend auf der Canvas-Größe
      const aspectRatio = originalWidth / originalHeight;
      let renderWidth, renderHeight;

      renderWidth = canvas.width;
      renderHeight = renderWidth / aspectRatio; // Beibehaltung des korrekten Seitenverhältnisses

      // Zentrieren und unten ausrichten
      const xOffset = 0;
      const yOffset = canvas.height - renderHeight; // Setze das Bild so, dass der untere Teil immer sichtbar ist

      // Zeichne das Bild im Canvas, zentriert und am unteren Rand ausgerichtet
      context.drawImage(
        images[animationObj.frame],
        xOffset,
        yOffset,
        renderWidth,
        renderHeight,
      );
    }
  };

  marqueeAnimation();
  sequenceAnimation();

  setTimeout(() => {
    fSectionAnimation();
  }, 9500);
}
