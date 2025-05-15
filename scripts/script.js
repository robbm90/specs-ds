// TOGGLE DE MENU DROP DOWN
document.querySelectorAll(".menu-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const parent = toggle.closest(".menu-group");
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", !expanded);
    parent.classList.toggle("open");
  });
});

// SWITCH DARK / LIGHT
document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.querySelector(".toggle input");
  const toggleElement = document.querySelector(".toggle");
  const rootElement = document.documentElement;
  const STORAGE_KEY = "theme-preference";

  // Aumentando o tempo de debounce para maior estabilidade
  const DEBOUNCE_DELAY = 300;

  // Verificação se o toggle existe
  if (!toggleInput) {
    console.warn("Toggle input não encontrado");
    return;
  }

  // Função para aplicar o tema com segurança
  const applyTheme = (isDark) => {
    try {
      if (isDark) {
        rootElement.classList.add("dark");
        localStorage.setItem(STORAGE_KEY, "dark");
      } else {
        rootElement.classList.remove("dark");
        localStorage.setItem(STORAGE_KEY, "light");
      }
    } catch (error) {
      console.error("Erro ao aplicar tema:", error);
    }
  };

  // Função para obter a preferência do tema
  const getThemePreference = () => {
    try {
      // Verificar preferência salva anteriormente
      const savedPreference = localStorage.getItem(STORAGE_KEY);
      if (savedPreference) {
        return savedPreference === "dark";
      }

      // Se não houver preferência salva, usar preferência do sistema
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (error) {
      console.error("Erro ao obter preferência de tema:", error);
      return false; // Fallback para light mode
    }
  };

  // Define tema inicial
  const initialDarkPreference = getThemePreference();
  toggleInput.checked = initialDarkPreference;
  applyTheme(initialDarkPreference);

  // Responsável pela animação suave com tratamento de erro
  function handleThemeToggle(isDark) {
    try {
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      if (toggleElement) {
        const rect = toggleElement.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }

      // Atualiza as variáveis CSS para o ponto de origem da animação
      rootElement.style.setProperty("--x", `${x}px`);
      rootElement.style.setProperty("--y", `${y}px`);

      // Se a View Transition não for suportada, faz o fallback
      if (!document.startViewTransition) {
        applyTheme(isDark);
        return;
      }

      // Inicia a transição com tratamento de erro
      try {
        const transition = document.startViewTransition(() => {
          applyTheme(isDark);
        });

        transition.ready.catch((error) => {
          console.error("Erro ao preparar transição:", error);
          // Fallback para aplicação direta sem animação
          applyTheme(isDark);
        });

        transition.finished.catch((error) => {
          console.error("Erro ao finalizar transição:", error);
        });
      } catch (error) {
        console.error("Erro ao iniciar transição:", error);
        // Fallback para aplicação direta sem animação
        applyTheme(isDark);
      }
    } catch (error) {
      console.error("Erro ao processar troca de tema:", error);
      // Aplicação direta do tema sem animação como último recurso
      applyTheme(isDark);
    }
  }

  // Implementação robusta de debounce
  function debounce(callback, delay) {
    let timeout;

    return function executedFunction(...args) {
      // Limpa o timeout anterior
      if (timeout) {
        clearTimeout(timeout);
      }

      // Configura o novo timeout
      timeout = setTimeout(() => {
        callback(...args);
        timeout = null;
      }, delay);
    };
  }

  // Criação de função debounceada para troca de tema
  const debouncedThemeToggle = debounce((event) => {
    console.log("Aplicando tema:", event.target.checked ? "dark" : "light");
    handleThemeToggle(event.target.checked);
  }, DEBOUNCE_DELAY);

  // Remoção de event listeners existentes para evitar duplicação
  toggleInput.removeEventListener("change", debouncedThemeToggle);

  // Adição de novo event listener utilizando 'change' ao invés de 'input'
  // 'change' é mais adequado para checkboxes pois dispara apenas quando o valor é confirmado
  toggleInput.addEventListener("change", debouncedThemeToggle);

  // Adiciona listener para mudanças na preferência do sistema
  try {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Só altera se não tiver preferência manual
        const newDarkPreference = e.matches;
        toggleInput.checked = newDarkPreference;
        handleThemeToggle(newDarkPreference);
      }
    });
  } catch (error) {
    console.error(
      "Erro ao configurar listener para preferência do sistema:",
      error
    );
  }
});
