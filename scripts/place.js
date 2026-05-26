document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo automático de fechas del Footer
    const currentYearSpan = document.getElementById("current-year");
    const lastModifiedSpan = document.getElementById("last-modified-date");

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // 2. Lógica para el cálculo de Sensación Térmica (Wind Chill)
    const tempElement = document.getElementById("temp");
    const windElement = document.getElementById("wind");
    const windChillElement = document.getElementById("windchill");

    if (tempElement && windElement && windChillElement) {
        const temperature = parseFloat(tempElement.textContent);
        const windSpeed = parseFloat(windElement.textContent);

        // Condiciones métricas: Temp <= 10 °C y Viento > 4.8 km/h
        if (temperature <= 10 && windSpeed > 4.8) {
            const chillFactor = calculateWindChill(temperature, windSpeed);
            windChillElement.textContent = `${chillFactor.toFixed(1)} °C`;
        } else {
            windChillElement.textContent = "N/A";
        }
    }
});

/**
 * Calcula la sensación térmica usando la fórmula métrica oficial
 * @param {number} temp - Temperatura en °C
 * @param {number} speed - Velocidad del viento en km/h
 * @returns {number}
 */
function calculateWindChill(temp, speed) {
    // Retorno en una sola línea de código utilizando Math.pow para el exponente 0.16
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16));
}