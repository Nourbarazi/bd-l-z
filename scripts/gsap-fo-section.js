import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function gsapAnimationSection4() {
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

    const frameCount = 14; // Die Anzahl der Frames, die du hast
    const currentFrame = (index) => `assets/images/output-${index + 1}.png`;
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

  sequenceAnimation();
}
