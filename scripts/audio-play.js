export function audioPlay() {
  const state = {
    current: "play",
    play: "stop",
    stop: "play",
  };

  const labelMap = {
    play: "Play",
    stop: "Stop",
  };

  let myAudio = document.querySelector(".audio-player audio");
  let isPlaying = false;

  function togglePlay() {
    isPlaying ? myAudio.pause() : myAudio.play();
  }

  myAudio.onplaying = function () {
    isPlaying = true;
  };

  myAudio.onpause = function () {
    isPlaying = false;
  };

  const btn = document.querySelector(".audio-icon-toggle");
  btn.setAttribute("aria-label", labelMap[state.current]);
  btn.classList.add(state.current);

  btn.onclick = () => {
    const next = state[state.current];
    btn.classList.replace(state.current, next);
    btn.setAttribute("aria-label", labelMap[next]);
    state.current = next;

    togglePlay();
  };
}
