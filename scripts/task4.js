window.onload = function () {
  const emphasisCheckbox = this.document.querySelector("#emphasis");
  const additionalContent = document.getElementById("additional-content");

  const isEmphasis = this.localStorage.getItem("emphasis") === "true";
  emphasisCheckbox.checked = isEmphasis;
  additionalContent.style.fontStyle = isEmphasis ? "italic" : "normal";

  this.document.addEventListener("keydown", function emphasize() {
    if (emphasisCheckbox.checked) {
      additionalContent.style.fontStyle = "italic";
      localStorage.setItem("emphasis", "true");
    }
  });

  emphasisCheckbox.addEventListener("change", function () {
    if (!emphasisCheckbox.checked) {
      additionalContent.style.fontStyle = "normal";
      localStorage.setItem("emphasis", "false");
    }
  });
};
