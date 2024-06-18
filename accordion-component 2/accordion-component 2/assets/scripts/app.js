class Accordion {
  constructor(element) {
    this.accordion = element;
    this.init();
  }

  init() {
    // Fetch data from json
    this.fetchData();
  }

  async fetchData() {
    // Create accordion items based on the json data
    const sections = await fetch("assets/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const sections = data.sections;
        sections.forEach((section, i) => {
          const { title, panel } = section;
          this.createTitle(title.value, i);
          this.createPanel(panel);
         
        });
        this.titles = this.accordion.querySelectorAll(".title");
        console.log(this.titles);
        this.panels = this.accordion.querySelectorAll(".panel");
        // Add event listeners to accordion headers
        this.titles.forEach((title) => {
          console.log(title);
          title.addEventListener("click", this.toggle.bind(this));
        });
        return sections;
      })
      .catch(function (err) {
        console.log("error: " + err);
      });
    console.log(sections);
  }

  createTitle(titleJSON, i) {

    const title = document.createElement("button");
    title.classList.add("title");
    title.innerHTML = titleJSON;
    if(i > 0){
      title.classList.add("titleWithLock");
      title.setAttribute('disabled', 'disabled');
    }
    this.accordion.appendChild(title);
  }

  createPanel(panelJSON) {
    const panel = document.createElement("div");
    panel.className = "panel";
    panel.classList.add("grid");
    const row = document.createElement("div");
    row.className = "row";
    const panelValue = document.createElement("div");
    panelValue.className = "panelValue";
    const panelImage = document.createElement("div");
    panelImage.className = "panelImage";
    panelValue.innerHTML = `${panelJSON.value}`;
    panelImage.innerHTML += `<img src="assets/images/${panelJSON.image.src}" alt="${panelJSON.image.title}">`;
    row.appendChild(panelValue);
    row.appendChild(panelImage);
    //panel.innerHTML = `<table><tr><td>${panelValue.value}</td><td><img src="assets/images/${panelValue.image.src}" alt="${panelValue.image.title}"></td</tr></table>`;
    this.accordion.appendChild(panel).appendChild(row);
    //this.accordion.appendChild(panel).appendChild().appendChild(column);
  }

  toggle(event) {
    const title = event.currentTarget;
    const panel = title.nextElementSibling;
    const isActive = title.classList.contains("active");
    if(null != panel.nextElementSibling){
      panel.nextElementSibling.classList.remove("titleWithLock");
      panel.nextElementSibling.removeAttribute('disabled');
    }
    // Show/hide clicked panel and add/remove active class from clicked header
    if (!isActive) {
      title.classList.add("active");
    }
    else {
      title.classList.remove("active");
    }
  }

  
}
