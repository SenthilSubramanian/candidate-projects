class Accordion {
    constructor(element) {
      this.element = element;
      this.headers = this.element.querySelectorAll(".accordion-header");
      this.panels = this.element.querySelectorAll(".accordion-panel");    
      this.init();
    }
  
    init() {
      // Add event listeners to accordion headers
      this.headers.forEach((header) => {
        header.addEventListener("click", this.toggle.bind(this));
      });
    }
  
    toggle(event) {
      const header = event.currentTarget;
      let panel = header.nextElementSibling;
      const isActive = header.classList.contains("active");
  
      // Hide all panels
      this.panels.forEach((p) => {
        //p.style.maxHeight = null;
        p.style.display = "none";
      });
  
      // Remove active class from all headers
      this.headers.forEach((h) => {
        h.classList.remove("active");
      });
  
      // Show/hide clicked panel and add/remove active class from clicked header
      if (!isActive) {
        //panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.display = "block";
        header.classList.add("active");
      }
    }
  
  }
  
  