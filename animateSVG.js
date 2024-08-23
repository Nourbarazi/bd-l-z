export function animateSvgImage() {
  //js code for start/restart Animations

  var elements = [
    document.getElementById("path1"),
    document.getElementById("path2"),
    document.getElementById("pngImage"),
    document.getElementById("vectroized"),
    document.getElementById("restartBtn"),
    document.getElementById("pinkDiv"),
    document.getElementById("blueDiv"),
  ];

  function start() {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("run-animation");
    }
    window.requestAnimationFrame(function () {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add("run-animation");
      }
    });
  }
  start();

  document.getElementById("restartBtn").addEventListener(
    "click",
    function () {
      start();
    },
    false
  );
}
