// 1. Array para exportar os dados

export const foundationCards = [
  {
    title: "Color",
    description: "The palette and semantic tokens for color usage.",
    link: "foundations/color.html",
  },
  {
    title: "Elevation",
    description: "Depth and layering system using shadows.",
    link: "foundations/elevation.html",
  },
  {
    title: "Typography",
    description: "Font families, sizes, and style guidelines.",
    link: "foundations/typography.html",
  },
  {
    title: "Spacing",
    description: "Consistent spacing scale for layout and components.",
    link: "foundations/spacing.html",
  },
  {
    title: "Grid",
    description: "Grid structure and responsive layout system.",
    link: "foundations/grid.html",
  },
  {
    title: "Iconography",
    description: "Icons system, sizes, and usage principles.",
    link: "foundations/iconography.html",
  },
  {
    title: "Motion",
    description: "Guidelines for transitions, animations, and feedback.",
    link: "foundations/motion.html",
  },
  {
    title: "Border Radius",
    description: "Corner radii used across UI elements.",
    link: "foundations/border-radius.html",
  },
  {
    title: "Breakpoints",
    description: "Responsive breakpoints for devices and views.",
    link: "foundations/breakpoints.html",
  },
  {
    title: "Tokens",
    description: "Core tokens that define design values.",
    link: "foundations/tokens.html",
  },
];

// 2. Função que gera os cards

export function renderFoundations() {
  const container = document.getElementById("foundation-cards");
  if (!container) return;

  container.innerHTML = "";

  foundationCards.forEach(({ title, description, link }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="icon-box"></div>
      <div class="card-content">
        <h2>${title}</h2>
        <p>${description}</p>
        <a href="${link}" class="ds-link-button" data-subsection="${link}">View</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// 3. Exporta a função de navegação dinâmica de Avançar / Voltar

export function renderSectionNavigation(currentLink) {
  const index = foundationCards.findIndex((item) => item.link === currentLink);
  if (index === -1) return;

  const prev = foundationCards[index - 1];
  const next = foundationCards[index + 1];

  const nav = document.createElement("div");
  nav.className = "section-nav";

  // Botão anterior
  if (prev) {
    const a = document.createElement("a");
    a.className = "prev";
    a.textContent = `← ${prev.title}`;
    a.setAttribute("data-subsection", prev.link);
    a.href = "#";
    nav.appendChild(a);
  } else {
    // Se for o primeiro item, mostra botão de voltar para a lista
    const back = document.createElement("a");
    back.className = "prev";
    back.textContent = "← Back to Foundations";
    back.setAttribute("data-section", "foundations");
    back.href = "#";
    nav.appendChild(back);
  }

  // Botão próximo (se houver)
  if (next) {
    const a = document.createElement("a");
    a.className = "next";
    a.textContent = `${next.title} →`;
    a.setAttribute("data-subsection", next.link);
    a.href = "#";
    nav.appendChild(a);
  }

  const container = document.getElementById("main-content");
  container.appendChild(nav);
}
