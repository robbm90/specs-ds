// Conteúdo dos Cards

const overviewCards = [
  {
    title: "Designers",
    description: "Lorem ipsum sit dolor amet",
    link: "foundations/color.html",
  },
  {
    title: "Developers",
    description: "Lorem ipsum sit dolor amet",
    link: "foundations/elevation.html",
  },
  {
    title: "Content Designers",
    description: "Lorem ipsum sit dolor amet",
    link: "foundations/typography.html",
  },
]; // ← faltava esse fechamento aqui

// Função para renderizar os cards

export function renderOverview() {
  const container = document.getElementById("overview-cards");
  if (!container) return;

  container.innerHTML = "";

  overviewCards.forEach(({ title, description, link }) => {
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
