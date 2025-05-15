// Conteúdo dos Cards

const foundationCards = [
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

// Função para renderizar os cards

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
        <a href="${link}" class="ds-link-button" data-subsection="${link}" >View</a>
      </div>
    `;
    container.appendChild(card);
  });
}
