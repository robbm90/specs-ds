// Conteúdo dos Cards

const startContent = [
  {
    title: "Foundations",
    description:
      "The core principles that define our visual and interaction language — including color, typography, spacing, and more",
    link: "overview/foundations.html",
  },
  {
    title: "Components",
    description:
      "Reusable building blocks that accelerate design and development while ensuring consistency and quality",
    link: "overview/components.html",
  },
  {
    title: "Patterns",
    description: "Font families, sizes, and style guidelines",
    link: "overview/patterns.html",
  },
  {
    title: "Processes",
    description: "Consistent spacing scale for layout and components",
    link: "overview/processes.html",
  },
  {
    title: "System Status",
    description:
      "Stay informed about what’s live, what’s evolving, and what’s coming next in the Design System",
    link: "overview/system-status.html",
  },
];

// Função para renderizar os cards

export function renderStart() {
  const container = document.getElementById("get-started-content");
  if (!container) return;

  container.innerHTML = "";

  startContent.forEach(({ title, description, link }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="icon-box"></div>
      <div class="card-content">
        <h2>${title}</h2>
        <p>${description}</p>
        <a href="${link}" class="ds-link-button">View</a>
      </div>
    `;
    container.appendChild(card);
  });
}
