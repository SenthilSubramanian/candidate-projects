
const accordion = document.querySelector("#accordion");

fetch("assets/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const sections = data.sections;
    console.log(sections);
        

    // create accordion sections
    sections.forEach((section, i) => {
      const { title, panel } = section;
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "accordion-item";

      // create title button
      const button = document.createElement("button");
      button.className = "accordion";
      button.type = "button";
      button.setAttribute("data-bs-toggle", "collapse");
      button.setAttribute("data-bs-target", `#collapse-${i}`);
      button.setAttribute("aria-controls", `collapse-${i}`);
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = title.value;
      sectionDiv.appendChild(button);

      // create panel
      const panelDiv = document.createElement("div");
      panelDiv.className = "accordion-collapse collapse";
      panelDiv.id = `collapse-${i}`;
      panelDiv.setAttribute("aria-labelledby", `heading-${i}`);
      panelDiv.setAttribute("data-bs-parent", "#accordion");
      const panelContentDiv = document.createElement("div");
      panelContentDiv.className = "accordion-body";
      panelContentDiv.innerHTML = `<p>${panel.value}</p><img src="assets/images/${panel.image.src}" alt="${panel.image.title}">`;
      panelDiv.appendChild(panelContentDiv);
      sectionDiv.appendChild(panelDiv);

      // add to accordion
      accordion.appendChild(sectionDiv);

      // disable locked headers
      if (i > 0 && title.locked) {
        const prevTitle = sections[i - 1].title.value;
        const prevButton = document.querySelector(
          `button[data-bs-target="#collapse-${i - 1}"]`
        );
        if (!prevButton.getAttribute("aria-expanded") === "true") {
          button.disabled = true;
          button.setAttribute("aria-disabled", "true");
        }
      }
    });    
  });

  // add event listener to enable headers
  accordion.addEventListener("show.bs.collapse", (event) => {
    const button = event.target.previousElementSibling;
    if (button.getAttribute("aria-disabled") === "true") {
      const i = button
        .getAttribute("data-bs-target")
        .replace("#collapse-", "");
      const prevTitle = sections[i - 1].title.value;
      const prevButton = document.querySelector(
        `button[data-bs-target="#collapse-${i - 1}"]`
      );
      if (prevButton.getAttribute("aria-expanded") === "true") {
        button.disabled = false;
        button.removeAttribute("aria-disabled");
      }
    }
  });

// Define variables
const toggles = document.querySelectorAll(".toggle");

// Set toggle actions
function toggleAccord(e) {
  e.preventDefault();

  // Deactivate all toggles
  if (this.parentNode.classList.contains("active")) {
    this.parentNode.classList.remove("active");
  } else {
    for (i = 0; i < toggles.length; i++) {
      toggles[i].parentNode.classList.remove("active");
    }
    this.parentNode.classList.add("active");
  }
}

// Apply event listeners
for (i = 0; i < toggles.length; i++) {
  toggles[i].addEventListener("click", toggleAccord);
}  