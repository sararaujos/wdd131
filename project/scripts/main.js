// Main Script: Global Site Features
document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
            menuToggle.textContent = mainNav.classList.contains("open") ? "❌" : "☰";
        });
    }

    // 2. Automated Footer Metadata
    const yearSpan = document.getElementById("year");
    const lastModSpan = document.getElementById("lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) lastModSpan.textContent = document.lastModified;
});