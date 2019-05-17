import Stats from "stats.js";
import raf from "raf-loop";

export default function() {
  const stats = new Stats();

  stats.domElement.style.cssText =
    "position:fixed;right:0;bottom:100px;z-index:10000";
  stats.domElement.id = "stats";

  // Prevent duplication of stats with hot reloading.
  // Maybe there's a better way to deal with this?
  if (!document.getElementById("stats")) {
    document.body.appendChild(stats.domElement);
  }

  raf(() => stats.update()).start();
}
