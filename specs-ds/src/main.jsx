// main.jsx - Arquivo principal do React (antes de compilar)
import React from "react";
import ReactDOM from "react-dom/client";
import MyComponent from "./MyComponent.jsx";

// Função para renderizar o componente
function renderReactComponent() {
  const rootElement = document.getElementById("react-root");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<MyComponent />);
    console.log("React component rendered successfully!");
  } else {
    console.error("Cannot find element with id 'react-root'");
  }
}

// Expor a função globalmente para permitir re-renderização
window.renderMyReactComponent = renderReactComponent;

// Executar a renderização quando o script é carregado
renderReactComponent();
