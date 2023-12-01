import "./styles/snowfall.scss";

export class Snowfall {
  constructor() {
    this._SNOWFALL_COUNT = Math.min(window.innerWidth / 6, 200);
  }

  _SNOWFALL_COUNT = 200;

  start() {
    for (let i = 0; i < 200; i++) {
      const snowElem = document.createElement("span");
      snowElem.classList.add("snowfall");
      setTimeout(() => snowElem.classList.add("active"));
      document.body.append(snowElem);
    }
  }

  stop() {
    const snowElems = document.querySelectorAll(".snowfall");
    snowElems.forEach((elem) => {
      elem.classList.remove("active");
      setTimeout(() => elem.remove(), 1000);
    });
  }
}
