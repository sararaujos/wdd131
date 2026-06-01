document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dynamic Footer Date Configuration
    const currentYearSpan = document.getElementById("currentyear");
    const lastModifiedSpan = document.getElementById("lastModified");
    
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

    // 2. Mobile Hamburger Menu Toggle
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuBtn.textContent = navMenu.classList.contains("open") ? "❌" : "☰";
        });
    }

    // 3. Temple Data Array (With 3 Additional Temples Added)
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        {
            templeName: "Trujillo Peru Temple",
            location: "Trujillo, La Libertad, Peru",
            dedicated: "2015, June, 21",
            area: 28200,
            imageUrl: "https://www.churchofjesuschrist.org/imgs/d3314069b0111c411c5e21948f4d2d331a98eb3d/full/!1200,/0/default"
        },
        {
            templeName: "Lima Peru Los Olivos Temple",
            location: "Lima, Lima, Peru",
            dedicated: "2024, January, 14",
            area: 47413,
            imageUrl: "https://www.churchofjesuschrist.org/imgs/a55d546a3b9f11ee8ebbeeeeac1e96e3145733e4/full/!1200,/0/default"
        },
        {
            templeName: "Rome Italy Temple",
            location: "Rome, Lazio, Italy",
            dedicated: "2019, March, 10",
            area: 41010,
            imageUrl: "https://www.churchofjesuschrist.org/imgs/bf73f132564c2d84658d4cd8d4a3c9fab184dd22/full/!1200,/0/default"
        }
    ];

    // 4. Container Selectors
    const cardsContainer = document.getElementById("temple-cards-container");
    const filterTitle = document.getElementById("filter-title");

    // Function to generate and render cards safely
    function displayTemples(filteredTemples) {
        cardsContainer.innerHTML = ""; // Clear existing elements
        
        filteredTemples.forEach(temple => {
            const card = document.createElement("section");
            card.classList.add("temple-card");
            
            card.innerHTML = `
                <h3>${temple.templeName}</h3>
                <p><span>Location:</span> ${temple.location}</p>
                <p><span>Dedicated:</span> ${temple.dedicated}</p>
                <p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
            `;
            cardsContainer.appendChild(card);
        });
    }

    // 5. Navigation Filter Logic Handler
    const navLinks = document.querySelectorAll("#nav-menu a");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Manage Active Class State
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");

            // Close mobile menu gracefully if open after clicking a filter option
            if (navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                menuBtn.textContent = "☰";
            }

            const filterType = link.textContent.trim();
            filterTitle.textContent = filterType;

            // Evaluation Criteria filters
            switch (filterType) {
                case "Old":
                    // Filters out temples built prior to the year 1900
                    const oldTemples = temples.filter(t => {
                        const year = parseInt(t.dedicated.split(",")[0]);
                        return year < 1900;
                    });
                    displayTemples(oldTemples);
                    break;
                    
                case "New":
                    // Filters out temples built after the year 2000
                    const newTemples = temples.filter(t => {
                        const year = parseInt(t.dedicated.split(",")[0]);
                        return year > 2000;
                    });
                    displayTemples(newTemples);
                    break;
                    
                case "Large":
                    // Area greater than 90,000 sq ft
                    displayTemples(temples.filter(t => t.area > 90000));
                    break;
                    
                case "Small":
                    // Area smaller than 10,000 sq ft
                    displayTemples(temples.filter(t => t.area < 10000));
                    break;
                    
                case "Home":
                default:
                    displayTemples(temples);
                    break;
            }
        });
    });

    // Run baseline invocation for initial load setup
    displayTemples(temples);
});