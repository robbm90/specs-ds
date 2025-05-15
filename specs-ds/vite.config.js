// vite.config.js - Configuração para build
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Usar importações de módulos ES
    target: "es2015",

    // Configurar o nome dos arquivos de saída
    rollupOptions: {
      output: {
        // Ajustar o nome do arquivo JS principal
        entryFileNames: "assets/[name]-[hash].js",

        // Garantir que as importações sejam separadas
        manualChunks: undefined,
      },
    },
  },
});
