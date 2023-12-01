import "../public/icofont/icofont.css";
import "./styles/_snowflake.scss";

export class SnowflakeCursor {
  constructor() {
    this._mousemoveHandler = this._mousemoveHandler.bind(this);
  }

  _MAX_SNOWFLAKES_SPAWN_COUNT = 3;
  _TIME_DELTA_TO_SPAWN = 200;
  _DISTANCE_TO_SPAWN = 50;
  _TIME_TO_DESPAWN = 1000;

  _prevTime = new Date().getTime();
  _prevMouseCoords = {
    x: 0,
    y: 0,
  };

  start() {
    window.addEventListener("mousemove", this._mousemoveHandler);
  }

  stop() {
    window.removeEventListener("mousemove", this._mousemoveHandler);
  }

  _mousemoveHandler(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const nowTime = new Date().getTime();
    const delta = nowTime - this._prevTime;

    if (
      delta >= this._TIME_DELTA_TO_SPAWN ||
      this._getDistance(
        this._prevMouseCoords.x,
        this._prevMouseCoords.y,
        mouseX,
        mouseY
      ) >= this._DISTANCE_TO_SPAWN
    ) {
      const snowflakesCount = Math.ceil(
        Math.random() * this._MAX_SNOWFLAKES_SPAWN_COUNT
      );

      for (let i = 0; i < snowflakesCount; i++) {
        const snowflakeElem = new Snowflake(mouseX, mouseY).elem;

        document.body.append(snowflakeElem);
        this._prevTime = nowTime;
        this._prevMouseCoords.x = mouseX;
        this._prevMouseCoords.y = mouseY;

        setTimeout(() => snowflakeElem.remove(), this._TIME_TO_DESPAWN);
      }
    }
  }

  _getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

class Snowflake {
  constructor(x, y) {
    this.elem = this.getSnowflakeElem(x, y);
  }

  _SNOWFLAKES_CLASSES_ICOFONT = [
    "icofont-snow",
    "icofont-snow-alt",
    "icofont-snow-flake",
  ];
  _COLORS = ["#C5FFF8", "#96EFFF", "#5FBDFF", "#7B66FF"];
  _ANIMATIONS = ["fall-1", "fall-2", "fall-3", "fall-4", "fall-5"];
  _SIZES = [".75rem", "1rem", "1.25rem"];

  getSnowflakeElem(x, y) {
    const snowflake = document.createElement("i");
    snowflake.classList.add(
      "snowflake",
      this._getRandomItem(this._SNOWFLAKES_CLASSES_ICOFONT)
    );
    snowflake.style.setProperty("--top", y + "px");
    snowflake.style.setProperty("--left", x + "px");
    snowflake.style.setProperty("--color", this._getRandomItem(this._COLORS));
    snowflake.style.setProperty(
      "--animation-name",
      this._getRandomItem(this._ANIMATIONS)
    );
    snowflake.style.setProperty("--size", this._getRandomItem(this._SIZES));

    return snowflake;
  }

  _getRandomItem(items) {
    const maxI = items.length - 1;
    const randomI = Math.ceil(Math.random() * (maxI + 1)) - 1;
    return items[randomI];
  }
}
