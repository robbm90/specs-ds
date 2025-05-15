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

      // 🔹 Lógica específica para a seção Overview
      if (section === "overview") {
        import("./overview.js").then((module) => {
          module.renderOverview();
        });
      }

      // 🔹 Lógica específica para a seção Get Started
      if (section === "get-started") {
        import("./get-started.js").then((module) => {
          module.renderStart();
        });
      }

      // 🔹 Lógica específica para a seção Foundations
      if (section === "foundations") {
        import("./foundations.js").then((module) => {
          module.renderFoundations();
        });
      }

      // 🔹 Lógica para carregar o componente React dinamicamente
      if (section === "components") {
        // Verificamos primeiro se o React já foi carregado
        if (!reactScriptLoaded) {
          // Primeiro garantimos que o container existe
          if (!document.getElementById("react-root")) {
            console.error("Error: Element with id 'react-root' not found!");
            return;
          }

          // Adicionamos um script para carregar o React e ReactDOM
          const reactScript = document.createElement("script");
          reactScript.src =
            "https://unpkg.com/react@18/umd/react.production.min.js";
          document.body.appendChild(reactScript);

          const reactDOMScript = document.createElement("script");
          reactDOMScript.src =
            "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js";
          document.body.appendChild(reactDOMScript);

          // Esperamos um momento para garantir que as bibliotecas React foram carregadas
          setTimeout(() => {
            // Agora carregamos o componente compilado
            const componentScript = document.createElement("script");
            componentScript.type = "module";
            componentScript.src = "/specs-ds/dist/assets/index-BJ7TBRZt.js";
            document.body.appendChild(componentScript);

            // Marcamos que o script já foi carregado
            reactScriptLoaded = true;

            console.log("React scripts loaded successfully!");
          }, 500);
        } else {
          console.log("React already loaded, attempting to re-render");

          // Se o script já foi carregado, podemos tentar re-renderizar manualmente
          // Note: isso depende de como o bundle React está configurado
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

// Navegação para subseções internas (ex: foundations/color.html)

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-subsection]");
  if (!target) return;

  e.preventDefault();

  const subsection = target.getAttribute("data-subsection");

  fetch(subsection)
    .then((res) => res.text())
    .then((html) => {
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML = html;
      window.location.hash = `#${subsection}`;
    })
    .catch(() => {
      mainContent.innerHTML =
        "<p style='color: red;'>Erro ao carregar conteúdo interno.</p>";
    });
});
