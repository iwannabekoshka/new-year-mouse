import "./src/styles/style.scss";
import { SnowflakeCursor } from "./src/cursor-snowflake";
import { Snowfall } from "./src/snowfall";

const snowflakeCursor = new SnowflakeCursor();
const snowfall = new Snowfall();
let isSnow = false;

const btnSnowToggler = document.querySelector("#snow-toggler");
btnSnowToggler.textContent = btnSnowToggler.dataset.textStart;

const paragraph = document.querySelector("#text");
paragraph.textContent = btnSnowToggler.dataset.textStart;

btnSnowToggler.addEventListener("click", () => {
  if (isSnow) {
    snowflakeCursor.stop();
    snowfall.stop();

    isSnow = false;
    btnSnowToggler.textContent = btnSnowToggler.dataset.textStart;
    paragraph.textContent = paragraph.dataset.textStart;
  } else {
    snowflakeCursor.start();
    snowfall.start();

    isSnow = true;
    btnSnowToggler.textContent = btnSnowToggler.dataset.textStop;
    paragraph.textContent = paragraph.dataset.textStop;
  }
});
