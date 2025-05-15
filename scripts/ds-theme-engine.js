const DSThemeEngine = (() => {
  const THEME_KEY = "ds-theme";
  const THEME_ID = "ds-theme-link";
  const DEFAULT_THEME = "zen";

  const getTheme = () => {
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  };

  const applyTheme = (themeName) => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem(THEME_KEY, themeName);
    loadThemeCSS(themeName);
  };

  const loadThemeCSS = (themeName) => {
    const existingLink = document.getElementById(THEME_ID);
    if (existingLink) existingLink.remove();

    const link = document.createElement("link");
    link.id = THEME_ID;
    link.rel = "stylesheet";
    link.href = `themes/${themeName}.css`; // Caminho certo agora
    document.head.appendChild(link);
  };

  const init = () => {
    const theme = getTheme();
    applyTheme(theme);
  };

  const setTheme = (themeName) => {
    applyTheme(themeName);
  };

  return {
    init,
    setTheme,
    getTheme,
  };
})();

// Auto-inicializa ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  DSThemeEngine.init();

  const selector = document.getElementById("themeSelector");
  if (selector) {
    selector.value = DSThemeEngine.getTheme();
    selector.addEventListener("change", (e) => {
      DSThemeEngine.setTheme(e.target.value);
    });
  }
});
