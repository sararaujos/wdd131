// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dinamismo del Footer (Año actual y última modificación)
    const currentYearSpan = document.getElementById("currentyear");
    const lastModifiedSpan = document.getElementById("lastModified");
    
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // 2. Menú de Hamburguesa Responsivo
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            // Intercambia la clase 'open' en el nav
            navMenu.classList.toggle("open");
            
            // Cambia el símbolo del botón según corresponda
            if (navMenu.classList.contains("open")) {
                menuBtn.textContent = "❌"; // Símbolo para cerrar
            } else {
                menuBtn.textContent = "☰"; // Símbolo de hamburguesa
            }
        });
    }
});