const xHeading = document.querySelector("#company-heading");
const yHeading = document.querySelector("#explore-more");

let temp;
temp = xHeading.innerHTML;
xHeading.innerHTML = yHeading.innerHTML;
yHeading.innerHTML = temp;
