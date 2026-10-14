export function mountBackgroundMedia() {
  if (document.querySelector(".omega-media-stage")) return;
  const stage = document.createElement("div");
  stage.className = "omega-media-stage";
  stage.setAttribute("aria-hidden", "true");
  stage.innerHTML = '<video class="omega-media-stage__video" muted loop playsinline poster="assets/media/judas-poster.webp"><source src="assets/media/judas-hero.mp4" type="video/mp4"></video><img class="omega-media-stage__poster" src="assets/media/judas-poster.webp" alt="">';
  document.body.prepend(stage);
  const video = stage.querySelector("video");
  const button = document.createElement("button");
  button.className = "omega-media-control";
  button.type = "button";
  button.textContent = "Pausar fondo";
  button.setAttribute("aria-label", "Pausar vídeo de fondo");
  document.body.append(button);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const update = () => {
    const paused = video.paused;
    button.textContent = paused ? "Activar fondo" : "Pausar fondo";
    button.setAttribute("aria-label", paused ? "Activar vídeo de fondo" : "Pausar vídeo de fondo");
  };
  const play = () => { if (!reduced.matches) video.play().catch(() => {}); update(); };
  const applyMotion = () => reduced.matches ? video.pause() : play();
  button.addEventListener("click", () => video.paused ? play() : (video.pause(), update()));
  video.addEventListener("play", update);
  video.addEventListener("pause", update);
  reduced.addEventListener("change", applyMotion);
  applyMotion();
}
