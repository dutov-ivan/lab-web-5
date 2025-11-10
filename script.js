const xHeading = document.querySelector("#company-heading");
const yHeading = document.querySelector("#explore-more");
const block5 = document.querySelector("#main-content");

let temp;
temp = xHeading.innerHTML;
xHeading.innerHTML = yHeading.innerHTML;
yHeading.innerHTML = temp;

const height = 100;
const width = 200;

function displayRectangleArea(height, width) {
  const area = height * width;
  const el = document.createElement("p");
  el.textContent = area.toString();
  block5.appendChild(el);
}

displayRectangleArea(height, width);
