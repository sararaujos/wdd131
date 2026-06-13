// Shop and Calculator Logic - TinyTreasure

// Array of Objects expanded: Exactly 4 premium items per age group (12 items total)
const clothingInventory = [
    // --- CATEGORY: 0-12 MONTHS (4 Items) ---
    { id: 1, name: "Pastel Animal Print Onesie", age: "0-12m", price: "CZK 120", img: "images/pastel_print1.png" },
    { id: 2, name: "Bright Summer Sun Hat", age: "0-12m", price: "CZK 90", img: "images/yellow_hat2.png" },
    { id: 3, name: "Organic Cotton Swaddle Blanket", age: "0-12m", price: "CZK 180", img: "images/blanket3.png" },
    { id: 4, name: "Soft Fleece Booties Set", age: "0-12m", price: "CZK 95", img: "images/booties4.png" },

    // --- CATEGORY: 1-2 YEARS (4 Items) ---
    { id: 5, name: "Vintage Denim Dungarees", age: "1-2y", price: "CZK 250", img: "images/overall5.png" },
    { id: 6, name: "Organic Knit Cotton Sweater", age: "1-2y", price: "CZK 290", img: "images/sweater6.png" },
    { id: 7, name: "Corduroy Overall Skirt", age: "1-2y", price: "CZK 230", img: "images/corduroy7.png" },
    { id: 8, name: "Playtime Linen Harem Pants", age: "1-2y", price: "CZK 150", img: "images/pantslino8.png" },

    // --- CATEGORY: 3-5 YEARS (4 Items) ---
    { id: 9, name: "Cozy Fleece Bear Jacket", age: "3-5y", price: "CZK 380", img: "images/jacket9.png" },
    { id: 10, name: "Waterproof Puffer Overalls", age: "3-5y", price: "CZK 450", img: "images/puffer_overall10.png" },
    { id: 11, name: "Dinosaur Hooded Raincoat", age: "3-5y", price: "CZK 320", img: "images/raincoat11.png" },
    { id: 12, name: "Canvas High-Top Sneakers", age: "3-5y", price: "CZK 280", img: "images/sneakers12.png" }
];

// Configuration Object for environmental multi-tiered values
const ecoMetrics = {
    onesie: { water: 1200, co2: 2.5 },
    jeans: { water: 3400, co2: 6.0 },
    jacket: { water: 5000, co2: 12.0 },
    tshirt: { water: 2000, co2: 4.2 }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // --- FEATURE A: CATALOG RENDERING & FILTERING ---
    const gridContainer = document.getElementById("product-grid");
    const filterButtons = document.querySelectorAll(".btn-filter");

    function displayProducts(productsArray) {
        if (!gridContainer) return; 
        gridContainer.innerHTML = "";

        productsArray.forEach(product => {
            // Template literals used exclusively for building strings safely
            const cardHtml = `
                <article class="product-card">
                    <img src="${product.img}" alt="${product.name}" loading="lazy">
                    <span class="tag-age">${product.age}</span>
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                </article>
            `;
            gridContainer.innerHTML += cardHtml;
        });
    }

    // Initialize Catalog View
    if (gridContainer) {
        displayProducts(clothingInventory);

        // Event Delegation listening for filter category adjustments
        filterButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                e.target.classList.add("active");

                const activeCategory = e.target.getAttribute("data-filter");
                
                if (activeCategory === "all") {
                    displayProducts(clothingInventory);
                } else {
                    const filtered = clothingInventory.filter(item => item.age === activeCategory);
                    displayProducts(filtered);
                }
            });
        });
    }

    // --- FEATURE B: SUSTAINABILITY IMPACT CALCULATOR ---
    const calculateBtn = document.getElementById("btn-calculate");
    const resultsBox = document.getElementById("calc-results");

    if (calculateBtn) {
        calculateBtn.addEventListener("click", () => {
            const selectedItem = document.getElementById("item-type").value;
            const quantity = parseInt(document.getElementById("item-quantity").value) || 1;

            if (quantity < 1) return;

            const waterSavingsTotal = ecoMetrics[selectedItem].water * quantity;
            const co2SavingsTotal = (ecoMetrics[selectedItem].co2 * quantity).toFixed(1);

            document.getElementById("water-saved").innerHTML = `💧 Water Saved: <strong>${waterSavingsTotal} Liters</strong>`;
            document.getElementById("co2-saved").innerHTML = `☁️ CO₂ Avoided: <strong>${co2SavingsTotal} kg</strong>`;
            
            const badgeBox = document.getElementById("badge-container");
            if (waterSavingsTotal > 6000) {
                badgeBox.innerHTML = `<span class="tag-age" style="background:#BFFCC6">🏆 Eco Hero Tier</span>`;
            } else {
                badgeBox.innerHTML = `<span class="tag-age" style="background:#BAE1FF">🌱 Eco Contributor Tier</span>`;
            }

            resultsBox.classList.remove("hidden");
            updateGlobalCounter(waterSavingsTotal);
        });
    }

    // --- FEATURE C: LOCALSTORAGE COUNTER MANAGEMENT ---
    function updateGlobalCounter(newWaterSaved) {
        let historyWater = parseInt(localStorage.getItem("total_water_saved")) || 0;
        historyWater += newWaterSaved;
        localStorage.setItem("total_water_saved", historyWater);
        renderStorageMessage(historyWater);
    }

    function renderStorageMessage(amount) {
        const counterElement = document.getElementById("total-savings-counter");
        if (!counterElement) return;

        if (amount === 0) {
            counterElement.textContent = "👶 You haven't checked any items yet! Use the calculator above to see your household's potential environmental impact.";
        } else {
            counterElement.innerHTML = `🏠 <strong>Household Impact Track:</strong> Your combined calculations have discovered a total savings of <strong>${amount} Liters</strong> of clean water!`;
        }
    }

    if (document.getElementById("total-savings-counter")) {
        const storedWater = parseInt(localStorage.getItem("total_water_saved")) || 0;
        renderStorageMessage(storedWater);
    }
});