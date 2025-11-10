class DynamicStyleManager {
  constructor(initialStyles = {}, onSetStyles) {
    this.styles = initialStyles; // { selector: { prop: value } }
    this.onSetStyles = onSetStyles;
    this.styleEl = document.createElement("style");
    document.head.appendChild(this.styleEl);
    this._update();
  }

  setRule(selector, prop, value) {
    if (!this.styles[selector]) this.styles[selector] = {};
    this.styles[selector][prop] = value;
    this._update();
  }

  removeRule(selector, prop) {
    if (!this.styles[selector]) return;

    if (prop) {
      delete this.styles[selector][prop];
      if (Object.keys(this.styles[selector]).length === 0) {
        delete this.styles[selector];
      }
    } else {
      delete this.styles[selector];
    }

    this._update();
  }

  _update() {
    const cssText = Object.entries(this.styles)
      .map(
        ([selector, rules]) =>
          `${selector} { ${Object.entries(rules)
            .map(
              ([prop, val]) =>
                `${prop.replace(
                  /[A-Z]/g,
                  (m) => "-" + m.toLowerCase()
                )}: ${val};`
            )
            .join(" ")} }`
      )
      .join("\n");

    this.styleEl.textContent = cssText;
    if (this.onSetStyles) this.onSetStyles(cssText);
  }

  getStyles() {
    return this.styles;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const yHeading = document.getElementById("explore-more");
  const cssInstructionForm = document.getElementById("css-instruction-form");
  const cssInstructionsList = document.getElementById("primary-nav");

  const savedStyles = JSON.parse(localStorage.getItem("styles") || "{}");

  const styleManager = new DynamicStyleManager(savedStyles);

  styleManager.onSetStyles = (cssText) => {
    localStorage.setItem("styles", JSON.stringify(styleManager.getStyles()));
  };

  Object.entries(savedStyles).forEach(([selector, rules]) => {
    Object.entries(rules).forEach(([prop, value]) => {
      addInstructionUI(selector, prop, value);
    });
  });

  yHeading.addEventListener("dblclick", () => {
    cssInstructionForm.classList.toggle("hidden");
  });

  cssInstructionForm.onsubmit = (event) => {
    event.preventDefault();
    const tagName = cssInstructionForm.elements["tag-name"].value.trim();
    const tagProperty =
      cssInstructionForm.elements["tag-property"].value.trim();
    const tagValue = cssInstructionForm.elements["tag-value"].value.trim();

    if (!tagName || !tagProperty || !tagValue) return;

    styleManager.setRule(tagName, tagProperty, tagValue);

    addInstructionUI(tagName, tagProperty, tagValue);

    cssInstructionForm.reset();
  };

  function addInstructionUI(selector, prop, value) {
    const li = document.createElement("li");
    li.innerHTML = `<p>${selector} { ${prop}: ${value}; }</p>`;
    li.dataset.selector = selector;
    li.dataset.prop = prop;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-tag-button");
    li.appendChild(removeButton);

    cssInstructionsList.appendChild(li);
  }

  cssInstructionsList.addEventListener("click", (e) => {
    if (e.target.matches(".remove-tag-button")) {
      const li = e.target.closest("li");
      const selector = li.dataset.selector;
      const prop = li.dataset.prop;

      styleManager.removeRule(selector, prop);
      cssInstructionsList.removeChild(li);
    }
  });
});
