// Controle para evitar carregar o mesmo script React múltiplas vezes
let reactScriptLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".subnav a");
  const mainContent = document.getElementById("main-content");

  function setActiveSection(sectionId) {
    links.forEach((link) => {
      const target = link.getAttribute("data-section");
      if (target === sectionId) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  async function loadSection(section) {
    try {
      const response = await fetch(`sections/${section}.html`);
      if (!response.ok) throw new Error("Section not found");
      const html = await response.text();
      mainContent.innerHTML = html;

      if (section === "overview") {
        import("./overview.js").then((module) => {
          module.renderOverview();
        });
      }

      if (section === "get-started") {
        import("./get-started.js").then((module) => {
          module.renderStart();
        });
      }

      if (section === "foundations") {
        import("./foundations.js").then((module) => {
          module.renderFoundations();
        });
      }

      if (section === "components") {
        if (!reactScriptLoaded) {
          if (!document.getElementById("react-root")) {
            console.error("Error: Element with id 'react-root' not found!");
            return;
          }

          const reactScript = document.createElement("script");
          reactScript.src =
            "https://unpkg.com/react@18/umd/react.production.min.js";
          document.body.appendChild(reactScript);

          const reactDOMScript = document.createElement("script");
          reactDOMScript.src =
            "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js";
          document.body.appendChild(reactDOMScript);

          setTimeout(() => {
            const componentScript = document.createElement("script");
            componentScript.type = "module";
            componentScript.src = "/specs-ds/dist/assets/index-BJ7TBRZt.js";
            document.body.appendChild(componentScript);

            reactScriptLoaded = true;
            console.log("React scripts loaded successfully!");
          }, 500);
        } else {
          if (
            window.renderMyReactComponent &&
            document.getElementById("react-root")
          ) {
            window.renderMyReactComponent();
          }
        }
      }
    } catch (err) {
      mainContent.innerHTML = `<p style="color: red;">Error loading section: ${section}</p>`;
      console.error("Error loading section:", err);
    }
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = link.getAttribute("data-section");
      setActiveSection(section);
      loadSection(section);
    });
  });

  const defaultSection = "overview";
  setActiveSection(defaultSection);
  loadSection(defaultSection);
});

// 🔁 Navegação para subseções internas (ex: foundations/color.html)

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-subsection]");
  if (!target) return;

  e.preventDefault();

  const subsection = target.getAttribute("data-subsection");
  const cleanSubsection = subsection.replace(/^#/, "").split("?")[0];

  fetch(cleanSubsection)
    .then((res) => res.text())
    .then((html) => {
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML = html;
      window.location.hash = `#${cleanSubsection}`;

      if (cleanSubsection.includes("foundations/")) {
        console.log("🔗 Navegando para:", cleanSubsection);
        import("./foundations.js").then((module) => {
          module.renderSectionNavigation(cleanSubsection);
        });
      }
    })
    .catch(() => {
      document.getElementById("main-content").innerHTML =
        "<p style='color: red;'>Erro ao carregar conteúdo interno.</p>";
    });
});
